'use strict';

// TODO: This is a nightmare and I need to look for a solution to integrate qunit and the spotify api

var clock       = document.getElementById('clock'),
    breakPeriod = false,
    timer, seconds, people;
    
var getRandomBetweenRange = function(min, max){
  var random = Math.random() * (max - min) + min;
  return Math.round(random);
}

var startClock = function (duration){
  seconds = parseInt(duration, 10);
  timer = window.setInterval(countdown, 1000); 
  return timer;
}

var pauseGame = function (){
  var cleared = clearInterval(timer);
  // models.player.pause();
  return cleared;
}

var resetClock = function (){
  timer = clearInterval(timer);
  if (breakPeriod){
    duration = clock.setAttribute('value', 10);
    breakPeriod = false;
    // models.player.skipToNextTrack();
    // models.player.seek(30000);
    // models.player.pause();
  } else {
    people = people - 1;
    console.log("New Round");
    duration = clock.setAttribute('value', getRandomBetweenRange(15,45));
    breakPeriod = true;
    // models.player.play();
  }
  startClock(duration);
}

var countdown = function() {
  if(seconds === 0){
      timer = clearInterval(timer);
      countdownOver();
  } else {
    seconds = seconds - 1;  
    clock.setAttribute('value', seconds);
  }
  return seconds;
}

var startGame = function(){
  var peopleInput = document.getElementById('people');
  people  = parseInt(peopleInput.getAttribute('value'), 10);
  resetClock();

  return people;
}

var countdownOver = function(){
  if(people === 1){
    // models.player.stop();
    return endGame();
  } else {
    resetClock();
  }
}

document.getElementById('start').onclick    = startGame;
document.getElementById('pause').onclick    = pauseGame;
document.getElementById('setupBtn').onclick = setupGame;



//////////////////////////////////////////////////////////////////////


var dropBox = document.getElementById('drop'),
    droppedList;

var createListFromPlaylist = function(playlist) {
  
  var list = List.forPlaylist(playlist, {
    fields: ['nowplaying','track', 'artist', 'time','album']
  });

  document.getElementById('playlist-container').innerHTML = "";
  document.getElementById('playlist-container').appendChild(list.node);
  list.init();
  list.focus();
};

var checkForPlaylist = function(){
  return typeof droppedList !== "undefined" ?  true : false;
}

var resetGame = function(){
  models.player.stop();
  window.location.reload();
}

var endGame = function(){
  var gameView  = document.getElementById("gameView");
  var endView  = document.getElementById("endView");
  gameView.setAttribute('class', 'hide');
  endView.setAttribute('class', '');
}

var setupGame = function(){
  var startView = document.getElementById("startView");
  var gameView  = document.getElementById("gameView");
  if (checkForPlaylist()){
    startView.setAttribute('class', 'hide');
    gameView.setAttribute('class', '');
  } else {
    dropBox.innerHTML = "Add a playlist to continue";
  }
  // Check people and playlist
}


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
  var uri = e.dataTransfer.getData('text').
      image = document.createElement('img'),
      p = document.createElement('p');
  droppedList = models.Playlist.fromURI(uri).load('name', 'image')
    .done(function(playlist){
      createListFromPlaylist(playlist);
      models.player.playContext(playlist, 0, 30000);
      dropBox.innerHTML = '';
      p.innerHTML = playlist.name;
      // img.setAttribute('src', playlist.imageSizeFor(100));
      dropBox.appendChild(img);
      dropBox.appendChild(p);
  });
  models.player.pause();
  this.classList.remove('over');
}, false);

document.getElementById('newGameBtn').onclick = resetGame;
document.getElementById('reset').onclick      = resetGame;


//////////////////////////////////////////////////////////////////////

module("Timer");

test("getRandomBetweenRange", function(){
  var val1 = getRandomBetweenRange(10,99);
  var val2 = getRandomBetweenRange(10,99);

  deepEqual(val1.toString().length, 2, "Value is 2 digits long");
  notDeepEqual(val1, val2, "Values don't equal each other");
  ok(val1 >= 10, "Value is greater than or equal to 10");
  ok(val1 < 100, "Value is less than 100");
});

test("startClock", function(){
  var clock = startClock("10");
  ok(typeof clock === "number", "setInterval has been called");
});

test("pauseGame", function(){
  var pause = pauseGame();
  ok(typeof pause === "undefined", "Interval has been cleared");
});

test("resetClock", function(){
  ok(1);
});

test("countdown", function(){
  var seconds = 1;
  seconds = countdown();
  done = countdown();

  deepEqual(seconds, 1, "The number of seconds when down to by 1");
  deepEqual(done, 0, "When seconds are gone, interval is cleared");
});

test("startGame", function(){
  ok(1);
});

test("countdownOver", function(){
  ok(1);
});


module("Views");

