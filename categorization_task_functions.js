/**
Various useful functions
**/

function emotionValence(emotion){ //choose positive or negative valence
  if (emotion == 'positive'){
    Face.emotionX = 50;
    Face.path = 'stimuli/positive/';
  } else if (emotion == 'negative'){
    Face.emotionX = 100;
    Face.path = 'stimuli/negative/';
  }
  return Face.emotionX
}

function loadStimulus(type,start,end) { //the start and ending index of the images
  var list = [];
  for(i = start; i < (end+1); i++){
    if (type == 'practice'){
      list.push( 'stimuli/practice/' + '1_0' + ("0" + i).slice(-2) + '.png');
    } else if (Face.emotionX == 50){
    list.push( 'stimuli/positive/' + i + '.jpg');
    } else {list.push( 'stimuli/negative/' + '1_0' + ('0' + i).slice(-2) + '.png');}}
  return list;
}

function getStimList(min1,max1,min2,max2) {  //min1:first index of practice stim, min1:first index of task stim
  var stims = [];
  for(i = min2; i < (max2+1); i++){    //use loop to get a list of stimulus with sequential numbers in file names
      if (Face.emotionX == 50){
             stims.push( 'stimuli/positive/' + i + '.jpg');
      } else { stims.push( 'stimuli/negative/' + '1_0' + ("0" + i).slice(-2) + '.png')}};//add task stims
  var stims = jsPsych.randomization.shuffle(stims);

  for(i = min1; i < (max1+1); i++){    //use loop to get a list of stimulus with sequential numbers in file names
      stims.push( 'stimuli/practice/' + '1_0' + ("0" + i).slice(-2) + '.png')};//add practice stims
  return stims;  //attention please! in the list, 4 practice stimulus are AT TGE END (for convenience of shuffling and ordering)
}

function loadFacePool(start,end) { //the start and ending index of the images
  var list = [];
  for(i = start; i < (end+1); i++){
     list.push( 'img/A' + i + '.jpg'); list.push( 'img/B' + i + '.jpg');
     list.push( 'img/C' + i + '.jpg'); list.push( 'img/D' + i + '.jpg');}
  return list;
}

function createSlideList(start,end){
  var list = [];
  for (i = start; i < (end+1); i++){
     list.push( 'img/ins/Slide ' + i + '.png');}
  return list;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random()*(max - min + 1) + min);
}

function getRandomElement (list){
  return list[Math.floor(Math.random()*list.length)];
}

function checkID (){
  var lasttrialdata = jsPsych.data.getLastTrialData().select('responses').values[0];
  var textInput = JSON.parse(lasttrialdata).Q0;
  var patt = new RegExp("^[a-zA-Z_0-9]{1,}$"); //the first and last character (this doesn't allow punctuations)
    if (!patt.test(textInput)){      //test if first/last character in response exist
      alert("Please, enter your participant id");
      return true; }
    else{ return false;}
}

function checkUser (){//check if user has been in list of
  var inputText = jsPsych.data.getLastTrialData().select('responses').values[0];
  var userID = JSON.parse(inputText).Q0;
  if(userList.responseText.includes(userID)){
    alert('It seems that you have participated in the experiment before. Thank you for your participation!');
    window.close();
    return true;
  } else { return false;}
}

function checkAnswer (){
  var inputText = jsPsych.data.getLastTrialData().select('responses').values[0];
  var text = JSON.parse(inputText).Q0;
  var patt = new RegExp("[A-Za-z0-9 _.,!'/$]"); // this allows punctuations
  if (!patt.test(inputText  )){      //test if first/last character in response exist
    alert("Please describe the image just showed in a few words (this will be uses for validation purposes)");
    return true; }
  else{ return false;}
}

function checkCitizen (){
  var choice = jsPsych.data.getLastTrialData().select('button_pressed').values[0];
  if(choice == 1){
    alert('As mentioned in the study description, this study is limited to Americian participants. Your session will be terminated and the window will be closed.');
    window.close();
    return true;
  } else { return false;}
}

function checkPhone (){
  var choice = jsPsych.data.getLastTrialData().select('button_pressed').values[0];
  if(choice == 0){
    alert('As mentioned in the study description, this study can only be done a computer and would not work on a smartphone. Your experiment will be terminated and the window will be closed.');
    window.close();
    return true;
  } else { return false;}
}

var check_consent = function(elem) {
  if ($('#consent_checkbox').is(':checked')) {
    return true;
  }else {
    alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
    return false;
  } return false;
}

function getNextSlide () {  //use to shift instruction slides
  var currentSlide = slideList.shift();
  return currentSlide;
}

function getSortImage(){ //the image for minimal group paradigm
  stim = '<img src=img/sort/'+ Object.keys(sortImage)[0] +'.jpg style="margin:30px">'+
         '<img src=img/sort/'+ Object.keys(sortImage)[1]+'.jpg style="margin:30px">';
  return stim
}

function getPrompt(){ //the prompt for minimal group paradigm
  return sortPrompt.shift();
}

function getOptions(){   //the options for minimal group paradigm
  return [Object.values(sortImage)[0], Object.values(sortImage)[1]]};

function optionButton(){
  var trialButtons = [
    '<button class="jspsych-btn" style="font-size: 24px; padding: 10px ; position: fixed; left:29%;top:80%; width: 170px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.9);border-radius: 80%">%choice%</button>',
    '<button class="jspsych-btn" style="font-size: 24px; padding: 10px ; position: fixed; left:62%;top:80%; width: 170px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.9);border-radius: 80%">%choice%</button>'
    ];
    myButtons = [];
    myButtons.push(trialButtons);
    //alert (myButtons)
    return myButtons[myButtons.length -1];
  }

function getFixationTime (){  //get randomized time of fixation by randomly choosing from 0.5, 1 and 1.5s
  Face.fixationTime = getRandomElement([500, 1000, 1500]);
  return Face.fixationTime;
}

function getStim (){
  Face.stim =  Face.stims.pop();
  return Face.stim //get last stim of the stim list
}


function getScale (){ //generate the rating scale depending on the person and valence randomly chosen in faceArray

  //choose the identity of the face
  Face.personX = getRandomElement(['A','B','C','D']);//randomally choose from ['A','B','C','D'] -- select person

  return ['img/'+
    Face.personX+(Face.emotionX + 3*0) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*1) + '.jpg', 'img/'+
    Face.personX+(Face.emotionX + 3*2) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*3) + '.jpg', 'img/'+
    Face.personX+(Face.emotionX + 3*4) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*5) + '.jpg', 'img/'+
    Face.personX+(Face.emotionX + 3*6) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*7) + '.jpg', 'img/'+
    Face.personX+(Face.emotionX + 3*8) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*9) + '.jpg', 'img/'+
    Face.personX+(Face.emotionX + 3*10)+ '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*11)+ '.jpg', 'img/'+
    Face.personX+(Face.emotionX + 3*12)+ '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*13)+ '.jpg', 'img/'+
    Face.personX+(Face.emotionX + 3*14)+ '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*15)+ '.jpg', 'img/'+
    Face.personX+(Face.emotionX + 3*16)+ '.jpg', 'img/'+Face.personX+(Face.emotionX + 1*50)+ '.jpg']
}


function getFaceSample (){  //get the sample of faces in each trial

  Face.sampleSD = getRandomElement([face5sd,face10sd]); //random select from SD=5 and SD=10,
  Face.recordSD = Face.sampleSD[0];

  ratingTrialData = jsPsych.data.get().last(1).filter({trial_type:'image-slider-response_noButton'}).values();
  Face.rating = Number(ratingTrialData[0].response); //get rating

  if ( Face.rating < 21) {  //if you rated the picture between 10-20 you can only be assigned to the same or higher condition
    Face.sampleMean = Face.rating + getRandomElement([0, +10]);
    } else if (Face.rating > 30) {   //If you rated the picture between 30 to 40 you can only be assigned to lower or same
    Face.sampleMean = Face.rating + getRandomElement([0, -10]);
    } else {
    Face.sampleMean = Face.rating + getRandomElement([0, -10, +10]);}

  Face.pool = (Face.sampleSD[1].responseJSON[Face.sampleMean]).slice(0, 12);//get an array of face index from JSON
  Face.pos = jsPsych.randomization.shuffle(Face.pool); //randomize the 12 faces

  return [
    ['img/'+ Face.personX +(Face.emotionX + Face.pos[0] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[1]-100) + '.jpg',
     'img/'+ Face.personX +(Face.emotionX + Face.pos[2] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[3]-100) + '.jpg'],
    ['img/'+ Face.personX +(Face.emotionX + Face.pos[4] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[5]-100) + '.jpg',
     'img/'+ Face.personX +(Face.emotionX + Face.pos[6] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[7]-100) + '.jpg'],
    ['img/'+ Face.personX +(Face.emotionX + Face.pos[8] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[9]-100)+ '.jpg',
     'img/'+ Face.personX +(Face.emotionX + Face.pos[10]-100)+ '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[11]-100)+ '.jpg']
    ];
}

function emotionValence(emotion){
  if (emotion == 'positive'){
    Face.emotionX = 50;
    Face.path = 'stimuliPositive/';
  } else if (emotion == 'negative'){
    Face.emotionX = 100;
    Face.path = 'img/';
  }
  return Face.emotionX
}

function getButtons() {
  var trialButtons = [
  '<button class="jspsych-btn" style="color:white; font-size: 24px; padding: 26px ;background-color:black; position: fixed; left:25%;top:36%; width: 210px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.9);border-radius: 50%">%choice%</button>',
  '<button class="jspsych-btn" style="color:white; font-size: 24px; padding: 26px ;background-color:red;position: fixed; left:62%;top:36%;width: 210px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.9);border-radius: 50%">%choice%</button>'];
  myButtons = [];
  myButtons.push(trialButtons);
  //alert (myButtons)
  return myButtons[myButtons.length -1];
}
