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
      window.models = models
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
  document.getElementById('setupBtn').onclick   = setupGame;
  document.getElementById('reset').onclick      = resetGame;

  exports.endGame = endGame;
});
