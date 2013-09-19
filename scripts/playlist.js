require([
  '$api/models',
  '$views/list#List'
], function(models, List) {
  'use strict';

  var doPlaylistForPlaylist = function(playlist) {
    var list = List.forPlaylist(playlist, {
      fields: ['nowplaying','track', 'artist', 'time','album']

    });

    document.getElementById('playlistContainer').innerHTML = "";
    document.getElementById('playlistContainer').appendChild(list.node);
    list.init();
    list.focus();

  };


  exports.doPlaylistForAlbum = doPlaylistForPlaylist;
});
