app.SubScene = function (player, canvas, context) {

    var TIMEUPDATE_LATENCY = 0.7;

    this.player = player;

    // Текущая сцена с субтитрами
    this.currentSub = null;

    // Время начала сцены с субтитрами
    this.startTime = null;

    // Время конца сцены с субтитрами
    this.endTime = null;

    // Если нажали на паузу во время сцены субтитров
    // надо додержать сцену это время
    this.remainTime = null;

    // Идентификатор таймаута
    this.subSceneTimeoutId = null;

    // Субтитры
    this.subs = null;

    function getCountString(context, text, x, y, maxWidth, lineHeight) {

        var count = 0;

        var lines = text.split('\n');

        for (var i = 0; i < lines.length; i++) {

            var words = lines[i].split(' ');
            var line = '';

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {

                    count++;

                    line = words[n] + ' ';

                }
                else {
                    line = testLine;
                }
            }

            count++;

        }

        return count;
    }

    function wrapText(context, text, x, y, maxWidth, lineHeight) {

        var lines = text.split("\n");

        for (var i = 0; i < lines.length; i++) {

            var words = lines[i].split(' ');
            var line = '';

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }

            context.fillText(line, x, y);
            y += lineHeight;
        }
    }

    function writeSubtitle(context, canvas, sub) {
        context.font = "2rem Oranienbaum";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = 'top';

        var lineHeight = 48;
        var y = 0;
        var countString = getCountString(context, sub.text, canvas.width / 2, y, canvas.width, lineHeight);
        var topShift = ( ( canvas.height - ( lineHeight * countString  ) ) / 2);

        wrapText(context, sub.text, canvas.width / 2, topShift, canvas.width - 10, lineHeight);
    }

    function paintCanvasInBlack(context, canvas) {
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'black';
        context.fill();
    }

    this.paintPlayer = function () {
        paintCanvasInBlack(this.player.bgContext, this.player.bgCanvas);
    };

    this.render = function () {
        paintCanvasInBlack(this.player.bgContext, this.player.bgCanvas);
        writeSubtitle(this.player.bgContext, this.player.bgCanvas, this.currentSub)
    };

    this.isSubscene = function () {
        if (this.currentSub && !this.currentSub.isShowed) {
            return true;
        }

        return false;
    };

    this.isPlaying = function () {
        return !!this.startTime;
    };

    this.getTimeCurrentSub = function () {
        return ( this.currentSub.end - this.currentSub.start ) * 1000;
    };

    this.startSubscene = function () {
        this.player.showBackCanvas();
        this.player.elementVideo.pause();
        this.startTime = new Date();
        this.subSceneTimeoutId = setTimeout(this.stopSubscene.bind(this), this.getTimeCurrentSub());
    };

    this.stopSubscene = function () {
        this.player.showMainCanvas();
        this.startTime = null;
        this.currentSub.isShowed = true;
        this.player.elementVideo.play();
        clearTimeout(this.subSceneTimeoutId);
    };

    this.pauseSubscene = function () {
        this.endTime = new Date();
        this.remainTime = this.getTimeCurrentSub() - (this.endTime - this.startTime);
        clearTimeout(this.subSceneTimeoutId);
    };

    this.unPauseSubscene = function () {
        this.startTime = new Date();
        this.subSceneTimeoutId = setTimeout(this.stopSubscene.bind(this), this.remainTime);
    };

    this.getSub = function (time) {
        this.currentSub = this.subs.filter(function (item) {
            if (!item.isShowed && time >= item.end && time <= item.end + TIMEUPDATE_LATENCY) {
                return item;
            }
        })[0];
    };

    this.parseSubs = function () {

        var helper = new app.helper();

        helper.getFile(function (content) {
            var helper = new app.helper();
            this.subs = helper.parseSrt(content);
        }.bind(this), player.pathToSrt);
    };

    this.makeSubsNotShowed = function () {
        this.subs.forEach(function (item) {
            item.isShowed = false;
        });
    };

    this.parseSubs();
};
