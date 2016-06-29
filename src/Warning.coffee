
class @Warning extends React.Component
	constructor: ->
		super
		@state = show: no, tid: -1
	
	render: ->
		{message} = @props
		{show} = @state
		E ".warning",
			class: {show}
			message
	
	componentDidMount: -> @eventuallyHide()
	componentDidUpdate: (oldProps)->
		if oldProps.message isnt @props.message
			@eventuallyHide()
	
	eventuallyHide: ->
		clearTimeout @state.tid
		@setState
			show: show: (not not @props.message)
			tid: setTimeout =>
				@setState show: no
			, 1000
