module.exports = function(grunt) {

	grunt.initConfig({

		"concat": {

			dist: {

				src: [

					"scripts/main.js",

					"scripts/**/*.js"

				],

				dest: "bin/dreamplayer.js",

			}

		},

		"uglify": {

			dist: {

				files: { "bin/dreamplayer.min.js": [ "bin/dreamplayer.js" ] }

			}

		},

		"sass": {

			dist: {

				files: { "bin/dreamplayer.css": "styles/main.scss" }

			}

		},

		"cssmin": {

			dist: {

				files: { "bin/dreamplayer.min.css": [ "bin/dreamplayer.css" ] }

			}

		},

		"concurrent": {

			auto: ["auto-scripts", "auto-style"],

			options: {

				logConcurrentOutput: true

			}

		},

		"watch": {

			scripts: {

				files: [

					"scripts/**/*.js"

				],

				tasks: [

					"scripts"

				],

				options: { event: [ "all" ], }

			},

			style: {

				files: [

					"styles/**/*.scss"

				],

				tasks: [

					"style"

				],

				options: { event: [ "all" ], }

			}
			
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-concurrent");

	grunt.registerTask("default", ["scripts", "style"]);

	grunt.registerTask("scripts", ["concat:dist", "uglify:dist"]);
	grunt.registerTask("style", ["sass:dist", "cssmin:dist"]);

	grunt.registerTask("auto-scripts", ["watch:scripts"]);
	grunt.registerTask("auto-style", ["watch:style"]);

	grunt.registerTask("dev", ["concurrent:auto"]);
	grunt.registerTask("d", ["concurrent:auto"]);

}