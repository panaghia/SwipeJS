function domReady(e){document.addEventListener("DOMContentLoaded",e,!1)}var Swiper=function(e){this.options=e;this.currentPage=1;this.pageNumber=this.options.pageNumber;that=this;this.init();this.attachEvents()};
Swiper.prototype.init=function(){var e=document.getElementById("scroller");e.style.width=parseInt(this.pageNumber*768)+"px";for(var g=0;g<this.pageNumber;g++){var d=document.createElement("div");d.setAttribute("class","page");d.id="page_"+(g+1);e.appendChild(d)}x$("#page_"+this.currentPage).xhr("inner","../book/"+this.currentPage+".html");x$("#page_"+this.currentPage).addClass("loaded");x$("#page_"+(this.currentPage+1)).xhr("inner","../book/"+(this.currentPage+1)+".html");x$("#page_"+(this.currentPage+
1)).addClass("loaded")};Swiper.prototype.attachEvents=function(){this.attachScrollerEvents();this.attachImgsEvents()};Swiper.prototype.attachImgsEvents=function(){};
Swiper.prototype.attachScrollerEvents=function(){function e(b){i=b.touches[0].pageY-j;i>0&&window.pageYOffset<=0&&b.preventDefault();h=f=b=b.touches[0].pageX-k;c.style.webkitTransition="";c.style.webkitTransform="translate3d("+(parseInt(d)+b)+"px, 0, 0)";c.removeEventListener("touchmove",this);c.removeEventListener("touchend",this)}function g(){function b(){c.style.webkitTransition="all 300ms ease-in-out";var a="page_"+parseInt(that.currentPage),a=document.getElementById(a).offsetLeft;d=-a;c.style.webkitTransform=
"translate3d("+d+"px, 0, 0)";h=a;f=0}var a=l-h;if(a<0)that.currentPage>1?a<-100?(c.style.webkitTransition="all 200ms ease-in-out",a="page_"+(parseInt(that.currentPage)-1),a=document.getElementById(a).offsetLeft,d=-a,c.style.webkitTransform="translate3d("+d+"px, 0, 0)",h=a,f=0,that.currentPage--,a=x$("#page_"+(parseInt(that.currentPage)-1)),parseInt(that.currentPage)>1&&!a.hasClass("loaded")&&(a.xhr("inner","../book/"+(parseInt(that.currentPage)-1)+".html"),a.addClass("loaded"))):b():b();else if(a>
0)that.currentPage<that.pageNumber?a>100?(c.style.webkitTransition="all 200ms ease-in-out",a="page_"+(parseInt(that.currentPage)+1),a=document.getElementById(a).offsetLeft,d=-a,c.style.webkitTransform="translate3d("+d+"px, 0, 0)",h=a,f=0,that.currentPage++,a=x$("#page_"+(parseInt(that.currentPage)+1)),parseInt(that.currentPage)<that.pageNumber&&!a.hasClass("loaded")&&(x$("#page_"+(parseInt(that.currentPage)+1)).xhr("inner","../book/"+(parseInt(that.currentPage)+1)+".html"),a.addClass("loaded"))):
b():b()}var d=0,l=0,k=0,h=0,f=0,c=document.getElementById("scroller");c.addEventListener("touchstart",function(b){j=b.touches[0].pageY;b.stopPropagation();l=f;k=b.touches[0].pageX-f;c.addEventListener("touchmove",e,!1);c.addEventListener("touchend",g,!1)},!1);var j=0,i=0};