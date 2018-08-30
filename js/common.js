//元素 / 父元素 / 函数对象 {开始，移动中，结束  }
function moveEle(ele, fa, obj){ 
	if(fa && fa.innerHTML != undefined ){
		var posi = getComputedStyle(fa).position;
		if(posi == "fixed") return ;
		if(posi != "absolute" && posi != "relative"){
			console.log(getComputedStyle(fa).position);
			fa.style.position = 'absolute';
		}
	}
	var obj =  obj || fa ;
	var argsLen = arguments.length;
	var father = fa || window; // 如果FA 是 obj ,此时FA 是 {}
	ele.onmousedown = function(e){
		var offset = {
			x : e.offsetX, 
			y : e.offsetY
		}
	
		if(obj && obj.start) obj.start();
		var faxy = {};
		if( typeof father  != 'function'  && father != window ) {
			faxy = getPage(ele);
			faxy.pageX -= ele.offsetLeft;
			faxy.pageY -= ele.offsetTop;
		}
		else if( typeof father  != 'function' && father == window){
			faxy.pageX = 0;
			faxy.pageY = 0;
		}else{
			faxy.pageX = 0;
			faxy.pageY = 0;
		}
		
		document.onmousemove = function(e){
			
// 			var marginLeft = father.offsetLeft || 0;
// 			var marginTop = father.offsetTop || 0;
			var maxLeft = father.offsetWidth || window.innerWidth; //那么此时 {} .offsetWidth ||  window.innerWidth 取  window.innerWidth
			var maxTop = father.offsetHeight || window.innerHeight;
			//console.log(father);
			
			var _left =  Math.max( 0, Math.min( e.pageX - faxy.pageX  - offset.x, maxLeft - ele.offsetWidth) );
			var _top =  Math.max(0 , Math.min( e.pageY - faxy.pageY - offset.y, maxTop - ele.offsetHeight));
			
			
			console.log(faxy.pageX );

			ele.style.top = _top + "px";
			ele.style.left = _left + "px";
			ele.scrollIntoView();
			if(obj && obj.moving) obj.moving();
		}
	}
	document.onmouseup = function(){
		document.onmousemove = null;
			if(obj && obj.end) obj.end();
	}
}

		
		
		
function getCookie(key){
	var list = document.cookie.split("; ");
	
	for(var i  in list){
		if(list[i].indexOf(key) != -1){
			return list[i].split("=")[1];
		}
	}
	return null;
}

function setCookie(key, value, expires, path){
	switch(arguments.length){
		case 0 : 
		case 1 : throw new Error("参数错误。WCB");
		case 2 :
				document.cookie = key + "=" + value ;
				break;
		case 3 :{
			if(typeof arguments[2] == "number"){
				console.log(arguments[2]);
				var d  = new Date();
				d.setSeconds(d.getSeconds() + expires);
				document.cookie = key +"=" + value+";expires=" + d;
			}else{
				document.cookie = key +"=" + value+";path=" + expires;
			}
				break;
		}
		case 4:
			var d  = new Date();
			d.setSeconds(d.getSeconds() + expires);
			document.cookie = key +"=" + value+";expires=" + d +";path=" + path;
	}
	return "tongguo";
}
//ELE 在left 或 TOP 上  匀速运动
function simpleMove(ele,leftOrTop,length,time){
	var speed = ( length - parseInt(getStyle(ele)[leftOrTop]) )/time *30;
	
	var sum = 0;
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		sum = parseInt(getStyle(ele)[leftOrTop]);
		sum += speed;

		ele.style[leftOrTop] = sum + "px";
		
		if(sum >= length){
			ele.style[leftOrTop] = length + "px";
			clearInterval(ele.timer);
		}
		
	},30)
	
}

//eleELE 在left 或 TOP 上  做减速运动
function jiansuMove(ele,leftOrTop,length,time){
	
	var speed = 2*length/time*30;
	var a = (2*length/(time*time)*-1)*900.0;
	 
	var start =  parseFloat(getStyle(ele)[leftOrTop]) ;
	console.log(start);
	ele.timer = setInterval(function(){
		speed += a;
		start += speed;
		ele.style[leftOrTop] = start + "px";//parseFloat(getStyle(ele)[leftOrTop]) + (speed += a) + "px";
		console.log(getStyle(ele)[leftOrTop],00);
		
		
// 		if(Math.abs(start - parseInt(getStyle(ele)[leftOrTop]) >=  Math.abs(length))){
// 			clearInterval(ele.timer);
// 		}
// 		
		
		
		if(length > 0){
			if(speed <= 0){
				console.log(ele.style[leftOrTop] )
				clearInterval(ele.timer);
			}
		}else{
			if(speed >= 0){
				console.log(ele.style[leftOrTop])
				clearInterval(ele.timer);
			}
		}
		
		
	},30)
}
		
function getStyle(ele){
	if(ele.currentStyle){
		return ele.currentStyle;
	}
	else {
		return getComputedStyle(ele);
	}
}
(function(){
	if(!document.getElementsByClassName){
		document.getElementsByClassName = function(classname){
			var result = [];
			var allEle = document.getElementsByTagName('*');
			for(var i = 0;i< allEle.length; i++){
				if(allEle[i].className.indexOf(classname) != -1){
					result.push(allEle[i]);
				}
			}
			return result;
		}
	}
})();

//获取相对位置
function getPage (tar){
	/*var x = tar.offsetLeft;
	var y = tar.offsetTop
	while(!!tar.offsetParent){
		x += tar.offsetParent.offsetLeft;
		y += tar.offsetParent.offsetTop;
		tar = tar.offsetParent;
		
	}*/
	if(tar==null){
		return {
			pageX: 0,
			pageY: 0
		}
	} 
	
	var page = getPage(tar.offsetParent);
	return {
		pageX :tar.offsetLeft + page.pageX,
		pageY :tar.offsetTop + page.pageY
	}
}
// DIV 缓冲
function slowDown(ele,options,fn){
	if(ele.flage) return ;
	ele.flage = true;
	for(var attr in options){
		(function(attr){
		ele[attr+"timer"] = setInterval(function(){
				var valength = parseInt(options[attr]);
				if(attr == "opacity"){
					var speed = (valength - parseFloat(getStyle(ele)[attr])*100)/7 ;
					speed  = speed > 0 ? Math.ceil((valength - parseFloat(getStyle(ele)[attr]) *100) /7) : Math.floor((valength - parseFloat(getStyle(ele)[attr])*100)/7) ;
					var re = (parseFloat(getStyle(ele)[attr])*100 + speed);
					ele.style.opacity = re/100;
					if( parseFloat(getStyle(ele)[attr])*100 == valength ){
						ele.style.opacity = options[attr]/100;
						ele.style.filter = "alpha(opa city = "+ options[attr] +")"
						clearInterval(ele[attr+"timer"]);
						if(isOver()){
							ele.flage = false;
							fn ? fn() : "";
						}
					}
				}else{
					var speed = (valength - parseInt(getStyle(ele)[attr]))/7 ;
					speed = speed > 0 ? Math.ceil((valength - parseInt(getStyle(ele)[attr]))/7) : Math.floor((valength - parseInt(getStyle(ele)[attr]))/7)
					ele.style[attr] = parseInt(getStyle(ele)[attr]) + speed + "px";
					if( parseInt(getStyle(ele)[attr]) == valength ){
						//ele.style[attr] = valength+"px";
						clearInterval(ele[attr+"timer"]);
						if(isOver()){
							ele.flage = false;
							fn ? fn() : "";
						}
					}
				}
				
			},30)
		}(attr))
	}
	function isOver(){
		for(var attr in options){
			if(attr == "opacity"){
				if(options[attr] != parseFloat(getStyle(ele)[attr])*100)    {
					return false;
				}
			}
			else if( parseInt(options[attr]) != parseInt(getStyle(ele)[attr])){
				return false;
			}
		}
		return true;
	}
}
//图片过渡 隐藏
function imgHid(ele,fn){
		var val = Number(getComputedStyle(ele).opacity);
		clearInterval(ele.timer);
		ele.timer = setInterval(function(){
			val -=0.02;
			ele.style.opacity = val;
			if(val <=0){
				clearInterval(ele.timer);
				fn? fn(): "";
			}
		},30)
}
//图片过渡 显示
function imgVis(ele,fn){
	var val = Number(getComputedStyle(ele).opacity);
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		val +=0.02;
		ele.style.opacity = val;
		if(val >=1){
			clearInterval(ele.timer);
			fn? fn(): "";
		}
	},30)
}

function getRandom(x,y){
	return Math.floor(Math.random()*(y-x)+x);
}
function randomRGB(){
	var r = getRandom(0,256);
	var g = getRandom(0,256);
	var b = getRandom(0,256);
	return "rgb("+ r +","+ g +","+ b+")";
}
function paowuxian(a,stop){
	
	var startPoint = {
		x : a.offsetLeft, 
		y : a.offsetTop
	}
	var endPoint = {
		x : stop.x - startPoint.x,
		y : -(stop.y - startPoint.y)
	}
	var va = -0.002;
	// y = a*x*x +b*x;
	var vb = (endPoint.y - va*endPoint.x*endPoint.x)/endPoint.x;
	var count = 0;
	window.requestAnimationFrame(function(){	
		a.style.left = startPoint.x + count + "px";
		a.style.top = startPoint.y  - (va*count*count+vb*count ) + "px"
		count +=5;
		
		if(a.offsetLeft >= endPoint.x){
			a.style.left = endPoint.x + "px";
			a.style.top = -endPoint.y + "px";
			return ;
		}
		window.requestAnimationFrame(arguments.callee);
	})
}

(function jzg(){
	var count = 0;
	document.addEventListener('click',function(e){
		var e  = e ||event;
		var osXY = {
			x : e.pageX,
			y : e.pageY -20
		}
		var jzg = ['富强','民主','文明','和谐','自由','平等','公正','法治','爱国','敬业','诚信','友善'];
		var div = document.createElement('div');
		div.style.top = osXY.y + "px";
		div.style.left = osXY.x + "px";
		div.innerText = jzg[count++%12];
		div.style.color = 'red';
		div.style.position = 'absolute';
		div.style.fontWeight = 'bold';
		div.style.webkitUserSelect = "none";
		div.style.fontSize = '20px';
		
		document.body.appendChild(div);
		slowDown(div,{top:div.offsetTop-100,opacity:0},function(){
			div.remove();
		})
	})
})();