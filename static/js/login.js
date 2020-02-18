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
      $.ajax(
       {
        url  : "/login/",
        data : 'hello',
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(){
        /*window.location.href ='/home.html';*/

        }
       });

     }
}
