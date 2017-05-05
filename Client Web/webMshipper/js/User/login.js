angular.module('mShipperApp').component('login', {
    templateUrl: './login.html',
    controller: function CreateUserController($scope, $rootScope, $location, ngDialog, AuthenticationService) {
        AuthenticationService.ClearCredentials();
        $scope.login = function () {
            if (notifyIsNull($scope.username, "Vui lòng nhập Username", "danger", ngDialog, $scope)
                || notifyIsNull($scope.password, "Vui lòng nhập Password", "danger", ngDialog, $scope)) {
                return;
            }
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                var message = response;
                if (message.success) {
                    if (!message._is_enabled) {
                        $scope.show = "Tài khoản của bạn chưa được kích hoạt";
                        $scope.type = "danger";
                        iAlert(ngDialog, $scope);
                        return;
                    }
                    if (message._permission_id === 1) {
                        AuthenticationService.SetCredentials(message._identify_card, $scope.username, $scope.password, 'ADMIN', message._first_name + " " + message._last_name);
                        $location.path('/dashboard');
                    }
                    else if (message._permission_id === 2) {
                        AuthenticationService.SetCredentials(message._identify_card, $scope.username, $scope.password, 'BOSS', message._first_name + " " + message._last_name);
                        $location.path('/dashboard');
                    }
                    else if (message._permission_id === 3) {
                        AuthenticationService.SetCredentials(message._identify_card, $scope.username, $scope.password, 'USER', message._first_name + " " + message._last_name);
                        $location.path('/dashboard');
                    }
                } else {
                    $scope.show = message.message === "Username or password is incorrect" ? "Username hoặc password không đúng" : response.message;
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
        ['Base64', '$http', '$cookieStore', '$rootScope',
            function (Base64, $http, $cookieStore, $rootScope) {
                var service = {};

                service.Login = function (username, password, callback) {

                    $user = {
                        "email": username,
                        "password": password
                    };
                    $urll = $rootScope.api_url.postUserLogin;
                    httpPost($http, $urll, $user,
                        function (response) {
                            $rootScope.statuscode = response.status;
                            $rootScope.statustext = response.statusText;
                            callback(response.data);
                        }, function (response) {
                            var show = response.data;
                            console.log(show);
                            $rootScope.statustext = 'error';
                        });
                };

                service.SetCredentials = function (id, username, password, role, fullname) {
                    var authdata = Base64.encode(username + ':' + password);

                    $rootScope.globals = {
                        currentUser: {
                            id: id,
                            fullname: fullname,
                            username: username,
                            role: role,
                            authdata: authdata
                        }
                    };

                    // $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                    $cookieStore.put('globals', $rootScope.globals);
                };

                service.ClearCredentials = function () {
                    $rootScope.globals = {};
                    $cookieStore.remove('globals');
                    // $http.defaults.headers.common.Authorization = 'Basic ';
                };

                return service;
            }])

    .factory('Base64', function () {
        /* jshint ignore:start */

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    $scope.show = "There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.";
                    $scope.type = "danger";
                    iAlert(ngDialog, $scope);
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };
    });