var gulp = require("gulp");
var gutil = require("gulp-util");

var fs = require("fs");
var path = require("path");

if (fs.existsSync("./../dev.json")) {

	var devjson = require("./../dev.json");

}

else {
	var devjson = {

		"browserSyncProxy": "localhost:8080",
		"browserSyncProxyPort": "8080"

	};
}

var cmi = require("cmi");

var watch = require("gulp-watch");
var rename = require("gulp-rename");

var postcss = require("gulp-postcss");

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var react = require("gulp-react");
var webpack = require("webpack");
var jshint = require("gulp-jshint");

var sourcemaps = require("gulp-sourcemaps");
var replace = require("gulp-replace");

var browserSync = require("browser-sync");

var cssLintRuleBlackList = [
	
	"bulletproof-font-face",
	"adjoining-classes",
	"compatible-vendor-prefixes"

];

gulp.task("style", function () {

	var processors = [

		require("postcss-import"),
		require("postcss-mixins")({ mixinsDir: "source/style/mixins/" }),
		require("postcss-simple-extend"),
		require("postcss-nested"),
		require("postcss-for"),
		require("postcss-simple-vars"),
		require("postcss-assets")({

			relativeTo: "lib/"

		}),
		require("postcss-calc")({ preserve: false }),
		require("postcss-size"),
		require("./abreviations.js"),
		require("postcss-will-change"),
		require("postcss-color-rgba-fallback"),
		require("postcss-image-set"),
		require("autoprefixer-core")({ browsers: ["last 1 version"] }),
		require("postcss-opacity"),
		require("postcss-pxtorem")({ replace: false }),
		require("postcss-color-function")(),
		require("postcss-merge-rules")

	];

	gulp.src("source/style/main.compiled.css")

		.pipe(postcss(processors))

		.pipe(rename("player.css"))
		.pipe(gulp.dest("lib/"))

		.pipe(browserSync.reload({ stream: true }));

});

gulp.task("librairies", function () {

	return gulp.src([

			"assets/bin/librairies/es5-shim.min.js",
			"assets/bin/librairies/es5-sham.min.js",
			"assets/bin/librairies/react-with-addons.min.js",

			"assets/bin/librairies/**/*.js"

		])

		.pipe(concat("librairies.js"))

		.pipe(uglify())

		.pipe(rename("librairies.min.js"))
		.pipe(gulp.dest("assets/bin/"))

		.pipe(browserSync.reload({ stream: true }));

});

gulp.task("scripts", function () {

	webpack({

		cache: true,
		entry: "./source/main.js",

		output: {

			path: path.join(__dirname, "lib"),
			filename: "player.js"

		},

		externals: {

			"react": "React"
		
		},

		module: {
			loaders: [

				{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
				{ test: /\.js$/, loader: "jsx" }

			]
		},

		plugins: []

	}, function(error, stats) {

		if (error) {

			throw new gutil.PluginError("webpack:build", error);

		}

		gutil.log("[webpack:build]", stats.toString({

			colors: true

		}));

		gulp.src(["lib/player.js"])

			.pipe(jshint())
			.pipe(jshint.reporter(function(errors, cb) {

				if (errors.length) {

					console.log("\x1b[1m\x1b[5m\x1b[37m\x1b[41m" + errors.length + " JSHINT ERRORS IN assets/player.js" + "\x1b[0m");

				}

				for (var i = 0, length = errors.length; i < length; i++) {
				
					var error = errors[i].error;

					if (error.evidence) {

						console.log("\x1b[1m\x1b[31m" + "Ligne " + error.line + " : " + error.reason + " `" + error.evidence.trim() + "`" + "\x1b[0m");

					}

					else {

						console.log("\x1b[1m\x1b[31m" + "Ligne " + error.line + " : " + error.reason + "\x1b[0m");

					}
				
				}

			}))

			.pipe(browserSync.reload({ stream: true }));

	});

});

gulp.task("browser-sync", function() {

	if (devjson.browserSyncProxy && devjson.browserSyncProxyPort) {

		browserSync({

			proxy: devjson.browserSyncProxy,
			port: devjson.browserSyncProxyPort,
			logLevel: "info",
			logFileChanges: false

		}, function(error, bs) {

			console.log(bs.options.getIn(["urls", "local"]));

		});

	}

	else {

		console.info("No `browserSyncProxy` and/or `browserSyncProxyPort` defined in `dev.json`");

	}

});

gulp.task("cmi", function() {

	cmi.init({

		componentsFolder: "source/components",

		componentsImport: {

			from: "source/style/main.css",
			to: "source/style/main.compiled.css"

		}

	});

});

gulp.task("default", ["browser-sync", "cmi", "librairies", "scripts", "style"], function() {

	gulp.watch("assets/bin/librairies/**/*.js", ["librairies"]);
	
	watch(["source/**/*.js"], function() {

		gulp.start("scripts");

	});

	watch(["source/**/*.css", "!source/style/main.css"], function() {

		gulp.start("style");

	});

});