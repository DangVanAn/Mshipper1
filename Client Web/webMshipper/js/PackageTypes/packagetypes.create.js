angular.module('mShipperApp')
    .component('packagetypeCreate', {
    templateUrl: './PackageTypes/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        $scope.mainLabel = "Thêm loại gói hàng mới";
        $('#btnDelete').addClass("hidebutton");
        function init() {
            $scope.id = '';
            $scope.name = '';
            $scope.description = '';
        }

        $scope.submit = function () {

            if ($scope.id === '' || $scope.name === '' || $scope.description === '')
            {
                $scope.show = "Vui lòng điền tất cả thông tin!";
                iAlert(ngDialog, $scope);
            }
            else
            {
                var data = {
                    _id: $scope.id,
                    _name: $scope.name,
                    _description: $scope.description,
                }

                $url = $rootScope.api_url.postPackageTypeCreate;

                httpPost($http, $url, data,
                    function (response) {
                        console.log("info::" + response.data.message);
                        $scope.show = response.data;
                        iAlert(ngDialog, $scope);
                    }, function (response) {
                        $scope.statustext = 'error';
                    });

                console.log(JSON.stringify(data));
            }
        }
    }
});