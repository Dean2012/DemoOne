/**********************
 *  GameLayer.js
 *  游戏主场景层
 *
 *  For DemoOne
 *  Created by Dean on 15/11/18
 **********************/

var GameLayer = cc.Layer.extend({

    _tagName : "soldier",

    _myPosList : [],
    _youPosList : [],

    _my : null,
    _myList : [],
    _myCD : 0,

    _you : null,
    _youList : [],
    _youTag : 100,
    _youCD : 0,

    _myTurn : 1,
    _youTurn : 2,
    _curTurn : 0,

    ctor:function() 
    {
        this._super();

    },

    onEnter:function() 
    {
        this._super();

        // cc.log(cc.winSize.width + " " + cc.winSize.height);

        this._myPosList = [
            {"x": cc.winSize.width * 0.1,"y": cc.winSize.height * 0.2},
            {"x": cc.winSize.width * 0.15,"y": cc.winSize.height * 0.3},
            {"x": cc.winSize.width * 0.1,"y": cc.winSize.height * 0.4},
            {"x": cc.winSize.width * 0.15,"y": cc.winSize.height * 0.5},
            {"x": cc.winSize.width * 0.1,"y": cc.winSize.height * 0.6},
            {"x": cc.winSize.width * 0.2,"y": cc.winSize.height * 0.3},
            {"x": cc.winSize.width * 0.25,"y": cc.winSize.height * 0.2},
            {"x": cc.winSize.width * 0.05,"y": cc.winSize.height * 0.6},
            {"x": cc.winSize.width * 0.05,"y": cc.winSize.height * 0.5},
            {"x": cc.winSize.width * 0.05,"y": cc.winSize.height * 0.3}            
        ];
        this._youPosList = [
            {"x": cc.winSize.width * 0.8,"y": cc.winSize.height * 0.2},
            {"x": cc.winSize.width * 0.75,"y": cc.winSize.height * 0.3},
            {"x": cc.winSize.width * 0.8,"y": cc.winSize.height * 0.4},
            {"x": cc.winSize.width * 0.75,"y": cc.winSize.height * 0.5},
            {"x": cc.winSize.width * 0.8,"y": cc.winSize.height * 0.6},
            {"x": cc.winSize.width * 0.9,"y": cc.winSize.height * 0.2},
            {"x": cc.winSize.width * 0.7,"y": cc.winSize.height * 0.3},
            {"x": cc.winSize.width * 0.9,"y": cc.winSize.height * 0.4},
            {"x": cc.winSize.width * 0.7,"y": cc.winSize.height * 0.5},
            {"x": cc.winSize.width * 0.9,"y": cc.winSize.height * 0.6}
        ];

        this.createMy();
        this.createYou();

        // 
        this.initListener();
    },

    initListener:function() 
    {
        EventComponent.registerCustomEvent("castSkill",this.castSkill.bind(this), this);
    },

    startLogic:function() 
    {
        this.schedule(this.updataLogic.bind(this), 0.1);
    },

    createMy:function() 
    {
        this._my = new Swordman();
        this._my.setCD(4);
        this._my.setSoldier(10);
        this.addChild(this._my, 10);
        this._my.x = -cc.winSize.width * 0.5;
        this._my.y = cc.winSize.height * 0.5;

        for (var i = 0; i < this._my.getSoldier(); i++) {
            var soldier = new Swordman();
            this.addChild(soldier, 0, i);
            soldier.x = -cc.winSize.width * 0.5;
            soldier.y = cc.winSize.height * 0.5;
            soldier.setScale(0.5);
            this._myList.push(soldier);
        };

        this.moveMy();
    },

    moveMy:function()
    {
        var mAction = cc.moveTo(2, cc.p(cc.winSize.width*0.3, cc.winSize.height*0.5));
        if (this._my)
            this._my.runAction(mAction);

        for (var i = 0; i < this._my.getSoldier(); i++) {
            var soldier = this.getChildByTag(i);

            if (!soldier)
                continue;

            var pos = this._myPosList[i];
            var mAction2 = cc.moveTo(2, cc.p(pos.x, pos.y));
            var cb = cc.callFunc(this.startLogic.bind(this),this);
            soldier.runAction(cc.sequence(mAction2,cb));
        };
    },

    createYou:function() 
    {
        this._you = new Swordman();
        this._you.setCD(4.6);
        this._you.setSoldier(10);
        this._you.setNPC();
        this.addChild(this._you);
        this._you.x = cc.winSize.width * 1.5;
        this._you.y = cc.winSize.height * 0.5;

        for (var i = 0; i < this._you.getSoldier(); i++) {
            var soldier = new Swordman();
            this.addChild(soldier, 0, this._youTag+i);
            soldier.x = cc.winSize.width * 1.5;
            soldier.y = cc.winSize.height * 0.5;
            soldier.setScale(0.5);
            this._youList.push(soldier);
        };

        this.moveYou();
    },

    moveYou:function()
    {
        var mAction = cc.moveTo(2, cc.p(cc.winSize.width*0.6, cc.winSize.height*0.5));
        if (this._you)
            this._you.runAction(mAction);

        for (var i = 0; i < this._you.getSoldier(); i++) {
            var soldier = this.getChildByTag(this._youTag+i);

            if (!soldier)
                continue;

            var pos = this._youPosList[i];
            var mAction2 = cc.moveTo(2, cc.p(pos.x, pos.y));
            soldier.runAction(mAction2);
        };
    },

    updataLogic:function(dt) 
    {
        if (!this._you || this._you._hp == 0 || !this._my || this._my._hp == 0) {
            // 游戏结束
            cc.log("gameover!");
            // this.unschedule(this.updataLogic.bind(this));
            this.unscheduleAllCallbacks();
            return ;
        };

        // 如果我不在攻击状态 记录cd轮转并判断是否进攻
        if (this._my && this._my._statue == rS.STANDBY) {
            this._myCD += dt;
            // cd 转完了
            if (this._myCD >= this._my._cd) {
                this._myCD = 0;
                this.attackMode(this._myTurn);
                return ;
            };
        };

        // 计算敌人的cd
        if (this._you && this._you._statue == rS.STANDBY) {
            this._youCD += dt;
            // cd 转完了
            if (this._youCD >= this._you._cd) {
                this._youCD = 0;
                this.attackMode(this._youTurn);
                return ;
            };
        };
    },

    attackMode:function(mode) 
    {
        this._curTurn = mode;
        if (this._curTurn == this._myTurn) {
            this.myAttack();
        }
        else if (this._curTurn == this._youTurn) {
            this.youAttack();
        }
        this.scheduleOnce(this.actionOver.bind(this), 2);
    },

    myAttack:function() 
    {
        this._my.setStatue(rS.ATTACK);
        var mc = this._myList[0];
        if (mc) {
            var bullet = new Bullet();
            mc.addChild(bullet);
        };

        this._you.setStatue(rS.HINT);
        var yc = this._youList[0];
        if (yc) {
            yc.godie();
            this._youList.shift();
        }
    },

    youAttack:function()
    {
        this._you.setStatue(rS.ATTACK);
        var yc = this._youList[0];
        if (yc) {
            var bullet = new Bullet();
            yc.addChild(bullet);
        };

        this._my.setStatue(rS.HINT);
        var mc = this._myList[0];
        if (mc) {
            mc.godie();
            this._myList.shift();
        }
    },

    mySkill:function() 
    {
        this._my.setStatue(rS.ATTACK);
    
        this._you.setStatue(rS.HINT);
        var yc = this._youList[0];
        if (yc) {
            yc.godie();
            this._youList.shift();
        }
    },

    skillOver:function()
    {
        if (this._my)
            this._my.setStatue(rS.STANDBY);
        if (this._you)
            this._you.setStatue(rS.STANDBY);

        this.startLogic();
    },

    actionOver:function() 
    {
        if (this._my)
            this._my.setStatue(rS.STANDBY);
        if (this._you)
            this._you.setStatue(rS.STANDBY);
    },

    castSkill:function(data) 
    {
        // 停止轮训
        this.unscheduleAllCallbacks();
        
        for (var i = 0; i < 10; i++) {
            var bullet = new Bullet(1);
            this._my.addChild(bullet);
        };

        this.mySkill();
        this.scheduleOnce(this.skillOver.bind(this), 1);
    }


});





