angular.module('mShipperApp', ['ngRoute', 'ngCookies','ui.bootstrap', 'ng.bs.dropdown', 'ngMap', 'ngCsvImport', 'hljs'])
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
                    template : '<danh-sach-don-hang></danh-sach-don-hang>',
                })
                .when("/addtabledsdonhang", {
                    template : '<add-danh-sach-don-hang></add-danh-sach-don-hang>',
                })
                .when("/tabletaikhoan", {
                    template : '<tai-khoan></tai-khoan>',
                })
                .when("/tablethongbao", {
                    template : '<thong-bao></thong-bao>',
                })
                .when("/bieudo", {
                    template : '<bieu-do></bieu-do>',
                })
                .when("/mapquanly", {
                    template : '<map-quan-ly></map-quan-ly>',
                })
                .when("/addacount", {
                    template : '<add-account></add-account>',
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
        .directive("fileread",[function ()
            {
                return {
                    scope: {
                        fileread: "="
                    },
                    link: function (scope, element, attributes) {
                        element.bind("change", function (changeEvent) {
                            var reader = new FileReader();
                            reader.onload = function (loadEvent) {
                                scope.$apply(function () {
                                    scope.fileread = loadEvent.target.result;
                                });
                            }
                            reader.readAsDataURL(changeEvent.target.files[0]);
                        });
                    }
                }
            }])