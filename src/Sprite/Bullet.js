/**********************
 *  Bullet.js
 *  子弹
 *
 *  For DemoOne
 *  Created by Dean on 15/11/18
 **********************/

var Bullet = cc.Node.extend({

    _type : null,

    ctor:function(type) 
    {
        this._super();

        this._type = type ? type : null;

        this._cList = [cc.color.YELLOW,cc.color.RED,cc.color.BLUE,cc.color.GREEN];
    },

    onEnter:function() 
    {
        this._super();

        var rdc = this.GetRandomNum(0,3);
        this._bullet = new cc.DrawNode();
        this._bullet.drawDot(cc.p(0,0), 50, this._cList[rdc]);
        this.addChild(this._bullet);

        this.startAction();
    },

    startAction:function() 
    {
        if (this._type == null) {
            var _x = this.getParent().x;
            var _dx = _x > cc.winSize.width * 0.5 ? -cc.winSize.width*0.5 : cc.winSize.width*0.5;

            var cp = [ cc.p(_dx, 200),
                        cc.p(_dx*1.5, 400),
                        cc.p(_dx*2, 200),
                        cc.p(_dx*2.5, 0)];
            var bzr = cc.bezierBy(0.5, cp);
            var cb = cc.callFunc(this.onRemoveThis, this);
            this.runAction(cc.sequence(bzr,cb));
        }
        else {
            this.setScale(0.3);
            var _x = this.getParent().x;
            var _dx = _x > cc.winSize.width * 0.5 ? -cc.winSize.width*0.5 : cc.winSize.width*0.5;

            var cp = [ cc.p(_dx, this.GetRandomNum(-200,200)),
                        cc.p(_dx*1.5, this.GetRandomNum(-400,400)),
                        cc.p(_dx*2, this.GetRandomNum(-200,200)),
                        cc.p(_dx*2.5, 0)];
            var bzr = cc.bezierBy(3, cp);
            var cb = cc.callFunc(this.onRemoveThis, this);
            this.runAction(cc.sequence(bzr,cb));
        }
    },

    GetRandomNum:function(Min,Max)
    {   
        var Range = Max - Min;   
        var Rand = Math.random();   
        return (Min + Math.round(Rand * Range));   
    },

    onRemoveThis:function() 
    {
        this.removeFromParent();
    },

    onExit:function()
    {
        this._super();

    }
});

