$(document).ready(function () {
  // Connect to our server
  var justConnected = true;
  var socket = io.connect('http://127.0.0.1:3000');
  var smalltalk = require('smalltalk');
  smalltalk.prompt('Username', 'Please enter a username', 'scrub').then(function (value) {
    user.username = value;
    net.init();
  });
  var user = {
    username: '',
    id: Math.floor(Math.random() * 900) + 1
  };

  var net = {
    init: function () {
      socket.emit('newUser', user);
    }
  };

  socket.on('log', function (data) {
    if(justConnected == true){
      data.forEach(function (string) {
        $('#chatBox').append($('<li>').text(string));
      });
      justConnected = false;
    }
  });


  $('form').submit(function () {
    socket.emit('chatMessage', user.username +': '+$('#box').val());
    $('#box').val('');
    return false;
  });


  socket.on('chatMessage', function (data) {
    $('#chatBox').append($('<li>').text(data));
  });
});
