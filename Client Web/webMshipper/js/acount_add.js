angular.module('mShipperApp').
component('addAccount',{
    templateUrl: './AccountAdd.html',
    controller: function DsDonHangController($scope, $http, $filter,$location, $timeout){
        $(document).ready(function () {
            $('#dataTables-example').DataTable({
                responsive: true
            });
        });

        $scope.gender = [
            "Nam",
            "Nữ",
            "Chưa xác định"
        ];
        $scope.selectGender = $scope.gender[0];

        $scope.permission = [
            "Quản lý",
            "Đội trưởng",
            "Nhân viên"
        ];
        $scope.selectPermission = $scope.permission[0];

        $scope.team = [
            "Khu vực 1",
            "Khu vực 2",
            "Khu vực 3",
            "Khu vực 4",
            "Khu vực 5",
            "Khu vực 6",
            "Khu vực 7",
        ];
        $scope.selectTeam = $scope.team[0];

    }
});