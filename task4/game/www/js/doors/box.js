import DoorBase from './DoorBase';

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
export default class Box extends DoorBase{
    constructor(number, onUnlock) {
        super(number, onUnlock);

        this.showCongratulations = function () {
            //alert('Поздравляю! Игра пройдена!');
        };

        var balls = [
            this.popup.querySelector('.box-riddle__ball_0'),
            this.popup.querySelector('.box-riddle__ball_1'),
            this.popup.querySelector('.box-riddle__ball_2'),
            this.popup.querySelector('.box-riddle__ball_3')
        ];

        balls.forEach(function (ball) {
            ball.addEventListener('pointerdown', _onBallPointerDown.bind(this));
        }.bind(this));

        function _onBallPointerDown(event) {
            conditionDoubleTap.call(this, event);
            pressBall.call(this, event);
            setTimeout(unpressBall.bind(this, event), 300);
        }

        function conditionDoubleTap(event) {
            if (event.target.classList.contains('box-riddle__ball_pressed')) {
                killBall.call(this, event);
                conditionAllKilled.apply(this);
            }
        }

        function conditionAllKilled() {

            var allKilled = true;
            balls.forEach(function (ball) {
                if (!ball.classList.contains('box-riddle__ball_killed')) {
                    allKilled = false;
                }
            });

            if (allKilled) {
                this.unlock();
            }
        }

        function pressBall(event) {
            event.target.classList.add('box-riddle__ball_pressed');
        }

        function unpressBall(event) {
            event.target.classList.remove('box-riddle__ball_pressed');
        }

        function killBall(event) {
            event.target.classList.add('box-riddle__ball_killed');
        }
    }
}
