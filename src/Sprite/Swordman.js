/**********************
 *  Swordman.js
 *  剑士
 *
 *  For DemoOne
 *  Created by Dean on 15/11/18
 **********************/

var Swordman = BaseRole.extend({

    ctor:function() 
    {
        this._super();

        this._name = "剑士"
    },

    setNPC:function() 
    {
        this._isNPC = true;
    },

    setCD:function(cd) 
    {
    	this._cd = cd;
    },

    setSoldier:function(_hp) 
    {
        this._hp = _hp ? _hp : 5;
    },

    getSoldier:function()
    {
    	return this._hp;
    },

    onEnter:function() 
    {
        this._super();

    }
});

