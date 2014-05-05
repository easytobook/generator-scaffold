define (require) ->
  _ = require 'underscore'
  $ = require 'jquery'
  baseTest = require 'sugarspoon/util/base'
  -> \


  describe 'Base model', ->
    baseTest()

    describe 'tests the model', ->
      it 'runs a test', ->
        expect('everything').to.be.ok
