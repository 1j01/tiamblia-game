
# awkwardly named component Anim represents a Pose
# and may represent animations in the future

class Anim extends React.Component
	constructor: ->
		super
	
	render: ->
		{entity, EntityClass, name, editor} = @props
		selected = editor.editing_entity_anim_name is name
		@preview_entity = Entity.fromJSON(JSON.parse(JSON.stringify(entity)))
		E "article",
			class: {selected}
			onClick: (e)=>
				return if e.defaultPrevented
				editor.editing_entity_anim_name = name
				unless name is "Current Pose"
					entity.structure.setPose(EntityClass.poses[name])
			if name is "Current Pose"
				E "h1.name", name
			else
				E ".title-bar",
					E ".mdl-textfield.mdl-js-textfield.name",
						ref: (@mdl_textfield_el)=>
						E "input.mdl-textfield__input",
							value: name
							onChange: (e)=>
								new_name = e.target.value
								# TODO: use error classes and messages instead of instrusive alerts
								if EntityClass.poses[new_name]
									alert("There's already a pose with the name #{new_name}")
									return
								if EntityClass.animations[new_name]
									alert("There's already an animation with the name #{new_name}")
									return
								
								rename_object_key(EntityClass.poses, name, new_name)
								# FIXME: cursor gets placed at end of field
								
								editor.editing_entity_anim_name = new_name
								Entity.saveAnimations(EntityClass)
								# @setState({pose_names: Object.keys(EntityClass.poses)})
						E "label.mdl-textfield__label", "Name..."
					E "button.mdl-button.mdl-js-button.mdl-button--icon.mdl-color-text--grey-600.delete",
						onClick: (e)=>
							delete EntityClass.poses[name]
							Entity.saveAnimations(EntityClass)
							editor.editing_entity_anim_name = "Current Pose"
							# @setState({pose_names: Object.keys(EntityClass.poses)})
							e.preventDefault()
						E "i.material-icons", "delete"
			E EntityPreview, {
				entity: @preview_entity, max_width: 200, max_height: 100
				ref: (@entity_preview)=>
			}
	
	componentDidMount: ->
		componentHandler.upgradeElement(ReactDOM.findDOMNode(@mdl_textfield_el)) if @mdl_textfield_el?


class @AnimationBar extends React.Component
	constructor: ->
		super
		@state = {
			visible: no
			# pose_names: []
			# animation_names: []
		}
	
	render: ->
		{editor} = @props
		{visible, EntityClass} = @state
		
		entity = editor.editing_entity ? @shown_entity
		@shown_entity = entity
		
		@anims = []
		E ".bar.sidebar.animation-bar", class: {visible},
			E "h1", "Poses"
			E ".poses",
				if EntityClass?
					if EntityClass.poses?
						if Object.keys(EntityClass.poses).length > 0
							i = 0
							for pose_name, pose of EntityClass.poses
								i += 1
								E Anim, {
									key: i
									name: pose_name
									pose
									entity, EntityClass, editor
									ref: (anim)=>
										@anims.push(anim) if anim?
								}
						else
							E "article.placeholder", "No poses"
					else
						E "article.placeholder", "Entity class is not initialized for animation"
			E "button.mdl-button.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect.mdl-button--colored",
				ref: (@new_pose_button)=>
				onClick: =>
					new_pose_name = "New Pose"
					i = 1
					while EntityClass.poses[new_pose_name]?
						new_pose_name = "New Pose #{i}"
						i += 1
					
					EntityClass.poses[new_pose_name] = entity.structure.getPose()
					Entity.saveAnimations(EntityClass)
					
					editor.editing_entity_anim_name = new_pose_name
					
					# FIXME: doesn't update until the next frame
				
				E "i.material-icons", "add"
			E "h1", "Animations"
			E ".animations",
				if EntityClass?
					if EntityClass.animations?
						if Object.keys(EntityClass.animations).length > 0
							i = 0
							for animation_name, animation of EntityClass.animations
								i += 1
								E Anim, {
									key: i
									name: animation_name
									animation
									entity, EntityClass, editor
									ref: (anim)=>
										@anims.push(anim) if anim?
								}
						else
							E "article.placeholder", "No animations"
					else
						E "article.placeholder", "Entity class is not initialized for animation"
					
			E "button.mdl-button.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect.mdl-button--colored",
				ref: (@new_animation_button)=>
				onClick: =>
					alert("Animations are not yet supported")
					# TODO: animation editing
				E "i.material-icons", "add"
	
	componentDidMount: ->
		componentHandler.upgradeElement(ReactDOM.findDOMNode(@new_pose_button))
		componentHandler.upgradeElement(ReactDOM.findDOMNode(@new_animation_button))
	
	# shouldComponentUpdate: (newProps, newState)->
	# 	console.log newState, @state
	# 	newState.visible isnt @state.visible or
	# 	newState.EntityClass isnt @state.EntityClass or
	# 	newState.pose_names.join(",") isnt @state.pose_names.join(",") or
	# 	newState.animation_names.join(",") isnt @state.animation_names.join(",") or
	# 	newState.editing_entity_anim_name isnt @state.editing_entity_anim_name
	
	update: ->
		{editor} = @props
		{editing_entity_anim_name, editing_entity} = editor
		
		visible = editing_entity?
		if editing_entity?
			EntityClass = entity_classes[editing_entity._class_]
			# pose_names = Object.keys(EntityClass.poses)
			# animation_names = Object.keys(EntityClass.animations)
			
			for anim in @anims when EntityClass.poses[anim.props.name]?
				pose =
					if anim.props.name is "Current Pose" or anim.props.name is editing_entity_anim_name
						editing_entity.structure.getPose()
					else
						EntityClass.poses[anim.props.name]
				anim.entity_preview.entity.structure.setPose(pose)
				
				anim.entity_preview.update()
		# else
		# 	pose_names = []
		# 	animation_names = []
		
		# @setState {visible, EntityClass, editing_entity_anim_name, pose_names, animation_names}
		@setState {visible, EntityClass, editing_entity_anim_name}
