
class @AnimationBar extends Bar
	constructor: ->
		super
		@element.classList.add("animation-bar")
		
		@poses_el = document.createElement("div")
		@poses_heading_el = document.createElement("h1")
		@poses_heading_el.textContent = "Poses"
		
		@animations_el = document.createElement("div")
		@animations_heading_el = document.createElement("h1")
		@animations_heading_el.textContent = "Animations"
		
		@new_pose_button = document.createElement("button")
		@new_pose_button.className = "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
		@new_pose_button.innerHTML = '<i class="material-icons">add</i>'
		componentHandler.upgradeElement(@new_pose_button)
		
		@new_animation_button = document.createElement("button")
		@new_animation_button.className = "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
		@new_animation_button.innerHTML = '<i class="material-icons">add</i>'
		componentHandler.upgradeElement(@new_animation_button)
		
		@element.appendChild(@poses_heading_el)
		@element.appendChild(@poses_el)
		@element.appendChild(@new_pose_button)
		
		@element.appendChild(@animations_heading_el)
		@element.appendChild(@animations_el)
		@element.appendChild(@new_animation_button)
		
		@new_pose_button.addEventListener "click", (e)=>
			entity = @editor.editing_entity
			EntityClass = Object.getPrototypeOf(entity).constructor
			new_pose_name = "New Pose"
			i = 1
			while EntityClass.poses[new_pose_name]?
				new_pose_name = "New Pose #{i}"
				i += 1
			EntityClass.poses[new_pose_name] = {}
			@update_frame_els(entity)
		
		@new_animation_button.addEventListener "click", (e)=>
			alert("Animations are not yet supported")
		
		@shown_entity = null
		@editing_frame_name = null
		@entity_previews = []
	
	update_frame_els: (entity)->
		@shown_entity = entity
		@entity_previews = []
		
		EntityClass = Object.getPrototypeOf(entity).constructor
		
		selected_frame_el = null
		
		create_frame_el = (frame_name)=>
			entity_preview = new EntityPreview(entity, max_width: 200, max_height: 100)
			@entity_previews.push(entity_preview)
			frame_el = document.createElement("article")
			frame_el.className = "frame"
			name_el = document.createElement("h1")
			name_el.className = "name"
			name_el.textContent = frame_name
			frame_el.appendChild(name_el)
			frame_el.appendChild(entity_preview.canvas)
			frame_el.addEventListener "click", (e)=>
				selected_frame_el.classList.remove("selected")
				selected_frame_el = frame_el
				frame_el.classList.add("selected")
			frame_el
		
		@poses_el.innerHTML = ""
		@animations_el.innerHTML = ""
		
		frame_el = create_frame_el("Current Pose")
		@poses_el.appendChild(frame_el)
		selected_frame_el = frame_el
		frame_el.classList.add("selected")
		
		for pose_name, pose of EntityClass.poses
			frame_el = create_frame_el(pose_name, pose)
			@poses_el.appendChild(frame_el)
		
		for animation_name, animation of EntityClass.animations
			frame_el = create_frame_el(animation_name, animation)
			@animations_el.appendChild(frame_el)
	
	update: ->
		entity = @editor.editing_entity
		@element.classList[if entity? then "add" else "remove"]("visible")
		
		if entity? and entity isnt @shown_entity
			@update_frame_els(entity)
		
		for entity_preview in @entity_previews
			entity_preview.update()
