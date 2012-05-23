util = require('util')
exec = require('child_process').exec
CoffeeScript = require "coffee-script"

App = {}

App.puts = (error, stdout, stderr) ->
	util.puts(stdout or stderr)

App.icon = "#{__dirname}/i/coffee.png"

App.notify = (message, type) ->
	exec "growlnotify -n 'CoffeeScript Compiler' -m '#{message}' --image '#{__dirname}/i/coffee-#{type}.png'",App.puts 
	

CoffeeScript.on 'failure', (error, task) ->
	console.log( "ERROR in " + task.file, error )
	App.notify "#{error}","error" 
	
CoffeeScript.on 'success', (task) ->
	App.notify "#{task.file} successfully compiled!","success"
