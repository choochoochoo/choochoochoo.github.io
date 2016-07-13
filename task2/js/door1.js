/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var slider = new Slider(this.popup.querySelector('.slider'), this);

    var alarm = this.popup.querySelector('.door1-riddle__alarm');

    var buttons = [
        this.popup.querySelector('.door1-riddle__button_0'),
        this.popup.querySelector('.door1-riddle__button_1')
    ];

    buttons.forEach(function (b) {
        b.addEventListener('pointerdown', _onButtonPointerDownButton.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUpButton.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUpButton.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUpButton.bind(this));
    }.bind(this));

    function _onButtonPointerDownButton(event) {
        pressButton.call(this, event);
        checkConditionButton.apply(this);
    }

    function _onButtonPointerUpButton(event) {
        unpressButton.call(this, event);
        switchOffAlarm();
       // slider.hide();
    }

    function checkConditionButton() {
        var isOpened = true;
        buttons.forEach(function (button) {
            if (!button.classList.contains('door1-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        if (isOpened) {
            switchOnAlarm();
           // slider.show();
        }
    }

    function pressButton(event){
        event.target.classList.add('door1-riddle__button_pressed');
    }

    function unpressButton(event){
        event.target.classList.remove('door1-riddle__button_pressed');
    }

    function switchOnAlarm(){
        alarm.classList.add('door1-riddle__alarm_active');
    }

    function switchOffAlarm(){
        alarm.classList.remove('door1-riddle__alarm_active');
    }
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;
