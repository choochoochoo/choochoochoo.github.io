app.Audio = function (player) {

    this.player = player;
    this.elementAudio = player.element.querySelector('.old-school-player__audio');
    this.elementAudioOld = player.element.querySelector('.old-school-player__audio-old');

    var audioCtx = new AudioContext();
    var source = null;

    var gainNode = audioCtx.createGain();
    gainNode.gain.value = 1;
    
    var scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
    scriptNode.onaudioprocess = function (audioProcessingEvent) {
        var inputBuffer = audioProcessingEvent.inputBuffer;
        var outputBuffer = audioProcessingEvent.outputBuffer;

        for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
            var inputData = inputBuffer.getChannelData(channel);
            var outputData = outputBuffer.getChannelData(channel);

            for (var sample = 0; sample < inputBuffer.length; sample++) {
                outputData[sample] = inputData[sample];
                outputData[sample] += ((Math.random() * 2) - 1) * 0.1;
            }
        }
    };

    this.switchOnNoise = function () {
        source = audioCtx.createBufferSource();
        source.connect(scriptNode);
        scriptNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        source.start();
    };

    this.switchOffNoise = function () {
        gainNode.disconnect(audioCtx.destination);
        source.stop();
    };

    this.play = function () {
        this.elementAudio.play();
        this.elementAudioOld.play();
        this.switchOnNoise();
    };

    this.stop = function () {
        this.elementAudio.pause();
        this.elementAudioOld.pause();
        this.switchOffNoise();
    };

    this.volumeOn = function () {
        this.elementAudio.muted = false;
        this.elementAudioOld.muted = false;
        gainNode.gain.value = 1;
    };

    this.volumeOff = function () {
        this.elementAudio.muted = true;
        this.elementAudioOld.muted = true;
        gainNode.gain.value = 0;
    };
};
