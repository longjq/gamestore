function keygamesAPI_to_game_sound(onoff) {
    if (onoff == 'on') {
        GameSound.setIdle(false);
    }
    else {
        GameSound.setIdle(true);
    }
}

function keygamesAPI_to_game_pause(onoff) {
    gamePlay.pauseGame();
}

function keygamesAPI_to_game_restart() {
    return false;
}

function keygamesAPI_to_game_resize(width, height) {
    console.log("keyGamesAPI.resize [" + width.toString() + "," + height.toString() + "]");
    GameLib.scaleGame(null, width, height);
}
var ThirdParty = {
    config: {
        centerHorizontally: true,
        centerVertically: true,
        showRotateHint: false,
        enableFullscreenToggle: true,
        showGoogleAds: false,
        splashScreen: 'img/keygames.png'
    },
    moreGames: function (lang) {
        try{parent.moregame();}catch(e){}
    },
    loadingComplete: function () {
        
    },
    mainMenu: function () {},
    gameHelp: function () {},
    gameStart: function () {},
    levelComplete: function (level) {
        
    },
    gameOver: function () {
       
    },
    restartGame: function () {},
    gameComplete: function () {},
    showLeaderboard: function () {},
    submitScore: function (score, level) {
       
    }
};