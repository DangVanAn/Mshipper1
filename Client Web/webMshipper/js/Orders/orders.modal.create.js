angular.module('mShipperApp')
    .controller('modal.orders.create', ['$scope', '$http', '$uibModalInstance', 'data', function ($scope, $http, $uibModalInstance, data) {
        // $scope.data = data.toString();
        console.log(data._id);

        console.log(JSON.stringify(data));

        $scope.details = data;

        $scope.ok = function () {
            $uibModalInstance.close($scope.data);
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
    ]);