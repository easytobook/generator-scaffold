define (require) ->
  _ = require 'underscore'
  $ = require 'jquery'
  viewTest = require 'sugarspoon/util/view'
  -> \


  describe 'Base View', ->
    viewTest()

    before (done) ->
      @sys.define
        # TODO: Make class dynamic
        BaseView: 'base/view'

    before ->
      @util.view.setClass(@sys.BaseView)

    beforeEaach ->
      @util.view.create()

    it 'is an example', ->
      expect(@_.view).to.be.instanceof(@sys.BaseView)
