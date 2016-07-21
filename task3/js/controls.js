app.Controls = function (player) {

    this.player = player;

    this.playButton = this.player.element.querySelector('.old-school-player__button_play');
    this.pauseButton = this.player.element.querySelector('.old-school-player__button_pause');
    this.volumeOnButton = this.player.element.querySelector('.old-school-player__button_volume-on');
    this.volumeOffButton = this.player.element.querySelector('.old-school-player__button_volume-off');
    this.repeatButton = this.player.element.querySelector('.old-school-player__button_repeat');

    this.playButton.addEventListener('click', clickPlayButtonHandler.bind(this), false);
    this.pauseButton.addEventListener('click', clickPauseButtonHandler.bind(this), false);
    this.volumeOnButton.addEventListener('click', clickVolumeOnButtonHandler.bind(this), false);
    this.volumeOffButton.addEventListener('click', clickVolumeOffButtonHandler.bind(this), false);
    this.repeatButton.addEventListener('click', clickRepeatButtonHandler.bind(this), false);

    this.stop = function () {

        console.log('this.player.elementVideo.pause()')
        console.log('this.player.elementVideoOld.pause()')

        this.player.elementVideo.pause();
        this.player.elementVideoOld.pause();
        this.player.timer.pauseTimer();
        this.player.stopRenderScene();

        showButton(this.playButton);
        hideButton(this.pauseButton);

        // Если нажали на паузу во время сцены субтитров
        if (this.player.subScene.isSubscene()) {
            this.player.subScene.pauseSubscene();
        }

        this.player.audio.stop();
    };

    this.play = function () {
        this.player.timer.startTimer();
        this.player.startRenderScene();

        showButton(this.pauseButton);
        hideButton(this.playButton);
        hideButton(this.repeatButton);

        // Если нажали на плей во время сцены субтитров
        if (this.player.subScene.isSubscene()) {
            this.player.subScene.unPauseSubscene();
        } else {
            this.player.elementVideo.play();
            this.player.elementVideoOld.play();
            this.player.showMainCanvas();
        }

        this.player.audio.play();
    };

    this.showRepeatButton = function () {
        showButton(this.repeatButton);
        hideButton(this.pauseButton);
        hideButton(this.playButton);
    };

    function clickPlayButtonHandler() {
        this.play();
    }

    function clickPauseButtonHandler() {
        this.stop();
    }

    function clickVolumeOnButtonHandler(event) {
        showButton(this.volumeOffButton);
        hideButton(this.volumeOnButton);
        this.player.audio.volumeOn();
    }

    function clickVolumeOffButtonHandler(event) {
        showButton(this.volumeOnButton);
        hideButton(this.volumeOffButton);
        this.player.audio.volumeOff();
    }

    function clickRepeatButtonHandler(event) {
        this.player.audio.restart();
        this.player.timer.resetTimer();
        this.play();
        this.player.elementVideo.currentTime = 0;
        this.player.elementVideoOld.currentTime = 0;
        this.player.subScene.makeSubsNotShowed();
    }

    function showButton(button) {
        button.classList.remove('old-school-player__button_hide');
    }

    function hideButton(button) {
        button.classList.add('old-school-player__button_hide');
    }
};
