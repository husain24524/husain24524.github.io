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
      document.getElementById("schedulepdf").innerHTML=group + " Schedule PDF";
      document.getElementById("grouplogo").src="./images/groups/"+group+".png"
    }
  }
function doneCookie(task){
  document.cookie=task+"= done"
}

function loadResourceBar (){
  var path = window.location.pathname;
  var page = path.split("/").pop();
  
    $("#resourcebar-placeholder").load("resourcebar.html");

}


function trr(){
  var tr  = document.getElementById("tr").value;
  groupdata={
    "27737": "1CMSaifee",
    "27739": "1CMBurhani",
    "27740": "1AFNakhlat",
    "27742": "1AFNakhlat",
    "27743": "1CMSaifee",
    "27744": "1BFRummaan",
    "27745": "1BFRummaan",
    "27747": "1AMBurhani",
    "27748": "1CFNakhlat",
    "27750": "1AFNakhlat",
    "27753": "1CMSaifee",
    "27754": "1BMBurhani",
    "27758": "1BFRummaan",
    "27760": "1AMBurhani",
    "27768": "1CFNakhlat",
    "27775": "1CMSaifee",
    "27776": "1AFNakhlat",
    "27794": "1BFRummaan",
    "27796": "1AMBurhani",
    "27800": "1BFNakhlat",
    "27803": "1BMSaifee",
    "27806": "1BMSaifee",
    "27808": "1AFRummaan",
    "27813": "1AFRummaan",
    "27817": "1BFNakhlat",
    "27823": "1BFNakhlat",
    "27827": "1BMSaifee",
    "27828": "1CMBurhani",
    "27831": "1CFNakhlat",
    "27832": "1AMBurhani",
    "27838": "1AFRummaan",
    "27842": "1CFNakhlat",
    "27844": "1CFNakhlat",
    "27845": "1AMBurhani",
    "27846": "1BMSaifee",
    "27851": "1CFNakhlat",
    "27853": "1AFRummaan",
    "27858": "1BFNakhlat",
    "27860": "1AFRummaan",
    "27861": "1CFRummaan",
    "27863": "1BMSaifee",
    "27864": "1CFRummaan",
    "27868": "1CMBurhani",
    "27870": "1CFRummaan",
    "27879": "1AFRummaan",
    "27881": "1BMSaifee",
    "27886": "1BMSaifee",
    "27887": "1CFRummaan",
    "27888": "1AMBurhani",
    "27890": "1CMBurhani",
    "27891": "1BMSaifee",
    "27899": "1BFNakhlat",
    "27902": "1AMBurhani",
    "27903": "1AMBurhani",
    "27905": "1CMBurhani",
    "27907": "1CMBurhani",
    "27910": "1AMBurhani",
    "27915": "1CFRummaan",
    "27916": "1AFRummaan",
    "27917": "1CMBurhani",
    "27922": "1BFNakhlat",
    "27926": "1CFRummaan",
    "27927": "1BFNakhlat",
    "27928": "1CFRummaan",
    "27930": "1AFRummaan",
    "27935": "1BMSaifee",
    "27937": "1BFNakhlat",
    "27941": "1BFNakhlat",
    "27945": "1AFRummaan",
    "27946": "1AFRummaan",
    "27949": "1CFRummaan",
    "27952": "1CMBurhani",
    "27956": "1CFRummaan",
    "27959": "1CMBurhani",
    "27960": "1AMSaifee",
    "27961": "1BFRummaan",
    "27968": "1BMBurhani",
    "27969": "1CMSaifee",
    "27970": "1AMSaifee",
    "27972": "1AFNakhlat",
    "27973": "1AFNakhlat",
    "27979": "1AMSaifee",
    "27980": "1CMSaifee",
    "27981": "1BFRummaan",
    "27982": "1CFNakhlat",
    "27983": "1BMBurhani",
    "27984": "1AMSaifee",
    "27986": "1AFNakhlat",
    "27987": "1BFRummaan",
    "27989": "1BMBurhani",
    "27990": "1CFNakhlat",
    "27991": "1AFNakhlat",
    "27993": "1BFRummaan",
    "27995": "1BFRummaan",
    "27996": "1AMSaifee",
    "27999": "1AMSaifee",
    "28000": "1BMBurhani",
    "28003": "1BMBurhani",
    "28007": "1BFRummaan",
    "28008": "1BMBurhani",
    "28009": "1AFNakhlat",
    "28012": "1AMSaifee",
    "28016": "1AMSaifee",
    "28020": "1CFNakhlat",
    "28021": "1AFNakhlat",
    "28023": "1CMSaifee",
    "28024": "1BMBurhani",
    "28027": "1CMSaifee",
    "28028": "1BMBurhani",
    "28030": "1CFNakhlat",
    "28031": "1AMSaifee",
    "28032": "1CMSaifee",
    "28038": "1BFNakhlat",
    "00000":"ADMIN"
  }
  var group = groupdata[tr]
  if (group != undefined){
    alert("Welcome! \n Your Orientation group is \n"+group+". \n Your Group's schedule is available below.")
    document.cookie="group="+groupdata[tr]
    document.cookie="tr="+tr;
    gtag('event', 'TR_Entered', {'tr':tr});
    location.reload()
  }else{
    alert("Not a valid TR Number. Please try again.")
  }
  
}