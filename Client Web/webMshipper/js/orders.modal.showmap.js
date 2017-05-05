angular.module('mShipperApp')
    .controller('modal.selectDate', ['$scope', '$http', '$uibModalInstance', 'data', function ($scope, $http, $uibModalInstance, data) {
        // $scope.data = data.toString();
        console.log(data._id);

        init();
        function init() {
            $urll = 'http://localhost:9999/details/getbyidorder'

            $http({
                method: 'POST',
                url: $urll,
                headers: {'Content-Type': 'application/json'},
                data : data
            }).then(function successCallback(response) {
                $scope.details = response.data;
                console.log(response.data);

            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });
        }

        $scope.ok = function () {
            $uibModalInstance.close($scope.data);
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
    ]);