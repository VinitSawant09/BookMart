function addBooksRedirect ()
{
document.getElementById("changePassword").style.display = 'none';
document.getElementById("addBooks").style.display = 'block';
}

function addBookValid()
{
document.getElementById("errorDivAddBooks").innerHTML = '';
var title = document.getElementById("title").value;
var author =  document.getElementById("author").value;
var desc =  document.getElementById("desc").value;
var year = document.getElementById("year").value;
var cost = document.getElementById("cost").value;
var image =  document.getElementById("img").value;

const selectedFile = document.getElementById('img').files[0];
alert(selectedFile.size)
alert(selectedFile.type)
var formData = new FormData()
formData.append('file',selectedFile)

var fname = document.getElementById('img').files[0].name;

if(title=='' || author ==''|| desc=='' || year==''|| cost =='' || image =='' )
{

  document.getElementById("errorDivAddBooks").innerHTML = 'Fields cannot be empty';
  return false;

}
else if( ValidateImg()==false )
{
document.getElementById("errorDivAddBooks").innerHTML = 'Uploaded file is not an image.!';
}

else
{
formData= {
        "title":title,
        "author":author,
        "desc":desc,
        "year":year,
        "cost":cost,
        "image":formData,
        "fname": fname
      }
      $.ajax(
       {
        url  : "/addBooks/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response==0)
        {
         alert("Book Inserted");
        }
        else
        {
          alert("Book not Inserted");
        }

        }
       });
}

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
