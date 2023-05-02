function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

function modalDelay(){
  if (getCookie("group")==undefined){
    $(document).ready(function(){
        setTimeout(function(){
            $('#myModal').modal('show');
        }, 1200);
    });}
}
// 
function chooseschedule (day){
    var group = getCookie("group");
    if (group != undefined){
        var imgname ="schedules/"+group+"_"+day+".png";
        document.getElementById("schedule").src=imgname;
        document.getElementById("schedulecaption").innerHTML="Day"+day+" Schedule for " + group;
    }
}
function loadnavbar() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
  
    $("#navbar-placeholder").load("navbar.html", function () {
      $('.nav-link[href="' + page + '"]').addClass("active");
    });
  }
  
function getfullschedule (){
  var group=(getCookie("group"))
  if (group!=undefined){
    var pdfname="./schedules/"+group+".pdf"
    document.getElementById("schedulepdf").href=pdfname;
    document.getElementById("schedulepdf").innerHTML=group + " Schedule PDF"
  }
}
function doneCookie(task){
  document.cookie=task+"= 'done'"
}

function setPendingNavbar (){
  for (p in pending){
    if (getCookie(cookie_name)==undefined){
      //generate button with onclick equal to doneCookie(cookie_name) and innerhtml is <a href={href}>{name of button}</a>
      //SOMEHOW add button element to pending navbar
      //pending navbar.hidden = false;

    }
  }
}

// I have added code to certain buttons throughout my webpage to add a cookie that verifies that this button has been clicked
// If that button has not been clicked yet by the user, I want a set of buttons to be generated on the homepage, one for each button that has not been clicked. 
// the buttons should basically be the buttons that have yet to be clicked. 
//each time the user clicks one of the buttons and finishes one of the pending tasks, the button from the homepage should disappear