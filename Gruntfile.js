// // Gruntfile.js
module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            build: ['Gruntfile.js', 'src/js/magic.js']
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    compass: false,
                    sourcemap: false
                },
                files: {
                    'dist/css/filejet-style.css': 'src/scss/filejet-style.scss'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/jquery.min.js':
                        [
                            'src/js/jquery.js',
                           
                        ],
                    'dist/js/plugins.min.js':
                        [
                            'src/js/lib/bootstrap.bundle.js',
                            'src/js/lib/datatables.js',
                            'src/js/lib/jquery-ui.js',
                            'src/js/lib/jquery-alerts.js',
                            'src/js/lib/moment.min.js',
                            'src/js/lib/daterangepicker.js',
                          
                            
                        ],
                    'dist/js/custom.min.js':
                        [
                            'src/js/custom.js'
                        ]
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: [
                    'dist/**/.css', 'src/**/*.scss'
                ],
                tasks: ['sass']
            },
            js: {
                files: [
                    'src/**/*.js'
                ],
                tasks: ['jshint', 'uglify']
            },
            html: {
                files: [
                    '**/*.html'
                ]
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register tasks
    grunt.registerTask('default', [
        'sass',
        'uglify',
        'watch'
    ]);
    // grunt.registerTask('dev', [
    //     'watch'
    // ]);
};
