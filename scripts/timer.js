require([
  '$api/models',
  'scripts/views',
  '$views/list#List'
], function(models, views, List) {
  'use strict';


  var clock = document.getElementById('clock'),
      timer, seconds, breakPeriod, people;
      
  var getRandomBetweenRange = function(min, max){
    var randomFloat = Math.random() * (max - min) + min;
    return Math.round(randomFloat);
  }

  var startClock = function (){
    seconds = parseInt(clock.getAttribute('value'), 10);
    timer = window.setInterval(countdown, 1000);   
  }

  var pauseGame = function (){
    clearInterval(timer);
    models.player.pause();
  }

  var resetClock = function (){
    clearInterval(timer);
    if (breakPeriod){
      clock.setAttribute('value', 10);
      breakPeriod = false;
      models.player.skipToNextTrack();
      models.player.seek(30000);
      models.player.pause();
    } else {
      people = people - 1;
      var roundInput = document.getElementById("round-number"),
          round = parseInt(roundInput.innerHTML, 10);
      roundInput.innerHTML = round + 1;
      clock.setAttribute('value', getRandomBetweenRange(15,45));
      breakPeriod = true;
      models.player.play();
    }
    startClock();
  }

  var countdown = function() {
    if(seconds === 0){
        clearInterval(timer);
        countdownOver();
    } else {
      seconds = seconds - 1;  
      clock.setAttribute('value', seconds);
    }
  }
  
  var startGame = function(){
    views.setupGame();
    var peopleInput = document.getElementById('people');
    people  = parseInt(peopleInput.getAttribute('value'), 10);
    breakPeriod = false;
    resetClock();
  }

  var countdownOver = function(){
    if(people === 1){
      models.player.stop();
      return views.endGame();
    } else {
      resetClock();
    }
  }

  var initGame = function(){
    if (views.setupGame()){
      startGame();
    }
  }

  document.getElementById('start').onclick    = startGame;
  document.getElementById('pause').onclick    = pauseGame;
  document.getElementById('setupBtn').onclick = initGame;

});
