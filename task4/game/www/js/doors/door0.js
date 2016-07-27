import DoorBase from './DoorBase';

// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
export default class Door0 extends DoorBase {

    constructor(number, onUnlock){
        super(number, onUnlock);

        var buttons = [
            this.popup.querySelector('.door-riddle__button_0'),
            this.popup.querySelector('.door-riddle__button_1'),
            this.popup.querySelector('.door-riddle__button_2')
        ];

        buttons.forEach(function(b) {
            b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
            b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
            b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
            b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
        }.bind(this));

        function _onButtonPointerDown(e) {
            e.target.classList.add('door-riddle__button_pressed');
            checkCondition.apply(this);
        }

        function _onButtonPointerUp(e) {
            e.target.classList.remove('door-riddle__button_pressed');
        }

        /**
         * Проверяем, можно ли теперь открыть дверь
         */
        function checkCondition() {
            var isOpened = true;
            buttons.forEach(function(b) {
                if (!b.classList.contains('door-riddle__button_pressed')) {
                    isOpened = false;
                }
            });

            // Если все три кнопки зажаты одновременно, то откроем эту дверь
            if (isOpened) {
                this.unlock();
            }
        }
    }


}



