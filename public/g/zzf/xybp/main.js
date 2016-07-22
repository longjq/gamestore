/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var cocos2dApp = cc.Application.extend({
    
    config:document['ccConfig'],
    _screenCoveredWarning:false,
    
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    
    applicationDidFinishLaunching:function () {
        
        if(cc.RenderDoesnotSupport()){
            //show Information to user
            alert("Browser doesn't support Canvas or WebGL");
            return false;
        }
        
        // initialize director
        var director = cc.Director.getInstance();
        
        cc.EGLView.getInstance().setDesignResolutionSize(320, 480, cc.RESOLUTION_POLICY.SHOW_ALL);
        cc.EGLView.getInstance().resizeWithBrowserSize(true);
        
        window.addEventListener("resize", function() {
            
            myApp.setGameResolution();
            
        }, false);
        
        // Add callback for mobiles when they change its orientation
        window.addEventListener("orientationchange", function() {
            
            myApp.setGameResolution();
            
        }, false);
        
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        //load resources
        switch(WORLD)
        {
            case 0: { cc.LoaderScene.preload(g_ressources1, function(){ director.replaceScene(new this.startScene()); }, this); } break;
            case 1: { cc.LoaderScene.preload(g_ressources2, function(){ director.replaceScene(new this.startScene()); }, this); } break;
            case 2: { cc.LoaderScene.preload(g_ressources3, function(){ director.replaceScene(new this.startScene()); }, this); } break;
            case 3: { cc.LoaderScene.preload(g_ressources4, function(){ director.replaceScene(new this.startScene()); }, this); } break;
            case 4: { cc.LoaderScene.preload(g_ressources5, function(){ director.replaceScene(new this.startScene()); }, this); } break;
        }

        return true;
    },
    
    setGameResolution:function() {
        
        if (IS_HANDHELD)
        {
            //check for orientation
            if (window.innerHeight < window.innerWidth)
            {
                if (!this._screenCoveredWarning)
                {
                    cc.EGLView.getInstance().setDesignResolutionSize(480, 320, cc.RESOLUTION_POLICY.SHOW_ALL);
                    
                    var scene = cc.Scene.create();
                    var layer = cc.Layer.create();
                    scene.addChild(layer);

                    var bgSprite = cc.Sprite.create("res/switchlogo.png");
                    bgSprite.setPosition(cc.p(240, 160));
                    layer.addChild(bgSprite);

                    cc.Director.getInstance().pushScene(scene);

                    this._screenCoveredWarning = true;
                }
            }
            else
            {
                if (this._screenCoveredWarning)
                {
                    cc.EGLView.getInstance().setDesignResolutionSize(320, 480, cc.RESOLUTION_POLICY.SHOW_ALL);
                    
                    cc.Director.getInstance().popScene();

                    this._screenCoveredWarning = false;
                }
            }
        }
    }
});
var myApp = new cocos2dApp(MyGameScene);
