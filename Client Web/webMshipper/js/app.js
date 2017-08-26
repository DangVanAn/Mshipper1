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
function httpPost($http, url, data, successCB, errorCB) {
    $http({
        method: 'POST',
        url: url,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
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
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function successCallback(response) {
        success(response);
    }, function errorCallback(response) {
        error(response);
    });
}
angular.module('mShipperApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ng.bs.dropdown', 'ngCsvImport', 'hljs', 'ngMap', 'ngDialog', 'angularjs-dropdown-multiselect', 'xlsx-model', 'ui.select', 'ngSanitize'])
    .controller('AppMain', function ($scope, $rootScope, $cookieStore, $location) {

        $scope.Logout = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $location.path('/Login');
        }
    })

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
                .when('/Login', {
                    template: '<login></login>',
                })
                .when("/ordersshow", {
                    template: '<order-show></order-show>',
                })
                .when("/orderscreate", {
                    template: '<order-create></order-create>',
                })
                .when("/packagetypesshow", {
                    template: '<packagetype-show></packagetype-show>',
                })
                .when("/packagetypescreate", {
                    template: '<packagetype-create></packagetype-create>',
                })
                .when("/assignsshow", {
                    template: '<assign-show></assign-show>',
                })
                .when("/assignscreate", {
                    template: '<assign-create></assign-create>',
                })
                .when("/packagetypescreate/:id", {
                    template: '<packagetype-update></packagetype-update>',
                })
                .when("/accountsmain", {
                    template: '<account-main></account-main>',
                })
                .when("/accountsshow", {
                    template: '<account-show></account-show>',
                })
                .when("/accountscreate", {
                    template: '<account-create></account-create>',
                })
                .when("/accountscreate.n", {
                    template: '<account-create-n></account-create-n>',
                })
                .when("/accountscreate/:phone", {
                    template: '<account-update></account-update>',
                })
                .when("/warehousesshow", {
                    template: '<warehouses-show></warehouses-show>',
                })
                .when("/warehousescreate", {
                    template: '<warehouses-create></warehouses-create>',
                })
                .when("/teamscreate", {
                    template: '<teams-create></teams-create>',
                })
                .when("/teamsshow", {
                    template: '<teams-show></teams-show>',
                })
                .when('/teamscreate/:Id', {
                    template: '<teams-update></teams-update>'
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
    .service('modalOrderShow', ['$uibModal', '$http', function ($uibModal) {
        this.show = function (data, callback) {
            /*begin modal*/
            var modalInstance = $uibModal.open({
                templateUrl: './Orders/ModalShow.details.html',
                controller: 'modal.orders.show',
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

    .service('modalOrderCreate', ['$uibModal', '$http', function ($uibModal) {
        this.show = function (data, callback) {
            /*begin modal*/
            var modalInstance = $uibModal.open({
                templateUrl: './Orders/ModalShow.details.html',
                controller: 'modal.orders.create',
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

    .service('modalTeamShowAccount', ['$uibModal', '$http', function ($uibModal) {
        this.show = function (data, callback) {
            /*begin modal*/
            var modalInstance = $uibModal.open({
                templateUrl: './Teams/ModalShow.team.accounts.html',
                controller: 'modal.teams.show.account',
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

    .service('modalYesNo', ['$uibModal', '$http', function ($uibModal) {
        this.show = function (data, callback) {
            /*begin modal*/
            var modalInstance = $uibModal.open({
                templateUrl: './Teams/ModalShow.team.delete.yesno.html',
                controller: 'modal.teams.delete.yesno',
                windowClass: 'app-modal-window-yes-no',
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

    .directive('fileSelect',[function() {
        var template = '<input type="file" name="files"/>';
        return function( scope, elem, attrs ) {
            var selector = $( template );
            elem.append(selector);
            selector.bind('change', function( event ) {
                scope.$apply(function() {
                    scope[ attrs.fileSelect ] = event.originalEvent.target.files;
                });
            });
            scope.$watch(attrs.fileSelect, function(file) {
                selector.val(file);
            });
        };
    }])

    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore) {
            $rootScope.api_url = {

                postAccountLogin: 'http://localhost:9999/users/login',
                postAccountCreate: 'http://localhost:9999/users/add',
                getAccountShow: 'http://localhost:9999/users/getall',
                getAccountPhone : 'http://localhost:9999/users/getbyphone',
                postAccountUpdate : 'http://localhost:9999/users/updatebyphone',

                getTeamShow: 'http://localhost:9999/teamlists/getall',
                postTeamCreate: 'http://localhost:9999/teamlists/adds',
                getTeamUpdate: 'http://localhost:9999/teamlists/getbyid',

                postPackageTypeCreate: 'http://localhost:9999/packagetypes/add',
                postPackageTypeGetById: 'http://localhost:9999/packagetypes/getbyid',
                postPackageTypeUpdate: 'http://localhost:9999/packagetypes/update',
                postPackageTypeRemove: 'http://localhost:9999/packagetypes/remove',

                postDeliveryAreaCreate: 'http://localhost:9999/deliveryareas/add',
                postDeliveryAreaGetByPhone: 'http://localhost:9999/deliveryareas/getbyphone',

                getWarehouse: 'http://localhost:9999/warehouses/getall',
                postWarehouseCreate: 'http://localhost:9999/warehouses/add',
            };

            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                // $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                if (!$rootScope.globals.currentUser) {
                    $location.path('/Login');
                    return;
                }
                if ($rootScope.globals.currentUser.role === "Quản Lý Điều Phối") {

                    console.log('conco1', $rootScope.globals.currentUser);

                    $('#mainUserName').text($rootScope.globals.currentUser.name);
                    $('#mainUserRole').text($rootScope.globals.currentUser.role);

                    console.log('314', $location.path());

                    if ($location.path() === "") {
                        $location.path('/accountsmain');
                    }
                    return;
                }
                event.preventDefault();
            });

            $rootScope.listRole = [
                {id : "A001", name : "Quản Lý Điều Phối"},
                {id : "A002", name : "Điều Phối"},
                {id : "A003", name : "Quản Lý Kho"},
                {id : "A004", name : "Bảo Vệ Kho"},
                {id : "B001", name : "Khách Hàng"},
                {id : "C001", name : "Quản Lý Vận Tải"},
                {id : "C002", name : "Tài xế"}
            ];

            $rootScope.gender = [
                {id : '01', name : 'Nam'},
                {id : '02', name : 'Nữ'},
                {id : '03', name : 'Chưa Xác Định'}
            ];
        }]);
