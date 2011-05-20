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
	x$('#page_'+(this.currentPage+1)).xhr('inner', '../book/'+(this.currentPage+1)+'.html');  
   
}            

Swiper.prototype.attachEvents = function()
{         
                 
	var absX = 0;
	var startPos = 0;
	var startDelta = 0; 
	var endPos = 0;
	var pos = 0;
	var dir = 0;  
	
	var scroller = document.getElementById('scroller');  
	
	
	scroller.addEventListener('touchstart', touchStart, false);  
	//scroller.addEventListener('touchmove', touchMove, false);   
	//scroller.addEventListener('touchend', touchEnd, false); 
	
	function touchStart(e)
	{
		e.preventDefault();
		e.stopPropagation();  
		startPos = pos;            
		
		startDelta = e.touches[0].pageX - pos;
		scroller.addEventListener('touchmove', touchMove, false);   
		scroller.addEventListener('touchend', touchEnd, false);   	
	}   
	function touchMove(e)
	{  
		var delta =  e.touches[0].pageX - startDelta; 
		pos = delta;  
		endPos = delta;             
		 
		scroller.style.webkitTransition = '';  
		scroller.style.webkitTransform = 'translate3d('+(parseInt(absX)+delta)+'px, 0, 0)';
		
		scroller.removeEventListener('touchmove', this); 
		scroller.removeEventListener('touchend', this); 
		
	}   
	function touchEnd(e)
	{ 
	    
		var finalDelta = startPos - endPos; 
	     (finalDelta);
		if(finalDelta < 0)
		{
			if(that.currentPage > 1)
			{   
				scroller.style.webkitTransition = 'all 200ms ease-in-out';
				var preEl = 'page_'+(parseInt(that.currentPage)-1);
				var offleft = document.getElementById(preEl).offsetLeft; 
				absX = -offleft; 
		  		scroller.style.webkitTransform = 'translate3d('+absX+'px, 0, 0)';  
			    endPos = offleft;  
				pos = 0;                                              
				that.currentPage--; 
				x$('#page_'+(parseInt(that.currentPage)-1)).xhr('inner', '../book/'+(parseInt(that.currentPage)-1)+'.html');
			}   
			else
			{
				scroller.style.webkitTransition = 'all 500ms ease-in-out';
				var currentEl = 'page_'+(parseInt(that.currentPage));
				var offleft = document.getElementById(currentEl).offsetLeft;
				absX = -offleft; 
				scroller.style.webkitTransform = 'translate3d('+absX+'px, 0, 0)';  
				endPos = offleft;  
				pos = 0;
				
			}
		}
		else if(finalDelta > 0)
		{ 
			if(that.currentPage < that.pageNumber)
			{          
				scroller.style.webkitTransition = 'all 200ms ease-in-out';                                  
				var nextEl = 'page_'+(parseInt(that.currentPage)+1);  
		   
				var offleft = document.getElementById(nextEl).offsetLeft;
		                         
				absX = -offleft;       
			   	scroller.style.webkitTransform = 'translate3d('+absX+'px, 0, 0)';  
			    endPos = offleft;  
				pos = 0;                                              
				that.currentPage++;
			
				//now fetch content for next page 
		                                                                                       
				x$('#page_'+(parseInt(that.currentPage)+1)).xhr('inner', '../book/'+(parseInt(that.currentPage)+1)+'.html');
			}
			else //there are no pages to show
			{                                                            
				scroller.style.webkitTransition = 'all 500ms ease-in-out';
				var currentEl = 'page_'+(parseInt(that.currentPage));
				var offleft = document.getElementById(currentEl).offsetLeft;
				absX = -offleft; 
				scroller.style.webkitTransform = 'translate3d('+absX+'px, 0, 0)';  
				endPos = offleft;  
				pos = 0;
				
				
			}
  	
		}      
		// final > 0 swipe right
	}
	
}