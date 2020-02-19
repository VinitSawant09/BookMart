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
