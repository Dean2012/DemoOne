/**********************
 *  BaseRole.js
 *  基本人物类型
 *
 *  For DemoOne
 *  Created by Dean on 15/11/18
 **********************/

var rS = rS || {};
rS.STANDBY = 0;
rS.ATTACK = 1;
rS.HINT = 2;

var BaseRole = cc.Node.extend({

	_name : null,
	_attack : 1,
	_hp : 5,

	_statue : 0,
	_statueList : ["待机","攻击","被攻击"],
	_statueTTF : null,

	_cd : 0,

    _isNPC : false,

    ctor:function() 
    {
        this._super();

    },

    onEnter:function() 
    {
        this._super();

        this.initRole();
    },

    initRole:function() 
    {
		this._role = new cc.DrawNode();
		var rectangle = [cc.p(0, 0),cc.p(100, 0),
		                 cc.p(100, 150),
		                 cc.p(0, 150)];
		var white = cc.color(255, 255, 255, 255);
		var nothing = cc.color(255, 255, 255, 0);
		this._role.drawPoly(rectangle, white, 1, white);
		this.addChild(this._role);

		var name = new cc.LabelTTF(this._name, "Impact", 24);
		this._role.addChild(name, 10);
		name.x = 50;
		name.y = 75;
		name.setColor(cc.color('#ff8686'));

        if (this._cd == 0)
            return ;

		var sT = this._statue < this._statueList.length ? this._statueList[this._statue] : "待机";
		this._statueTTF = new cc.LabelTTF(sT, "Impact", 20);
		this._role.addChild(this._statueTTF);
		this._statueTTF.x = 50;
		this._statueTTF.y = 170;
		this._statueTTF.setColor(cc.color.GREEN);
    },

    setStatue:function(s)
    {
    	if (!this._statueTTF)
    		return ;

    	this._statue = s;
		var sT = this._statue < this._statueList.length ? this._statueList[this._statue] : "待机";
    	this._statueTTF.setString(sT);

    	switch(this._statue) {
	    	case rS.ATTACK:
                this.aAction();
                this._statueTTF.setColor(cc.color.RED);
    			break;

    		case rS.HINT:
                this._hp--;
                if (this._hp == 0) 
                    this.godie();
                else
                    this.bAction();
                this._statueTTF.setColor(cc.color.RED);
    			break;

    		case rS.STANDBY:
                this._statueTTF.setColor(cc.color.GREEN);
    			break;

    		default:
    			break;
    	};
    },

    //攻击动作
    aAction:function()
    {
        var _dx = this._isNPC ? -20 : 20;
        var _r = this._isNPC ? -40 : 40;

        var cp1 = [ cc.p(_dx*1, 40),
                    cc.p(_dx*2, 40*2),
                    cc.p(_dx*3, 0)];
    	var action = cc.spawn(cc.bezierBy(0.5, cp1), cc.rotateBy(0.5, _r));

        // back 
        var cp2 = [ cc.p(-_dx*1, 40),
                    cc.p(-_dx*2, 40*2),
                    cc.p(-_dx*3, 0)];
        var action2 = cc.spawn(cc.bezierBy(0.5, cp2), cc.rotateBy(0.5, -_r));

        this.runAction(cc.sequence(action,action2));
    },

    //被击动作
    bAction:function()
    {
        var move1 = cc.moveBy(0.1, cc.p(20, 0));
        var move2 = cc.moveBy(0.1, cc.p(-20,0));
        var action11 = cc.sequence(
            move1,move2,move1.clone(),move2.clone(),
            move1.clone(),move2.clone(),move1.clone(),move2.clone(),
            move1.clone(),move2.clone());
        this.runAction(action11);
    },

    //死亡动作
    godie:function() 
    {
    	var action = cc.fadeOut(1);
    	var move1 = cc.moveBy(0.1, cc.p(20, 0));
    	var move2 = cc.moveBy(0.1, cc.p(-20,0));
    	var action11 = cc.spawn(cc.sequence(
    		move1,move2,move1.clone(),move2.clone(),
    		move1.clone(),move2.clone(),move1.clone(),move2.clone(),
    		move1.clone(),move2.clone()),
    	action);
    	var cb = cc.callFunc(this.removeThis.bind(this), this);
    	this.runAction(cc.sequence(action11, cb));
    },

    removeThis:function() 
    {
    	this.removeFromParent();
    }
});

