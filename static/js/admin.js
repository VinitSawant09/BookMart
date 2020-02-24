function addBooksRedirect ()
{
document.getElementById("changePassword").style.display = 'none';
document.getElementById("addBooks").style.display = 'block';
}

function addBookValid()
{
 document.getElementById("errorDivAddBooks").innerHTML = '';
var title = document.getElementById("booktitle").value;
var author =  document.getElementById("author").value;
var desc =  document.getElementById("desc").value;
var year = document.getElementById("year").value;
var cost = document.getElementById("cost").value;
  var image =  document.getElementById("img").value;
if(title=='' || author ==''|| desc=='' || year==''|| cost =='' || image =='' )
{

  document.getElementById("errorDivAddBooks").innerHTML = 'Fields cannot be empty';
  return false;

}
else if( ValidateImg()==false )
{
document.getElementById("errorDivAddBooks").innerHTML = 'Uploaded file is not an image.!';
}
return true;

}


function ValidateImg() {

    var _validFileExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
    var img =  document.getElementById("img").value;
    img = img.split('.').pop();

    for (var i=0 ;i< _validFileExtensions.length ; i++ )
    {
     if (img == _validFileExtensions[i])
     {
      return true ;
     }
    }

    return false;
}




function addBook()
{

   if(addBookValid())
   {
     return true;

   }

return false;

}