require([
  '$api/models',
  '$views/list#List'
], function(models, List) {
  'use strict';

  var dropBox = document.getElementById('drop'),
      droppedList;

  var createListFromPlaylist = function(playlist) {
    var list = List.forPlaylist(playlist, {
      fields: ['nowplaying','track', 'artist', 'time','album']
    });

    document.getElementById('playlist-container').innerHTML = "";
    document.getElementById('playlist-container').appendChild(list.node);
    list.init();
    window.list = list;
    list.selectItem(0);
    list.focus();
  };

  var checkForPlaylist = function(){
    return typeof droppedList !== "undefined" ?  true : false;
  };

  var resetGame = function(){
    models.player.stop();
    window.location.reload();
  };

  var endGame = function(){
    var gameView  = document.getElementById("gameView");
    var endView  = document.getElementById("endView");
    gameView.setAttribute('class', 'hide');
    endView.setAttribute('class', '');
  };

  var setupGame = function(){
    var startView = document.getElementById("startView");
    var gameView  = document.getElementById("gameView");
    var message   = dropBox.getElementsByClassName('info')[0];


    if (checkForPlaylist()){
      startView.setAttribute('class', 'hide');
      gameView.setAttribute('class', '');
    } else {
      message.innerHTML = "Add a playlist to continue";
      return false;
    }
    return true;
    // Check people and playlist
  };

  var setupPlaylist = function(uri) {
    var container = document.getElementById('playlist-preview'),
        image = document.createElement('img'),
        h = document.createElement('h4'),
        peopleInput = document.getElementById('people'),
        people  = parseInt(peopleInput.getAttribute('value'), 10);

    droppedList = models.Playlist.fromURI(uri).load('name', 'image')
      .done(function(playlist){
        createListFromPlaylist(playlist);
        models.player.playContext(playlist, 0, 30000);
        models.player.pause();
        container.innerHTML = '';
        h.innerHTML = playlist.name;
        image.setAttribute('src', playlist.image);
        image.setAttribute('class', 'playlist-image');
        container.appendChild(image);
        container.appendChild(h);
    });
  };


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
    var uri = e.dataTransfer.getData('text');
    
    setupPlaylist(uri);
    this.classList.remove('over');
  }, false);

  document.getElementById('newGameBtn').onclick = resetGame;
  document.getElementById('reset').onclick      = resetGame;

  exports.setupGame = setupGame;
  exports.endGame = endGame;
});
