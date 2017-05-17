angular.module('mShipperApp')
    .controller('modal.teams.delete.yesno', ['$scope', '$http', '$uibModalInstance', 'data', function ($scope, $http, $uibModalInstance, data) {
        init();
        function init() {
            console.log(data);
        }
        $scope.info = data.info;
        $scope.id = data.id;

        $scope.ok = function () {
            $uibModalInstance.close('ok');
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
    ]);