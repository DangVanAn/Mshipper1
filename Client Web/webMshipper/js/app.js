angular.module('mShipperApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ng.bs.dropdown', 'ngCsvImport', 'hljs', 'ngMap', 'angularjs-dropdown-multiselect'])
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $routeProvider
                .when("/table", {
                    templateUrl: "tables.html",
                })
                .when("/", {
                    templateUrl: "dashboard.html",
                })
                .when("/dashboard", {
                    templateUrl: "dashboard.html",
                })
                .when("/tabledsdonhang", {
                    template: '<danh-sach-don-hang></danh-sach-don-hang>',
                })
                .when("/addtabledsdonhang", {
                    template: '<add-danh-sach-don-hang></add-danh-sach-don-hang>',
                })
                .when("/tabletaikhoan", {
                    template: '<tai-khoan></tai-khoan>',
                })
                .when("/tablethongbao", {
                    template: '<thong-bao></thong-bao>',
                })
                .when("/bieudo", {
                    template: '<bieu-do></bieu-do>',
                })
                .when("/mapquanly", {
                    template: '<map-quan-ly></map-quan-ly>',
                })
                .when("/addacount", {
                    template: '<add-account></add-account>',
                })
                .when("/flot", {
                    templateUrl: "flot.html",
                })
                .when("/morris", {
                    templateUrl: "morris.html",
                })
                .when("/forms", {
                    templateUrl: "forms.html",
                })
                .when("/panels-wells", {
                    templateUrl: "panels-wells.html",
                })
                .when("/buttons", {
                    templateUrl: "buttons.html",
                })
                .when("/notifications", {
                    templateUrl: "notifications.html",
                })
                .when("/typography", {
                    templateUrl: "typography.html",
                })
                .when("/icons", {
                    templateUrl: "icons.html",
                })
                .when("/grid", {
                    templateUrl: "grid.html",
                })
                .when("/blank", {
                    templateUrl: "blank.html",
                })
                .when("/login", {
                    templateUrl: "login.html",
                })
                .when("/london", {
                    templateUrl: "london.htm",
                    controller: "londonCtrl"
                })
                .when("/paris", {
                    templateUrl: "paris.htm",
                    controller: "parisCtrl"
                });
        }])
    .service('modalShowMap', ['$uibModal', '$http', function ($uibModal) {
        this.show = function (data, callback) {
            /*begin modal*/
            var modalInstance = $uibModal.open({
                templateUrl: './Orders/ModalShow.map.html',
                controller: 'modal.selectDate',
                windowClass: 'app-modal-window',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            modalInstance.result.then(function (selected) {
                return callback(selected);
            }, function () {
                return callback(false);
            });
        };
    }])
