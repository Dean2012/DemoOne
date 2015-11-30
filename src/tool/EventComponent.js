/**********************
 *  EventComponent.js
 *  事件管理器
 *
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var EventComponent = EventComponent || {};

EventComponent.list = [];

EventComponent.registerCustomEvent = function(name, cb, p) 
{
	var _name = name;
	if (!_name) {
		// D_log.tip("自定义事件 未命名！");
		return ;
	}

	// cc.log(_name + " " +  EventComponent.list.indexOf(_name) );
	// if (-1 != EventComponent.list.indexOf(_name))
	// 	return null;
	// EventComponent.list.push(name);

	var _cb = cb;
	if (!_cb) {
		// D_log.tip("自定义事件 回调未设置！");
		return ;
	}

	var _listener = cc.EventListener.create({
        event: cc.EventListener.CUSTOM,
        eventName: _name,
        callback: _cb
    })
	cc.eventManager.addListener(_listener, p);
    // return _listener;
};

EventComponent.sendCustomEvent = function(cbName, cbData) 
{
	if (!cbName) {
		D_log.tip("发送自定义事件失败 未定义事件名！");
		return ;
	};

    var event = new cc.EventCustom(cbName);

    if (cbData)
        event.setUserData(cbData);

    cc.eventManager.dispatchEvent(event);
};
