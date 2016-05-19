
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
			
			@update_anim_els(entity)
		
		@new_animation_button.addEventListener "click", (e)=>
			alert("Animations are not yet supported")
			# TODO: animation editing
		
		@shown_entity = null
		@editing_anim_name = null
		@entity_previews = []
	
	update_anim_els: (entity)->
		@shown_entity = entity
		@entity_previews = []
		
		EntityClass = Object.getPrototypeOf(entity).constructor
		
		selected_anim_el = null
		
		create_anim_el = (anim_name)=>
			entity_preview = new EntityPreview(entity, max_width: 200, max_height: 100)
			@entity_previews.push(entity_preview)
			anim_el = document.createElement("article")
			mdl_textfield_el = document.createElement("div")
			mdl_textfield_el.className = "mdl-textfield mdl-js-textfield"
			name_input_el = document.createElement("input")
			name_label_el = document.createElement("label")
			name_input_el.className = "mdl-textfield__input name"
			name_label_el.className = "mdl-textfield__label"
			name_label_el.textContent = "Text..."
			name_input_el.value = anim_name
			mdl_textfield_el.appendChild(name_input_el)
			mdl_textfield_el.appendChild(name_label_el)
			anim_el.appendChild(mdl_textfield_el)
			anim_el.appendChild(entity_preview.canvas)
			anim_el.addEventListener "click", (e)=>
				selected_anim_el.classList.remove("selected")
				selected_anim_el = anim_el
				anim_el.classList.add("selected")
			name_input_el.addEventListener "change", (e)=>
				new_anim_name = name_input_el.value
				if EntityClass.poses[new_anim_name]
					alert("There's already a pose with the name #{new_anim_name}")
					name_input_el.value = anim_name
					return
				if EntityClass.animations[new_anim_name]
					alert("There's already an animation with the name #{new_anim_name}")
					name_input_el.value = anim_name
					return
				alert("Renaming is not yet supported.")
			componentHandler.upgradeElement(mdl_textfield_el)
			anim_el
		
		@poses_el.innerHTML = ""
		@animations_el.innerHTML = ""
		
		anim_el = create_anim_el("Current Pose")
		@poses_el.appendChild(anim_el)
		selected_anim_el = anim_el
		anim_el.classList.add("selected")
		
		for pose_name, pose of EntityClass.poses
			anim_el = create_anim_el(pose_name, pose)
			@poses_el.appendChild(anim_el)
		
		for animation_name, animation of EntityClass.animations
			anim_el = create_anim_el(animation_name, animation)
			@animations_el.appendChild(anim_el)
	
	update: ->
		entity = @editor.editing_entity
		@element.classList[if entity? then "add" else "remove"]("visible")
		
		if entity? and entity isnt @shown_entity
			@update_anim_els(entity)
		
		for entity_preview in @entity_previews
			entity_preview.update()
