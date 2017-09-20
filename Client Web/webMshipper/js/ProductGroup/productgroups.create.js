angular.module('mShipperApp')
    .component('productgroupsCreate', {
        templateUrl: './ProductGroups/Create.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, $location, $timeout, ngDialog) {
            $(document).ready(function () {
                init();
            });

            function init() {
                $scope.idProductGroup = '';
                $scope.nameProductGroup = '';
                $scope.note = '';
            }

            $scope.submit = function () {

                if ($scope.idProductGroup === '' || $scope.nameProductGroup === '') {
                    $scope.show = "Vui lòng điền tất cả thông tin!";
                    iAlert(ngDialog, $scope);
                }
                else {
                    var data = {
                            _id_product_group: $scope.idProductGroup,
                            _name: $scope.nameProductGroup,
                            _note: $scope.note,
                            _is_enabled: true
                        }
                    ;

                    $url = $rootScope.api_url.postProductGroupCreate;

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