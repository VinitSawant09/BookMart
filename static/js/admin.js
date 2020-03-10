function goAdminHome()
{

window.location.href ='/home/';
}


function addBooksRedirect ()
{
document.getElementById("changePassword").style.display = 'none';
document.getElementById("transTable").style.display = "none";
document.getElementById("addBooks").style.display = 'block';
document.getElementById("countbarchart").style.display = 'none';
document.getElementById("downloadButton").style.display = 'none';

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
/*
const selectedFile = document.getElementById('img').files[0];
alert(selectedFile.size)
alert(selectedFile.type)
var formData = new FormData()
formData.append('file',selectedFile)
*/
//var fname = document.getElementById('img').files[0].name;

if(title=='' || author ==''|| desc=='' || year==''|| cost =='' || image =='' )
{

  document.getElementById("errorDivAddBooks").innerHTML = 'Fields cannot be empty';
  return false;

}
else if( ValidateImg()==false )
{
document.getElementById("errorDivAddBooks").innerHTML = 'Uploaded file is not an image.!';
return false;
}
/*
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
}*/
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


function myFunction()
{
var totalUsersCount=0;
var totalRevenueEarned=0;
var totalBooksSold=0;

var formData={};

 $.ajax(
       {
        url  : "/transacCount/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response!='None')
        {

            totalBooksSold=response[0][0];
            document.getElementById("totalBooksSold").innerHTML="Total Books Sold ="+totalBooksSold;
            var values= [response[0][1],response[0][2],response[0][3],response[0][4],response[0][5],response[0][6],response[0][7]]
            var dates= Last7Days();
            var datesArr = dates.split(',');
            var chartColors = {
              green: 'green',
              red: 'red'
            };

            var ctx = document.getElementById("myChart").getContext("2d");


            var myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: datesArr,
                datasets: [{
                  label: 'Books Sold',
                  backgroundColor: [
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red

                  ],
                  data: values
                }],
              },
                  options: {
                      scales: {
                          yAxes: [{
                              ticks: {
                                  beginAtZero:true
                              }
                          }]
                      },
                      title: {
                         display: true,
                         text: 'No. Of Books Sold in last 7 days'
        }
                  }
            });


            var colorChangeValue = 3; //set this to whatever is the deciding color change value
            var dataset = myChart.data.datasets[0];
            for (var i = 0; i < dataset.data.length; i++) {
              if (dataset.data[i] > colorChangeValue) {
                dataset.backgroundColor[i] = chartColors.green;
              }
            }
            myChart.update();

        }

        }

       });

  $.ajax(
       {
        url  : "/salesCount/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response!='None')
        {

            totalRevenueEarned=response[0][0];

             document.getElementById("totalRevenue").innerHTML= "Total Revenue (Euros) - "+ totalRevenueEarned;

            var values= [response[0][1],response[0][2],response[0][3],response[0][4],response[0][5],response[0][6],response[0][7]]
            var dates= Last7Days();
            var datesArr = dates.split(',');
            var chartColors = {
              green: 'green',
              red: 'red'
            };

            var ctx = document.getElementById("myChart2").getContext("2d");


            var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: datesArr,
                datasets: [{
                  label: 'Euros Earned',
                  backgroundColor: [
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red

                  ],
                  data: values
                }],
              },
                  options: {
                      scales: {
                          yAxes: [{
                              ticks: {
                                  beginAtZero:true
                              }
                          }]
                      },
                      title: {
                         display: true,
                         text: 'Sales Amount in last 7 days'
        }
                  }
            });




        }

        }

       });
    $.ajax(
       {
        url  : "/topBooks/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response!='None')
        {

            var values= [response[0][0],response[1][0],response[2][0],response[3][0],response[4][0]]
            var arr =[response[0][1],response[1][1],response[2][1],response[3][1],response[4][1]]
            var chartColors = {
              green: 'green',
              red: 'red',
              blue:'blue',
              orange:'orange',
              yellow:'yellow'
            };

            var ctx = document.getElementById("myChart3").getContext("2d");


            var myChart = new Chart(ctx, {
              type: 'polarArea',
              data: {
                labels: arr,
                datasets: [{
                  label: 'Top 5 Books Sold',
                  backgroundColor: [
                    chartColors.green,
                    chartColors.red,
                    chartColors.blue,
                    chartColors.orange,
                    chartColors.yellow


                  ],
                  data: values
                }],
              },
                  options: {
                      scales: {
                          yAxes: [{
                              ticks: {
                                  beginAtZero:true
                              }
                          }]
                      },
                      title: {
                         display: true,
                         text: 'Top 5 Popular Books'
        }
                  }
            });

            myChart.update();

        }

        }

       });


        $.ajax(
       {
        url  : "/topUsers/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response!='None')
        {

            var values= [response[0][0],response[1][0],response[2][0],response[3][0],response[4][0]]
            var arr =[response[0][1],response[1][1],response[2][1],response[3][1],response[4][1]]
            var chartColors = {
              green: 'green',
              red: 'red',
              blue:'blue',
              orange:'orange',
              yellow:'yellow'
            };

            var ctx = document.getElementById("myChart4").getContext("2d");


            var myChart = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: arr,
                datasets: [{
                  label: 'Top 5 Users.',
                  backgroundColor: [
                    chartColors.green,
                    chartColors.red,
                    chartColors.blue,
                    chartColors.orange,
                    chartColors.yellow


                  ],
                  data: values
                }],
              },
                  options: {
                      scales: {
                          yAxes: [{
                              ticks: {
                                  beginAtZero:true
                              }
                          }]
                      },
                      title: {
                         display: true,
                         text: 'Top 5 Customers based on purchases.'
             }
                  }
            });



        }

        }

       });

       $.ajax(
       {
        url  : "/countUsers/",
        contentType: "application/json",
        data: JSON.stringify(formData),
        type : 'POST',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){

        if (response!='None')
        {
           totalUsersCount=response;
           console.log(response);
           document.getElementById("totalUserCount").innerHTML="Total Users = "+totalUsersCount;

        }
       }
       });




}
function Last7Days () {
    return '0123456'.split('').map(function(n) {
        var d = new Date();
        d.setDate(d.getDate() - n);

        return (function(day, month, year) {
            return [day<10 ? '0'+day : day, month<10 ? '0'+month : month, year].join('/');
        })(d.getDate(), d.getMonth(), d.getFullYear());
    }).join(',');
 }
