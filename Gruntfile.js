/* jshint node: true, indent: 4 */

module.exports = function(grunt) {
	"use strict";
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		versions: {
			jQuery: "2.1.1",
			Sizzle: "1.10.19",
			Bootstrap: "3.2.0"

		},
		clean: ["build/*"], // Empty the build directory
		concat: {
			options: {
				stripBanners: true, // /* - trimmed /*! - not trimmed
				//banner: "",
				separator: ";\n"
			},
			jqueryBootstrapJS: {
				src: [
					"src/public/js/shared/jquery-2.1.1.js",
					"src/public/js/shared/bootstrap.js"
				],
				dest: "build/public/js/shared.js"
			},
			bootstrapCSS: {
				src: [
					"src/public/css/shared/bootstrap.css",
					"src/public/css/shared/bootstrap-theme.css"
				],
				dest: "build/public/css/bootstrap-all.css"
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, cwd: "src/modules/", src: "*", dest: "build/modules/", filter: "isFile"},
					{expand: true, cwd: "src/", src: "server.js", dest: "build/", filter: "isFile"},
					{expand: true, cwd: "src/public/html/", src: "**", dest: "build/public/html/"},
					{expand: true, cwd: "src/public/css/", src: "*", dest: "build/public/css/", filter: "isFile"},
					{expand: true, cwd: "src/public/fonts/", src: "**", dest: "build/public/fonts/"}
				]
			}
		},
		cssmin: {
			cssMinifying: {
				files: [
					{expand: true, cwd: "build/public/css/", src: "**/*.css", dest: "build/public/css/", ext: ".min.css"}
				]
			}
		},
		uglify: {
			options: {
				preserveComments: false,
				mangle: false,
				report: "min"
			},
			publicJavaScript: {
				filter: function(filePath) {
					return (filePath.indexOf("shared") === -1);
				},
				expand: true, cwd: "build/public/js/", src: "**/*.js", dest: "build/public/js/", ext: ".min.js"
			},
			sharedJavaScript: {
				options: {
					banner: "/*!\n"+
							" * <%= pkg.name %> - v<%= pkg.version %>\n"+
							" * This file contains\n"+
							" * jQuery v<%= versions.jQuery %>, Sizzle v<%= versions.Sizzle %> (c) 2005, 2014 jQuery Foundation, Inc. (https://jquery.com) MIT license\n"+
							" * Bootstrap v<%= versions.Bootstrap %> (c) 2011-2014 Twitter, Inc. (http://getbootstrap.com) MIT license\n"+
							" */\n"
				},
				src: "build/public/js/shared.js",
				dest: "build/public/js/shared.min.js"
			},
			ember: {
				files: [
					{expand: true, cwd: "build/public/ember/", src: "**/*.js", dest: "build/public/ember/", ext: ".min.js"}
				]
			}
		},
		compress: {
			gzip: {
				options: {
					mode: "gzip",
					level: 9
				},
				files: [
					{expand: true, cwd: "build/public/js/", src: ["**/*"], dest: "build/public/js/", extDot: "last", ext: ".js.gz"},
					{expand: true, cwd: "build/public/css/", src: ["**/*"], dest: "build/public/css/", extDot: "last", ext: ".css.gz"},
					{expand: true, cwd: "build/public/html/", src: ["**/*"], dest: "build/public/html/", extDot: "last", ext: ".html.gz"},
					{src: "build/public/fonts/glyphicons-halflings-regular.eot", dest: "build/public/fonts/glyphicons-halflings-regular.eot.gz"},
					{src: "build/public/fonts/glyphicons-halflings-regular.svg", dest: "build/public/fonts/glyphicons-halflings-regular.svg.gz"},
					{src: "build/public/fonts/glyphicons-halflings-regular.ttf", dest: "build/public/fonts/glyphicons-halflings-regular.ttf.gz"},
					{src: "build/public/fonts/glyphicons-halflings-regular.woff", dest: "build/public/fonts/glyphicons-halflings-regular.woff.gz"}
				]
			}
		},
		jshint: {
			grunt: {
				options: {
					node: true // http://www.jshint.com/docs/options/#node
				},
				src: "Gruntfile.js"
			},
			browser: {
				options: {
					curly: true, // http://www.jshint.com/docs/options/#curly
					eqeqeq: true, // http://www.jshint.com/docs/options/#eqeqeq
					immed: true, // http://www.jshint.com/docs/options/#immed
					indent: 4, // http://www.jshint.com/docs/options/#indent
					latedef: true, // http://www.jshint.com/docs/options/#latedef
					noarg: true, // http://www.jshint.com/docs/options/#noarg
					nonbsp: true, // http://www.jshint.com/docs/options/#nonbsp
					nonew: true, // http://www.jshint.com/docs/options/#nonew
					undef: true, // http://www.jshint.com/docs/options/#undef
					unused: "vars", // http://www.jshint.com/docs/options/#unused
					strict: true,  // http://www.jshint.com/docs/options/#strict

					asi: true, // http://www.jshint.com/docs/options/#asi
					eqnull: true, // http://www.jshint.com/docs/options/#eqnull

					browser: true, // http://www.jshint.com/docs/options/#browser
					devel: true, // http://www.jshint.com/docs/options/#devel
					jquery: true // http://www.jshint.com/docs/options/#jquery
				},
				src: ["build/public/js/**/*.js"],
				filter: function(filePath) {
					// since ignores won't work as I want it to I wrote this code to ignore the shared js files.
					return (filePath.indexOf("shared") === -1 && filePath.indexOf("min.js") === -1);
				}
			},
			node: {
				options: {
					curly: true, // http://www.jshint.com/docs/options/#curly
					eqeqeq: true, // http://www.jshint.com/docs/options/#eqeqeq
					immed: true, // http://www.jshint.com/docs/options/#immed
					indent: 4, // http://www.jshint.com/docs/options/#indent
					latedef: true, // http://www.jshint.com/docs/options/#latedef
					noarg: true, // http://www.jshint.com/docs/options/#noarg
					nonbsp: true, // http://www.jshint.com/docs/options/#nonbsp
					nonew: true, // http://www.jshint.com/docs/options/#nonew
					undef: true, // http://www.jshint.com/docs/options/#undef

					eqnull: true, // http://www.jshint.com/docs/options/#eqnull

					node: true // http://www.jshint.com/docs/options/#node
				},
				src: ["build/*.js", "build/modules/**/*.js"]
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: false,
					collapseWhitespace: true
				},
				files: [
					{expand: true, cwd: "build/public/html/", src: "**/*.html", dest: "build/public/html/", ext: ".min.html"}
				]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-clean");

	grunt.loadNpmTasks("grunt-contrib-concat");

	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.loadNpmTasks("grunt-contrib-cssmin");

	grunt.loadNpmTasks("grunt-contrib-compress");

	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.loadNpmTasks("grunt-contrib-jshint");

	grunt.loadNpmTasks("grunt-contrib-htmlmin");

	grunt.registerTask("default", ["clean", "concat", "copy", /*"htmlmin", */"uglify", "cssmin", "compress"]);
};