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

file_handle = null
default_file_handle = null

# Verify the user has granted permission to read or write to the file, if
# permission hasn't been granted, request permission.
# getFile() can fail without requesting permission.
#
# @param {FileSystemFileHandle} file_handle File handle to check.
# @param {boolean} with_write whether write permission should be checked.
# @return {boolean} whether the user has granted read/write permission.
verify_permission = (file_handle, with_write)->
	options = {}
	if with_write
		options.writable = true
		# For Chrome 86 and later...
		options.mode = "readwrite"
	if await file_handle.queryPermission(options) is "granted"
		return true
	if await file_handle.requestPermission(options) is "granted"
		return true
	return false

clear_auto_save = ->
	return unless confirm("Are you sure you want to reload the default world?")
	localStorage.removeItem("Skele2D World")
	file_handle = null
	# don't await! requestPermission() can't be called in a promise chain.
	idb_keyval.del("tiamblia.file_handle")
	try
		if default_file_handle
			unless await verify_permission(default_file_handle, false)
				# This maybe doesn't fit with the spirit of a "Cancel" button...
				# location.reload()
				# I could simplify the UI by not clearing the auto-save if the user doesn't have permission to load the default world.
				# But it's a little weird since you don't need permission, if there's no file handle. It CAN just reload the page.
				alert "Auto-save cleared. If you want to get it back, edit something. If you want to load the default world, refresh the page."
				return
			file = await default_file_handle.getFile()
			json = await file.text()
			load_from_json(json)
			file_handle = default_file_handle
			await idb_keyval.set("tiamblia.file_handle", file_handle)
			return
		else
			location.reload()
			return
	catch exception
		alert "Cleared Skele2D World, but failed to load default world:\n\n#{exception}\n\nRefresh the page to start over."
		return

idb_keyval.get("tiamblia.file_handle").then (value) ->
	file_handle = value
	return
idb_keyval.get("tiamblia.default_world_file_handle").then (value) ->
	default_file_handle = value
	return

load_from_json = (json)->
	try
		parsed = JSON.parse(json)
	catch error
		editor.warn("Failed to parse file as JSON: #{error}")
		return false
	# TODO: don't create extra undo step if error occurs in *.fromJSON()
	editor.undoable =>
		try
			# world.fromJSON(parsed)
			# This avoids ghost a selection. It's a little hacky to use the editor's serialization methods, though.
			editor.fromJSON({world: parsed, selected_entity_ids: [], editing_entity_id: null, selected_point_names: []})
		catch error
			editor.warn("Failed to load world: #{error}")
		return false
	return true
store_file_handle = (file_handle) ->
	idb_keyval.set("tiamblia.file_handle", file_handle)
	# Maybe I should rename this file to be less generic
	if file_handle.name is "world.json"
		default_file_handle = file_handle
		idb_keyval.set("tiamblia.default_world_file_handle", file_handle)
	return
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
			store_file_handle(file_handle)
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
			return unless await verify_permission(file_handle, true)
			writable = await file_handle.createWritable()
			await writable.write(json)
			await writable.close()
		catch exception
			if exception.name is "AbortError"
				return
			editor.warn("Failed to save file: #{exception}")
			return
		store_file_handle(file_handle)
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
			return unless await verify_permission(file_handle, true)
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

icons =
	open: 53
	save: 22
	save_as: 22.2 # ...see hack below
	revert: 76.2

add_button = (folder, name, icon, callback)->
	button_controller = folder.add({[name]: callback}, name)
	img = document.createElement("img")
	if icon is 22.2
		# stupid fake save as icon
		icon = 22
		img.style.transform = "scale(0.8) translate(-2px, -2px)"
		img.style.filter = "drop-shadow(3px 3px 0px hsl(200, 80%, 40%)"
	if icon is 76.2
		# re-colorization for revert icon
		icon = 76
		img.style.filter = "hue-rotate(180deg)"
	img.src = "icons/png/#{icon}.png"
	img.style.marginRight = "5px"
	img.style.marginLeft = "70px"
	button_controller.$name.prepend(img)
	button_controller.$name.style.textAlign = "left"
	return

add_button(skele2d_folder, "Clear Auto-Save", icons.revert, clear_auto_save)
add_button(skele2d_folder, "Load World", icons.open, file_open)
add_button(skele2d_folder, "Save World", icons.save, file_save)
add_button(skele2d_folder, "Save World As", icons.save_as, file_save_as)

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

style_button_as_link = (button) ->
	button.style.background = "none"
	button.style.border = "none"
	button.style.padding = "0"
	button.style.font = "inherit"
	button.style.cursor = "pointer"
	button.style.color = "#2277FF"
	button.style.textDecoration = "underline"
	button.style.textAlign = "left"
	button.style.fontWeight = "bold"
	return

# The ButtonController doesn't look good in the inspector, for linked entities.
# Note that this class uses a different constructor signature than ButtonController,
# because it doesn't use the object's property as the function, nor the key as name.
class LinkButtonController extends Controller
	constructor: (parent, object, property, link_name, link_action)->
		super(parent, object, property, "link-button-controller")

		@$button = document.createElement("button")
		@$button.textContent = link_name

		style_button_as_link(@$button)

		@$button.addEventListener "click", =>
			link_action()

		@$widget.append(@$button)

		@updateDisplay()

	updateDisplay: ->
		return this

class BreadcrumbsController extends Controller
	constructor: (parent, object, property, links)->
		super(parent, object, property, "breadcrumbs-controller")

		@$buttons = []
		for link, link_index in links then do (link, link_index) =>
			button = document.createElement("button")
			button.textContent = link.name

			style_button_as_link(button)

			button.addEventListener "click", =>
				link.action()

			button.style.width = "auto"

			if not link.action?
				button.disabled = true
				button.style.color = "inherit"
				button.style.textDecoration = "none"
				button.style.cursor = "default"

			@$widget.append(button)
			unless link_index is links.length - 1
				span = document.createElement("span")
				span.textContent = " ❱ "
				span.style.color = "#777"
				@$widget.append(span)
			@$buttons.push(button)

		@$widget.style.display = "inline-block"
		@$name.style.display = "none"

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
	if breadcrumbs.length > 1
		new BreadcrumbsController(entity_folder, {}, "", breadcrumbs.map((breadcrumb, breadcrumb_index) -> {
			name: breadcrumb.entity.constructor.name
			action: if breadcrumb.entity isnt selected_entity then ->
				editor.selected_entities = [breadcrumb.entity]
				inspect_entity(breadcrumb.entity, breadcrumbs.slice(0, breadcrumb_index + 1))
				# avoid inspect_entity on next frame clearing breadcrumbs
				last_selected_entity = breadcrumb.entity
		}))
		
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
						array_folder.title("#{key} (#{value.length})")
						array_folder.close()
						make_controllers(Object.assign({}, value), array_folder)
				else if value.constructor is Object
					new_folder = folder.addFolder(key)
					new_folder.title("#{key} {...}")
					make_controllers(value, new_folder)
				else if value instanceof Entity
					# Make button to select entity
					do (key, value)=>
						button_fn = ->
							editor.selected_entities = [value]
							new_breadcrumb = {
								entity: value
								key: key
							}
							inspect_entity(value, [...breadcrumbs, new_breadcrumb])
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
	# TODO: update with added/removed properties
	if last_selected_entity isnt selected_entity
		last_selected_entity = selected_entity
		inspect_entity(selected_entity, if selected_entity then [{entity: selected_entity, key: null}])
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
