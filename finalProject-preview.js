/*
A Preview Image Carousel:
User are able to take a list of a links and view the images in a preview. 

Updates:
- Thumbnail List in preview overlay
- Clickable Thumbnails that can be view within the Preview ovelay

*/
var Preview = (function() {
//private variables
	var links = document.getElementsByTagName('a');
	var imgs = document.getElementsByTagName('img');
	var previewOverlay = document.createElement("div");
	var title = document.createElement("h2");
	var img = document.createElement("img");
	var closeBtn = document.createElement("div");
	var thumbs = document.createElement("ul");
	
	
	return {
// ~~~~~~~ public method
	init: function() {
	
	//private functions
		overlayElements();
		clickLink();
		closeOverlay();
		collectImgs();
		
	}// init END
	
	};
//Collect all the images
	function collectImgs() {
	
	for (var i = 0; i < links.length; i++) {
            	var link = links[i];
            		
		var imgData = link.getAttribute("data-preview");
		var imgSrc = link.getAttribute("href");
		
		var thumbsList = document.createElement('li');
		thumbs.appendChild(thumbsList);
	 	var linkText = link.innerHTML;
	 	
	 	var img = document.createElement("img");
		img.setAttribute("id", imgData);
		img.setAttribute("alt", linkText);
		img.setAttribute("src", imgSrc);
		thumbsList.appendChild(img);
		
		}
		
		var thumbnails = thumbs.querySelectorAll('img');
		var previewMainImg = previewOverlay.querySelector('.mainImg');
		
		for (var i = 0; i < thumbnails.length; i++) {
			var previewImgs = thumbnails[i];
			
			//IIFE onclick images
			previewImgs.onclick = (function(eachImg) {
			 return function() {
			//add image tags to previewOverlay
	 		var imgData = eachImg.getAttribute("id");
			var imgAlt = eachImg.getAttribute("alt");
			var imgSrc = eachImg.getAttribute("src");
			
			//set collected images info to mainImg
			previewMainImg.setAttribute("id", imgData);
	 		previewMainImg.setAttribute("alt", imgAlt);
			previewMainImg.setAttribute("src", imgSrc);
			title.innerHTML = imgAlt;
			};
			})(previewImgs);
		}
		
	} // collectImgs END

// ~~~~~~~ create html elements in the DOM	
	 function overlayElements() {
	 	
	 	//add previewOverlay to the body
	 	document.body.appendChild(previewOverlay);
	 	previewOverlay.setAttribute("class", "previewOverlay");
	 	
	 	//add title tag to previewOverlay
	 	previewOverlay.appendChild(title);
	 	
	 	//add image tag to previewOverlay
	 	previewOverlay.appendChild(img);
	 	img.setAttribute("class", "mainImg");
	 	
	 	
	 	//add closeOverlay button to previewOverlay
	 	previewOverlay.appendChild(closeBtn);
	 	closeBtn.setAttribute("class", "close");
	 	
	 	//add thumbnail list
	 	previewOverlay.appendChild(thumbs);
	 	thumbs.setAttribute("class", "thumbnails");
	 	
	 }
	

// ~~~~~~~ click links open overlay box and set data in overlay img src	 
	 function clickLink() {
	 	//loop each link
	 	
		for (var i = 0; i < links.length; i++) {
            		var link = links[i];
            		
            		//IIFE onclick get data from each link
            		link.onclick = (function(getLink) {
            		return function() {
            		var URL = getLink;
            		var data = getLink.getAttribute("data-preview");
            		
            		//set stlye to block
    			previewOverlay.style.display = "block";
    			
    			//get innerhtml set title of image
			getLinkText = getLink.innerHTML;
			title.innerHTML = getLinkText;
			
			img.setAttribute("alt", getLinkText);
			
    			//set src to URL and id to data-preview
			img.setAttribute("id", data);
			img.setAttribute("src", URL);
			
			
			//removes the a click event
			return false; //supported by other browsers
                	event.preventDefault();
            		};
        		})(link); // onclick IIFE END
        		
		}// for loop END
		
	} // clickLink END
	
// ~~~~~~~ closeOverlay previewOverlay box when click on button and previewOverlay 
	function closeOverlay() {
	//change previewOverlay display style to none
		var closeOverlay = function() {previewOverlay.style.display = "none";};
		
		closeBtn.onclick = closeOverlay;
		//previewOverlay.onclick = closeOverlay;
		
	}// Close END	

})();