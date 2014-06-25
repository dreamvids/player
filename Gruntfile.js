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

		"watch": {

			dist: {

  				files: [

  					"Gruntfile.js",
  					"scripts/**/*.js",
  					"styles/**/*.scss"

  				],

  				tasks: [

  					"scripts",
  					"styles"

  				],

  				options: { event: [ "all" ], }

  			}
  			
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["scripts", "styles"]);

	grunt.registerTask("scripts", ["concat:dist", "uglify:dist"]);
	grunt.registerTask("styles", ["sass:dist", "cssmin:dist"]);

	grunt.registerTask("auto", ["watch:dist"]);

}