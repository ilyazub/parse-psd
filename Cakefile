{exec} = require 'child_process'

task 'build', 'Build project from src/*.coffee to lib/*.js', ->
	exec 'coffee -co ./lib/ ./src/', (err, stdout, stderr) ->
		throw err if err
		console.log stdout + stderr
