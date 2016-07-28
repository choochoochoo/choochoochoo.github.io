import Door0 from './doors/Door0';
import Door1 from './doors/Door1';
import Door2 from './doors/Door2';
import Box from './doors/Box';

/**
 * @class App
 * @param {Element} el
 */
export default function App(el) {
    var doors = [
            new Door0(0, onUnlock),
            new Door1(1, onUnlock),
            new Door2(2, onUnlock),
            new Box(3, onUnlock)
        ];

    this.doors = doors;

    /**
     * Callback вызывается в коде двери
     * Тут даем возможность открыть следующие двери
     */
    function onUnlock() {
        var previousUnlocked;

        // Даем открыть следующую дверь
        for (var i = 0; i < doors.length; i++) {
            if (!doors[i].isLocked) {
                previousUnlocked = true;
            } else {
                if (previousUnlocked && doors[i].isLocked) {
                    doors[i].enable();
                    break;
                }
            }
        }
    }

    this.initialize = function() {
        this.bindEvents();
    };

    this.bindEvents = function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    };

    this.onDeviceReady = function() {
        this.receivedEvent('deviceready');
    };

    // Update DOM on a Received Event
    this.receivedEvent = function(id) {
        var parentElement = document.getElementById(id);
        var receivedElement = parentElement.querySelector('.received');
        receivedElement.setAttribute('style', 'display:block;');
    };


    window.onerror = function() {
        // здесь можно залогировать и выйти

        // Попробуем выйти
        if(navigator.app.exitApp){
            navigator.app.exitApp();
        }

    };

}
