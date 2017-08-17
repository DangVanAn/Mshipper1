angular.module('mShipperApp').component('login', {
    templateUrl: './Accounts/login_new.html',
    controller: function CreateUserController($scope, $rootScope, $location, ngDialog, AuthenticationService) {
        AuthenticationService.ClearCredentials();
        $scope.login = function () {

            console.log('7: ', $scope.phone, $scope.password);

            AuthenticationService.Login($scope.phone, $scope.password, function (response) {
                console.log(response);
                if (response.success) {

                    switch (response._permission_id) {
                        case "A001":
                            // Manager điều phối
                            AuthenticationService.SetCredentials('CoordinatorManager', response._token, response._first_name, response._last_name, response._phone);
                            $location.path('/accountsshow');
                            break;
                        case "A002":
                            // Điều phối
                            AuthenticationService.SetCredentials('Coordinator', response._token, response._first_name, response._last_name, response._phone);
                            $location.path('/accountsshow');
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
                            $scope.show = "Bạn không có quyền truy cập website";
                            $scope.type = "danger";
                            iAlert(ngDialog, $scope);
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
                        "phone": phone,
                        "password": password
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

                service.SetCredentials = function (role, token, first_name, last_name, phone) {
                    $rootScope.globals = {
                        currentUser: {
                            phone: phone,
                            token: token,
                            first_name: first_name,
                            last_name: last_name,
                            role: role
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