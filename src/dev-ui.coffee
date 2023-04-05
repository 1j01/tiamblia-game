{Entity} = require "skele2d"
{GUI, Controller} = require "lil-gui"
idb_keyval = require "idb-keyval" # just for persisting file handles

# dependencies injected via configure_property_inspector()
editor = null
world = null

# UI for development features, accessible with the backtick/tilde (`/~) key
gui = new GUI()
gui.hide()
option_names_to_keys = {
	"Disable welcome message, start in edit mode": "tiamblia.disable_welcome_message"
	"Show performance stats": "tiamblia.show_stats"
	"Debug projectPointOutside": "tiamblia.debug_project_point_outside"
	"Debug Caterpillar class": "tiamblia.debug_caterpillar"
	"Debug Arrow class": "tiamblia.debug_arrow"
	"Debug Terrain class": "tiamblia.debug_terrain"
	"Show collision buckets": "tiamblia.show_collision_buckets"
	"Show hit tested buckets": "tiamblia.count_hit_tests"
	"Show point names": "Skele2D show names"
	"Show point indices": "Skele2D show indices"
	"Allow posing animatable entities in world": "Skele2D allow posing animatable entities in world"
	"Disable constraint solving while editing": "Skele2D disable constraint solving"
}
options = {}
tiamblia_folder = gui.addFolder("Tiamblia")
skele2d_folder = gui.addFolder("Skele2D")
entity_folder = gui.addFolder("Selected Entity")
for name, storage_key of option_names_to_keys then do (name, storage_key) ->
	options[name] = (try localStorage[storage_key]) is "true"
	folder = if storage_key.indexOf("Skele2D") is 0 then skele2d_folder else tiamblia_folder
	folder.add(options, name).onChange (value) ->
		localStorage[storage_key] = value
		return
	return

options["Auto-spawn entities"] = (try localStorage["tiamblia.auto_spawn"]) ? ""
tiamblia_folder.add(options, "Auto-spawn entities").onChange (value) ->
	localStorage["tiamblia.auto_spawn"] = value
	return

options["Clear Auto-Save"] = ->
	localStorage.removeItem("Skele2D World")
	alert "Cleared Skele2D World. Refresh the page to start over."
	return
skele2d_folder.add(options, "Clear Auto-Save")

file_handle = null
idb_keyval.get("tiamblia.file_handle").then (value) ->
	file_handle = value
	return
load_from_json = (json)->
	try
		parsed = JSON.parse(json)
	catch error
		editor.warn("Failed to parse file as JSON: #{error}")
		return false
	# TODO: don't create extra undo step if error occurs in fromJSON
	editor.undoable =>
		try
			world.fromJSON(parsed)
		catch error
			editor.warn("Failed to load world: #{error}")
		return false
	return true
file_open = ->
	if showOpenFilePicker?
		try
			[new_file_handle] = await showOpenFilePicker({accept: [{description: "JSON", extensions: ["json"]}]})
			file = await new_file_handle.getFile()
			json = await file.text()
		catch exception
			if exception.name is "AbortError"
				return
			editor.warn("Failed to open file: #{exception}")
			return
		if load_from_json(json)
			file_handle = new_file_handle
			idb_keyval.set("tiamblia.file_handle", file_handle)
	else
		input = document.createElement("input")
		input.type = "file"
		input.accept = ".json"
		input.onchange = =>
			# load_from_json(await input.files[0].text())
			reader = new FileReader()
			reader.onload = =>
				load_from_json(reader.result)
				return
			reader.readAsText(input.files[0])
			return
		input.click()
	return
file_save_as = ->
	json = JSON.stringify(world.toJSON(), null, "\t")
	if showSaveFilePicker?
		try
			file_handle = await showSaveFilePicker({types: [{description: "JSON", accept: {"application/json": [".json"]}}]})
			writable = await file_handle.createWritable()
			await writable.write(json)
			await writable.close()
		catch exception
			if exception.name is "AbortError"
				return
			editor.warn("Failed to save file: #{exception}")
			return
	else
		a = document.createElement("a")
		a.href = "data:application/json;charset=utf-8," + encodeURIComponent(json)
		a.download = "Tiamblia World.json"
		a.click()
	return
file_save = ->
	if file_handle?
		json = JSON.stringify(world.toJSON(), null, "\t")
		try
			writable = await file_handle.createWritable()
			await writable.write(json)
			await writable.close()
		catch error
			editor.warn("Failed to save file: #{error}")
			return
	else
		file_save_as()
	return

addEventListener "keydown", (event) ->
	if event.key is "s" and event.ctrlKey
		event.preventDefault()
		file_save()
		return
	if event.key is "o" and event.ctrlKey
		event.preventDefault()
		file_open()
		return
	return

options["Load World"] = file_open
skele2d_folder.add(options, "Load World")

options["Save World"] = file_save
skele2d_folder.add(options, "Save World")

options["Save World As"] = file_save_as
skele2d_folder.add(options, "Save World As")

last_selected_entity = null
# lil-gui.js doesn't support an onBeforeChange callback,
# so we have to do this hack to integrate with the undo system.
# Another way might be with a Proxy, might be cleaner.
# This is debounced because it's called a lot while dragging controllers.
# `undoable()` will save, but if we're debouncing it, we need to save manually.
last_undoable_time = -Infinity
save_timeout = null
ms_between_undos = 300
ms_idle_before_saving = ms_between_undos * 2
old_Controller_setValue = Controller::setValue
Controller::setValue = (value) ->
	controller_edits_entity = false
	c = @
	while c
		if c.object instanceof Entity
			controller_edits_entity = true
			break
		c = c.parent
	# controller_edits_entity = @ in entity_folder.controllersRecursive() # alternative
	if controller_edits_entity
		clearTimeout(save_timeout)
		save_timeout = setTimeout =>
			editor.save()
		, ms_idle_before_saving
		if performance.now() - last_undoable_time > ms_between_undos
			editor.undoable =>
				old_Controller_setValue.call(@, value)
				return
			last_undoable_time = performance.now()
		else
			old_Controller_setValue.call(@, value)
	else
		old_Controller_setValue.call(@, value)
	return

# The ButtonController doesn't look good in the inspector, for linked entities.
# Note that this class uses a different constructor signature than ButtonController,
# because it doesn't use the object's property as the function, nor the key as name.
class LinkButtonController extends Controller
	constructor: (parent, object, property, link_name, link_action)->
		super(parent, object, property, "link-button-controller")

		@$button = document.createElement("button")
		@$button.textContent = link_name

		# stylize button as link
		@$button.style.background = "none"
		@$button.style.border = "none"
		@$button.style.padding = "0"
		@$button.style.font = "inherit"
		@$button.style.cursor = "pointer"
		@$button.style.color = "#2277FF"
		@$button.style.textDecoration = "underline"
		@$button.style.textAlign = "left"
		@$button.style.fontWeight = "bold"

		@$button.addEventListener "click", =>
			link_action()

		@$widget.append(@$button)

		@updateDisplay()

	updateDisplay: ->
		return this

# "waves" is old, it shouldn't be on the Water entity anymore
# TODO: move this info into the respective entity classes
# and maybe base it on serialization by default, but allow more properties to be excluded
property_inspector_exclusions = ["_class_", "structure", "random_values", "simplex", "waves_y", "waves_vy", "bubbles", "waves"]

inspect_entity = (selected_entity, breadcrumbs=[])->
	# Note: selected_entity may be null/undefined, for deselection
	for child in entity_folder.children by -1
		child.destroy()
	if breadcrumbs.length > 0
		button_name = "Back to #{breadcrumbs[breadcrumbs.length - 1].constructor.name}"
		button_action = ->
			inspect_entity(breadcrumbs[breadcrumbs.length - 1], breadcrumbs.slice(0, breadcrumbs.length - 1))
		entity_folder.add({[button_name]: button_action}, button_name)
	make_controllers = (object, folder)->
		for key, value of object when key not in property_inspector_exclusions
			if typeof value in ["number", "string", "boolean"]
				# unlike dat.gui, lil-gui.js only supports RGB colors, no hsl, and no alpha
				if key.match(/color/i) and typeof value is "string" and value[0] is "#" and value.length in [4, 7]
					folder.addColor(object, key)
				else
					folder.add(object, key)
			else if typeof value is "object" and value
				if value instanceof Array
					if value.length > 0
						array_folder = folder.addFolder(key)
						array_folder.close()
						make_controllers(Object.assign({}, value), array_folder)
				else if value.constructor is Object
					make_controllers(value, folder.addFolder(key))
				else if value instanceof Entity
					# Make button to select entity
					do (key, value)=>
						button_fn = ->
							editor.selected_entities = [value]
							inspect_entity(value, [...breadcrumbs, selected_entity])
							# avoid inspect_entity on next frame clearing breadcrumbs
							last_selected_entity = value
							return
						# button_key = "Select #{key}"
						# folder.add({[button_key]: button_fn}, button_key)
						new LinkButtonController(folder, object, key, value.constructor.name, button_fn)
				else
					console.log("Unknown type for #{key}: #{value.constructor.name}")
			else if value
				console.log("Unknown type for #{key}: #{typeof value}")
			else
				console.log("Skipping #{value} value for #{key}")
	make_controllers(selected_entity, entity_folder)
	if selected_entity
		entity_folder.title("Selected Entity (#{selected_entity.constructor.name})")
	else
		entity_folder.title("Selected Entity")

update_property_inspector = ->
	selected_entity = editor.selected_entities[0]
	if last_selected_entity isnt selected_entity
		last_selected_entity = selected_entity
		inspect_entity(selected_entity)
	else
		for controller in entity_folder.controllersRecursive()
			controller.updateDisplay()
	return

module.exports.gui = gui
module.exports.update_property_inspector = update_property_inspector
module.exports.configure_property_inspector = (dependencies) ->
	editor = dependencies.editor
	world = dependencies.world
	return
