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
angular.module('mShipperApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ng.bs.dropdown', 'ngCsvImport', 'hljs', 'ngMap', 'ngDialog', 'angularjs-dropdown-multiselect', 'xlsx-model'])
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
                .when("/accountsshow", {
                    template: '<account-show></account-show>',
                })
                .when("/accountscreate", {
                    template: '<account-create></account-create>',
                })
                .when("/accountscreate/:email", {
                    template: '<account-update></account-update>',
                })
                .when("/areasshow", {
                    template: '<areas-show></areas-show>',
                })
                .when("/areascreate", {
                    template: '<areas-create></areas-create>',
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
    .service('modalOrderShow', ['$uibModal', '$http', function ($uibModal) {
        this.show = function (data, callback) {
            /*begin modal*/
            var modalInstance = $uibModal.open({
                templateUrl: './Orders/ModalShow.details.html',
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
                postAccountCreate: 'http://localhost:9999/users/add',
                getAccountShow: 'http://localhost:9999/users/getall',
                getAccountEmail : 'http://localhost:9999/users/getbyemail',
                postAccountUpdate : 'http://localhost:9999/users/updatebyemail',

                postAreaCreate: 'http://localhost:9999/areas/add',
                getAreaShow: 'http://localhost:9999/areas/getall',

                getTeamShow: 'http://localhost:9999/teamlists/getall',
                postTeamCreate: 'http://localhost:9999/teamlists/adds',
                getTeamUpdate: 'http://localhost:9999/teamlists/getbyid',

            }

            // $rootScope.globals = $cookieStore.get('globals') || {};
            // if ($rootScope.globals.currentUser) {
            //     // $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            // }
            // var roleUser = ["/SellTicket/Show", "/SellTicket/sellChair", '/SellTicket/chooseChair', '/Login'];
            // $rootScope.$on('$locationChangeStart', function (event, next, current) {
            //     if (!$rootScope.globals.currentUser) {
            //         $location.path('/Login');
            //         return;
            //     }
            //     if ($rootScope.globals.currentUser.role === "USER") {
            //         if ($location.path() === "") {
            //             $location.path('/SellTicket/Show');
            //         }
            //         if (roleUser.indexOf($location.path()) === -1) {
            //             console.log("Bạn không có đủ quyền");
            //             event.preventDefault();
            //         }
            //         return;
            //     }
            //     if ($rootScope.globals.currentUser.role === "ADMIN") {
            //         if ($location.path() === "") {
            //             $location.path('/User/Show');
            //         }
            //         return;
            //     }
            //     event.preventDefault();
            // });
        }]);
