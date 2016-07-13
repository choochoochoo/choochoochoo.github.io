/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var centerPointEvent = null;
    var endPointEvent = null;
    var isGestureStarted = false;
    //var thetaDelta = 0;
    var result = 0;

    var circle1 = this.popup.querySelector('.door-riddle__circle1');
    var circle2 = this.popup.querySelector('.door-riddle__circle2');

    // var circle3 = this.popup.querySelector('.door-riddle__circle3');
    // var circle3Pos = AppHelper.getPosition(circle3);
    //centerPointEvent = {pageX: circle3Pos.x, pageY: circle3Pos.y};

    circle1.addEventListener('pointerleave', _onCircle1PointerUp.bind(this));
    circle1.addEventListener('pointercancel', _onCircle1PointerUp.bind(this));
    circle1.addEventListener('pointerup', _onCircle1PointerUp.bind(this));
    circle1.addEventListener('pointerdown', _onCircle1PointerDown.bind(this));
    circle1.addEventListener('pointermove', _onCircle1PointerMove.bind(this));

    function _onCircle1PointerUp(event) {
        console.log(event.type)

        if (isGestureStarted) {
            resetResult();
        }

        isGestureStarted = false;
    }


    function _onCircle1PointerDown(event) {
        //if (event.isPrimary) {
        //    centerPointEvent = event;
        //    return;
        //}

        // Первое касание
        if(!isGestureStarted){
            centerPointEvent = event;

            return;
        }

        isGestureStarted = true;

        endPointEvent = event;


    }

    function _onCircle1PointerMove(event) {

        if (isGestureStarted) {

            endPointEvent = event;

            var theta = angle(
                centerPointEvent.pageX,
                centerPointEvent.pageY,
                endPointEvent.pageX,
                endPointEvent.pageY);

            theta = deltaAngle(theta);

            // не дадим в обратную сторону крутить
            if (isRevers(theta)) {
                resetResult();
                return;
            }

            result = getResult(theta);

            writeResult(result);

            if (isWin(result)) {
                alert('win')
            }
        }

    }

    function resetResult(){
        writeResult(0);
    }

    function writeResult(result) {
        circle2.innerText = Math.round(result) + '%';
    }

    function isWin(result) {
        return result >= 100;
    }

    function getResult(theta) {
        return theta / 180 * 100;
    }

    function isRevers(theta) {
        return theta > 190;
    }

    function angle(cx, cy, ex, ey) {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx);
        theta *= 180 / Math.PI;
        return theta;
    }

    function deltaAngle(theta) {

        var thetaDelta = angle(
            centerPointEvent.pageX,
            centerPointEvent.pageY,
            endPointEvent.pageX,
            endPointEvent.pageY);

        console.log('delta: ' + thetaDelta)

        var result = theta - thetaDelta;

        if (result < 0) {
            result += 360;
        }

        return result;
    }
}

Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;