/**
 * jspsych-image-slider-response2
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


  function repeatStringNumTimes(string, times) {
  return times > 0 ? string.repeat(times) : "";
  };

jsPsych.plugins['image-slider-response2'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('image-slider-response2', 'stimulus', 'image');

  plugin.info = {
    name: 'image-slider-response2',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The image to be displayed'
      },
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min slider',
        default: 0,
        description: 'Sets the minimum value of the slider.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max slider',
        default: 100,
        description: 'Sets the maximum value of the slider',
      },
      start: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: 'Slider starting value',
				default: 50,
				description: 'Sets the starting value of the slider',
			},
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the slider'
      },
      labels: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name:'Labels',
        default: [],
        array: true,
        description: 'Labels of the slider.',
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the slider.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
    }
  }



  plugin.trial = function(display_element, trial) {

    var html =  '<div id="jspsych-image-slider-response2-wrapper" style="margin: 100px 0px;">';   //Change: add img stimulus - assign elements of array getScale function in task file to images//
        html += '<div id="jspsych-image-slider-response2-stimulus"><img src="'+trial.stimulus[1]+

    '"height="80px" width="58px"><img src="'+trial.stimulus[1]+ '"height="80px" width="58px"><img src="'+trial.stimulus[2]+
    '"height="80px" width="58px"><img src="'+trial.stimulus[3]+ '"height="80px" width="58px"><img src="'+trial.stimulus[4]+
    '"height="80px" width="58px"><img src="'+trial.stimulus[5]+ '"height="80px" width="58px"><img src="'+trial.stimulus[6]+
    '"height="80px" width="58px"><img src="'+trial.stimulus[7]+ '"height="80px" width="58px"><img src="'+trial.stimulus[8]+
    '"height="80px" width="58px"><img src="'+trial.stimulus[11]+'"height="80px" width="58px"><img src="'+trial.stimulus[12]+
    '"height="80px" width="58px"><img src="'+trial.stimulus[13]+'"height="80px" width="58px"><img src="'+trial.stimulus[14]+
    '"height="80px" width="58px"><img src="'+trial.stimulus[15]+'"height="80px" width="58px"><img src="'+trial.stimulus[16]+
    '"height="80px" width="58px"><img src="'+trial.stimulus[17]+'"height="80px" width="58px"><img src="'+trial.stimulus[18]+
    '"height="80px" width="58px"></div>';

    html += '<div class="jspsych-image-slider-response2-container" style="position:relative;">';
    html += '<input type="range" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" id="jspsych-image-slider-response2-response2"></input>';
    html += '<div>'
    for(var j=0; j < trial.labels.length; j++){
      var width = 100/(trial.labels.length-1);
      var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
      html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">';
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[j]+'</span>';
      html += '</div>'
    }

    html += '</div>';
    html += '</div>';
    html += '</div>';

    if (trial.prompt !== null){
      html += trial.prompt;
    }

    // add submit button
    html += '<button id="jspsych-image-slider-response2-next" class="jspsych-btn">'+trial.button_label+'</button>';

    display_element.innerHTML = html;

    var response2 = {
      rt2: null,
      response2: null
    };

    display_element.querySelector('#jspsych-image-slider-response2-next').addEventListener('click', function() {
      // measure response time
      var endTime = (new Date()).getTime();
      response.rt = endTime - startTime;
      response.response = display_element.querySelector('#jspsych-image-slider-response2-response2').value;

      if(trial.response_ends_trial){
        end_trial();
      } else {
        display_element.querySelector('#jspsych-image-slider-response2-next').disabled = true;
      }

    });

    function end_trial(){

      jsPsych.pluginAPI.clearAllTimeouts();

      // save data
      var trialdata = {
        "rt": response.rt,
        "response": response.response
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    }

    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-image-slider-response2-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
