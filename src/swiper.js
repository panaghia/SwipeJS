//SwiperJS
//COPYRIGHT 2011
//Sergio Panagia
//sergio@panaghia.it

function domReady(fn){
	document.addEventListener('DOMContentLoaded', fn, false);
} 

var Swiper = function(options)
{
	this.options = options;     
	this.currentPage = 1; 
	this.pageNumber = this.options.pageNumber; 
	that = this;
	
   	this.init();  
	this.attachEvents(); 
	  
}              

Swiper.prototype.init = function()
{
	var scroller = document.getElementById('scroller');
	scroller.style.width = parseInt((this.pageNumber * 768))+'px';
	for(var i=0; i<this.pageNumber;i++)
	{
		var cpage = document.createElement('div');
		cpage.setAttribute('class', 'page');
		cpage.id = 'page_'+(i+1); 
		//if(i === 1)
		//	cpage.id = 'current';
		scroller.appendChild(cpage);  
	   
	}   
	        
   
	x$('#page_'+this.currentPage).xhr('inner', '../book/'+(this.currentPage)+'.html');
	x$('#page_'+this.currentPage).addClass('loaded');
	
	x$('#page_'+(this.currentPage+1)).xhr('inner', '../book/'+(this.currentPage+1)+'.html');
	x$('#page_'+(this.currentPage+1)).addClass('loaded');  
   
}            

Swiper.prototype.attachEvents = function()
{         
	this.attachScrollerEvents();
	
	this.attachImgsEvents();            
   
	
}    

Swiper.prototype.attachImgsEvents = function()
{ 
	/*
	var imgs = document.querySelectorAll('.media_img');   
	console.log(imgs.length);
	
	for(var i=0; i < imgs.length; i++)
	{
		imgs[i].addEventListener('touchstart', touchStart, false);
		function touchStart(e)
		{
			
			imgs[i].addEventListener('touchmove', touchMove, false);
			imgs[i].addEventListener('touchend', touchEnd, false);
		} 
		function touchMove(e)
		{
			
		}   
		function touchEnd(e)
		{
			
		}
		
	}  
	*/
	
}

Swiper.prototype.attachScrollerEvents = function()
{
	var absX = 0; 
	
	var xPos = 0;
	var deltaX = 0;  	
	var yPos = 0;
	var deltaY = 0; 
	
	var endX = 0;
	var startX = 0;
	var dir = 0;  

	var scroller = document.getElementById('scroller');  


	scroller.addEventListener('touchstart', touchStart, false);  



	function touchStart(e)
	{
		//e.preventDefault();
		e.stopPropagation();
		                         
		yPos = e.touches[0].pageY;
        xPos = startX;            

		deltaX = e.touches[0].pageX - startX;
		scroller.addEventListener('touchmove', touchMove, false);   
		scroller.addEventListener('touchend', touchEnd, false);   	
	}//touchstart   

	function touchMove(e)
	{
		deltaY = e.touches[0].pageY - yPos;
		//if(deltaY !== yPos)   //block any v-scroll
		  //  e.preventDefault();  
			
		if(deltaY > 0 && window.pageYOffset <= 0)//block top vertical scroll
			e.preventDefault(); 

		var delta =  e.touches[0].pageX - deltaX;
		delta = parseInt(delta/1.3); //sample delta		      		
		startX = endX = delta;             

		scroller.style.webkitTransition = ''; //erase past transition  
		scroller.style.webkitTransform = 'translate3d('+(parseInt(absX)+delta)+'px, 0, 0)';

		scroller.removeEventListener('touchmove', this); 
		scroller.removeEventListener('touchend', this); 

	}//touchmove     

	function touchEnd(e)
	{ 
		function restoreState()
		{
			scroller.style.webkitTransition = 'all 300ms ease-in-out';
			var currentEl = 'page_'+(parseInt(that.currentPage));
			var offleft = document.getElementById(currentEl).offsetLeft;
			absX = -offleft; 
			scroller.style.webkitTransform = 'translate3d('+absX+'px, 0, 0)';  
			endX = offleft;  
			startX = 0;   
		};      

		var finalDelta = xPos - endX; 

		if(finalDelta < 0 )
		{
			if(that.currentPage > 1)
			{ 
				if(finalDelta < -100)
				{

					scroller.style.webkitTransition = 'all 200ms ease-in-out';
					var preEl = 'page_'+(parseInt(that.currentPage)-1);
					var offleft = document.getElementById(preEl).offsetLeft; 
					absX = -offleft; 
			  		scroller.style.webkitTransform = 'translate3d('+absX+'px, 0, 0)';  
				    endX = offleft;  
					startX = 0;                                              
					that.currentPage--;  
					
					//document.body.scrollTop = 0;

					preEl = x$('#page_'+(parseInt(that.currentPage)-1));
					
					// NOTE ABOUT PAGE ASYNC REQUESTS
				    //pages are loaded blank.
					//page initially loaded have class 'loaded'
					//when a page is ajaxed, a class 'loaded' is added to element
					 
					if(parseInt(that.currentPage) > 1 && !preEl.hasClass('loaded'))
					{
						//ajax prev page, but wait animation to ends. 
						window.setTimeout(function()
						{
							console.log('ajaxing..'+parseInt(that.currentPage-1));
							preEl.xhr('inner', '../book/'+(parseInt(that.currentPage)-1)+'.html');
							preEl.addClass('loaded'); //set that page as 'loaded'
							
						}, 200);   					
					}
				}
				else //no important change, revert to current state
					restoreState();
			}   
			else
				restoreState();
		}
		else if(finalDelta > 0 )
		{ 
			if(that.currentPage < that.pageNumber)
			{
				if(finalDelta > 100)
				{ 
	   				scroller.style.webkitTransition = 'all 200ms ease-in-out';                                  
					var nextEl = 'page_'+(parseInt(that.currentPage)+1);  

					var offleft = document.getElementById(nextEl).offsetLeft;

					absX = -offleft;       
				   	scroller.style.webkitTransform = 'translate3d('+absX+'px, 0, 0)';  
				    endX = offleft;  
					startX = 0;                                              
					that.currentPage++;		
					//now fetch content for next page
					nextEl = x$('#page_'+(parseInt(that.currentPage)+1)); 
					
				   // document.body.scrollTop = 0;

					if( parseInt(that.currentPage) < that.pageNumber && !nextEl.hasClass('loaded')) 
					{
						//ajax next page, but wait to flip-page animation to end
						window.setTimeout(function()
						{
							x$('#page_'+(parseInt(that.currentPage)+1)).xhr('inner', '../book/'+(parseInt(that.currentPage)+1)+'.html');
							nextEl.addClass('loaded');
							console.log('ajaxing..'+parseInt(that.currentPage+1)); 
						}, 200);						
					}
				}
				else  //no relevant change
					restoreState();
			}
			else //there are no pages to show
				restoreState();

		}      

	} //scroller.touchend
}


