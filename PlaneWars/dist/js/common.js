function moveEle(a,b,c){if(b&&b.innerHTML!=null){var d=getComputedStyle(b).position;if("fixed"==d)return;"absolute"!=d&&"relative"!=d&&(console.log(getComputedStyle(b).position),b.style.position="absolute")}var c=c||b,e=arguments.length,f=b||window;a.onmousedown=function(b){var d={x:b.offsetX,y:b.offsetY};c&&c.start&&c.start();var g={};"function"!=typeof f&&f!=window?(g=getPage(a),g.pageX-=a.offsetLeft,g.pageY-=a.offsetTop):"function"!=typeof f&&f==window?(g.pageX=0,g.pageY=0):(g.pageX=0,g.pageY=0),document.onmousemove=function(b){var e=Math.max,h=Math.min,i=f.offsetWidth||window.innerWidth,j=f.offsetHeight||window.innerHeight,k=e(0,h(b.pageX-g.pageX-d.x,i-a.offsetWidth)),l=e(0,h(b.pageY-g.pageY-d.y,j-a.offsetHeight));console.log(g.pageX),a.style.top=l+"px",a.style.left=k+"px",a.scrollIntoView(),c&&c.moving&&c.moving()}},document.onmouseup=function(){document.onmousemove=null,c&&c.end&&c.end()}}function getCookie(a){var b=document.cookie.split("; ");for(var c in b)if(-1!=b[c].indexOf(a))return b[c].split("=")[1];return null}function setCookie(a,b,c,e){switch(arguments.length){case 0:case 1:throw new Error("\u53C2\u6570\u9519\u8BEF\u3002WCB");case 2:document.cookie=a+"="+b;break;case 3:{if("number"==typeof arguments[2]){console.log(arguments[2]);var f=new Date;f.setSeconds(f.getSeconds()+c),document.cookie=a+"="+b+";expires="+f}else document.cookie=a+"="+b+";path="+c;break}case 4:var f=new Date;f.setSeconds(f.getSeconds()+c),document.cookie=a+"="+b+";expires="+f+";path="+e;}return"tongguo"}function simpleMove(a,b,c,d){var e=30*((c-parseInt(getStyle(a)[b]))/d),f=0;clearInterval(a.timer),a.timer=setInterval(function(){f=parseInt(getStyle(a)[b]),f+=e,a.style[b]=f+"px",f>=c&&(a.style[b]=c+"px",clearInterval(a.timer))},30)}function jiansuMove(a,b,c,d){var e=30*(2*c/d),f=parseFloat(getStyle(a)[b]);console.log(f),a.timer=setInterval(function(){e+=900*(-1*(2*c/(d*d))),f+=e,a.style[b]=f+"px",console.log(getStyle(a)[b],0),0<c?0>=e&&(console.log(a.style[b]),clearInterval(a.timer)):0<=e&&(console.log(a.style[b]),clearInterval(a.timer))},30)}function getStyle(a){return a.currentStyle?a.currentStyle:getComputedStyle(a)}(function(){document.getElementsByClassName||(document.getElementsByClassName=function(a){for(var b=[],c=document.getElementsByTagName("*"),d=0;d<c.length;d++)-1!=c[d].className.indexOf(a)&&b.push(c[d]);return b})})();function getPage(a){if(null==a)return{pageX:0,pageY:0};var b=getPage(a.offsetParent);return{pageX:a.offsetLeft+b.pageX,pageY:a.offsetTop+b.pageY}}function slowDown(a,b,c){function d(){for(var c in b)if("opacity"==c){if(b[c]!=100*parseFloat(getStyle(a)[c]))return!1;}else if(parseInt(b[c])!=parseInt(getStyle(a)[c]))return!1;return!0}var e=Math.floor;if(!a.flage)for(var f in a.flage=!0,b)(function(f){a[f+"timer"]=setInterval(function(){var g=Math.ceil,h=parseInt(b[f]);if("opacity"==f){var i=(h-100*parseFloat(getStyle(a)[f]))/7;i=0<i?g((h-100*parseFloat(getStyle(a)[f]))/7):e((h-100*parseFloat(getStyle(a)[f]))/7);var j=100*parseFloat(getStyle(a)[f])+i;a.style.opacity=j/100,100*parseFloat(getStyle(a)[f])==h&&(a.style.opacity=b[f]/100,a.style.filter="alpha(opa city = "+b[f]+")",clearInterval(a[f+"timer"]),d()&&(a.flage=!1,c?c():""))}else{var i=(h-parseInt(getStyle(a)[f]))/7;i=0<i?g((h-parseInt(getStyle(a)[f]))/7):e((h-parseInt(getStyle(a)[f]))/7),a.style[f]=parseInt(getStyle(a)[f])+i+"px",parseInt(getStyle(a)[f])==h&&(clearInterval(a[f+"timer"]),d()&&(a.flage=!1,c?c():""))}},30)})(f)}function imgHid(a,b){var c=+getComputedStyle(a).opacity;clearInterval(a.timer),a.timer=setInterval(function(){c-=.02,a.style.opacity=c,0>=c&&(clearInterval(a.timer),b?b():"")},30)}function imgVis(a,b){var c=+getComputedStyle(a).opacity;clearInterval(a.timer),a.timer=setInterval(function(){c+=.02,a.style.opacity=c,1<=c&&(clearInterval(a.timer),b?b():"")},30)}function getRandom(a,b){return Math.floor(Math.random()*(b-a)+a)}function randomRGB(){var a=getRandom(0,256),c=getRandom(0,256),d=getRandom(0,256);return"rgb("+a+","+c+","+d+")"}function paowuxian(b,a){var c={x:b.offsetLeft,y:b.offsetTop},d={x:a.x-c.x,y:-(a.y-c.y)},e=-.002,f=(d.y-e*d.x*d.x)/d.x,g=0;window.requestAnimationFrame(function(){return b.style.left=c.x+g+"px",b.style.top=c.y-(e*g*g+f*g)+"px",g+=5,b.offsetLeft>=d.x?(b.style.left=d.x+"px",void(b.style.top=-d.y+"px")):void window.requestAnimationFrame(arguments.callee)})}var throttle=function(a,b,c){var d,e;return function(){clearTimeout(d);var f=+new Date,g=arguments;e||(e=f);var h=this;f-e>=c?(a.apply(h,g),e=f):d=setTimeout(function(){a.apply(h,g)},b)}}(function(){function a(a){var a=a||event,c={x:a.pageX,y:a.pageY-20},d=document.createElement("div");d.style.top=c.y+"px",d.style.left=c.x+"px",d.innerText=["\u5BCC\u5F3A","\u6C11\u4E3B","\u6587\u660E","\u548C\u8C10","\u81EA\u7531","\u5E73\u7B49","\u516C\u6B63","\u6CD5\u6CBB","\u7231\u56FD","\u656C\u4E1A","\u8BDA\u4FE1","\u53CB\u5584"][b++%12],d.style.color="red",d.style.position="absolute",d.style.fontWeight="bold",d.style.webkitUserSelect="none",d.style.fontSize="20px",document.body.appendChild(d),slowDown(d,{top:d.offsetTop-100,opacity:0},function(){d.remove()})}var b=0;document.addEventListener("click",function(a,b,c){var d,e;return function(){clearTimeout(d);var f=+new Date,g=arguments;e||(e=f);var h=this;f-e>=c?(a.apply(h,g),e=f):d=setTimeout(function(){a.apply(h,g)},b)}}(a,300,50))})();