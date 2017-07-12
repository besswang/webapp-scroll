/**
 * 函数：setscroll(obj,stepType)
 * 描述：二级栏目位置移动的动画
 * 参数：
 *      obj：点击的规格对象；
 *		stepType：移动的步数；
 */
//golbalStep:一共可以移动多少步;hasStep:已经移动了多少步
var globalStep = 0,hasStep = 0;//
function setscroll(obj,stepType){
    var step = 3;
    //左移动
    if(stepType=="+"){
        if(hasStep+step > globalStep)//当已左移动距离+默认步长>需要左移动的长度,
            step = globalStep-hasStep;//则步长改为小于默认步长，这样才不会左移过头
            hasStep +=step;
    }
    //右移动
    else{
        if(hasStep-step < globalStep)//当已右移动距离-默认步长<需要到达的长度,
            step = hasStep-globalStep;//则步长改为小于默认步长，这样才不会右移过头
            hasStep -=step;
            step = -step;
    }

    if((stepType =="+" && hasStep < globalStep) || stepType =="-" && hasStep > globalStep){
        $(obj).scrollLeft($(obj).scrollLeft()+step);
        setTimeout(function(){setscroll(obj,stepType)},1);
    }
}

/**
 * 函数：setscroll(obj,parent)
 * 描述：绑定元素li点击执行的事件
 * 参数：
 *      obj：点击的对象；
 *		parent：点击元素的父级li；
 */
function getPos(obj,parent){
    $(obj).addClass("active").siblings().removeClass("active");
    if(parseInt($(obj).position().left) > parseInt(70)){
        var step = $(obj).position().left-70;
        globalStep = step;
        hasStep = 0;
        //左移动
        setscroll(parent,"+");
    }
    else if($(parent).scrollLeft() > 0 && $(obj).position().left<=70){
        var step = 70-$(obj).position().left;
        globalStep = 0;
        hasStep = step;
        //右移动
        setscroll(parent,"-");
    }
}