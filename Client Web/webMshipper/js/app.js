function iAlert(ngDialog, $scope) {
    ngDialog.open({
        template: "<div class='alert alert-{{type}}'' role='alert'>{{show}}</div>",
        showClose: false,
        width: '30%',
        overlay: false,
        plain: true,
        scope: $scope
    });

    setTimeout(function () {
        ngDialog.close();
    }, 2000);
}

function notifyIsNull(data, show, type, ngDialog, $scope) {
    if (!data) {
        $scope.show = show;
        $scope.type = type;
        iAlert(ngDialog, $scope);
        return true;
    }
    return false;
}

function httpPost($http, url, data, successCB, errorCB) {
    $http({
        method: 'POST',
        url: url,
        headers: {'Content-Type': 'application/json'},
        data: data
    }).then(function successCallback(response) {
        successCB(response);
    }, function errorCallback(response) {
        errorCB(response);
    });
}
function httpGet($http, url, success, error) {
    $http({
        method: 'GET',
        url: url,
        headers: {'Content-Type': 'application/json'}
    }).then(function successCallback(response) {
        success(response);
    }, function errorCallback(response) {
        error(response);
    });
}
angular.module('mShipperApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ng.bs.dropdown', 'ngMap', 'ngCsvImport', 'hljs', 'ngDialog'])
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider, ngMap) {
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
                    template: "<login></login>",
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
    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore) {
            $rootScope.api_url = {
                postUserLogin: "http://localhost:9999/users/login",
            }

            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                // $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }
            var roleUser = ["/SellTicket/Show", "/SellTicket/sellChair", '/SellTicket/chooseChair', '/login'];
            // $rootScope.$on('$locationChangeStart', function (event, next, current) {
            //     if (!$rootScope.globals.currentUser) {
            //         $location.path('/login');
            //         return;
            //     }
            //     if ($rootScope.globals.currentUser.role === "USER") {
            //         if ($location.path() === "") {
            //             $location.path('/dashboard');
            //         }
            //         // if (roleUser.indexOf($location.path()) === -1) {
            //         //     console.log("Bạn không có đủ quyền");
            //         //     event.preventDefault();
            //         // }
            //         return;
            //     }
            //     if ($rootScope.globals.currentUser.role === "ADMIN") {
            //         if ($location.path() === "") {
            //             $location.path('/dashboard');
            //         }
            //         return;
            //     }
            //     event.preventDefault();
            // });
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
