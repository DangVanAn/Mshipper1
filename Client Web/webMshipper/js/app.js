angular.module('mShipperApp', ['ngRoute', 'ngCookies','ui.bootstrap', 'ngMap'])
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider, ngMap) {
            $routeProvider
                .when("/table", {
                    templateUrl : "tables.html",
                })
                .when("/", {
                    templateUrl : "dashboard.html",
                })
                .when("/dashboard", {
                    templateUrl : "dashboard.html",
                })
                .when("/tabledsdonhang", {
                    templateUrl : "tableDsDonHang.html",
                })
                .when("/mapquanly", {
                    template : '<map-quan-ly></map-quan-ly>',
                })
                .when("/flot", {
                    templateUrl : "flot.html",
                })
                .when("/morris", {
                    templateUrl : "morris.html",
                })
                .when("/forms", {
                    templateUrl : "forms.html",
                })
                .when("/panels-wells", {
                    templateUrl : "panels-wells.html",
                })
                .when("/buttons", {
                    templateUrl : "buttons.html",
                })
                .when("/notifications", {
                    templateUrl : "notifications.html",
                })
                .when("/typography", {
                    templateUrl : "typography.html",
                })
                .when("/icons", {
                    templateUrl : "icons.html",
                })
                .when("/grid", {
                    templateUrl : "grid.html",
                })
                .when("/blank", {
                    templateUrl : "blank.html",
                })
                .when("/login", {
                    templateUrl : "login.html",
                })
                .when("/london", {
                    templateUrl : "london.htm",
                    controller : "londonCtrl"
                })
                .when("/paris", {
                    templateUrl : "paris.htm",
                    controller : "parisCtrl"
                });
        }])