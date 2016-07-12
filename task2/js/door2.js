/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var button0 = this.popup.querySelector('.door2-riddle__button_0');
    var button1 = this.popup.querySelector('.door2-riddle__button_1');
    var circle0 = this.popup.querySelector('.door-riddle__circle0');
    var circle1 = this.popup.querySelector('.door-riddle__circle1');
    var circle2 = this.popup.querySelector('.door-riddle__circle2');

    var mouseOffset = null;
    var positionButtonDefault = null;

    button0.addEventListener('pointerdown', _onButton0PointerDown.bind(this));
    button0.addEventListener('pointerup', _onButton0PointerUp.bind(this));
    button0.addEventListener('pointercancel', _onButton0PointerCancel.bind(this));
    button0.addEventListener('pointerleave', _onButton0PointerLeave.bind(this));
    button0.addEventListener('pointermove', _onButton0PointerMove.bind(this));

    function _onButton0PointerDown(event) {
        console.log('pointerdown')
        //event.target.classList.add('door2-riddle__button_0_captured');
        //
        //mouseOffset = App.Helper.getMouseOffset(event.target, event);
        //positionButtonDefault = App.Helper.getPosition(button0);
        //
        //console.log(mouseOffset)
        //console.log(positionButtonDefault)
    }

    function _onButton0PointerUp(event) {
        event.target.classList.remove('door2-riddle__button_0_captured');
        console.log('pointerup')
        resetButton0();
    }

    function _onButton0PointerCancel(event) {
        event.target.classList.remove('door2-riddle__button_0_captured');
        console.log('pointercancel')
        resetButton0();

    }

    function _onButton0PointerLeave(event) {
        event.target.classList.remove('door2-riddle__button_0_captured');
        console.log('pointerleave')
        resetButton0();

    }




    function _onButton0PointerMove(event) {
        if (event.target.classList.contains('door2-riddle__button_0_captured')) {

            button0.style.left = event.x - positionButtonDefault.x - mouseOffset.x + 'px';
            button0.style.top = event.y - positionButtonDefault.y - mouseOffset.y + 'px';


        }
    }

    circle2.addEventListener('pointerenter', _onCircle2PointerLeave.bind(this));
    //circle1.addEventListener('pointerleave', _onCircle2PointerLeave.bind(this));
    //circle0.addEventListener('pointerenter', _onCircle2PointerLeave.bind(this));

    function _onCircle2PointerLeave(){
       // console.log('pointerenter circle2')
        resetButton0();
    }

    function resetButton0(){
        button0.style.left = '0px';
        button0.style.top = '0px';
    }
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;
