window.onload = function () {


};

var app = {
    showCurrentProgramms: function () {
        var now = new Date,
            channelItems =
                document.
                querySelectorAll(".channel-item"),
            programmTimes,
            i,
            j,
            dateProgramNow,
            dateProgramNext,
            channelItemProgram;

        now = new Date;
        now.setHours(21);

        for (i = 0; i < channelItems.length; i++) {

            programmTimes = channelItems[i].
                querySelectorAll(".channel-item-program-time");

            for (j = 0; j < programmTimes.length; j++) {

                dateProgramNow = app._getDateFromText(now, programmTimes[j].innerText);

                // Если последняя то подставим крайнее время
                if (j !== programmTimes.length - 1) {
                    dateProgramNext = app._getDateFromText(now, programmTimes[j + 1].innerText);
                }else{
                    dateProgramNext = new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate(),
                        23,
                        59,
                        59,
                        59
                    );
                }

                channelItemProgram =
                    programmTimes[j].
                        parentNode.
                        parentNode;

                if (!(now >= dateProgramNow && now < dateProgramNext)) {
                    channelItemProgram.setAttribute("class", "channel-item-program not-now");
                }else{

                }
            }
        }




        return false;
    },

    showAllProgramms: function () {
        var programmTimes =
                document.
                querySelectorAll(".channel-item-program-time"),
            i,
            channelItem;

        for (i = 0; i < programmTimes.length; i++) {

            channelItem =
                programmTimes[i].
                    parentNode.
                    parentNode;

            channelItem.setAttribute("class", "channel-item-program");

        }

        return false;
    },

    _getDateFromText: function (now, textDate) {
        var hour = parseInt(textDate.substr(0, 2), 10),
            minutes = parseInt(textDate.substr(3, 2), 10)

        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hour,
            minutes,
            0,
            0
        );
    }
};