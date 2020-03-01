  
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
       // console.log(response[0][1])
       // console.log(entireData)
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

     //search  book functionality starts
	       $("#search").click(function()
	            {
	    	         //console.log(entireData)
                     finalData=[];
	    	         //clearing the details
     	             document.getElementById("search-car-details").style.display = "";
     	           //  document.getElementById("selected-car-details").style.display = "none";

     	           //  $('#expandedImg').removeAttr('src');

	            	 var authorState = $("#authorsL").children(":selected").attr("value");
	   	             var yearState = $("#yearsL").children(":selected").attr("value");
	   	             var maxState = $("#maxPrice").children(":selected").attr("value");
	   	             var minState = $("#minPrice").children(":selected").attr("value");

                     /*
	   	             //clearing the car details
	   	             document.getElementById("open-button").style.display = "";
	   	 	         document.getElementById("carName").innerHTML="";
	   	 	         document.getElementById("carModel").innerHTML="";
	   	 	         document.getElementById("carType").innerHTML="";
	   	 	         document.getElementById("carPrice").innerHTML="";
	   	 	         document.getElementById("carYear").innerHTML="";*/
	   	             document.getElementById("noresult").style.display ="none";

	            	 var $sectionId = $("#search-car")

	            	 const myNode = document.getElementById("search-car");
	            	 myNode.innerHTML = '';
	            	 /*
	            	 const image1 = document.getElementById("image1");
	            	 image1.innerHTML = '';
	            	 const image2 = document.getElementById("image2");
	            	 image2.innerHTML = '';
	            	 const image3 = document.getElementById("image3");
	            	 image3.innerHTML = '';
	            	 const expandedImg =document.getElementById("expandedImg");
	            	 expandedImg.innerHTML ='';
	            	  */
	            	 var element = document.getElementById("search-car");

	            	 //removing slickslider
	            	 element.classList.remove("slick-initialized");
	            	 element.classList.remove("slick-slider");


	            	//filter conditions
	           		 if(authorState == "All Authors" && yearState=="All Years" )
	            		 {
	           			    if (minState ==0 && maxState== 0)
	           			    	{
	           			    		finalData=entireData;
	           			    	}
	           			    else
	           			    	{


	           			    	     j=0;
	           			    		 for (var i = 0; i < entireData.length; i++)
    	            		 			{

	           			    			 if (maxState > entireData[i][4] && minState < entireData[i][4])
	           			    				 {

	           			    					finalData[j]=entireData[i];
    	            							j++;
	           			    				 }
    	            		 			}
	           			    	}
                            console.log(finalData.length);
	           			 	for(var i=0;i<finalData.length;i++ )
	            	 			{
	            	 		        var id= "image_"+finalData[i][0];

	        	 					$sectionId.append($("<div>").append($("<img>").attr('src',"data:image/jpg;base64, "+ finalData[i][6])));

	            	 			}


	           			 	 var windowWidth = $(window).width();

                           // alert(windowWidth);

                             if( windowWidth >= 320 &&  windowWidth<=500)
                            	 {
                            	 $(".regular").slick({

    	 	            	   		 dots: false,
    	 	            	  		 infinite: true,
    	 	            	    	 slidesToShow: 1,
    	 	            	  	     slidesToScroll: 1,


    	 	            	 		 });

                            	 }
                             else if( windowWidth >= 501 &&  windowWidth<=767)
                        	 {
                        	 $(".regular").slick({

	 	            	   		 dots: false,
	 	            	  		 infinite: true,
	 	            	    	 slidesToShow: 2,
	 	            	  	     slidesToScroll: 1,


	 	            	 		 });

                        	 }
                             else if( windowWidth >= 768 &&  windowWidth<=900)
                        	 {
                        	 $(".regular").slick({

	 	            	   		 dots: false,
	 	            	  		 infinite: true,
	 	            	    	 slidesToShow: 3,
	 	            	  	     slidesToScroll: 1,


	 	            	 		 });

                        	 }

                             else{

                            	 $(".regular").slick({

    	 	            	   		 dots: false,
    	 	            	  		 infinite: true,
    	 	            	    	 slidesToShow: 4,
    	 	            	  	     slidesToScroll: 4
    	 	            	 		 });
                             }


	            		 }
	            	 else
	            		 {

	            			 if (maxState ==0)
	            				{
	            					maxState=100000;
	            				}

	            			 j=0;
	    	           		  for (var i = 0; i < entireData.length; i++)
	    	            		 {
	    	            		   if(authorState == "All Authors")
	    	            			 {
	    	            				if(yearState!="All Years" && yearState ==entireData[i][5] && (maxState > entireData[i][4] && minState < entireData[i][4]) )

	    	            					{
	    	            						finalData[j]=entireData[i];
	    	            						j++;

	    	            					}
	    	            				else if (yearState=="All Years" && (maxState > entireData[i][4] && minState < entireData[i][4]))

	    	            					{

	    	            						finalData[j]=entireData[i];
         										j++;

	    	            					}
	    	            			 }
	    	            	  		else
	    	             	   	 		{

	    	            	  			 if(authorState == entireData[i][2] && yearState!="All Years" && yearState==entireData[i][5] &&  (maxState > entireData[i][4] && minState < entireData[i][4]) )

	            							{
	            								finalData[j]=entireData[i];
	            								j++;
	            							}
	            					 	 else if (authorState == entireData[i][2] && yearState=="All Years" &&  (maxState > entireData[i][4] && minState < entireData[i][4]))

	            							{

	            								finalData[j]=entireData[i];
												j++;

	            							}
                                         //  alert(finalData.length);
	    	               				 }


	    	                 }
                        console.log(finalData)
	    	           	for(var i=0;i<finalData.length;i++)
        	 				{

        	 					var id= "image_"+finalData[i][0];

	        	 					$sectionId.append($("<div>").append($("<img>").attr('src',"data:image/jpg;base64, "+ finalData[i][6])));


        	 				}



            		  	 $(".regular").slick({

	            	   				 dots: false,
	            	  		 		 infinite: true,
	            	    			 slidesToShow: 4,
	            	  	  			 slidesToScroll: 4,
	            	  	  			 focusOnSelect:true,
	            	  	  			  touchMove: false,
	            	 			 });



	    	           	if (finalData.length==0)
	    	           		{
	    	           		alert("0");
	    	           		document.getElementById("noresult").style.display ="";
	    	           		document.getElementById("noresult").innerHTML="No Books available...sorry";

	    	           		}
	            		 }
                    //action on clicking any book image on slick slider

                    $('.slick-slide').on('click', function(ev)
	           			{
	           			       console.log("clicked.!!");
	           		           index=$(ev.currentTarget).data('slick-index');

	           		           if(finalData.length<=index)
	           		           {
	           		              index=index-finalData.length;
	           		              console.log(index);
	           		              console.log(finalData[index]);
	           		           }
	           		           else
	           		           {
	           		             console.log(finalData[index]);

	           		           }
                              var expandImg = document.getElementById("expandedImg");
                              var imgText = document.getElementById("imgtext");
                              document.getElementById("selected-book-details").style.display = "block";
                              document.getElementById("carDet").style.display = "";
                              document.getElementById("open-button").style.display = "";

                               document.getElementById("bookName").innerHTML="hello";
                              document.getElementById("bookAuthor").innerHTML="tada";
                              document.getElementById("bookPrice").innerHTML="";
                              document.getElementById("bookYear").innerHTML="";

                               expandImg.src = "data:image/jpg;base64, "+ finalData[index][6];
                         //         imgText.innerHTML = imgs.alt;
                                  expandImg.parentElement.style.display = "block";
                                  $('html, body').animate({
  	                                 scrollTop: $("#expandedImg").offset().top
  	                                 }, 700);


	           		     });



	           		//scroll animation using jquery
	           		/*
	           		$('html, body').animate({
	        	        scrollTop: $("#search-car-details").offset().top
	        	    }, 500);
                    */

	             });








}

//block keyboard buttons
 function blockSpecialCharAndAlpha(e)
 {
         var k;
         document.all ? k = e.keyCode : k = e.which;
         return ( k == 8 || (k >= 48 && k <= 57));
 }

 function blockSpecialCharAndNumbers(e)
 {
        var k;
         document.all ? k = e.keyCode : k = e.which;
         return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k==39 );
 }

function redirectAboutUs()
{

   
    $('html, body').animate({
        scrollTop: $("#About-us").offset().top
    }, 1000);

}