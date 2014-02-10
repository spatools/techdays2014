if (WIN8) {
    var appSettings = Windows.UI.ApplicationSettings,
        settingsPane = appSettings.SettingsPane.getForCurrentView(),
        aboutFlyout;

    function createFlyout(title, flyoutSettings, compositionSettings) {
        var container = $("<div>"),
            header = $("<div>").addClass("win-ui-light").addClass("win-header").appendTo(container),
            content = $("<div>").addClass("win-content").appendTo(container);

        $("<button>").addClass("win-backbutton").attr({ type: "button", onclick: "WinJS.UI.SettingsFlyout.show()" }).appendTo(header);
        $("<div>").addClass("win-label").text(title).appendTo(header);

        $("<div>").addClass("loading-base").appendTo(content);

        var flyout = new WinJS.UI.SettingsFlyout(container.get(0), flyoutSettings);
        flyout.addEventListener("aftershow", function () {
            if (compositionSettings) {
                require(["durandal/composition"], function (composition) { composition.compose(content.get(0), compositionSettings); });
            }
        });

        container.appendTo("body");

        return flyout;
    }

    function processingHandler(e) {
        require(["plugins/router"], function (router) { router.navigate("processing"); });
    }
    function authorHandler(e) {
        var uri = new Windows.Foundation.Uri("https://github.com/spatools");
        Windows.System.Launcher.launchUriAsync(uri);
    }
    function aboutHandler(e) {
        if (!aboutFlyout)
            aboutFlyout = createFlyout("About", { settingsCommandId: "about", width: "narrow" }, "about.html");

        aboutFlyout.show();
    }

    function onCommandsRequested(e) {
        var processingCommand = new appSettings.SettingsCommand("processing", "Processing", processingHandler),
            authorCommand = new appSettings.SettingsCommand("author", "Author", authorHandler),
            aboutCommand = new appSettings.SettingsCommand("about", "About", aboutHandler);

        e.request.applicationCommands.append(processingCommand);
        e.request.applicationCommands.append(authorCommand);
        e.request.applicationCommands.append(aboutCommand);
    }

    settingsPane.addEventListener("commandsrequested", onCommandsRequested);
}

define(["promise"], function (Promise) {

    if (CORDOVA) {
        var isCordovaInit = false,
            cordovaResolve,
            cordovaPromise = new Promise(function (resolve) { cordovaResolve = resolve; });

        function initCordova() {
            cordovaResolve();
        }
        function ensureCordova() {
            if (!isCordovaInit) {
                isCordovaInit = true;
                document.addEventListener("deviceready", initCordova, false);
            }

            return cordovaPromise;
        }
    }

    function base() {
        return new Promise(function (resolve) {
            require(
                ["modules/ui"],
                function () { resolve(); }
            );
        });
    }

    function initialize() {
        if (CORDOVA) {
            return ensureCordova().then(base);
        }
        else {
            return base();
        }
    }

    return {
        initialize: initialize
    };
});