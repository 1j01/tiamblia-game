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

I'm making a custom engine called [Skele2D](https://github.com/1j01/skele2d), where everything is based on points and an integrated editor that can manipulate these points.
The core editor is basically done; you can select entities, drag them around, pose them, cut/copy and paste, et cetera.
The animation editor needs undo/redo, frame reordering, and maybe variable delays.

I'm loading most of the code from the npm module, but
I've kept the `Entity` and `Terrain` classes in here (commenting them out entirely), because I think they should eventually be decoupled from Skele2D.
I believe an entity system is very "personal", something you want to use specific to your game,
and also not something you should have to need at all.
You should be able to start off without a base `Entity` class, to start small — if possible.

I'm still working out the boundary between Skele2D and the game.
Right now, the `World` class isn't included in the engine, even though it's still essentially integral to the framework.
I didn't really plan for separating the engine from the game, so it might be a challenge.
One strategy might be to make Skele2D as much as possible be _just an editor_.
I think the main value add is the editor, with its complex logic and simple UI.
It still will take a lot to figure out (or simplify) the boundary; the editor does some rendering and needs to know and manipulate the viewport, and it needs to integrate with serialization in order to do undo/redo, and saving/loading.
The editor also needs to know how to render previews of entities for the entities bar...

To be clear, the parts are all working together right now, it's just the boundary that's not clear.

## Development Setup

* Install [Node.js](https://nodejs.org/) if you don't have it.
* Install [Git](https://git-scm.com/) if you don't have it.
* [Clone the repository](https://help.github.com/articles/cloning-a-repository/)
* Open a command prompt / terminal in the project directory, and run `npm install`
* Then run `npm start` and wait for it to say `Project is running at http://localhost:8080/`
* Open <http://localhost:8080> in your browser. It will automatically reload when you make changes. (Note: undo history in the editor will be lost when it reloads.)

When pulling new changes from Git, run `npm install` again in case there are new or updated dependencies.
(You don't need to if `package-lock.json` hasn't changed.)
