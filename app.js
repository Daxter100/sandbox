var builder = require('botbuilder');
var os = require('os');
var spawn = require('child_process').execFile;

function pwr(script) {
  spawn('powershell.exe', [script])
}

var restify = require('restify');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});


//var connector = new builder.ConsoleConnector().listen();


var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
  if (/shut down/i.test(session.message.text)) {
    pwr('stop-computer');
    //pwr('get-childitem E:\\sandbox app.js -recurse');
  }
  else{
    session.send('You said: %s.', session.message.text, os.platform(), os.arch());
  }

});
