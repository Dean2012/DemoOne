/**********************
 *  DataLayer.js
 *  游戏主数据层
 *
 *  For DemoOne
 *  Created by Dean on 15/11/18
 **********************/

var DataLayer = cc.Layer.extend({

	_skillBg : null,

	_skillBtnList : [],

	_cur : 0,
    
    ctor:function() 
    {
        this._super();

    },

    onEnter:function() 
    {
        this._super();

        this._skillBg = new cc.Scale9Sprite("res/skill_bg.png");
        this.addChild(this._skillBg);
        this._skillBg.width = cc.winSize.width*0.8;
        this._skillBg.height = 200;
        this._skillBg.x = cc.winSize.width*0.5;
        this._skillBg.y = 50;

        this.schedule(this.addSBtn.bind(this), 5);
    },

    addSBtn:function(dt) 
    {
    	var skillBtn = new ccui.Button();
        skillBtn.loadTextures("res/skill_bg.png", "res/skill_bg.png", "");
        skillBtn.x = -this._skillBg.width * 0.5;
        skillBtn.y = this._skillBg.height * 0.5;
        skillBtn.anchorX = 0.5;
        skillBtn.anchorY = 0.5;
        skillBtn.setScale(0.5);
        skillBtn.addTouchEventListener(this.touchCB, this);
        this._skillBg.addChild(skillBtn, 999, this._skillBtnList.length);

        this._skillBtnList.push(skillBtn);

        var action = cc.moveTo(1, cc.p(this._skillBg.width-this._skillBtnList.length*110+50, this._skillBg.height*0.5));
        skillBtn.runAction(action);
    },

    touchCB:function(render, type) 
    {
        if (type == ccui.Widget.TOUCH_ENDED) {
        	// 释放技能
        	EventComponent.sendCustomEvent("castSkill");
        	this._cur = render.getTag();
        	this.skillCB();
        }
    },

    skillCB:function() 
    {
    	// 自己消失
    	var c = this._skillBtnList[this._cur];
    	if (c) {
    		c.removeFromParent();
    	    this._skillBtnList.splice(this._cur,1);
    	}

    	// 后面的所有按钮往前
    	this.updSkillBtnList();
    },

    updSkillBtnList:function() 
    {
    	for (var i = 0; i < this._skillBtnList.length; i++) {
    		var c = this._skillBtnList[i];
    		if (!c) 
    			return;

    		c.setTag(i);
    		var w = this._skillBg.width-(i+1)*110+50;
    		cc.log(i + " " + c.x + " " + w );
    		if (c.x != w) {
				var action = cc.moveTo(1, cc.p(this._skillBg.width-(i+1)*110+50, this._skillBg.height*0.5));
				c.runAction(action);
    		};
    	};
    }
});

