define (require) ->
  _ = require 'underscore'
  collectionTest = require 'sugarspoon/util/collection'
  -> \


  describe '<%= className %> collection', ->
    collectionTest()

    before (done) ->
      @sys.define
        <%= className %>Collection: '<%= name %>/collection'
      @sys.load(done)

    beforeEach ->
      @_.basket = new @sys.<%= className %>Collection


    describe 'runs a test', ->
      it 'runs a test', ->
        expect('everything').to.be.ok
