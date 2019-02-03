/**
Various useful functions
**/

function getRandomInt(min, max) {
  return Math.floor(Math.random()*(max - min + 1) + min);
}

function getRandomElement (list){
  return list[Math.floor(Math.random()*list.length)];
}

function getFixationTime (){  //get randomized time of fixation by randomly choosing from 0.5, 1 and 1.5s
  Face.fixationTime = getRandomElement([500, 1000, 1500]);
  return Face.fixationTime;
}

function getFigure(){      //get images as stimulus
  Face.figure = getRandomElement([1, 3]);
  return 'stimuli/00'+ Face.figure + '.png';
}



function getScale (){ //generate the rating scale depending on the person and valence randomly chosen in faceArray

  //choose positive or negative valence
  Face.emotionX = getRandomElement([50, 100]); //randomly choose from negative and postive emotion
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
  //for kiki
  //add code to randomize the condtion (mean - lower, same, higher, SD - 5 or 10)
  //look at participant last rating

          Face.sampleSD  = getRandomElement([face5sd,face10sd]); //random select from SD=5 and SD=10,
          Face.recordSD = Face.sampleSD[0];

          ratingTrialData = jsPsych.data.get().last(1).filter({trial_type:'image-slider-response_noButton'}).values();
          Face.rating = Number(ratingTrialData[0].response); //get rating 

          if ( Face.rating < 21) {  //if you rated the picture between 10-20 you can only be assigned to the same or higher condition
              Face.sampleMean = Face.rating + getRandomElement([0, +10]);
            } else if (Face.rating > 30) {   //If you rated the picture between 30 to 40 you can only be assigned to lower or same
              Face.sampleMean = Face.rating + getRandomElement([0, -10]);
            } else {
              Face.sampleMean = Face.rating + getRandomElement([0, -10, +10]);
            }

          Face.pos = Face.sampleSD[1].responseJSON[Face.sampleMean];//get an array of face index from JSON


  return [
    ['img/'+ Face.personX +(Face.emotionX + Face.pos[0] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[1]-100) + '.jpg',
     'img/'+ Face.personX +(Face.emotionX + Face.pos[2] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[3]-100) + '.jpg'],
    ['img/'+ Face.personX +(Face.emotionX + Face.pos[4] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[5]-100) + '.jpg',
     'img/'+ Face.personX +(Face.emotionX + Face.pos[6] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[7]-100) + '.jpg'],
    ['img/'+ Face.personX +(Face.emotionX + Face.pos[8] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[9]-100)+ '.jpg',
     'img/'+ Face.personX +(Face.emotionX + Face.pos[10]-100)+ '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[11]-100)+ '.jpg']
    ];
}


function getButtons() {
    var trialButtons = [
    '<button class="jspsych-btn" style="color:white; font-size: 24px; padding: 26px ;background-color:black; position: fixed; left:25%;top:40%; width: 210px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.9);border-radius: 50%">%choice%</button>',
    '<button class="jspsych-btn" style="color:white; font-size: 24px; padding: 26px ;background-color:red;position: fixed; left:62%;top:40%;width: 210px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.9);border-radius: 50%">%choice%</button>'
    ];
    myButtons = [];
    myButtons.push(trialButtons);
    //alert (myButtons)
    return myButtons[myButtons.length -1];
  }

function getNextSlide () {  //use to shift instruction slides
  var currentSlide = slideList.shift();
  return currentSlide;
}



//data/server communication
function saveData(filename, filedata, callback, error_callback){
   $.ajax({
      type: 'post',
      cache: false,
      url: 'https://web.stanford.edu/~amitgold/cgi-bin/save_data.php',
      data: {filename: filename, filedata: filedata},
      success: callback,
      error: error_callback
   });
}
