var app = {

    currentPlayer: null,

    init: function(){
        app.currentPlayer = new app.Player();
        app.currentPlayer.init();
    }
};
