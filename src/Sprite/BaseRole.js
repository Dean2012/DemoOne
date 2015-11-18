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

	_cd : 0.5,

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

		var sT = this._statue < this._statueList.length ? this._statueList[this._statue] : "待机";
		this._statueTTF = new cc.LabelTTF(sT, "Impact", 20);
		this._role.addChild(this._statueTTF);
		this._statueTTF.x = 50;
		this._statueTTF.y = 170;
		this._statueTTF.setColor(cc.color('#ff8686'));
    },

    setStatue:function(s)
    {
    	if (!this._statueTTF)
    		return ;

    	this._statue = s;
		var sT = this._statue < this._statueList.length ? this._statueList[this._statue] : "待机";
    	this._statueTTF.setString(sT);
    }
});

