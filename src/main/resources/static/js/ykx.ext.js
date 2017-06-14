function isWeixinEnv(){var e="micromessenger/";var c=navigator.userAgent.toLowerCase();var b=c.indexOf(e);if(b<0){return false;}var d=b+e.length;var a=c.substring(d,d+3);
a=parseFloat(a);return a>=5;}function TimePicker(){var b=function(){};this.onShow=b;this.onHide=b;this.onPicked=b;this._triggerShow=function(){this.onShow(this);
};this._triggerHide=function(){this.onHide(this);};this._triggerPicked=function(){this.onPicked(this);};var d=null;var c=null;var a="选择时点";this.setPlaceholder=function(e){a=e;
};this.init=function(f,i,e){var j=null;if(d==null){d=document.createElement("div");d=document.body.appendChild(d);j=$(d);j.addClass("timePicker");j.empty();
var h=String.builder();h.append('<table class="thin-grid-line">');h.append('<tr><td class="timeHeader">上午</td>');h.append('<td colspan="4" style="color:red;" name="full-day-occupied-hint">&nbsp;</td>');
h.append('<td class="normal-time" data-timeStr="10:00">10 点</td><td class="normal-time" data-timeStr="11:00">11 点</td><td class="normal-time" data-timeStr="12:00">12 点</td></tr>');
h.append('<tr><td class="timeHeader">下午</td>');h.append('<td class="normal-time" data-timeStr="13:00"> 1 点</td><td class="normal-time" data-timeStr="14:00"> 2 点</td><td class="normal-time" data-timeStr="15:00"> 3 点</td>');
h.append('<td class="normal-time" data-timeStr="16:00"> 4 点</td><td class="normal-time" data-timeStr="17:00"> 5 点</td><td class="normal-time" data-timeStr="18:00"> 6 点</td>');
h.append('<td class="normal-time" data-timeStr="19:00"> 7 点</td></tr>');h.append("</table>");$(h.value).appendTo(j);}else{j=$(d);}j.addClass("boxShadow");
if(isString(f)&&!f.startsWith("#")){f="#"+f;}if(isString(i)&&!i.startsWith("#")){i="#"+i;}$(f).prop("readonly",true);$(f).css("cursor","default");c=PopupProxy.newOne().bind(d,f,i,e);
var g=this;c.onPopupShow=function(l){var m=l.getTarget();var k=m.val();if(isNullOrBlank(k)){m.get(0).placeHolder=m.prop("placeholder")||a;}g.selectTime(k);
g._triggerShow();};j.on("click","td[data-timeStr]",function(m){var l=j.find("td[data-timeStr].selected-time");l.removeClass("selected-time");var k=m.target;
$(k).addClass("selected-time");c.getTarget().val($(k).attr("data-timeStr"));c.getPopup().hide();c.triggerPopupHide();g._triggerPicked();});return this;
};this.show=function(){c.getTarget().get(0).focus();c.getTarget().trigger("mousedown");return this;};this.hide=function(){c.getPopup().hide();c.triggerPopupHide();
return this;};this.getTimeList=function(){var g=$(d);var e=g.find("td[data-timeStr]");var f=[];e.each(function(j,h){f[j]=$(h).attr("data-timeStr");});return f;
};this.getSelectedTime=function(){var f=$(d);var e=f.find("td[data-timeStr].selected-time");if(e.size()==1){return e.attr("data-timeStr");}else{return null;
}};this.selectTime=function(g){var h=g||"";if(isNum(h)){h=h.toString();}h=h.trim();if(h!=""&&h.indexOf(":")==-1){h+=":00";}var i=$(d);var f=i.find('td[data-timeStr="'+h+'"]');
if(f.is(":disabled")){f.removeClass("selected-time");}else{var e=i.find("td[data-timeStr].selected-time");e.removeClass("selected-time");f.addClass("selected-time");
}return this;};this.resetTime=function(){var f=this.getSelectedTime();var g=$(d);var e=g.find("td[data-timeStr]");e.prop("disabled",false);e.removeClass("selected-time disabled-time");
e.attr("title","");this.selectTime(f);return this;};this.disableTime=function(f,h){var g=f;if(isNum(g)){g=g.toString();}if(g.indexOf(":")==-1){g+=":00";
}var i=$(d);var e=i.find('td[data-timeStr="'+g+'"]');if(e.size()>0){c.getTarget().val("");e.prop("disabled",true);e.removeClass("selected-time");e.addClass("disabled-time");
if(h!=null){e.attr("title",h);}}return this;};this.setTimeTitle=function(f,h){var g=f;if(isNum(g)){g=g.toString();}if(g.indexOf(":")==-1){g+=":00";}var i=$(d);
var e=i.find('td[data-timeStr="'+g+'"]');if(e.size()>0){e.attr("title",h);}return this;};this.markAllOccupied=function(e,g){var h=$(d);var f=h.find('td[name="full-day-occupied-hint"]');
if(e){f.text(g);}else{f.text("");}return this;};this.markLeftCount=function(g){var f=$(d);var e=f.find('td[name="full-day-occupied-hint"]');e.text(g);return this;
};this.disableAllTime=function(){var f=$(d);var e=f.find("td[data-timeStr]");e.prop("disabled",true);e.removeClass("selected-time");e.addClass("disabled-time");
return this;};return this;}function SimpleDateTimePicker(){var e=this;var f=null;var d=null;var c=false;var b=1;var a=null;this.setDateOccupiedHoursProvider=function(g){a=g;
return this;};this.getAvailableDateRange=function(){return f.getDateRange();};this.setDateRange=function(g,h){f.setDateRange(g,h);return this;};this.disableDay=function(g,h){f.disableDay(g,h);
return this;};this.markLeftCount=function(g,h){if(h==0){d.markAllOccupied(true,"全天预订 已满");f.disableDay(g,"全天预订 已满");d.disableAllTime();}else{if(h==-1){h=d.getTimeList().length;
}d.markLeftCount("当日剩余:  "+h);}return this;};this.toMarkDateTimePickers=function(w,g,l){w=w||[];g=g||(b>1?"预定已满":"已被预订");l=l||"全天预订 已满";d.resetTime();var v=d.getTimeList();
v=v.map(function(i){return i.substring(0,2);});var x=v.length;var o=0;var s=f.getSelectedDay()||"";var r=d.getSelectedTime()||"";var t=r.length>=2?r.substring(0,2):r;
for(var q=0,n=w.length;q<n;q++){var u=w[q];if(u.dateStr!=s){continue;}var m=u.timeStr.substring(0,2);if(!v.contains(m)){continue;}if(u.dateTimeCount>=b){if(new Date(s)>new Date()){d.disableTime(m,g);
o++;if(t==m){t="";}}}else{d.setTimeTitle(m,"可定数量："+(b-u.dateTimeCount));}}if(o>=x){d.markAllOccupied(true,l);f.disableDay(s,l);}else{d.selectTime(t);d.markAllOccupied(false);
}var k=new Date();var p=(k.getHours()>=17)||(k.getHours()>=16&&k.getMinutes()>=30);var h=(new Date(s).getTime()-k.getTime()<=86400000);if(p&&h){d.disableTime("10:00","");
d.disableTime("11:00","");d.disableTime("12:00","");d.disableTime("13:00","");}return this;};this.init=function(h){h=h||{};var m=h.datePickerId||"datePicker";
var o=h.timePickerId||"timePicker";var k=h.alignTo;c=h.controlHours||false;b=h.limitPerHour||1;a=h.dateOccupiedHoursProvider;var n=h.hrCenter||h.hrAlign;
f=new DatePicker().init(m,k,n);d=new TimePicker().init(o,k,n);var i=h.dateOffsetStart;var p=h.dateOffsetEnd;if(isNum(i)&&isNum(p)){var l=new Date();var g=l.addDays(i);
var j=l.addDays(p);f.setDateRange(g,j);}else{var g=h.startDate;var j=h.endDate;if(g&&j){f.setDateRange(g,j);}}f.onPicked=function(q){if(typeof a=="function"){if(c){a(e);
}}if(isNullOrBlank(f.getSelectedDay())){f.show();}else{d.show();}};d.onShow=function(q){if(isNullOrBlank(f.getSelectedDay())){d.hide();f.show();}};d.onPicked=h.onTimePicked||null;
return this;};this.getSelectedDay=function(){return f.getSelectedDay();};this.getSelectedTime=function(){return d.getSelectedTime();};return this;}function SmsCodeManager(d,a,f,b){var d=d;
var a=a;var f=f;var b=b||"normal";var h=null;var e=this;var g=$id(a);var c=g.css("background-color");this.isVoiceSms=false;this.init=function(){g.text("短信验证码");
g.css("width","9em");g.unbind("click");g.bind("click",this.sendCode);return this;};this.pause=function(){g.prop("disabled",true);g.css("color","#666");
g.css("background-color","#999");};this.resume=function(){g.prop("disabled",false);g.css("color","#000");g.css("background-color",c);if(this.isVoiceSms){g.text("语音验证码");
}else{g.text("短信验证码");}};this.sendCode=function(){if(!repeatClickChecker.isValidFor("sendSmsCode")){return false;}if(g.prop("disabled")){return false;}var i=$id(d).val();
if(!isMobile(i)){Toast.show("请输入正确的手机号码",null,"warn");}else{e.pause();var l={phoneNumber:i,isVoice:e.isVoiceSms};var j="/newaccount/sendCode/"+b;var k=Ajax.post(j);
k.data(l);k.done(function(m,n){if(m!=null&&m.type!="info"){g.time=2;h=setInterval(function(){if(g.time>1){g.time--;}else{clearInterval(h);e.resume();}},1000);
Toast.show(m.message,null,"warn");}else{g.time=30;h=setInterval(function(){if(g.time>1){g.time--;g.text("("+g.time+")");}else{clearInterval(h);e.resume();
}},1000);}});k.fail(function(m,n){g.time=2;h=setInterval(function(){if(g.time>1){g.time--;}else{clearInterval(h);e.resume();}},1000);Toast.show(m.message,null,"warn");
});k.go();e.isVoiceSms=!e.isVoiceSms;}return false;};this.checkCode=function(){var m=$id(f).val();if(m==""){return false;}var i=$id(d).val();var l=false;
var j="/newaccount/checkCode/"+i+"/"+m;var k=Ajax.get(j).sync();k.done(function(n,o){if(n!=null&&n.type!="info"){Toast.show(n.message,null,"warn");}else{l=true;
}}).go();return l;};return this;}function CarTypeSelector(){var m=genUniqueStr();var c="";var h=null;var a=null;var f=null,y=null,o=null;var r=null;var s=null;
var w=null;var q=null,k=null,x=null;var n=null,l=null,g=null;function p(){a=null;q&&q.find(">li.listItem").removeClass("sglSelected");k&&q.find(">li.listItem").removeClass("sglSelected");
x&&q.find(">li.listItem").removeClass("sglSelected");}function b(A){if(A==1){n.show();var z=n.data("lastScrollTop");if(isNum(z)){n.scrollTop(z);}l.hide();
g.hide();}else{if(A==2){n.hide();l.show();var z=l.data("lastScrollTop");if(isNum(z)){l.scrollTop(z);}g.hide();}else{if(A==3){n.hide();l.hide();g.show();
var z=g.data("lastScrollTop");if(isNum(z)){g.scrollTop(z);}}}}}function t(A,F,B){$(A).empty();var E=F.length;for(var D=0;D<E;D++){var z=F[D];var C=document.createElement("li");
C=A.appendChild(C);C.className="listItem";if(D==0){C.className+=" listItem1st";}$(C).data("item",z);if(z.imgUrl!=null){$(C).append("<img style='max-height: 30px; max-width: 30px; margin-right: 5px; vertical-align: middle;' src='/resources/images/brands/small/"+z.imgUrl+"' />");
}$(C).append(z.name);$(C).on("click",function(){if(B!=null){B($(this).data("item"),this);}});}}function e(z){t(q.get(0),z,function(A,C){x.empty();k.empty();
q.find(">li.listItem").removeClass("sglSelected");$(C).addClass("sglSelected");n.data("lastScrollTop",n.scrollTop());w.setValue("serials");f=A.name;var B=A.id;
i(B);});}function d(){$.ajax({type:"GET",contentType:"application/json",url:c+("/setting/brands"),data:{},success:e,statusCode:{500:function(B){var z=JSON.decode(B.responseText)||{};
var A=z.message||"请求资源处理失败";Toast.show(A,null,"warn");}},dataType:"json"});}function j(z){t(k.get(0),z,function(A,C){x.empty();k.find(">li.listItem").removeClass("sglSelected");
$(C).addClass("sglSelected");l.data("lastScrollTop",l.scrollTop());w.setValue("models");y=A.name;var B=A.id;u(B);});}function i(z){$.ajax({type:"GET",contentType:"application/json",url:c+("/setting/type/"+z),data:{},success:j,statusCode:{500:function(C){var A=JSON.decode(C.responseText)||{};
var B=A.message||"请求资源处理失败";Toast.show(B,null,"warn");}},dataType:"json"});}function v(z){t(x.get(0),z,function(A,C){x.find(">li.listItem").removeClass("sglSelected");
$(C).addClass("sglSelected");g.data("lastScrollTop",g.scrollTop());o=A.name;var B=A.id;a={};a.modelId=B;a.brandName=f;a.serialName=y;a.modelName=o;s.getPopup().hide();
s.triggerPopupHide();if(h!=null){h(a);}});}function u(z){$.ajax({type:"GET",contentType:"application/json",url:c+("/setting/type/"+z),data:{},success:v,statusCode:{500:function(C){var A=JSON.decode(C.responseText)||{};
var B=A.message||"请求资源处理失败";Toast.show(B,null,"warn");}},dataType:"json"});}this._renderCtrls=function(){var B='<div style="padding:1em;">没有找到爱车？请拨打 <a style="color:#307EBC" href="tel:4000865191">400-086-5191</a></div>';
var D=String.builder();D.append('<div class="carTypeSelector">');D.append('<div id="typeHeader-',m,'"></div>');D.append('<div id="typeBody-brands-',m,'">');
D.append('<ul id="list-brands-',m,'"></ul>');D.append(B);D.append("</div>");D.append('<div id="typeBody-serials-',m,'">');D.append('<ul id="list-serials-',m,'"></ul>');
D.append(B);D.append("</div>");D.append('<div id="typeBody-models-',m,'">');D.append('<ul id="list-models-',m,'"></ul>');D.append(B);D.append("</div>");
D.append('<table class="fixed" id="typeFooter-',m,'"><tr><td><button class="normalBtn default cancel" style="width:50%;">取消</button></td></tr></table>');
D.append("</div>");r=$(D.value).appendTo(document.body);var C=$id("typeFooter-"+m).find("button");C.bind("click",function(){s.getPopup().hide();s.triggerPopupHide();
});w=new RadioGroup().init({containerId:"typeHeader-"+m,width:"100%",height:32,useRadius:false,items:[{text:"品牌",value:"brands",bgClass:"bg",bgClassChecked:"bgChecked"},{text:"系列",value:"serials",bgClass:"bg",bgClassChecked:"bgChecked"},{text:"型号",value:"models",bgClass:"bg",bgClassChecked:"bgChecked"}]});
w.onChange=function(E){var F=1;if(E=="models"){F=3;}else{if(E=="serials"){F=2;}else{F=1;}}b(F);};var A=$id("typeHeader-"+m);var z=$id("typeFooter-"+m);
A.addClass("typeHeader");z.addClass("typeFooter");q=$id("list-brands-"+m);k=$id("list-serials-"+m);x=$id("list-models-"+m);n=$id("typeBody-brands-"+m);
l=$id("typeBody-serials-"+m);g=$id("typeBody-models-"+m);n.addClass("typeBody");l.addClass("typeBody");g.addClass("typeBody");if(isTouchAvailable()){touch.on(n.get(0),"swipeleft",function(F){try{w.setValue("serials");
}catch(E){}});touch.on(l.get(0),"swipeleft swiperight",function(G){try{var F=G.type;if(F=="swiperight"){w.setValue("brands");}else{if(F=="swipeleft"){w.setValue("models");
}}}catch(E){}});touch.on(g.get(0),"swiperight",function(F){try{w.setValue("serials");}catch(E){}});}};this.init=function(C,A,B,z,D){this._renderCtrls();
c=C;r.css("display","none");r.addClass("boxShadow");if(isString(A)&&!A.startsWith("#")){A="#"+A;}if(isString(B)&&!B.startsWith("#")){B="#"+B;}D=D!==false;
s=PopupProxy.newOne().bind(r,A,B,z);s.onPopupShow=function(E){w.setValue("brands");var F=E.getTarget();if(D){var F=E.getTarget();F.removeClass("arrowDown");
F.addClass("arrowUp");}};s.onPopupHide=function(E){var F=E.getTarget();if(D){var F=E.getTarget();F.removeClass("arrowUp");F.addClass("arrowDown");}};s.triggerPopupHide();
d();return this;};this.setModelSelectedHandler=function(z){h=z;return this;};this.getSelectedModel=function(){return a;};this.clearSelection=function(){p();
return this;};return this;}function GeoLocator(){var f=navigator.geolocation;var i="json";var e="kGI00WkfKFkAIiwwTjFRwh1H";var c="wgs84ll";var d=1;var a=null;
var b="geo_callback_"+genUniqueStr();window[b]=function(o){var m=o.result||{};var n=m.formatted_address;var p=m.pois||[];if(p.length>0){n=p[0].addr+p[0].name;
}a({type:"info",message:"定位完成",data:n});};var h=null;this.setLocationUrl=function(m){h=m;return this;};function l(n){var m="http://api.map.baidu.com/geocoder/v2/";
var o={};o.output=i;o.ak=e;o.coordtype=c;o.pois=d;o.callback=b;o.location=n.lat+","+n.lng;return makeUrl(m,o);}function g(n){var m=l(n);$.getScript(m);
}function j(m){var n="位置获取失败";switch(m.code){case m.TIMEOUT:n="定位超时";break;case m.POSITION_UNAVAILABLE:n="无法获取您的位置";break;case m.PERMISSION_DENIED:n="您禁止了访问您的地理位置";
break;case m.UNKNOWN_ERROR:n="未知错误";break;}a({type:"error",message:n});}function k(m){var n=m.coords;n.lat=n.latitude;n.lng=n.longitude;g(n);}this.fetchAddress=function(n){a=n;
if(h!=null){var m=Ajax.get(h);m.done(function(o){if(o.type=="info"){g(o.data);}else{a({type:"warn",message:"未能获取您的坐标信息"});}});m.fail(function(o){a({type:"warn",message:"未能获取您的坐标信息"});
});m.go();}else{if(f){f.getCurrentPosition(k,j,{enableHighAcuracy:true,timeout:5000,maximumAge:3000});}else{a({type:"warn",message:"您的浏览器不支持定位功能"});}}return this;
};this.fetchAddressFor=function(n){var m=$id(n);return this.fetchAddress(function(o){if(o.type=="info"){m.val(o.data);}});};return this;}function NoContentHint(){var b=null;
var c="#pageBody";var a={hr:0,vt:-20};this.init=function(e,d,f){b=e;c=d||c;a=merge(a,f||{});return this;};this.show=function(e){var d=$id(b);var f=$id(c);
if(d.size()<1){d=$('<div class="noContentHint"></div>').appendTo(f);d.attr("id",b);}e=e||d.text();d.text(e);d.show();return this;};this.hide=function(){$id(b).hide();
};return this;}function OrderStatusMgr(){var a={weixin:"微信支付",alipay:"支付宝",cash:"现金"};var h={unpaid:"未支付",paid:"已支付",refunded:"已退款"};var e=["alipay","weixin"];
var g={submitted:"已提交",postponed:"已推迟",cancelled:"已取消",paid:"已支付",refundApplied:"退款已申请",refunded:"已退款",setout:"已出发",finished:"已完成",commented:"已评论"};var f={submit:"提交",view:"查看",pay:"支付",cancel:"取消",applyRefund:"申请退款",comment:"评论",refund:"退款",setout:"出发",finish:"完成"};
var c={postpone:["当天有事儿，没时间"],cancel:["当天有事儿，改天预定","车型录错了，更换车型"],comment:["技师水平高，服务态度好，价格实惠，给个赞","技师水平高，服务态度好，价格比较公道","技师水平好，服务态度还行","总的来说服务还不错","技师服务态度不好，需要端正态度"]};
var d={view:"/nav/weixin/my/orderDetail?orderId={orderId}",cancel:"/weixin/my/order/action",applyRefund:"/weixin/my/order/action",comment:"/weixin/my/order/action"};
var b={alipay:"/aliPay/pay/{billType}/{billId}",weixin:"/weixin/pay/{billType}/{billId}"};this.getOrderStatusType=function(i){var j=i.status;var k=i.paymentStatus;
if(j.isIn("finished","commented")&&k=="paid"){return"finished";}else{if(j.isIn("cancelled","refundApplied","refunded")){return"cancelled";}else{return"ongoing";
}}};this.isOnlinePay=function(i){var j=i;if(isPlainObject(i)){j=i.paymentType;}return e.contains(j);};this.getPaymentTypeMap=function(){return merge({},a);
};this.getPaymentStatusMap=function(){return merge({},h);};this.getStatusMap=function(){return merge({},g);};this.getOperationMap=function(){return merge({},f);
};this.getShortcutWords=function(i){return c[i]||[];};this.getOnlinePayUrl=function(i){return b[i];};this.getAvailableActions=function(i){var o=[];var j=i.status;
var m=i.paymentType;var k=i.paymentStatus;var l=this.getOrderStatusType(i);if(l=="ongoing"&&i.originalPrice>0){if(k=="unpaid"){if(isWeixinEnv()){if(m!="alipay"){o.add("pay");
}}else{if(m!="weixin"){o.add("pay");}}}o.add("cancel");}else{if(l=="finished"){if(j=="finished"){o.add("comment");}}else{if(k=="paid"&&j=="cancelled"){o.add("applyRefund");
}}}var n=o.map(function(p,q){var r={name:p,text:f[p]};if(p=="pay"){r.url=b[m];}else{r.url=d[p];}return r;});return n;};}var orderStatusMgr=new OrderStatusMgr();
function isTouchAvailable(){return typeof touch!="undefined"&&touch!=null&&typeof touch.on=="function";}function isScrollAvailable(){return typeof IScroll=="function";
}$(document).ready(function(){if(isScrollAvailable()){document.addEventListener("touchmove",function(a){a.preventDefault();},false);}});