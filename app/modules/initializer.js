define(["promise"], function (Promise) {
    
    function base() {
        return new Promise(function (resolve) {
            require(
                ["modules/ui"],
                function () { resolve(); }
            );
        });
    }

    function initialize() {
        return base();
    }

    return {
        initialize: initialize
    };
});