define (require) ->
  Logger = require 'spindle'

  vent = require 'utils/vent'
  events = require 'utils/events'
  BaseView = require 'base/view/base'


  class <%= className %>View extends BaseView

    logger: Logger.get('views.<%= name %>', true)

    events:
      'click': null

    initialize: (options) ->
      super
