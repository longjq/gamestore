function CMain(oData){

    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    
    var _oPreloader;
    var _oMenu;
    var _oGame;

    this.initContainer = function(oData){
        // init constants
        INIT_GRAVITY_NORMAL = oData.gravity;
        INIT_BALLMASS_NORMAL = oData.ballMass;
        FRICTION_NORMAL = oData.friction;
        EDGEFRICTION_NORMAL = oData.edgeFriction;
        ROTATIONSPEED_NORMAL = oData.rotationSpeed;
        HORIZ_KICKFORCE_NORMAL = oData.horizKickForce;
        VERT_KICKFORCE_NORMAL = oData.vertKickForce;
        RESTITUTION_KICKFORCE_NORMAL = oData.restitutionKickForce;

        INIT_GRAVITY_CHALLENGE = oData.chGravity;
        INIT_BALLMASS_CHALLENGE = oData.chBallMass;
        FRICTION_CHALLENGE = oData.chFriction;
        EDGEFRICTION_CHALLENGE = oData.chEdgeFriction;
        ROTATIONSPEED_CHALLENGE = oData.chRotationSpeed;
        HORIZ_KICKFORCE_CHALLENGE = oData.chHorizKickForce;
        VERT_KICKFORCE_CHALLENGE = oData.chVertKickForce;
        RESTITUTION_KICKFORCE_CHALLENGE = oData.chRestitutionKickForce;
        GRAVITY_INCREASE = oData.chGravityIncrease;      

        s_oStage = new createjs.Stage("canvas");       
        createjs.Touch.enable(s_oStage);
        
        s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
        
        s_iPrevTime = new Date().getTime();

        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", this._update);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
		
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();

        this._loadImages();
    };

    this.soundLoaded = function(){
         _iCurResource++;

         if(_iCurResource === RESOURCE_TO_LOAD){
             _oPreloader.unload();
            
            this.gotoMenu();
         }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
            createjs.Sound.alternateExtensions = ["mp3"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/reset_kickup.ogg", "reset_kickup");
            createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");
            createjs.Sound.registerSound("./sounds/tap.ogg", "tap");
        }else{
            createjs.Sound.alternateExtensions = ["ogg"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/reset_kickup.mp3", "reset_kickup");
            createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
            createjs.Sound.registerSound("./sounds/tap.mp3", "tap");
        }
        RESOURCE_TO_LOAD += 3;
        
    };
    
    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("ball_1","./sprites/ball_1.png");
        s_oSpriteLibrary.addSprite("ball_2","./sprites/ball_2.png");
        s_oSpriteLibrary.addSprite("ball_3","./sprites/ball_3.png");
        s_oSpriteLibrary.addSprite("ball_hit","./sprites/ball_hit.png");
        s_oSpriteLibrary.addSprite("shadow","./sprites/shadow.png");
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_help","./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("panel","./sprites/msg_box.png");

        for (var i = 1; i <= 7; i++) {
            s_oSpriteLibrary.addSprite("player_" + i, "./sprites/player_sprite_" + i + ".png");
        };
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();

        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;

        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            _oPreloader.unload();
            
            this.gotoMenu();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoGame = function(bChallengeMode){
        _oGame = new CGame(bChallengeMode);
			
        _iState = STATE_GAME;
        $(s_oMain).trigger("game_start");
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
    
    this._update = function(event){
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;

    this.initContainer(oData);
}

var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oSoundTrack = null;
var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oGameSettings;