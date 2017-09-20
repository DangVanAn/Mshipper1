angular.module('mShipperApp')
    .component('productgroupsUpdate', {
    templateUrl: './ProductGroups/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $routeParams, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        $("#idForm").addClass("disabledbutton");

        function init() {
            $scope.idProductGroup = '';
            $scope.nameProductGroup = '';
            $scope.note = '';

            $url = $rootScope.api_url.getProductGroupId;
            var data = {id : $routeParams.id};
            httpPost($http, $url, data,
                function (response) {
                    $scope.idProductGroup = response.data[0]._id_product_group;
                    $scope.nameProductGroup = response.data[0]._name;
                    $scope.note = response.data[0]._note;

                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $scope.submit = function () {

            if ($scope.nameWarehouse === '')
            {
                $scope.show = "Vui lòng điền tất cả thông tin!";
                iAlert(ngDialog, $scope);
            }
            else
            {

                var data = {
                    _id_product_group: $scope.idProductGroup,
                    _name: $scope.nameProductGroup,
                    _note: $scope.note,
                    _is_enabled: true
                };

                $url = $rootScope.api_url.postProductGroupUpdate;

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
        };
    }
});