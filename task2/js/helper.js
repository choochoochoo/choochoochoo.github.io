var AppHelper = {
    getPosition: function (e) {
        var left = 0;
        var top = 0;

        while (e.offsetParent) {
            left += e.offsetLeft;
            top += e.offsetTop;
            e = e.offsetParent;
        }

        left += e.offsetLeft;
        top += e.offsetTop;

        return {x: left, y: top}
    },

    getMouseOffset: function (target, e) {
        var docPos = App.Helper.getPosition(target);
        //return {x: e.pageX - docPos.x, y: e.pageY - docPos.y};
        return {x: e.x - docPos.x, y: e.y - docPos.y};
    }
};


