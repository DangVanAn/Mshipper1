angular.module('mShipperApp')
    .controller('modal.selectDate', ['$scope', '$http', '$uibModalInstance', 'data', function ($scope, $http, $uibModalInstance, data) {
        $scope.data = data.toString();
        console.log(data);

        $scope.rooms = [
            '1',
            '2',
            '3',
            '4'
        ];
        $(function () {
            $('.select2').select2();
        });

        $scope.selectRoom = $scope.rooms[0];


        $scope.selectedUsers = [];
        $scope.users = [];

        var tmp = "123456789";
        var rs = tmp.slice(0, 3) + "-" + tmp.slice(3);

        console.log("rs:" + rs);

        var selectH = -1, selectM = -1;
        var boolH = 1, boolM = 0;
        
        $scope.c_hour = function (h) {
            console.log("hour::" + h);
            var ch = '#h' + h;
            $(ch.toString()).css('background-color', 'blue');

            if(selectH !== -1 && selectH !== h)
            {
                ch = '#h' + selectH;
                $(ch.toString()).css('background-color', '');
            }
            selectH = h;


        }

        $scope.c_minute = function (m) {
            console.log("minute::" + m);
            var cm = '#m' + m;
            $(cm.toString()).css('background-color', 'blue');

            if(selectM !== -1 && selectM !== m)
            {
                cm = '#m' + selectM;
                $(cm.toString()).css('background-color', '');
            }
            selectM = m;

            if(selectH !== -1 && selectM !== -1)
            {
                console.log("gio hien tai:" + selectH + ":" + selectM);

                var countClose = 0, findClose = -1;
                for(var i = 0; i < $scope.data.length; i++)
                {
                    if($scope.data[i] === ')')
                    {
                        countClose++;
                        console.log("countClose:" + countClose);
                        console.log("selectRoom:" + $scope.selectRoom);
                        if(countClose == $scope.selectRoom)
                        {
                            findClose = i;
                            break;
                        }
                    }
                }

                console.log("findClose:" + findClose);

                if(findClose !== -1)
                {
                    var sH = selectH, sM = selectM;
                    if(selectH < 10) sH = '0' + selectH;
                    if(selectM < 10) sM = '0' + selectM;
                    // chen chuoi vao vi tri
                    if($scope.data[findClose - 1] === '(')
                    {
                        $scope.data = $scope.data.slice(0, findClose) + sH + ":" + sM + $scope.data.slice(findClose);
                    }
                    else
                    {
                        $scope.data = $scope.data.slice(0, findClose) + ',' + sH + ":" + sM + $scope.data.slice(findClose);
                    }
                }
            }
        }


        $scope.ok = function () {
            $uibModalInstance.close($scope.data);
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
    ]);