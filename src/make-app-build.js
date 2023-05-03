const path = require("path");
const fs = require("fs");
const glob = require("glob");
const source_globs = [
	"index.html",
	"icons/**",
	"lib/**",
	"build/**",
	"animations/**",
	"world.json",
];
const destination_folder = "app-build";
try {
	fs.rmSync(destination_folder, { recursive: true });
} catch (e) {
	if (e.code !== "ENOENT") {
		throw e;
	}
}
fs.mkdirSync(destination_folder);

for (const source_glob of source_globs) {
	const source_paths = glob.sync(source_glob);
	// assumption: dirs come first
	for (const source_path of source_paths) {
		const dest_path = path.join(destination_folder, source_path);
		if (fs.statSync(source_path).isDirectory()) {
			console.log("copy dir ", source_path);
			fs.mkdirSync(dest_path);
		} else {
			console.log("copy file", source_path);
			fs.writeFileSync(dest_path, fs.readFileSync(source_path));
		}
	}
}
