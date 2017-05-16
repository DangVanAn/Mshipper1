angular.module('mShipperApp').
component('addDanhSachDonHang',{
    templateUrl: './Orders/Create.html',
    controller: function DsDonHangController($scope, $http, $filter,$location, $timeout, $parse){
        $(document).ready(function () {
            $('#dataTables-example').DataTable({
                responsive: true
            });
        });

        $scope.status = [
            "Hoàn thành",
            "Đang vận chuyển",
            "Hủy"
        ];
        $scope.selectStatus = $scope.status[0];

        $scope.area = [
            "Khu vực 1",
            "Khu vực 2",
            "Khu vực 3",
            "Khu vực 4",
            "Khu vực 5",
            "Khu vực 6",
            "Khu vực 7",
        ];
        $scope.selectArea = $scope.area[0];

        $scope.csv = {
            content: null,
            header: true,
            headerVisible: true,
            separator: ',',
            separatorVisible: false,
            result: null,
            encodingVisible: true
        };

        $scope.GetImport = function () {

            var json = $scope.csv.result;

            var objStr = JSON.stringify(json);
            var obj = null;
            try {
                obj = $parse(objStr)({});
            } catch(e){
                // eat $parse error
                return _lastGoodResult;
            }

            var result = JSON.stringify(obj, null, Number(1));
            _lastGoodResult = result;

            $scope.DonHangs = JSON.parse(result.toString());

            console.log(result);
        }

        var _lastGoodResult = '';
        $scope.toPrettyJSON = function (json, tabWidth) {
            var objStr = JSON.stringify(json);
            var obj = null;
            try {
                obj = $parse(objStr)({});
            } catch(e){
                // eat $parse error
                return _lastGoodResult;
            }

            var result = JSON.stringify(obj, null, Number(tabWidth));
            _lastGoodResult = result;

            console.log("Nhay vao doc csv");
            console.log(result);

            return result;
        };
    }
});