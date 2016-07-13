/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var slider = new Slider(this.popup.querySelector('.slider'));

   // var mouseOffset;


   // var appContainer = document.querySelector('.app.container');
   //
   //
   // var woodWrapper = this.popup.querySelector('.door-riddle__wood-buttons-wrap');
   // var wood = this.popup.querySelector('.door-riddle__wood');
   // var woodButton = this.popup.querySelector('.door-riddle__wood-button');
   //
   // woodButton.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
   // woodButton.addEventListener('pointerup', _onButtonPointerUp.bind(this));
   // //woodButton.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
   //// woodButton.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
   // woodButton.addEventListener('pointermove', _onButtonPointerMove.bind(this));
   //
   //
   // function _onButtonPointerDown(event) {
   //     console.log('pointerdown')
   //     event.target.classList.add('door-riddle__wood-button_captured');
   //
   //  //   mouseOffset = App.Helper.getMouseOffset(event.target, event);
   // }
   //
   // function _onButtonPointerUp(event) {
   //     event.target.classList.remove('door-riddle__wood-button_captured');
   //     console.log('pointerup')
   //
   //     conditionTarget.call(this, event);
   // }
   //
   // function _onButtonPointerMove(event) {
   //     if (event.target.classList.contains('door-riddle__wood-button_captured')) {
   //     //    var positionWood = App.Helper.getPosition(wood);
   //      //   woodButton.style.left = event.x - positionWood.x - mouseOffset.x + 'px';
   //     }
   //
   //     console.log('move')
   // }
   //
   //
   // function conditionTarget(event) {
   //
   //     if (event.relatedTarget && event.relatedTarget.classList.contains('door-riddle__wood-button-target')) {
   //         //this.unlock();
   //
   //         woodButton.classList.add('door-riddle__wood-button_right');
   //
   //         alert('win')
   //
   //         return;
   //     }
   //
   //    // woodButton.style.left = '0px';
   // }
   //
   //
   //
   //
   //
   //
   // var alarm = this.popup.querySelector('.door-riddle__alarm');
   //
   //  var buttons = [
   //     this.popup.querySelector('.door-riddle__button_0'),
   //     this.popup.querySelector('.door-riddle__button_1')
   // ];
   //
   //
   // buttons.forEach(function (b) {
   //     b.addEventListener('pointerdown', _onButtonPointerDownButton.bind(this));
   //     b.addEventListener('pointerup', _onButtonPointerUpButton.bind(this));
   //     b.addEventListener('pointercancel', _onButtonPointerUpButton.bind(this));
   //     b.addEventListener('pointerleave', _onButtonPointerUpButton.bind(this));
   // }.bind(this));
   //
   // function _onButtonPointerDownButton(e) {
   //     e.target.classList.add('door-riddle__button_pressed');
   //     checkConditionButton.apply(this);
   // }
   //
   // function _onButtonPointerUpButton(e) {
   //     e.target.classList.remove('door-riddle__button_pressed');
   //     alarm.classList.remove('door-riddle__alarm_pressed');
   //   //  woodWrapper.classList.remove('door-riddle__wood-buttons-wrap_visible');
   // }
   //
   // function checkConditionButton() {
   //     var isOpened = true;
   //     buttons.forEach(function (b) {
   //         if (!b.classList.contains('door-riddle__button_pressed')) {
   //             isOpened = false;
   //         }
   //     });
   //
   //     if (isOpened) {
   //         alarm.classList.add('door-riddle__alarm_pressed');
   //         woodWrapper.classList.add('door-riddle__wood-buttons-wrap_visible');
   //     }
   // }

}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;
