
# awkwardly named component Anim represents a Pose
# and may represent animations in the future

class Anim extends React.Component
	constructor: ->
		super
		@state = {}
	
	render: ->
		{entity, EntityClass, name, editor} = @props
		selected = editor.editing_entity_anim_name is name
		E "article",
			class: {selected}
			onClick: (e)=>
				editor.editing_entity_anim_name = name
				unless name is "Current Pose"
					entity.structure.setPose(EntityClass.poses[name])
			if name is "Current Pose"
				E "h1.name", name
			else
				E ".mdl-textfield.mdl-js-textfield",
					ref: (@mdl_textfield_el)=>
					E "input.mdl-textfield__input.name",
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
							
							# EntityClass.poses[new_name] = name
							# delete EntityClass.poses[name]
							
							# rename preserving key order
							# new_poses = {}
							# for k, v of EntityClass.poses
							# 	if k is name
							# 		new_poses[new_name] = v
							# 	else
							# 		new_poses[k] = v
							# EntityClass.poses = new_poses
							
							rename_object_key(EntityClass.poses, name, new_name)
							
							editor.editing_entity_anim_name = new_name
							Entity.saveAnimations(EntityClass)
							
					E "label.mdl-textfield__label", "Name..."
			E EntityPreview, {
				entity, max_width: 200, max_height: 100
				ref: (@entity_preview)=>
			}
	
	componentDidMount: ->
		componentHandler.upgradeElement(ReactDOM.findDOMNode(@mdl_textfield_el)) if @mdl_textfield_el?


class @AnimationBar extends React.Component
	constructor: ->
		super
		@state = {visible: no}
		@shown_entity = null
		# @editing_anim_name = null
		@entity_previews = []
	
	render: ->
		{editor} = @props
		{visible} = @state
		
		entity = editor.editing_entity ? @shown_entity
		@shown_entity = entity
		
		if entity?
			EntityClass = Object.getPrototypeOf(entity).constructor
		
		E ".bar.sidebar.animation-bar", class: {visible},
			E "h1", "Poses"
			if EntityClass?
				E Anim, {name: "Current Pose", pose: entity.structure.getPose(), entity, EntityClass, editor}
				for pose_name, pose of EntityClass.poses
					E Anim, {name: pose_name, pose, entity, EntityClass, editor}
			E "button.mdl-button.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect.mdl-button--colored",
				ref: (@new_pose_button)=>
				onClick: =>
					# entity = editor.editing_entity
					# EntityClass = Object.getPrototypeOf(entity).constructor
					
					new_pose_name = "New Pose"
					i = 1
					while EntityClass.poses[new_pose_name]?
						new_pose_name = "New Pose #{i}"
						i += 1
					
					EntityClass.poses[new_pose_name] = entity.structure.getPose()
					Entity.saveAnimations(EntityClass)
					
					# @editing_anim_name = new_pose_name
					editor.editing_entity_anim_name = new_pose_name
					# TODO: rerender() or I guess it can go below in update()
				
				E "i.material-icons", "add"
			E "h1", "Animations"
			if EntityClass?
				for animation_name, animation of EntityClass.animations
					E Anim, {name: animation_name, animation}
			E "button.mdl-button.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect.mdl-button--colored",
				ref: (@new_animation_button)=>
				onClick: =>
					alert("Animations are not yet supported")
					# TODO: animation editing
				E "i.material-icons", "add"
	
	componentDidMount: ->
		componentHandler.upgradeElement(ReactDOM.findDOMNode(@new_pose_button))
		componentHandler.upgradeElement(ReactDOM.findDOMNode(@new_animation_button))
	
	shouldComponentUpdate: (newProps, newState)->
		newState.visible isnt @state.visible or
		newState.editing_entity_anim_name isnt @state.editing_entity_anim_name
	
	update: ->
		{editor} = @props
		{editing_entity_anim_name, editing_entity} = editor
		
		visible = editing_entity?
		@setState {visible, editing_entity_anim_name}
		
		for entity_preview in @entity_previews
			entity_preview.update()
