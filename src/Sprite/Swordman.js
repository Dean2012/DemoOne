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

    setCD:function(cd) 
    {
    	this._cd = cd;
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

