app.helper = function Helper() {

    function srtTimeToSeconds(time) {
        var match = time.match(/(\d\d):(\d\d):(\d\d),(\d\d\d)/);
        var hours = +match[1],
            minutes = +match[2],
            seconds = +match[3],
            milliseconds = +match[4];

        return (hours * 60 * 60) + (minutes * 60) + (seconds) + (milliseconds / 1000);
    }

    function parseSrtLine(line) {
        var match = line.match(/(\d\d:\d\d:\d\d,\d\d\d) --> (\d\d:\d\d:\d\d,\d\d\d)\n([\s\S]*)/m);

        return {
            start: srtTimeToSeconds(match[1]),
            end: srtTimeToSeconds(match[2]),
            text: match[3].trim()
        };
    }

    this.parseSrt = function (srt) {
        var lines = srt.split(/(?:^|\n\n)\d+\n|\n+$/g).slice(1, -2);

        return lines.map(parseSrtLine);
    };

    this.getTimerFormat = function (timer) {
        var sec_num = parseInt(timer, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (minutes < 10) {
            minutes = minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ':' + seconds;
    };

    this.getFile = function (callback, filePath) {
        var jsonFile = new XMLHttpRequest();
        jsonFile.open("GET", filePath, true);
        jsonFile.send();

        jsonFile.onreadystatechange = function () {
            if (jsonFile.readyState === 4 && jsonFile.status === 200) {
                callback(jsonFile.responseText);
            }
        }
    }

};

