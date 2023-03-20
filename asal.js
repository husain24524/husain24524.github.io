var validWords=[];
var letters = "";
var discoveredWords =[];
var totalScore = 0;
var pangram = "";
var centerLetter = "";
var cursor = true;
var numFound = 0;
var maxscore = 0;
setInterval(() => {
  if(cursor) {
    document.getElementById('cursor').style.opacity = 0;
    cursor = false;
  }else {
    document.getElementById('cursor').style.opacity = 1;
    cursor = true;
  }
}, 600);

//makes http request to an awi api endpoint that triggers a lambda function to return today's letters/words
//today's words and letters are generated by a lambda function from the valid_words.json dictionary 
// function get_valid_words(){

//     const url='https://uxxjtb4jz0.execute-api.us-east-1.amazonaws.com/default/FindValidWords';

//     var request = new XMLHttpRequest();
//     request.open('GET', url, true);
//     request.setRequestHeader("Content-type", "text/plain");
//     request.onreadystatechange = function(){
//       try {
//         var data = JSON.parse(this.response);
//         //3 is LOADING, 4 is DONE
//         if(request.readyState == 3 && request.status == 200){
//           console.log(data)
//           letters = data['letters'];
//           validWords = data['possible_words'];
//           pangram = data['pangram'];
//           maxscore = data['maxscore'];
//           letters=["م","ل","ب","ن","ت","ج","ع"]
//           console.log(letters)
//           initialize_letters();
//           initialize_score();
//           console.log(validWords);
//           validWords=["بن","لبن","نمل","جمن","نجم","نعل","بنت","جلن","نجل"]

//         }
//       } 
//       catch (e){
//         console.log('error')
//       };
//     };
//     request.send();
// }
function get_valid_words(){
  letters=["م","ل","ب","ن","ت","ج","ع"]
  validWords=["بن","لبن","نمل","جمن","نجم","نعل","بنت","جلن","نجل","تن","تجنب","لن","جن","جنم","جنت","من","منن","منعم","منع","منجم","منبع","ممتنع","نعم","نت","نعت"]
  maxscore=validWords.length;
  initialize_score();
  initialize_letters();
}



function initialize_score(){
  document.getElementById("maxscore").innerHTML = String(maxscore);
}
//Creates the hexagon grid of 7 letters with middle letter as special color
function initialize_letters(){
    
    var hexgrid = document.getElementById('hexGrid')
    for(var i=0; i<letters.length; i++){
        var char = letters[i];
        
        var pElement = document.createElement("P");
        pElement.innerHTML = char;
        
        var aElement = document.createElement("A");
        aElement.className = "hexLink";
        aElement.href = "#";
        aElement.appendChild(pElement);
        aElement.addEventListener('click', clickLetter(char), false);

        var divElement = document.createElement('DIV');
        divElement.className = "hexIn"; 
        divElement.appendChild(aElement);
        
        var hexElement = document.createElement("LI");
        hexElement.className = "hex";
        hexElement.appendChild(divElement);
        if(i==3){
          aElement.id = "center-letter";
          centerLetter = letters[i];
        }
        hexgrid.appendChild(hexElement);
    }
}

Array.prototype.shuffle = function() {
  let input = this;
  for (let i = input.length-1; i >=0; i--) {
    let randomIndex = Math.floor(Math.random()*(i+1)); 
    let itemAtIndex = input[randomIndex]; 
    input[randomIndex] = input[i]; 
    input[i] = itemAtIndex;
  }
  return input;
}

function shuffleLetters() {
    letters.shuffle()
    //get center letter back to letter[3]
    var centerIndex = letters.indexOf(centerLetter);
    if(letters[3] != centerLetter) {
        var temp = letters[3];
        letters[3] = centerLetter;
        letters[centerIndex] = temp;
    }
    var hexgrid = document.getElementById('hexGrid')
    while (hexgrid.firstChild) {
      hexgrid.removeChild(hexgrid.firstChild);
    }
    initialize_letters()

    /*
    //fill in shuffled letters into hex grid 
    for(var i=0; i<letters.length; i++) {
        var char = letters[i];
        var hexLetterElement = document.getElementsByClassName("hexLink");
        hexLetterElement[i].removeChild(hexLetterElement[i].firstChild);

        var pElement = document.createElement("P");
        pElement.innerHTML = char;
        hexLetterElement[i].appendChild(pElement); 
    }*/
}

//Validate whether letter typed into input box was from one of 7 available letters
// document.getElementById("testword").addEventListener("keydown", function(event){
//     if(!letters.includes(event.key.toUpperCase())){
//         alert('Invalid Letter Typed')
//         event.preventDefault();
//     }
//   }
//   )

//When letter is clicked add it to input box
var clickLetter = function(letter){
  return function curried_func(e){
    var tryword = document.getElementById("testword");
    tryword.innerHTML = tryword.innerHTML + letter.toLowerCase();
  }
}

//Deletes the last letter of the string in the textbox
function deleteLetter(){
  var tryword = document.getElementById("testword");
  var trywordTrimmed = tryword.innerHTML.substring(0, tryword.innerHTML.length-1);
  tryword.innerHTML = trywordTrimmed
  if(!checkIncorrectLetters(trywordTrimmed)) {
      tryword.style.color = 'black';
  }
}

function wrongInput(selector){
  $(selector).fadeIn(1000);
  $(selector).fadeOut(500);
  $("#cursor").hide();
  $( "#testword" ).effect("shake", {times:2.5}, 450, function(){
      clearInput();
      $("#cursor").show();
    } );

}

function rightInput(selector){
  $(selector).fadeIn(1500).delay(500).fadeOut(1500);
  
  clearInput();
}

function clearInput(){
  $("#testword").empty();
}

function showPoints(pts){
  $(".points").html("+" + pts);

}
//check if the word is valid and clear the input box
//word must be at least 4 letters
//word must contain center letter
//word can't already be found 
function submitWord(){
  var tryword = document.getElementById('testword');
  var centerLetter = document.getElementById('center-letter').firstChild.innerHTML;

  let score = 0;
  var isPangram = false;
  var showScore = document.getElementById("totalScore");

  if(tryword.innerHTML.length < 1){ 
    wrongInput("#too-short");
  }else if(discoveredWords.includes(tryword.innerHTML.toLowerCase())){
    wrongInput("#already-found");
  }else if(!tryword.innerHTML.toLowerCase().includes(centerLetter.toLowerCase())){
    wrongInput("#miss-center");

  }else if(validWords.includes(tryword.innerHTML.toLowerCase())){

    var isPangram = checkPangram(tryword.innerHTML);
    score = calculateWordScore(tryword.innerHTML, isPangram);
    addToTotalScore(score);
    console.log("totalscore: " + totalScore);
    
    showDiscoveredWord(tryword.innerHTML);
    numFound++;
    document.getElementById("numfound").innerHTML = numFound;
    document.getElementById("score").innerHTML = totalScore;

    var l = tryword.innerHTML.length;
    if(isPangram){
      rightInput("#pangram");
      showPoints(17);
    }else if(l < 5){
      rightInput("#good");
      showPoints(1);
    }else if(l<7){
      rightInput("#great");
      showPoints(l);
    }else{
      rightInput("#amazing");
      showPoints(l);
    }

  }else{
    wrongInput("#invalid-word");
  }
}

//if word was valid, display it 
//if all words are found end game.
function showDiscoveredWord(input){
    
    var discText = document.getElementById("discoveredText");
    discoveredWords.push(input.toLowerCase());
    discoveredWords.sort() 
    while(discText.firstChild){
      discText.removeChild(discText.firstChild);
    }

    var numFound = discoveredWords.length; 
    var numCol = Math.ceil(numFound/6);
    var w = 0; 
    for(var c=0; c<numCol; c++){
      var list = document.createElement("UL");
      list.id= "discovered-words"+c;
      list.style.cssText = "padding:5px 10px; font-weight:100; ";
      discText.appendChild(list);
      var n = 6; 
      if(c == numCol-1){
        if(numFound%6 ==0){
          if(numFound==0){
            n = 0
          }
          else{
            n=6;
          }
        }else{
        n = numFound%6;}
      }
      for(var i=0; i<n; i++){
        var listword = document.createElement("LI");
        var pword = document.createElement("P");
        pword.innerHTML = discoveredWords[w]; 
        listword.appendChild(pword);
        list.appendChild(listword);
        w++;
      }
    }
    if (numFound == validWords.length){
      alert("You have found all of the possible words! Thanks for playing");
    }
}

//adds input "score" to the total score of user
function addToTotalScore(score) {
  totalScore += score;
}

//calculates the score of input "input" and also adjusts if "input" is a pangram 
function calculateWordScore(input, isPangram) {
  
  let len = input.length;
  let returnScore = 1; 
  if(len > 4) {
    if(isPangram) {
      returnScore = len + 7;
      
    }else{
      returnScore = len;
    }
  }
  console.log('score ' + returnScore)
  return returnScore;
}

//checks if "input" word is a pangram
function checkPangram(input) {
  
  var i;
  var containsCount = 0;
  var containsAllLetters = false;
  for(i = 0; i < 7; i++) {
    if(input.includes(letters[i])) {
      containsCount++;
    }
  }
  if(containsCount == 7) {
    containsAllLetters = true;
  }
  console.log("isPangram?: " + containsAllLetters);
  return containsAllLetters;
  
  // console.log(input.value);
  // if(input==pangram){
  //  return true;
  // }
 return false;
}

function checkIncorrectLetters(input) {
  var i;
  var badLetterCount = 0;
  for(i = 0; i < input.length; i++) {
    if(!letters.includes(input[i])) {
      badLetterCount++;
    }
  }
  if(badLetterCount > 0) {
    return true;
  }
  return false;
}

//takes keyboard event from user and determines what should be done
function input_from_keyboard(event) {
  var tryword = document.getElementById("testword");

  if(event.keyCode == 13) {
    submitWord();
  }

  if(event.keyCode == 8) {
    deleteLetter();
  }

  //validation for just alphabet letters input
  if(event.keyCode >= 97 && event.keyCode <= 122 ||
    event.keyCode >=65 && event.keyCode <=90) {
    tryword.innerHTML = tryword.innerHTML+ String.fromCharCode(event.keyCode).toLowerCase();
    if(checkIncorrectLetters(tryword.innerHTML)) {
      tryword.style.color = 'grey';
    }
  }
}