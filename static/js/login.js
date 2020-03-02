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

	if(username == null || password == null || username =='' || password =='' || repassword == null || repassword =='')
		{

		  document.getElementById("errorDiv").innerHTML="User Name/password cannot be blank.!!";
		  return false;
		}
	else if (password!= repassword)
	{
	    document.getElementById("errorDiv").innerHTML="Rentered password doesn't matches.!";
	    return false;
	}
    else
    {
      alert("entering else up")
      if(checkUserName()!= false)
      {
         alert("entering sign up")
         formData= {
        "username":username,
        "password":password
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

}

function clkChangePw()
{
document.getElementById("addBooks").style.display = 'none';
document.getElementById("changePassword").style.display = 'block';

}