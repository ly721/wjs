$(function(){
   banner();
	 initMobileTab();
	 $('[data-toggle="tooltip"]').tooltip();
});
var banner=function(){
	// 轮播图
	//1.动态轮播图数据 ajax
	//2.根据数据动态渲染  根据当前设备 屏幕宽度
	//2.1准备数据
	//2.2把数据转换成HTML格式的字符串（动态创建元素，字符串拼接，模板引擎[artTemplate]
	//2.3把字符渲染到页面中
	//3.测试:尺寸发生改变重新渲染
	//4.移动端手势切换 touch 
	
	// UI框架： bootstrap 妹子UI 
	//jQueryUI easyUI jqueryMobile mui framework7
	/*
	关于移动端的UI框架：bootstrap jqueryMobile mui framework
	模板引擎：artTemplate,handlebars,mustache,baiduTemplate,underscore
	*/ 
 
 // 做数据缓存
 var getData=function(callback){
	 if(window.data){//缓存两数据
		callback && callback(window.data);
	 }else{
		  $.ajax({
	   type:'get',
	   url:'js/data.json',//在html页面发起请求
	   /*强制转换后台返回的数据为json 对象
	   强制转换不成功程序报错，不会执行success，执行error*/
	   dataType:'json',
	   data:'',
	   success:function(data){
			 window.data=data;
			 callback && callback(window.data);
				}
				
			});
	 }
	};
  
			
 var render=function(){
	 getData(function(data){
		  /*2.根据数据动态渲染  根据当前设备 屏幕宽度
		  */
	   var isMobile=$(window).width() < 768 ? true : false;
		 //2.1准备数据
		 //2.2把数据转换成HTML格式的字符串（动态创建元素，字符串拼接，模板引擎[artTemplate]
		 //使用模板引擎：那些html静态内容需要变成动态
		 // 点容器,轮播图容器
		 // <% console.log(list);%>  模板引擎内不可使用外部变量
		 var pointHtml=template('pointTemplate',{list:data});
		 var imgHtml=template('imgTemplate',{list:data,isM:isMobile});
		 //3把字符渲染到页面中
		 $('.carousel-indicators').html(pointHtml);
		 $('.carousel-inner').html(imgHtml);
	   });
  }
	
	 // 测试
	 $(window).on('resize',function(){
		 render();
	 }).trigger('resize');//主动触发这个事件
	 
	 //4.移动端手势切换 touch 
	 var startX=0;
	 var distanceX=0;
	 var isMove=false;
	 // originalEvent 代表js原生事件
	 $('.wjs_banner').on('touchstart',function(e){
		 startX=e. originalEvent.touches[0].clientX;
	 });
	 $('.wjs_banner').on('touchmove',function(e){
		 var moveX=e. originalEvent.touches[0].clientX;
		 distanceX=moveX-startX;
		 isMove=true;
	 });
	 $('.wjs_banner').on('touchend',function(e){
		 //滑动距离大于50px ,要滑动过
		 if(isMove && Math.abs(distanceX)>50){
			 //左滑，负数
			 if(distanceX<0){
				 console.log('next');
				 $('.carousel').carousel('next');
			 }else{
				 	 //右滑
					 console.log('prev');
					 $('.carousel').carousel('prev');
			 }
		  
		 }
		 startX=0;
		 distanceX=0;
		 isMove=false;
	 });
};

var initMobileTab=function(){
	//1.解决换行问题
	var $navTab=$('.wjs_product .nav-tabs');
	var width=0;
	$navTab.find('li').each(function(i,e){
		var $li=$(this);
		var liWidth=$li.outerWidth(true);
		width+=liWidth;
	});
	console.log(width);
	$navTab.width(width);
	//2.修改结构使之区域滑动的结构
	//给nav-tabs容器 加一个父容器nav-tabs-parent
	
	//3.自己实现滑动效果 或者 使用iscroll
	new IScroll($('.nav-tabs-parent')[0],{
		scrollX: true,
		scrollY: false
	});
};

