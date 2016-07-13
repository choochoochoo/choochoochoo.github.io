function Slider(el){
    var container = el;
    var slider = el.querySelector('.slider');
    var sliderButton = el.querySelector('.slider__button');
    var startPosition = 0;
    var currentPosition = 0;
    var isGestureStarted = false;

    sliderButton.addEventListener('pointerdown', onPointerDown);
    sliderButton.addEventListener('pointermove', onPointerMove);

    sliderButton.addEventListener('pointerup', onPointerUp);
    sliderButton.addEventListener('pointercancel', onPointerUp);
    sliderButton.addEventListener('pointerleave', onPointerUp);

    function onPointerDown(event) {

        console.log(event.type);

        currentPosition = startPosition = event.pageX;
        isGestureStarted = true;

        sliderButton.setPointerCapture(event.pointerId);

        disableTransition();
    }

    function onPointerMove(event) {
        if (!isGestureStarted) {
            return;
        }

        currentPosition = event.pageX;
        updatePosition();
    }

    function onPointerUp(event) {

        console.log(event.type);

        currentPosition = event.pageX;
        isGestureStarted = false;

        //if(event.pointerId){
        //    sliderButton.releasePointerCapture(event.pointerId);
        //}

        enableTransition();
        resetPosition();
        //
        //if (currentPosition - startPosition < -50) {
        //    hide();
        //} else {
        //    show();
        //}
    }

    function updatePosition() {

        console.log(startPosition)
        console.log(currentPosition)

        requestAnimationFrame(function() {
           // var diff = Math.max(startPosition, currentPosition - startPosition);
            var diff = currentPosition - startPosition;

          //  console.log(diff)

            sliderButton.style.transform = 'translateX(' + diff + 'px)';
        });
    }

    function resetPosition() {
        requestAnimationFrame(function() {
            sliderButton.style.transform = '';
        });
    }

    function disableTransition() {
        sliderButton.style.transition = 'none';
    }

    function enableTransition() {
        sliderButton.style.transition = '';
    }
}
