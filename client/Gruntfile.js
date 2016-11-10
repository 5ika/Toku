module.exports = (grunt) => {
    // ======================== CONFIGURE GRUNT
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                options: {
                    transform: [
                        [
                            'babelify', {
                                presets: ['es2015', 'react']
                            }
                        ]
                    ]
                },
                files: {
                    "dist/assets/js/app.js": "src/js/app.js"
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    "dist/assets/js/app.min.js": "dist/assets/js/app.js"
                }
            }
        },
        sass: {
            dist: {
                options: {
                    sourceMap: true,
                    outputStyle: 'compressed'
                },
                files: {
                    "./dist/assets/css/app.css": "./src/scss/app.scss"
                }
            }
        },
        pug: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/views/',
                        src: '*.pug',
                        dest: 'dist/',
                        ext: '.html'
                    }
                ]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "src/statics/",
                        src: ['**'],
                        dest: 'dist/assets/'
                    }
                ]
            }
        },
        clean: {
            dist: ['dist'],
            statics: ['dist/statics'],
            modules: ['node_modules']
        },
        browserSync: {
                bsFiles: {
                    src: 'dist/**/*'
                },
                options: {
                    watchTask: true,
                    server: 'dist/'
                }
        },
        watch: {
            options: {
                debounceDelay: 250,
                nospawn: true
            },
            js: {
                files: ["src/js/**/*.js"],
                tasks: ['browserify', 'uglify']
            },
            css: {
                files: ["src/scss/**/*.scss"],
                tasks: ['sass']
            },
            pug: {
                files: ["src/views/**/*.pug"],
                tasks: ['pug']
            },
            statics: {
                files: ['src/statics/**'],
                tasks: ['clean:statics', 'copy']
            }
        }
    });
    // ======================== LOAD GRUNT PLUGINS
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-browser-sync')
    // ======================== REGISTER TASKS
    grunt.registerTask("default", ["build", "browserSync", "watch"]);
    grunt.registerTask("build", [
        "clean:dist",
        "sass",
        "pug",
        "browserify",
        'uglify',
        'copy'
    ]);
}
