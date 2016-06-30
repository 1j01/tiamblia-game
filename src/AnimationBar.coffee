
# awkwardly named component Anim represents a Pose
# and may represent animations in the future

class Anim extends React.Component
	constructor: ->
		super
	
	isSelected: ->
		{name, isAnimation, editor} = @props
		(editor.editing_entity_anim_name is name) and
		(editor.editing_entity_animation_frame_index? is (not not isAnimation))
	
	render: ->
		{entity, EntityClass, name, isAnimation, bar, editor} = @props
		selected = @isSelected(name, isAnimation, editor)
		@preview_entity = Entity.fromJSON(JSON.parse(JSON.stringify(entity)))
		E "article",
			class: {selected}
			onClick: (e)=>
				return if e.defaultPrevented
				editor.editing_entity_anim_name = name
				editor.editing_entity_animation_frame_index = if isAnimation then 0 else null
				if isAnimation
					entity.structure.setPose(EntityClass.animations[name][0])
				else
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
								if isAnimation
									if EntityClass.animations[new_name]
										alert("There's already an animation with the name #{new_name}")
										return
								else
									if EntityClass.poses[new_name]
										alert("There's already a pose with the name #{new_name}")
										return
								
								anims_object = EntityClass[if isAnimation then "animations" else "poses"]
								rename_object_key(anims_object, name, new_name)
								editor.editing_entity_anim_name = new_name
								Entity.saveAnimations(EntityClass)
								
								# cause rerender immediately so cursor doesn't get moved to the end of the field
								bar.update()
						E "label.mdl-textfield__label", "Name..."
					E "button.mdl-button.mdl-js-button.mdl-button--icon.mdl-color-text--grey-600.delete",
						onClick: (e)=>
							anims_object = EntityClass[if isAnimation then "animations" else "poses"]
							delete anims_object[name]
							Entity.saveAnimations(EntityClass)
							editor.editing_entity_anim_name = "Current Pose"
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
		@state = {visible: no}
	
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
									# pose
									entity, EntityClass, editor
									bar: @
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
					new_name = "New Pose"
					i = 1
					while EntityClass.poses[new_name]?
						new_name = "New Pose #{i}"
						i += 1
					
					EntityClass.poses[new_name] = entity.structure.getPose()
					Entity.saveAnimations(EntityClass)
					
					editor.editing_entity_anim_name = new_name
					
					@update()
				
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
									# animation
									isAnimation: yes
									entity, EntityClass, editor
									bar: @
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
					new_name = "New Animation"
					i = 1
					while EntityClass.animations[new_name]?
						new_name = "New Animation #{i}"
						i += 1
					
					EntityClass.animations[new_name] = [entity.structure.getPose()]
					Entity.saveAnimations(EntityClass)
					
					editor.editing_entity_anim_name = new_name
					
					@update()
				E "i.material-icons", "add"
	
	componentDidMount: ->
		componentHandler.upgradeElement(ReactDOM.findDOMNode(@new_pose_button))
		componentHandler.upgradeElement(ReactDOM.findDOMNode(@new_animation_button))
	
	update: ->
		{editor} = @props
		{editing_entity_anim_name, editing_entity} = editor
		
		EntityClass = if editing_entity? then entity_classes[editing_entity._class_]
		visible = EntityClass?.animations
		if visible
			for anim in @anims
				{name, isAnimation} = anim.props
				anims_object = EntityClass[if isAnimation then "animations" else "poses"]
				if anims_object[name]?
					pose =
						if isAnimation
							animation = EntityClass.animations[name]
							animation[0]
						else if name is "Current Pose" or anim.isSelected()
							editing_entity.structure.getPose()
						else
							EntityClass.poses[name]
					anim.entity_preview.entity.structure.setPose(pose)
					anim.entity_preview.update()
		
		@setState {visible, EntityClass, editing_entity_anim_name}
