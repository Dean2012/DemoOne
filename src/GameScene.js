/**********************
 *  GameScene.js
 *  游戏主场景
 *
 *  For DemoOne
 *  Created by Dean on 15/11/18
 **********************/

var GameScene = cc.Scene.extend({
    ctor:function() 
    {
        this._super();

    },

    onEnter:function() 
    {
        this._super();

        this._gameLayer = new GameLayer();
        this.addChild(this._gameLayer);

        this._dataLayer = new DataLayer();
        this.addChild(this._dataLayer);
    }
});

