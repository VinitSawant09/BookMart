  
/*Initialising various variables */
  var entireData=[]; 
  var finalData=[];
  var uniqueCarBrands=[];
  var uniqueCarTypes=[];
  var count=0;
  var index=0;
  var selectedCar="";
  var featuredCarList=[];
  var selectedBook=null;
  var cartItems=[];
  var finalCheckoutItem=null;
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


	   	             document.getElementById("noresult").style.display ="none";

	            	 var $sectionId = $("#search-car")

	            	 const myNode = document.getElementById("search-car");
	            	 myNode.innerHTML = '';

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
	           		              selectedBook = finalData[index]
	           		           }
	           		           else
	           		           {
	           		             selectedBook = finalData[index]
	           		             console.log(finalData[index]);

	           		           }

                              var expandImg = document.getElementById("expandedImg");
                              var imgText = document.getElementById("imgtext");
                              document.getElementById("selected-book-details").style.display = "block";
                              document.getElementById("carDet").style.display = "";
                              document.getElementById("open-button").style.display = "";

                               document.getElementById("bookName").innerHTML=finalData[index][1];
                              document.getElementById("bookAuthor").innerHTML="Author : "+finalData[index][2];
                              document.getElementById("bookPrice").innerHTML="Price : "+finalData[index][4] + " Euros";
                              document.getElementById("bookYear").innerHTML="Year : "+finalData[index][5] ;
                              document.getElementById("about").innerHTML="About : "+finalData[index][3] ;

                               expandImg.src = "data:image/jpg;base64, "+ finalData[index][6];
                         //         imgText.innerHTML = imgs.alt;
                                  expandImg.parentElement.style.display = "block";
                                  $('html, body').animate({
  	                                 scrollTop: $("#expandedImg").offset().top
  	                                 }, 700);


	           		     });


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

function goHome()
{

window.location.href ='/home/';
}

function openForm()
 {
   document.getElementById("open-button").style.display = "none";
   document.getElementById("myForm").style.display = "block";
   document.getElementById("name").value="";
    var title= document.getElementById("bookName").innerHTML;
   document.getElementById("bookmodel").value= title.replace(/&amp;/g, '&');
   document.getElementById("contactnumber").value="";
 }

function closeForm()
 {

	 document.getElementById("open-button").style.display = "";
	   document.getElementById("myForm").style.display = "none";
	   document.getElementById("name").value="";
	   document.getElementById("bookmodel").value = "";
	   document.getElementById("contactnumber").value="";
	   document.getElementById("nameerror").innerHTML="";
	    document.getElementById("contactnumbererror").innerHTML="";
	    document.getElementById("addresserror").innerHTML="";


 }


 //validate name functionality
 function validateName()
 {
  var name = document.getElementById("name").value;


    if(name == "" || name== null)
    {
      document.getElementById("nameerror").innerHTML="Name cannot be blank";
      return false;
    }
    else
    {
     document.getElementById("nameerror").innerHTML="";
     return true;
    }
 }

//validate phone functionality
 function validatephno()
 {
     var cno = document.getElementById("contactnumber").value;

     if(isNaN(parseFloat(cno)) || cno<1)
     {
       document.getElementById("contactnumbererror").innerHTML="Invalid number";
       return false;
     }
     else
     {

        document.getElementById("contactnumbererror").innerHTML="";
        return true;
     }
 }

 function validateAddress()
 {
  var addr = document.getElementById("address").value;


    if(addr == "" || addr== null)
    {
      document.getElementById("addresserror").innerHTML="Address cannot be blank";
      return false;
    }
    else
    {
     document.getElementById("addresserror").innerHTML="";
     return true;
    }
 }


 //final validation for form
 function submitForm()
 {
   var name = document.getElementById("name").value;
   var bookmodel = document.getElementById("bookmodel").value;
   var address = document.getElementById("address").value;
   var cno = document.getElementById("contactnumber").value;

   var price = document.getElementById("bookPrice").innerHTML;
   price =price.replace("Price :", "")
   price = price.replace("Euros", "")
   alert(price)
   if( !validateName() || !validatephno() || !validateAddress()  )
   {
     return false;
   }


  alert(name+" your details registered successfully for the book model "+ bookmodel);
  document.getElementById("myForm").style.display = "none";
      formData= {
           "bookname": bookmodel,
            "recvName": name,
            "addr": address,
            "phno":  cno,
            "price":price
        }


    $.ajax(
       {
        url  : "/orderBook/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response==0)
        {

          window.location.href =' /home/';

        }
        else
        {
         alert("adding to cart failed.!")
        }
        }
       });




 }


function addToCart()
{
cartItems.push(selectedBook)

formData= {
        "bookid":selectedBook[0],
        "title":selectedBook[1],
        "author":selectedBook[2],
        "desc":selectedBook[3],
        "cost":selectedBook[4],
        "year":selectedBook[5],
        "image":selectedBook[6]
      }
      $.ajax(
       {
        url  : "/addcart/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response!='None')
        {
         console.log(response);

        }
        else
        {
          alert("failed adding to cart");
        }

        }
       });

console.log(selectedBook)
}
function viewCart()
{

       var $itemCount = $("#itemCount");
       var $cartList = $("#cartList");
       var $totalprice =$("#totalprice");
       $("#transactOrder").empty();
        $("#totalprice").empty();


       document.getElementById("changePassword").style.display = 'none';
       document.getElementById("transTable").style.display = 'none';
       $("#cartList").empty();
       $("#itemCount").empty();

       document.getElementById("divshopcart").style.display = '';
       document.getElementById("dropdown_1").style.display = "none";
        document.getElementById("selected-book-details").style.display = "none";
        document.getElementById("carDet").style.display = "none";
        document.getElementById("open-button").style.display = "none";
        document.getElementById("search-car-details").style.display = 'none';

      formData= {

      }
      $.ajax(
       {
        url  : "/fetchCart/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response!='None')
        {
         console.log(response);
         var totalCost=0;
         $itemCount.append(response.length)
         if(response.length>0)
         {
         for (var i=0;i<response.length; i++)
         {
          cartItems.push(response[i])
          $cartList.append($("<p>").append($("<a>").html(response[i][2]+ " -  Cost: €"+response[i][6]+"  ").
          append($("<a>").html("Remove Item  ").attr("id",response[i][0]).attr("href","javascript:void(0);").attr("style","color:red;").attr("onClick","removeCart(this.id)"))
          .append($("<a>").html("&nbsp"))
          .append($("<a>").html("Checkout Item").attr("id",response[i][0]).attr("href","javascript:void(0);").attr("onClick","checkOutCart(this.id)"))));



          totalCost= totalCost + parseInt(response[i][6]);
         }
          $totalprice.append("Total Cost € "+totalCost)
        }
        else
        {

         $cartList.append($("<p>").html("No items added in cart. !"));
        }

        }
        else
        {
          alert("failed fetching the cart");
        }

        }
       });



}

function removeCart(id)
{
console.log("remove Cart");
console.log(id);

 formData= {
        "id":id,
        }
      $.ajax(
       {
        url  : "/removeCart/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response!='None')
        {
         console.log(response);

         viewCart();
        }
        else
        {
          alert("failed deleting from cart");
        }
        }
       });




}

function checkOutCart(id)
{
console.log(cartItems)
var checkOutItem =null;
for(var i =0;i<cartItems.length;i++)
{
   if(cartItems[i][0]==id)
   {
       checkOutItem = cartItems[i];
       finalCheckoutItem = cartItems[i];
   }

}

            console.log(checkOutItem);
            document.getElementById("divshopcart").style.display = 'none';
            var expandImg = document.getElementById("expandedImg");
                                          var imgText = document.getElementById("imgtext");
                                          document.getElementById("selected-book-details").style.display = "block";
                                          document.getElementById("carDet").style.display = "";
                                          document.getElementById("open-button").style.display = "";

                                          document.getElementById('cartButton').style.visibility = 'hidden';

                                           document.getElementById("bookName").innerHTML=checkOutItem[2];
                                          document.getElementById("bookAuthor").innerHTML="Author : "+checkOutItem[3];
                                          document.getElementById("bookPrice").innerHTML="Price : "+checkOutItem[6] + " Euros";
                                          document.getElementById("bookYear").innerHTML="Year : "+checkOutItem[5] ;
                                          document.getElementById("about").innerHTML="About : "+checkOutItem[4] ;

                                           document.getElementById("submitCart").style.display = "";
                                           document.getElementById("submit").style.display = "none";



                                           expandImg.src = "data:image/jpg;base64, "+ checkOutItem[7];
                                     //         imgText.innerHTML = imgs.alt;
                                              expandImg.parentElement.style.display = "block";
                                              $('html, body').animate({
                                                 scrollTop: $("#expandedImg").offset().top
                                                 }, 700);

}

function submitFormCart()
 {
   var id = finalCheckoutItem[0];
   var name = document.getElementById("name").value;
   var bookmodel = document.getElementById("bookmodel").value;
   var address = document.getElementById("address").value;
   var cno = document.getElementById("contactnumber").value;

   var price = document.getElementById("bookPrice").innerHTML;
   price =price.replace("Price :", "")
   price = price.replace("Euros", "")
   alert(price)
   if( !validateName() || !validatephno() || !validateAddress()  )
   {
     return false;
   }


  alert(name+" your details registered successfully for the book model "+ bookmodel);
  document.getElementById("myForm").style.display = "none";

      formData= {
           "bookname": bookmodel,
            "recvName": name,
            "addr": address,
            "phno":  cno,
            "price":price
        }


    $.ajax(
       {
        url  : "/orderBook/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response==0)
        {
          removeCart(id);

          window.location.href =' /home/';

        }
        else
        {
         alert("cart checkout failed.!")
        }
        }
       });




 }