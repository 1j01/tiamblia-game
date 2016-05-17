
class @AnimationBar extends Bar
	constructor: ->
		super
		@element.classList.add("animation-bar")
		@shown_entity = null
		@entity_preview = null
	
	update: ->
		entity = @editor.editing_entity
		@element.classList[if entity? then "add" else "remove"]("visible")
		
		if entity? and entity isnt @shown_entity
			@shown_entity = entity
			@entity_preview = new EntityPreview(entity, max_width: 200, max_height: 100)
			@element.innerHTML = ""
			# for animation in entity.animations or something
			cell_el = document.createElement("article")
			cell_el.className = "cell"
			name_el = document.createElement("h1")
			name_el.className = "name"
			name_el.textContent = "Current Pose"
			cell_el.appendChild(name_el)
			cell_el.appendChild(@entity_preview.canvas)
			
			@element.appendChild(cell_el)
