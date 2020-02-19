function loginForm()
{
    document.getElementById("errorDiv").innerHTML="";
    var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;

	if(username == null || password == null || username =='' || password =='')
		{
		  alert("inside if");
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
        alert(response);
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
		  alert("inside if");
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
        alert(response);
        if (response==0)
        {
          window.location.href ='/';
          document.getElementById("errorDiv").innerHTML="Registred Succesfully.!";
        }
        }
       });

     }


}