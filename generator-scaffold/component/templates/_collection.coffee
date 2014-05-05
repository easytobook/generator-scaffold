define (require) ->
  _ = require 'underscore'
  Backbone = require 'backbone'
  <%= className %>Model = require '<%= name %>/model'


  class <%= className %>Collection extends Backbone.Collection

    model: <%= className %>Model

    # getCurrentBasket: ->
    #   return null unless @length

    #   return @at(0)
