app.Timer = function (player) {

    this.timerElement = player.element.querySelector('.old-school-player__timer');

    var timerIntervalId = null;

    this.time = 0;

    this.startTimer = function () {
        timerIntervalId = setInterval(this.updateTimer.bind(this), 1000);
    };

    this.pauseTimer = function () {
        clearInterval(timerIntervalId);
    };

    this.resetTimer = function(){
        if(timerIntervalId){
            clearInterval(timerIntervalId);
        }
        this.time = -1;
        this.updateTimer();
    };

    this.updateTimer = function () {

        var helper = new app.helper();

        this.time++;
        this.timerElement.innerText = helper.getTimerFormat(this.time);
    };

};
