  
/*Initialising various variables */
  var entireData=[]; 
  var finalData=[];
  var uniqueCarBrands=[];
  var uniqueCarTypes=[];
  var count=0;
  var index=0;
  var selectedCar="";
  var featuredCarList=[];
function myFunction()
{


$.ajax(
       {
        url  : "/getAllBooks/",
        contentType: "application/json",
        data: JSON.stringify(),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){
        entireData=response
        console.log(response[0][1])
        console.log(entireData)
        var $sectionId = $("#search-car")
        count=entireData.length;
        var authors=[];
        var years=[];
        /* Fetching all unique data */
	         	 var j=0;
	             for (i = 0; i < count; i++)
	             {


	            			authors[j]=response[i][2];
	            			years[j]=response[i][5];

	            		    j++;
	              }
                  /*picking up unique years for dropdown */
	            var years = years.filter(function(itm,i,years)
	            		 {
         	       return i==years.indexOf(itm);

         		 });

         		 /*picking up unique authors for dropdown */
	            var authors = authors.filter(function(itm,i,authors)
	            		 {
         	       return i==authors.indexOf(itm);

         		 });

                 // populating the various dropdowns
	             var $authorsLDD= $("#authorsL");
	             for (var i=0; i< authors.length ;i++ )
	            	 {
	            	 $authorsLDD.append($("<option />").val(authors[i]).text(authors[i]));

	            	 }

                 years.sort();
	             var $yearsDD= $("#yearsL");
	             for (var i=0; i< years.length ;i++ )
	            	 {
	            	 $yearsDD.append($("<option />").val(years[i]).text(years[i]));

	            	 }


        for(var i=0;i<entireData.length;i++ )
	            	 			{
	            	 		        var id= "image_"+entireData[i][0];

	        	 					$sectionId.append($("<div>").append($("<img>").attr('src',"data:image/jpg;base64, "+ entireData[i][6])));

	            	 			}
	      $(".regular").slick({

	            	   				 dots: false,
	            	  		 		 infinite: true,
	            	    			 slidesToShow: 4,
	            	  	  			 slidesToScroll: 4,
	            	  	  			 focusOnSelect:true,
	            	  	  			  touchMove: false,
	            	 			 });


        }
       });
}