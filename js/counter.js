$(document).ready(function(){
		   
			$('#go-btn').on('click', go);	
		 
});


/* Perform the AJAX request and calculate total views */
		 
function go(){
		
			var result = '', countresult='';
			var totalCount = 0;
			
			// Initial housekeeping 
			
			$('#contentDiv','#contentDiv2').text('');
			$('#contentDiv').children().remove('div');
			
			$('#info, #viewcount').css({'display':'block'});
			
			
			$.ajax({
			  
                url:        "http://gdata.youtube.com/feeds/api/videos?q='"+$('#vname').val()+"&alt=json&max-results=30&orderby=viewCount",
                dataType:   "jsonp",
                success:    function(data){
                   					 var result = '', countresult='';
									 var totalCount = 0;
										
									 $('#info','#viewcount').text(' ');
									 
									
									 $.each(data.feed.entry, function(i, item) {

											var title = item['title']['$t'];
											var video = item['id']['$t'];
											var viewCount = item['yt$statistics']['viewCount'];
											
										
											result = (i+1) + ") " + title + "   ||   Views:  "+ formatNum(viewCount) + "\n";
											
											var titlediv = document.createElement('div');
											titlediv.innerHTML = result;
											
											document.getElementById('contentDiv').appendChild(titlediv);
											
											totalCount += parseInt(viewCount); 
																	
										});
									
									 // format the count to make it readable
									totalCount = formatNum(totalCount);	
									
									countresult = ' " ' +$('#vname').val() + ' " :  ' + totalCount;
									$('#contentDiv').css({'font-size': '16px', 'font-family':'Georgia','color': '#444', 'line-height': '25px'});
									$('#contentDiv2 span').css({'font-size': '16px', 'font-family':'Georgia','color': '#444'});
									$('#contentDiv2 span').text(countresult);

									$('<span style="float: right;"> &nbsp views </span>').appendTo('#contentDiv2 span');
												
															
							}
									
		      });
		    
} 

/* Format the passed integer into a readable comma-separated string */
		 
function formatNum(num){
		 
   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
		 
		