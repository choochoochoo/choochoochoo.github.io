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
    var isFirstClick = false;
    var isGestureStarted = false;
    var thetaDelta = 0;
    var result = 0;

    var circle1 = this.popup.querySelector('.door2-riddle__circle1');
    var button = this.popup.querySelector('.door2-riddle__button');
    var monitor = this.popup.querySelector('.door2-riddle-monitor');

    // test
    //var circle3 = this.popup.querySelector('.door2-riddle__button');
    //var circle3Pos = AppHelper.getPosition(circle3);
    //centerPointEvent = {pageX: circle3Pos.x, pageY: circle3Pos.y};

    circle1.addEventListener('pointerleave', _onCircle1PointerUp.bind(this));
    circle1.addEventListener('pointercancel', _onCircle1PointerUp.bind(this));
    circle1.addEventListener('pointerup', _onCircle1PointerUp.bind(this));
    circle1.addEventListener('pointerdown', _onCircle1PointerDown.bind(this));
    circle1.addEventListener('pointermove', _onCircle1PointerMove.bind(this));

    button.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    button.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    button.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
    button.addEventListener('pointerup', _onButtonPointerUp.bind(this));

    function _onButtonPointerDown(event) {
        console.log('circle 2' + event.type )
        pressButton();
        centerPointEvent = event;
        console.log(centerPointEvent)
    }

    function _onButtonPointerUp(event) {
        console.log(event.type)
        unpressButton();
        centerPointEvent = null;
        resetResult();
    }





    function _onCircle1PointerDown(event) {

        if(circle1 === event.target && isPressedButton()){
            console.log('circle 1' + event.type )

            isGestureStarted = true;

            endPointEvent = event;

            thetaDelta = angle(
                centerPointEvent.pageX,
                centerPointEvent.pageY,
                endPointEvent.pageX,
                endPointEvent.pageY);

            console.log(endPointEvent)
        }

    }

    function _onCircle1PointerUp(event) {
        console.log(event.type)
        isGestureStarted = false;
        endPointEvent = null;
        resetResult();
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

         //   console.log(theta)

            // не дадим в обратную сторону крутить
            if (isRevers(theta)) {
                resetResult();
                return;
            }

            result = getResult(theta);

            //console.log(result)

            writeResult(result);

            if (isWin(result)) {
                alert('win')
            }
        }

    }

    function resetResult(){
        monitor.innerText = '';
        result = 0;
    }

    function writeResult(result) {
        monitor.innerText = Math.round(result) + '%';
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

        //console.log('delta: ' + thetaDelta)

        var result = theta - thetaDelta;

      //  console.log(result)

        if (result < 0) {
            result += 360;
        }

        return result;
    }

    function pressButton(){
        button.classList.add('door2-riddle__button_pressed');
    }

    function unpressButton(){
        button.classList.remove('door2-riddle__button_pressed');
    }

    function isPressedButton() {
        if (button.classList.contains('door2-riddle__button_pressed')) {
            return true;
        }

        return false;
    }
}

Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;