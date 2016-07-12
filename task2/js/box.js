/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    //// ==== Напишите свой код для открытия сундука здесь ====
    //// Для примера сундук откроется просто по клику на него
    //this.popup.addEventListener('click', function() {
    //    this.unlock();
    //}.bind(this));
    //// ==== END Напишите свой код для открытия сундука здесь ====
    //
    //this.showCongratulations = function() {
    //    alert('Поздравляю! Игра пройдена!');
    //};

    var count = 0;

    var balls = [
        this.popup.querySelector('.box-riddle_ball_0'),
        this.popup.querySelector('.box-riddle_ball_1'),
        this.popup.querySelector('.box-riddle_ball_2'),
        this.popup.querySelector('.box-riddle_ball_3')
    ];

    var popupCounter = this.popup.querySelector('.popup__counter');

    balls.forEach(function (ball) {
        ball.addEventListener('pointerdown', _onBallPointerDown.bind(this));
    }.bind(this));

    function _onBallPointerDown(event) {

        conditionDoubleTap.call(this, event);

        event.target.classList.add('box-riddle_ball_pressed');

        setTimeout(doubleTap.bind(this, event), 300);
    }

    function doubleTap(event){
        console.log('unpress')
        event.target.classList.remove('box-riddle_ball_pressed');
    }

    function conditionDoubleTap(event){
        if(event.target.classList.contains('box-riddle_ball_pressed')){
            event.target.classList.add('box-riddle_ball_killed');
            conditionAllKilled();
        }
    }

    function conditionAllKilled(){

        var allKilled = true;
        balls.forEach(function(ball) {
            if (!ball.classList.contains('box-riddle_ball_killed')) {
                allKilled = false;
            }
        });

        if (allKilled) {
            alert('win')
        }
    }
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
