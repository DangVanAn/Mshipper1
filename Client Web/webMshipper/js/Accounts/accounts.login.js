angular.module('mShipperApp').component('login', {
    templateUrl: './Accounts/login_new.html',
    controller: function CreateUserController($scope, $rootScope, $location, ngDialog, AuthenticationService) {
        AuthenticationService.ClearCredentials();
        $scope.login = function () {

            console.log('7: ', $scope.phone, $scope.password);

            AuthenticationService.Login($scope.phone, $scope.password, function (response) {
                console.log(response);
                if (response.success) {

                    response.data = JSON.parse(response.data);

                    console.log(response.data);

                    switch (response.data._permission_id) {
                        case "A001":
                            // Manager điều phối
                            AuthenticationService.SetCredentials(response.data._id, 'Quản Lý Điều Phối', response.data._permission_id, response.data._token, response.data._name, response.data._phone, response._id_delivery_manager);
                            $location.path('/accountsmain');
                            break;
                        case "A002":
                            // Điều phối
                            AuthenticationService.SetCredentials(response.data._id, 'Điều Phối', response.data._permission_id, response.data._token, response.data._name, response.data._phone, response.data._id_delivery_manager);
                            $location.path('/accountsmain');
                            break;
                        case "A003":
                            // Quản lý kho
                            $scope.show = "Bạn không có quyền truy cập website";
                            $scope.type = "danger";
                            iAlert(ngDialog, $scope);
                            break;
                        case "A004":
                            // Bảo vệ
                            $scope.show = "Bạn không có quyền truy cập website";
                            $scope.type = "danger";
                            iAlert(ngDialog, $scope);
                            break;
                        case "B001":
                            // Khách hàng
                            $scope.show = "Bạn không có quyền truy cập website";
                            $scope.type = "danger";
                            iAlert(ngDialog, $scope);
                            break;
                        case "C001":
                            // Manager vận tải
                            AuthenticationService.SetCredentials(response.data._id, 'Quản Lý Vận Tải', response.data._permission_id, response.data._token, response.data._name, response.data._phone, response.data._id_delivery_manager);
                            $location.path('/accountsmain');
                            break;
                        case "C002":
                            // Tài xế
                            $scope.show = "Bạn không có quyền truy cập website";
                            $scope.type = "danger";
                            iAlert(ngDialog, $scope);
                            break;
                        default:
                            // Trường hợp còn lại
                            $scope.show = "Bạn không có quyền truy cập website";
                            $scope.type = "danger";
                            iAlert(ngDialog, $scope);
                    }
                } else {
                    $scope.show = "Số điện thoại hoặc password không đúng";
                    $scope.type = "danger";
                    iAlert(ngDialog, $scope);
                }
            });
        };
        $scope.logout = function () {
            AuthenticationService.ClearCredentials();
        }
    }
});

angular.module('mShipperApp')
    .factory('AuthenticationService',
        ['$http', '$cookieStore', '$rootScope', '$timeout',
            function ($http, $cookieStore, $rootScope, $timeout) {

                console.log("43");

                var service = {};
                service.Login = function (phone, password, callback) {
                    console.log('47');

                    $user = {
                        "_phone": phone,
                        "_password": password,
                        "_device_token" : "11111"
                    };

                    console.log($user);
                    $urll = $rootScope.api_url.postAccountLogin;
                    httpPost($http, $urll, $user,
                        function (response) {
                            callback(response.data);
                        }, function (response) {
                            $rootScope.statustext = 'error';
                        });
                };

                service.SetCredentials = function (_id, role, permission, token, name, phone, _id_delivery_manager) {
                    console.log('conco2', name);
                    $rootScope.globals = {
                        currentUser: {
                            id : _id,
                            phone: phone,
                            token: token,
                            name: name,
                            role: role,
                            permission: permission,
                            id_delivery_manager : _id_delivery_manager
                        }
                    };

                    $cookieStore.put('globals', $rootScope.globals);
                };

                service.ClearCredentials = function () {
                    $rootScope.globals = {};
                    $cookieStore.remove('globals');
                    // $http.defaults.headers.common.Authorization = 'Basic ';
                };

                return service;
            }])