{exec} = require 'child_process'

task 'build', 'Build project from src/*.coffee to lib/*.js', ->
	exec 'coffee -co ./lib/ ./src/', (err, stdout, stderr) ->
		throw err if err
		console.log stdout + stderr

task 'build:watch', 'Watch for file changes in sources and build project', ->
	exec 'coffee -wco ./lib/ ./src/', (err, stdout, stderr) ->
		throw err if err
		console.log stdout + stderr
