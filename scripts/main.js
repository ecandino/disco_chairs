require([
  '$api/models',
  'scripts/playlist',
  'scripts/timer'
], function(models, playlist, timer) {
  'use strict';


  var timer,
      setupBtn    = document.getElementById('setupBtn'),
      clock       = document.getElementById('clock'),
      startBtn    = document.getElementById('start'),
      pauseBtn    = document.getElementById('pause'),
      resetBtn    = document.getElementById('reset'),
      newGameBtn  = document.getElementById('newGameBtn'),
      peopleInput = document.getElementById('people'),
      dropBox     = document.getElementById('drop'),
      droppedList, breakPeriod, seconds, people;


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
    // models.player.pause();
  }

  var resetClock = function (){
    clearInterval(timer);
    if (breakPeriod){
      console.log("Break Time!");
      // Lets take a 10 second break for people to get settled
      clock.setAttribute('value', 10);
      breakPeriod = false;
    } else {
      people = people - 1;
      console.log("New Round");
      clock.setAttribute('value', getRandomBetweenRange(5,10));
      breakPeriod = true;
      // models.player.play();
    }
    startClock();
  }

  function checkForPlaylist(){
    var droppedList = "playlist"
    return typeof droppedList !== "undefined" ?  true : false;
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
    people  = parseInt(peopleInput.getAttribute('value'), 10);
    breakPeriod = false;
    resetClock();
    // models.player.seek(30000)
    // models.player.play();
  }

  var resetGame = function(){
    // models.player.stop();
    window.location.reload();
  }

  var countdownOver = function(){
    if(people === 1){
      return endGame();
    } 
    
    resetClock();
  }

  var endGame = function(){
    var gameView  = document.getElementById("gameView");
    var endView  = document.getElementById("endView");
    gameView.setAttribute('class', 'hide');
    endView.setAttribute('class', '');

    console.log("Winner Winner chicken dinner")
  }


  var setupGame = function(){
    var startView = document.getElementById("startView");
    var gameView  = document.getElementById("gameView");

    startView.setAttribute('class', 'hide');
    gameView.setAttribute('class', '');
    // Check people and playlist
  }

  // // Handle drops
  // dropBox.addEventListener('dragstart', function(e){
  //     e.dataTransfer.setData('text/html', this.innerHTML);
  //     e.dataTransfer.effectAllowed = 'copy';
  // }, false);

  // dropBox.addEventListener('dragenter', function(e){
  //     e.preventDefault();
  //     e.dataTransfer.dropEffect = 'copy';
  //     this.classList.add('over');
  // }, false);

  // dropBox.addEventListener('dragover', function(e){
  //     e.preventDefault();
  //     e.dataTransfer.dropEffect = 'copy';
  //     return false;
  // }, false);

  // dropBox.addEventListener('dragleave', function(e){
  //     e.preventDefault();
  //     this.classList.remove('over');
  // }, false);

  // dropBox.addEventListener('drop', function(e){
  //     e.preventDefault();
  //     droppedList = models.Playlist.fromURI(e.dataTransfer.getData('text'));
  //     this.classList.remove('over');
  //     playlist.doPlaylistForAlbum(droppedList);
  //     models.player.playContext(droppedList, 0, 30000);
  //     models.player.pause();
  //     clock.setAttribute("value", getRandomBetweenRange(5,10))
  //     dropBox.remove();
  // }, false);

  startBtn.onclick = startGame;
  pauseBtn.onclick = pauseGame;
  resetBtn.onclick = resetGame;
  newGameBtn.onclick = resetGame;
  setupBtn.onclick = setupGame;


});
