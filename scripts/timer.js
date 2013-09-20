require([
  '$api/models',
  '$views/list#List'
], function(models, List) {
  'use strict';

  var timer,
      clock = document.getElementById('clock'),
      startBtn = document.getElementById('start'),
      pauseBtn = document.getElementById('pause'),
      resetBtn = document.getElementById('reset'),
      seconds = 10;

  var startClock = function (){
    seconds = parseInt(clock.getAttribute('value'), 10)
    timer = window.setInterval(countdown, 1000);
  }

  var stopClock = function (){
    clearInterval(timer);
  }

  var resetClock = function (){
    clearInterval(timer);
    clock.setAttribute('value', 10);
  }

  var init = function (){

    function countdown() {
      if(seconds === 0){
          stopClock();
          models.player.skipToNextTrack();
      } else {
        seconds = seconds - 1;  
        clock.setAttribute('value', seconds);
      }
    }
    startBtn.onclick = startClock;
    pauseBtn.onclick = stopClock;
    resetBtn.onclick = resetClock;
  }


});
