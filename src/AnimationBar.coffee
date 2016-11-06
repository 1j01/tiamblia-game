
# awkward component Anim represents a pose OR an animation OR an animation frame (which is an unnamed pose)

class Anim extends React.Component
	constructor: ->
		super
	
	render: ->
		{entity, EntityClass, name, type_of_anims, selected, select, delete_item, update, editor} = @props
		@preview_entity = Entity.fromJSON(JSON.parse(JSON.stringify(entity)))
		E "article",
			class: {selected}
			onClick: (e)=>
				return if e.defaultPrevented
				select()
				update()
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
								if type_of_anims is "animations"
									if EntityClass.animations[new_name]
										alert("There's already an animation with the name #{new_name}")
										return
								else if type_of_anims is "poses"
									if EntityClass.poses[new_name]
										alert("There's already a pose with the name #{new_name}")
										return
								else
									return
								
								anims_object = EntityClass[type_of_anims]
								rename_object_key(anims_object, name, new_name)
								editor.editing_entity_anim_name = new_name
								Entity.saveAnimations(EntityClass)
								
								# cause rerender immediately so cursor doesn't get moved to the end of the field
								update()
						E "label.mdl-textfield__label", "Name..."
					E "button.mdl-button.mdl-js-button.mdl-button--icon.mdl-color-text--grey-600.delete",
						onClick: (e)=>
							e.preventDefault()
							delete_item()
							Entity.saveAnimations(EntityClass)
						E "i.material-icons", "delete"
			E EntityPreview, {
				entity: @preview_entity, max_width: 200, max_height: 100
				ref: (@entity_preview)=>
			}
	
	componentDidMount: ->
		componentHandler.upgradeElement(ReactDOM.findDOMNode(@mdl_textfield_el)) if @mdl_textfield_el?

class @AnimGroup extends React.Component
	render: ->
		{entity, EntityClass, array_to_push_anims_to, update, type_of_anims} = @props
		E ".anim-group",
			if EntityClass?
				if type_of_anims is "poses"
					if EntityClass.poses?
						if Object.keys(EntityClass.poses).length > 0
							i = 0
							for pose_name, pose of EntityClass.poses then do (pose_name, pose)=>
								i += 1
								selected = editor.editing_entity_anim_name is pose_name and not editor.editing_entity_animation_frame_index?
								E Anim, {
									key: i
									name: pose_name
									entity, EntityClass, selected, editor, update, type_of_anims
									# pose
									select: =>
										editor.editing_entity_anim_name = pose_name
										editor.editing_entity_animation_frame_index = null
										unless pose_name is "Current Pose"
											entity.structure.setPose(EntityClass.poses[pose_name])
									delete_item: =>
										delete EntityClass.poses[pose_name]
										editor.editing_entity_anim_name = "Current Pose"
										editor.editing_entity_animation_frame_index = null
									get_pose: =>
										if pose_name is "Current Pose" or selected
											entity.structure.getPose()
										else
											EntityClass.poses[pose_name]
									ref: (anim)=>
										array_to_push_anims_to.push(anim) if anim?
								}
						else
							E "article.placeholder", "No poses"
					else
						E "article.placeholder", "Entity class is not initialized for animation"
				else if type_of_anims is "animations"
					if EntityClass.animations?
						if Object.keys(EntityClass.animations).length > 0
							i = 0
							for animation_name, animation of EntityClass.animations then do (animation_name, animation)=>
								i += 1
								selected = editor.editing_entity_anim_name is animation_name and editor.editing_entity_animation_frame_index?
								E Anim, {
									key: i
									name: animation_name
									entity, EntityClass, selected, editor, update, type_of_anims
									# animation
									select: =>
										editor.editing_entity_anim_name = animation_name
										editor.editing_entity_animation_frame_index = 0
										pose = EntityClass.animations[animation_name]?[0]
										entity.structure.setPose(pose) if pose
									delete_item: =>
										delete EntityClass.animations[animation_name]
										editor.editing_entity_anim_name = "Current Pose"
										editor.editing_entity_animation_frame_index = null
									get_pose: =>
										animation = EntityClass.animations[animation_name]
										animation?[~~(Math.random()*EntityClass.animations[animation_name].length)]
									ref: (anim)=>
										array_to_push_anims_to.push(anim) if anim?
								}
						else
							E "article.placeholder", "No animations"
					else
						E "article.placeholder", "Entity class is not initialized for animation"
				else if type_of_anims is "animation-frames"
					if EntityClass.animations?
						animation_name = editor.editing_entity_anim_name
						frames = EntityClass.animations[animation_name]
						if frames?
							for frame, frame_index in frames then do (frame, frame_index)=>
								selected = editor.editing_entity_anim_name is animation_name and editor.editing_entity_animation_frame_index is frame_index
								E Anim, {
									key: frame_index
									name: "Frame #{frame_index}"
									entity, EntityClass, selected, editor, update, type_of_anims
									# animation frame
									select: =>
										editor.editing_entity_anim_name = animation_name
										editor.editing_entity_animation_frame_index = frame_index
										pose = EntityClass.animations[animation_name][frame_index]
										entity.structure.setPose(pose)
									delete_item: =>
										EntityClass.animations[animation_name].splice(frame_index, 1)
									get_pose: =>
										if selected
											entity.structure.getPose()
										else
											animation = EntityClass.animations[animation_name]
											animation?[frame_index]
									ref: (anim)=>
										array_to_push_anims_to.push(anim) if anim?
								}
						else
							E "article.placeholder", "Error: Trying to display the frames of a non-existant animation"
					else
						E "article.placeholder", "Error: Entity class is not initialized for animation, trying to display the frames of an animation?"
				else
					E "article.placeholder", "Error: weird type_of_anims for AnimGroup #{type_of_anims}"
			E "button.add-anim-fab.mdl-button.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect.mdl-button--colored",
				ref: (@new_anim_button)=>
				onClick: =>
					if type_of_anims is "animation-frames"
						animation = EntityClass.animations[editor.editing_entity_anim_name]
						# from_pose = animation[editor.editing_entity_animation_frame_index]
						# new_pose = Pose.copy(from_pose)
						# animation.push(new_pose)
						# editor.editing_entity_animation_frame_index = animation.length - 1
						new_pose = entity.structure.getPose()
						animation.push(new_pose)
						editor.editing_entity_animation_frame_index = animation.length - 1
					else
						default_name = switch type_of_anims
							when "poses" then "New Pose"
							when "animations" then "New Animation"
						new_name = default_name
						i = 1
						while EntityClass[type_of_anims][new_name]?
							new_name = "#{default_name} #{i}"
							i += 1
						
						switch type_of_anims
							when "poses"
								EntityClass.poses[new_name] = entity.structure.getPose()
								editor.editing_entity_animation_frame_index = null
							when "animations"
								EntityClass.animations[new_name] = [entity.structure.getPose()]
								editor.editing_entity_animation_frame_index = 0
						
						editor.editing_entity_anim_name = new_name
					
					Entity.saveAnimations(EntityClass)
					
					update()
				
				E "i.material-icons", "add"
	
	componentDidMount: =>
		componentHandler.upgradeElement(ReactDOM.findDOMNode(@new_anim_button))
	# XXX: have to upgrade when the bar becomes visible
	componentDidUpdate: =>
		componentHandler.upgradeElement(ReactDOM.findDOMNode(@new_anim_button))


class @PosingAndAnimationBar extends React.Component
	constructor: ->
		super
		@state = {visible: no}
	
	render: =>
		{editor} = @props
		{visible, EntityClass} = @state
		
		entity = editor.editing_entity ? @shown_entity
		editing_an_animation = editor.editing_entity_animation_frame_index?
		@shown_entity = entity
		
		@anims = []
		# TODO: remove references from @anims on Anim::componentWillUnmount
		E ".bar.sidebar.posing-and-animation-bar", class: {visible},
			E ".posing-and-animation",
				E "h1", "Poses"
				E AnimGroup, {entity, EntityClass, array_to_push_anims_to: @anims, update: @update, type_of_anims: "poses"}
				E "h1", "Animations"
				E AnimGroup, {entity, EntityClass, array_to_push_anims_to: @anims, update: @update, type_of_anims: "animations"}
			E ".animation-frames", class: {visible: visible and editing_an_animation},
				E "h1", "Frames"
				E AnimGroup, {entity, EntityClass, array_to_push_anims_to: @anims, update: @update, type_of_anims: "animation-frames", editing_frame_index: editor.editing_entity_animation_frame_index}
	
	update: =>
		{editor} = @props
		{editing_entity_anim_name, editing_entity} = editor
		
		EntityClass = if editing_entity? then entity_classes[editing_entity._class_]
		visible = EntityClass?.animations
		if visible
			for anim in @anims
				# {name, type_of_anims} = anim.props
				# anims_object = EntityClass[if type_of_anims is "animation-frames" then "animations" else type_of_anims]
				# if anims_object[name]?
				# 	pose =
				# 		switch type_of_anims
				# 			when "animations"
				# 				animation = EntityClass.animations[name]
				# 				animation[0]
				# 			when "animation-frames"
				# 				animation = EntityClass.animations[name]
				# 				animation[0]
				# 			when "poses"
				# 				if name is "Current Pose" or anim.isSelected()
				# 					editing_entity.structure.getPose()
				# 				else
				# 					EntityClass.poses[name]
				pose = anim.props.get_pose()
				if pose?
					anim.entity_preview.entity.structure.setPose(pose)
					anim.entity_preview.update()
		
		@setState {visible, EntityClass, editing_entity_anim_name}

