app.Controls = function (player) {

    this.player = player;

    this.playButton = this.player.element.querySelector('.old-school-player__button_play');
    this.pauseButton = this.player.element.querySelector('.old-school-player__button_pause');
    this.volumeOnButton = this.player.element.querySelector('.old-school-player__button_volume-on');
    this.volumeOffButton = this.player.element.querySelector('.old-school-player__button_volume-off');

    this.playButton.addEventListener('click', clickPlayButtonHandler.bind(this), false);
    this.pauseButton.addEventListener('click', clickPauseButtonHandler.bind(this), false);
    this.volumeOnButton.addEventListener('click', clickVolumeOnButtonHandler.bind(this), false);
    this.volumeOffButton.addEventListener('click', clickVolumeOffButtonHandler.bind(this), false);

    this.stop = function () {
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

    function clickPlayButtonHandler() {

        this.player.showMainCanvas();
        
        this.player.timer.startTimer();
        this.player.startRenderScene();
        
        showButton(this.pauseButton);
        hideButton(this.playButton);

        // Если нажали на плей во время сцены субтитров
        if (this.player.subScene.isSubscene()) {
            this.player.subScene.unPauseSubscene();
        } else {
            this.player.elementVideo.play();
            this.player.elementVideoOld.play();
        }

        this.player.audio.play();
    }

    function clickPauseButtonHandler() {
        this.stop();
    }

    function clickVolumeOnButtonHandler(event){
        showButton(this.volumeOffButton);
        hideButton(this.volumeOnButton);
        this.player.audio.volumeOn();
    }

    function clickVolumeOffButtonHandler(event){
        showButton(this.volumeOnButton);
        hideButton(this.volumeOffButton);
        this.player.audio.volumeOff();
    }

    function showButton(button) {
        button.classList.remove('old-school-player__button_hide');
    }

    function hideButton(button) {
        button.classList.add('old-school-player__button_hide');
    }
};
