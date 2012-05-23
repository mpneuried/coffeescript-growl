(function() {
var App, CoffeeScript, exec, util;

util = require('util');

exec = require('child_process').exec;

CoffeeScript = require("coffee-script");

App = {};

App.puts = function(error, stdout, stderr) {
  return util.puts(stdout || stderr);
};

App.icon = "" + __dirname + "/i/coffee.png";

App.notify = function(message, type) {
  return exec("growlnotify -n 'CoffeeScript Compiler' -m '" + message + "' --image '" + __dirname + "/i/coffee-" + type + ".png'", App.puts);
};

CoffeeScript.on('failure', function(error, task) {
  console.log("ERROR in " + task.file, error);
  return App.notify("" + error, "error");
});

CoffeeScript.on('success', function(task) {
  return App.notify("" + task.file + " successfully compiled!", "success");
});
}).call(this);
