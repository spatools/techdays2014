requirejs.config({
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'css': '../bower_components/require-css/css',

        'knockout': '../bower_components/knockout.js/knockout-2.3.0.debug',
        'jquery': '../bower_components/jquery/jquery',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'modernizr': '../bower_components/modernizr/modernizr',

        'durandal': '../bower_components/durandal/js',
        'plugins': '../bower_components/durandal/js/plugins',
        'transitions': '../bower_components/durandal/js/transitions',

        'promise': '../bower_components/promise-ext/dist/promise',
        'math': '../bower_components/geomath/dist/math',
        'prism': '../bower_components/prismjs/prism',
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        },

        modernizr: {
            exports: 'Modernizr'
        },

        prism: {
            exports: 'Prism'
        }
    }
});

//>>excludeStart("build", true);
var DEBUG = true,
    CORDOVA = false,
    WIN8 = false;
//>>excludeEnd("build");

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'durandal/viewEngine', 'modules/initializer', 'bootstrap'],  function (system, app, viewLocator, viewEngine, initializer) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = "TechDays 2014 - SPA";

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    if (WIN8) {
        var parser = viewEngine.parseMarkup;
        viewEngine.parseMarkup = function (markup) {
            return MSApp.execUnsafeLocalFunction(function () { return parser(markup); });
        };
    }

    app.start()
        .then(initializer.initialize)
        .then(function () {
            // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
            // Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention();

            // Show the app by setting the root view model for our application with a transition.
            app.setRoot('viewmodels/shell');
        });
});