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
          window.location.href ='/';
          document.getElementById("errorDiv").innerHTML="Registered Succesfully.!";
        }
        else if (response==1)
        {
          document.getElementById("errorDiv").innerHTML="User Name Already Exists.!";
        }
        }
       });

     }





}