# Tiamblia

With a simple visual style, Tiamblia is an immersive 2D exploration adventure game where you can talk to spirits, hunt them, and gain their powers. There will be lots of interesting places to visit and things to do. Also there'll be a story, original music, inverse kinematics, day/night transitions and maybe even weather.

Stay tuned to potentially interact with...
* the Spirit of the Hunt,
* friendly painted beetles,
* fancy lions,
* a walled garden (that's a snake fyi),
* living lanterns (that eat fireflies),
* tiny birds,
* cheeky trees,
* a spider dojo,
* a charitable castle,
* and more!

Follow [the game on GameJolt](http://gamejolt.com/games/tiamblia/147746)
and/or watch [the repository on GitHub](https://github.com/1j01/tiamblia-advjam2016).

I'm making a custom engine where everything is based on points and an integrated editor that can manipulate these points.
The core editor is basically done, but there will be an animation editor, as well as terrain-specific editing features.

<!--
## Editor Behavior
These could become tests if this were to be a reusable game engine and editor.

drag with the middle mouse button to pan the view
	(with momentum, wee!)
zoom towards the mouse with mousewheel
	(i.e. with the mouse anchored in the w

while editing an entity
	drag outside of the entity to select points (w/ a selection box)
	double click outside of the entity to stop editing the entity
		(another entity you click on should not be selected)
		(the entity should be deselected)
	double clicking on the entity should not stop editing the entity
	drag on a selected point to move all selected points
	drag on a non-selected point to select that point and move it
	click on a point to select that point
		(even when it's one of multiple points in the selection)
	shift+click or ctrl+click on a point to toggle the selected state of that point
	shift+drag from anywhere to select points (w/ a selection box)
	press delete to delete selected points
otherwise
	press delete to delete selected entities
	with selected entities
		drag on a selected entity to move all selected entities
		double click on a selected entity to edit the entity
			(should always make it the only selected entity)
		click on a selected entity to make it the only selected entity
	drag on a non-selected entity to select that entity and move it
	drag outside of any entity to select entities (w/ a selection box)
	click on an entity to select that entity
	shift+click or ctrl+click on an entity to toggle the selected state of that entity
	shift+drag from anywhere to select entities (w/ a selection box)

drag from the entities bar to create and place an entity
click on an entity in the bar to create it and have it placed randomly offscreen in the middle of nowhere
	(or not)
	(the cursor should be enough indication that you need to drag)

only what will be dragged should ever be shown as hovered
when there are multiple points within the minimum range for dragging, the closest should be hovered
when there are multiple entities within the minimum range for dragging, the one on top should probably be hovered
	you can drag a selection to access entities that are behind large entities such as terrain or a large tree

while dragging an entity, the entities bar should be hidden

when starting editing an entity, you should not also start dragging a point

delete, undo, redo, etc. should work while dragging entities or points
minimum drag distances should be based on view positions, not world positions
undo states should only be created once a drag starts

esc should cancel dragging or exit edit mode

entities and points should have hover styles

double clicks where the first click was not on the same entity as the second should be rejected

MMB-dragging from the entities bar should either work or not
	it should not start a drag but not drag until you mouse off of the entities bar

there should be a way to regenerate an entity
	it could be something like right click
	it should work for both placed entities and entities in the entities bar
	entity previews in the entities bar could show the exact random entity you would receive and then generate a new one once you place it

context menus
-->

<!--
Arachnids can sit cross-legged in many interesting ways.
-->
