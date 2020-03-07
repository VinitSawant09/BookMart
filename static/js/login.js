function loginForm()
{
    document.getElementById("errorDiv").innerHTML="";
    var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;

	if(username == null || password == null || username =='' || password =='')
		{

		  document.getElementById("errorDiv").innerHTML="User Name/password cannot be blank.!!";
		  return false;
		}
    else
    {

      formData= {
        "username":username,
        "password":password
      }
      $.ajax(
       {
        url  : "/login/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response==0)
        {
          window.location.href ='/home/';
        }
        else
        {
          document.getElementById("errorDiv").innerHTML="Invalid credentials!";
        }

        }
       });

     }
}

function logout()
{
 window.location.href ='/logout/';
}

function forgotPassword()
{

document.getElementById("divPassword").innerHTML="";
document.getElementById("buttons").innerHTML="";
document.getElementById("sendPassword").style.display = 'block';
document.getElementById("fpass").innerHTML="";

return true;
}

function sendPassword()
{
  var username=document.getElementById("username").value;
  if(username == null || username =='')
		{

		  document.getElementById("errorDiv").innerHTML="User Name cannot be blank.!!";
		  return false;
		}
  else
  {
      formData= {
        "username":username
      }
      $.ajax(
       {
        url  : "/sendPassword/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response==0)
        {
          window.location.href ='/';
          alert("Please check your mail for Password and sign in.")
        }
        else
        {
          document.getElementById("errorDiv").innerHTML="User Name is invalid.!";
        }

        }
       });


  }
  return true;

}


function redirectTosignUp()
{
window.location.href ='/register/';

}

function checkUserName()
{
 var username=document.getElementById("username").value;
 document.getElementById("errorDiv").innerHTML="";

 if(username == null || username =='')
		{

		  document.getElementById("errorDiv").innerHTML="User Name cannot be blank.!!";
		  return false;
		}
  else
  {
      formData= {
        "username":username
      }
      $.ajax(
       {
        url  : "/checkUserName/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response!=0)
        {
          document.getElementById("errorDiv").innerHTML="User Name already exists.!";
          return false;
        }

        }
       });
    }
return true;

}


function signUp()
{

    document.getElementById("errorDiv").innerHTML="";
    var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	var repassword=document.getElementById("repassword").value;
	var email = document.getElementById("email").value;

	if(username == null || password == null || username =='' || password =='' || repassword == null || repassword =='' || email == null || email =='')
		{

		  document.getElementById("errorDiv").innerHTML="Fields cannot be blank.!!";
		  return false;
		}
	else if (password!= repassword)
	{
	    document.getElementById("errorDiv").innerHTML="Rentered password doesn't matches.!";
	    return false;
	}
	else if (validateEmail(email) == false)
	{
	   document.getElementById("errorDiv").innerHTML="Invalid email Id";
	}
    else
    {

      if(checkUserName()!= false)
      {

         formData= {
        "username":username,
        "password":password,
        "email":email
        }
      $.ajax(
       {
        url  : "/signup/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response==0)
        {
          window.location.href ='/home';
          alert("You can proceed for login");

        }
        else if (response==1)
        {
          document.getElementById("errorDiv").innerHTML="User Name Already Exists.!";
        }
        }
       });

  }
     }

}

function changePassword()
{
document.getElementById("errorDiv").innerHTML="";
var password=document.getElementById("password").value;
var newPassword= document.getElementById("repassword").value;
document.getElementById("divshopcart").style.display = '';

if(password==newPassword)
{
document.getElementById("errorDiv").innerHTML="Old password is same as new password";
return false;
}
else
{
         formData= {
        "password":newPassword,
        }
      $.ajax(
       {
        url  : "/changePassword/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response==0)
        {
          document.getElementById("errorDiv").innerHTML="Password changed sucessfully.!";
        }
        else if (response==1)
        {
          document.getElementById("errorDiv").innerHTML="Password not changed.!";
        }
        }
       });

  }

}


function checkPassword()
{
 var password=document.getElementById("password").value;
 document.getElementById("errorDiv").innerHTML="";
      formData= {
        "password":password
      }
      $.ajax(
       {
        url  : "/checkPassword/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response!=0)
        {
          document.getElementById("errorDiv").innerHTML="Password doesn't match.!";
          return false;
        }

        }
       });
    return true;

}

function clkChangePwUser()
{

document.getElementById("dropdown_1").style.display = "none";
document.getElementById("selected-book-details").style.display = "none";
document.getElementById("carDet").style.display = "none";
document.getElementById("open-button").style.display = "none";
document.getElementById("changePassword").style.display = 'block';
document.getElementById("search-car-details").style.display = 'none';
document.getElementById("transTable").style.display = 'none';
 document.getElementById("divshopcart").style.display = 'none';

}

function clkChangePw()
{
document.getElementById("addBooks").style.display = 'none';
document.getElementById("changePassword").style.display = 'block';
document.getElementById("transTable").style.display = "none";


}

function clkTransac()
{
$("#transactOrder").empty();
document.getElementById("dropdown_1").style.display = "none";
document.getElementById("selected-book-details").style.display = "none";
document.getElementById("carDet").style.display = "none";
document.getElementById("open-button").style.display = "none";
document.getElementById("changePassword").style.display = 'none';
document.getElementById("search-car-details").style.display = 'none';
document.getElementById("divshopcart").style.display = 'none';
document.getElementById("transTable").style.display = "";
var $tableId = $("#transactOrder")
 formData= {
        }


    $.ajax(
       {
        url  : "/getorderBookUser/",
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
         for (var i=0;i < response.length; i++)
         {
          $tableId.append($("<tr>").append($("<td>")
          .html(response[i][0])).append($("<td>").html(response[i][2]))
          .append($("<td>").html(response[i][3]))
          .append($("<td>").html(response[i][5]))
          .append($("<td>").html(response[i][6]))
          .append($("<td>").html(response[i][7]))
         );
         }
                     $(document).ready(function () {
              $('#dtBasicExample').DataTable();
              $('.dataTables_length').addClass('bs-select');
            });

        }
        else
        {
         alert("Transaction failed.!")
        }
        }
       });

}
function clkTransacAdmin()
{
$("#transactOrder").empty();
document.getElementById("addBooks").style.display = 'none';
document.getElementById("changePassword").style.display = 'none';
document.getElementById("transTable").style.display = "";

var $tableId = $("#transactOrder")
 formData= {
        }


    $.ajax(
       {
        url  : "/getallorderBook/",
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
         for (var i=0;i < response.length; i++)
         {
          $tableId.append(
          $("<tr>").append($("<td>").html(response[i][0]))
          .append($("<td>").html(response[i][1]))
          .append($("<td>").html(response[i][2]))
          .append($("<td>").html(response[i][3]))
          .append($("<td>").html(response[i][4]))
          .append($("<td>").html(response[i][5]))
          .append($("<td>").html(response[i][6]))
          .append($("<td>").html(response[i][7]))
         );
         }
                     $(document).ready(function () {
              $('#dtBasicExample').DataTable();
              $('.dataTables_length').addClass('bs-select');
            });

        }
        else
        {
         alert("Transaction failed.!")
        }
        }
       });

}

function validateEmail(email)
{
    var re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return re.test(String(email).toLowerCase());
}

