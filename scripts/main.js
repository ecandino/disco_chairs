require([
  '$api/models',
  'scripts/playlist',
  'scripts/timer'
], function(models, playlist, timer) {
  'use strict';

  var timer,
      clock     = document.getElementById('clock'),
      startBtn  = document.getElementById('start'),
      pauseBtn  = document.getElementById('pause'),
      resetBtn  = document.getElementById('reset'),
      seconds,
      people    = 3,
      dropBox   = document.querySelector('#drop'),
      droppedList;

  function getRandomBetweenRange(min, max){
    var randomFloat = Math.random() * (max - min) + min;
    return Math.round(randomFloat);
  }

  var startClock = function (){
    if (checkForPlaylist()){
      seconds = parseInt(clock.getAttribute('value'), 10)
      timer = window.setInterval(countdown, 1000);
      models.player.play();
    } else{
      dropBox.innerHTML = "Add a playlist!!"
    }
  }

  var stopClock = function (){
    clearInterval(timer);
    models.player.pause();
  }

  var resetClock = function (){
    clearInterval(timer);
    clock.setAttribute('value', getRandomBetweenRange(5,10));
  }

  var nextRound = function(){
    if(people !== 1){
      people = people - 1;
      resetClock();
      models.player.skipToNextTrack();
      models.player.seek(30000)
      startClock();
    }  
  }

  function checkForPlaylist(){
    return typeof droppedList !== "undefined" ?  true : false;
  }

  function countdown() {
    if(seconds === 0){
        stopClock();
        setTimeout(nextRound, 5000);
    } else {
      seconds = seconds - 1;  
      clock.setAttribute('value', seconds);
    }
  }

  var resetGame = function(){
    models.player.stop();
    window.location.reload();
  }

  // Handle drops
  dropBox.addEventListener('dragstart', function(e){
      e.dataTransfer.setData('text/html', this.innerHTML);
      e.dataTransfer.effectAllowed = 'copy';
  }, false);

  dropBox.addEventListener('dragenter', function(e){
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      this.classList.add('over');
  }, false);

  dropBox.addEventListener('dragover', function(e){
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      return false;
  }, false);

  dropBox.addEventListener('dragleave', function(e){
      e.preventDefault();
      this.classList.remove('over');
  }, false);

  dropBox.addEventListener('drop', function(e){
      e.preventDefault();
      droppedList = models.Playlist.fromURI(e.dataTransfer.getData('text'));
      this.classList.remove('over');
      playlist.doPlaylistForAlbum(droppedList);
      models.player.playContext(droppedList, 0, 30000);
      models.player.pause();
      clock.setAttribute("value", getRandomBetweenRange(5,10))
      dropBox.remove();
  }, false);

  startBtn.onclick = startClock;
  pauseBtn.onclick = stopClock;
  resetBtn.onclick = resetGame;


});
