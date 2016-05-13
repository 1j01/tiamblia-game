# Tiamblia

With a simple visual style,
Tiamblia is an immersive 2D exploration adventure game
where you can talk to spirits, hunt them, and gain their powers.
Also there'll be a story, music, inverse kinematics, day/night transitions and maybe even weather.

Stay tuned to potentially interact with
the Spirit of the Hunt,
friendly painted beetles,
fancy lions,
a walled garden (that's a snake fyi),
living lanterns (that eat fireflies),
tiny birds,
cheeky trees,
a spider dojo,
a charitable castle,
and more!

Follow the game [on GameJolt](http://gamejolt.com/games/tiamblia/147746)
and/or watch the repository on GitHub.

[#AdvJam2016](http://jams.gamejolt.io/adventurejam2016)
but let's be honest this isn't gonna be finished by the deadline.

I'm making a custom engine where everything is based on points
and an integrated level editor that can manipulate these points.
There will be an animation editor, and terrain-specific editing features.
The core editor is basically done.

The game has only just begun.
Except that it basically hasn't even begun yet.
There's like a character, a type of tree, and a type of ground, none of which are done yet.
But this is happening.

<!--
while editing an entity
	drag outside of the entity to select points (w/ a selection box)
	double click outside of the entity to stop editing the entity
		(another entity you click on should not be selected)
		(the entity should be deselected)
	double clicking on the entity should not stop editing the entity
	drag on a point to move all selected points
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
-->

<!--
Arachnids can sit cross-legged in many interesting ways.
-->
