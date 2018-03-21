# Tiamblia

With a simple visual style, Tiamblia is an immersive 2D exploration adventure game where you can talk to spirits, hunt them, and gain their powers. There will be lots of interesting places to visit, things to do, characters to talk to, original music to listen to...

Follow [the game on GameJolt](http://gamejolt.com/games/tiamblia/147746), or watch [the repository on GitHub](https://github.com/1j01/tiamblia-game).

Stay tuned to potentially interact with...
* the Spirit of the Hunt,
* friendly painted beetles,
* fancy lions,
* a walled garden (that's a snake fyi),
* living lanterns (that eat fireflies),
* tiny birds,
* cheeky trees,
* a spider dojo (or rather the spiders thereof),
* a charitable castle (mhm yup the castle),
* and more!

I'm making [a custom engine](https://github.com/1j01/skele2d) where everything is based on points and an integrated editor that can manipulate these points.
The core editor is basically done; you can select entities, drag them around, pose them, cut/copy and paste, et cetera.
The animation editor needs undo/redo, frame reordering, and maybe variable delays.

I'm in the process of extracting the engine out to [Skele2D](https://github.com/1j01/skele2d).
I've switched to loading most of the code from the npm module, although it's published as uncompiled CoffeeScript for now.
I've kept the `Entity`, `Terrain`, and `World` classes in here because I think they should eventually be decoupled from Skele2D,
because an entity system is very "personal", something you want to use specific to your game,
and also not something you should have to need at all.
You should be able to start off without a base `Entity` class, to start small.
Actually, the `World` class isn't even included in the package, even tho it's still essentially integral to the framework.
So, I'm working this out, progressively...
