angular.module('mShipperApp')
    .component('packagetypeUpdate', {
    templateUrl: './PackageTypes/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $routeParams, modalYesNo, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });
        $scope.mainLabel = "Cập nhật thông tin gói hàng";
        $('#id').addClass("disabledbutton");


        function init() {
            $scope.id = '';
            $scope.name = '';
            $scope.description = '';

            $url = $rootScope.api_url.postPackageTypeGetById;
            var data = {id : $routeParams.id};
            httpPost($http, $url, data,
                function (response) {
                    $scope.id = response.data[0]._id;
                    $scope.name = response.data[0]._name;
                    $scope.description = response.data[0]._description;
                }, function (response) {
                    $scope.statustext = 'error';
                });
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

                $url = $rootScope.api_url.postPackageTypeUpdate;

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

        $scope.delete = function () {
            var info = "Bạn chắc chắn xóa loại gói hàng";
            modalYesNo.show({id : $routeParams.id, info : info}, function (data) {
                if (data) {
                    console.log("Nhan duoc::" + data);
                    var data = {
                        _id: $scope.id,
                        _name: $scope.name,
                        _description: $scope.description,
                    }

                    $url = $rootScope.api_url.postPackageTypeRemove;

                    httpPost($http, $url, data,
                        function (response) {
                            console.log("info::" + response.data.message);
                            $location.path('/packagetypesshow');
                        }, function (response) {
                            $scope.statustext = 'error';
                        });
                }
                else {
                    console.log("không có");
                }
            });
        }
    }
});