function Slider(el, door) {
    var containerSlider = el;
    var sliderButton = el.querySelector('.slider__button');
    var startPosition = 0;
    var currentPosition = 0;
    var isGestureStarted = false;
    var doorOwner = door;

    containerSlider.addEventListener('pointerdown', onPointerDown);
    containerSlider.addEventListener('pointermove', onPointerMove);

    containerSlider.addEventListener('pointerup', onPointerUp);
    containerSlider.addEventListener('pointercancel', onPointerUp);
    containerSlider.addEventListener('pointerleave', onPointerUp);

    function onPointerDown(event) {

        currentPosition = startPosition = event.pageX;
        isGestureStarted = true;
        
        //containerSlider.setPointerCapture(event.pointerId);

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

        console.log(event.type)

        currentPosition = event.pageX;


        //if(event.pointerId){
        //    sliderButton.releasePointerCapture(event.pointerId);
        //}

        enableTransition();

        if (currentPosition - startPosition > 100 && isGestureStarted) {
            doorOwner.unlock();

        } else {
            resetPosition();
        }

        isGestureStarted = false;
    }

    function updatePosition() {
        requestAnimationFrame(function () {
            var diff = currentPosition - startPosition;

            if (diff < 0) {
                diff = 0;
            }

            if (diff > 240) {
                diff = 240;
            }

            sliderButton.style.transform = 'translateX(' + diff + 'px)';
        });
    }

    function resetPosition() {
        requestAnimationFrame(function () {
            sliderButton.style.transform = '';
        });
    }

    function disableTransition() {
        sliderButton.style.transition = 'none';
    }

    function enableTransition() {
        sliderButton.style.transition = '';
    }

    this.show = function(){
        containerSlider.classList.remove('slider_invisible');
    };

    this.hide = function(){
        containerSlider.classList.add('slider_invisible');
    };
}
