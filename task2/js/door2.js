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
    //    console.log('pointerdown')
        event.target.classList.add('door2-riddle__button_0_captured');

       // event.target.style.width = event.width + "px";
       // event.target.style.height = event.height + "px";

        mouseOffset = App.Helper.getMouseOffset(event.target, event);
        positionButtonDefault = App.Helper.getPosition(button0);


        //var positionCircle1Default = App.Helper.getPosition(circle1);

       // console.log(mouseOffset)
       // console.log(positionCircle1Default)
    }

    function _onButton0PointerUp(event) {
        event.target.classList.remove('door2-riddle__button_0_captured');
        console.log('pointerup')
        resetButton0();
    }

    function _onButton0PointerCancel(event) {
        event.target.classList.remove('door2-riddle__button_0_captured');
     //   console.log('pointercancel')
        resetButton0();

    }

    function _onButton0PointerLeave(event) {
        event.target.classList.remove('door2-riddle__button_0_captured');
      //  console.log('pointerleave')
        resetButton0();

    }

    function _onButton0PointerMove(event) {
        if (event.target.classList.contains('door2-riddle__button_0_captured')) {

            button0.style.left = event.x - positionButtonDefault.x - mouseOffset.x + 'px';
            button0.style.top = event.y - positionButtonDefault.y - mouseOffset.y + 'px';

           // console.log(document.elementFromPoint(event.clientX, event.clientY))

          //  console.log(event)
        }


    }


    //circle0.addEventListener('pointerenter', _onCircle2PointerLeave.bind(this));
   // circle2.addEventListener('pointerenter', _onCircle2PointerLeave.bind(this));


    //circle1.addEventListener('pointerover', _onCircle1PointerLeave.bind(this));
    //circle1.addEventListener('pointerenter', _onCircle1PointerLeave.bind(this));
    //circle1.addEventListener('pointerdown', _onCircle1PointerLeave.bind(this));
    circle1.addEventListener('pointermove', _onCircle1PointerLeave.bind(this));
    //circle1.addEventListener('pointerup', _onCircle1PointerLeave.bind(this));
    //circle1.addEventListener('pointercancel', _onCircle1PointerLeave.bind(this));
    //circle1.addEventListener('pointerout', _onCircle1PointerLeave.bind(this));
    //circle1.addEventListener('pointerleave', _onCircle1PointerLeave.bind(this));
    //circle1.addEventListener('gotpointercapture', _onCircle1PointerLeave.bind(this));
    //circle1.addEventListener('lostpointercapture', _onCircle1PointerLeave.bind(this));

    function _onCircle1PointerLeave(event){
       // console.log(event.type)
       /// resetButton0();

        //console.log(document.elementFromPoint(event.clientX, event.clientY))
    }

    function resetButton0(){
        button0.style.left = '0px';
        button0.style.top = '0px';
    }
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;
