angular.module('mShipperApp')
    .component('accountCreate', {
    templateUrl: './Accounts/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        $scope.gender = $rootScope.gender;

        $scope.selectedGender = {};
        $scope.selectedGender.selected = $scope.gender[0];

        $scope.role = $rootScope.listRole;
        $scope.selectedRole = {};
        $scope.selectedRole.selected = $scope.role[0];


        $("#birthday").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            changeYear: true,
            maxDate: "+0D",
            dateFormat: "dd/mm/yy",
            onSelect: function () {
                var dateObject = $(this).datepicker('getDate');
                console.log('beginDate: ' + dateObject.getTime());
            }
        }).datepicker("setDate", new Date());

        function init() {
            $scope.email = '';
            $scope.name = '';
            $scope.identityNumber = '';
            $scope.address = '';
            $scope.phoneNumber = '';
            $scope.deliveryAddress = '';
            $scope.vehicleLicense = '';
            $scope.company = '';
        }
        $scope.srcImage = {src : '../assets/img/avatar.png'};

        $scope.submit = function () {

            if ($scope.email === '' || $scope.name === ''
                || $scope.identityNumber === '' || $scope.address === '' || $scope.phoneNumber === '')
            {
                $scope.show = "Vui lòng điền tất cả thông tin!";
                iAlert(ngDialog, $scope);
            }
            else
            {
                var data = {
                    _email: $scope.email,
                    _name: $scope.name,
                    _date_of_birth: $("#birthday").datepicker("getDate").getTime(),
                    _identify_card: $scope.identityNumber,
                    _address: $scope.address,
                    _deliveryAddress: $scope.deliveryAddress,
                    _phone: $scope.phoneNumber,
                    _gender: $scope.selectedGender.selected.id,
                    _permission_id: $scope.selectedRole.selected.id,
                    _vehicleLicense: $scope.vehicleLicense,
                    _image: $scope.srcImage.src,
                    _company: $scope.company,
                    _is_enabled : true

                };

                $url = $rootScope.api_url.postAccountCreate;

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

        $('#inputVehicle').hide();
        $('#deliveryAddress').hide();
        $('#company').hide();
        $scope.selectRole = function (item) {
            console.log(item);

            if(item.id == 'A001' || item.id == 'A002' || item.id == 'A003' || item.id == 'A004')
            {
                $('#company').hide();
                $('#inputVehicle').hide();
                $('#deliveryAddress').hide();
                $('#mapDeliveryPoint').hide();
            }
            if(item.id == 'C001')
            {
                $('#company').show();
                $('#inputVehicle').show();
                $('#inputVehicle').hide();
                $('#deliveryAddress').hide();
                $('#mapDeliveryPoint').hide();
            }
            if(item.id == 'C002'){
                $('#inputVehicle').show();
                $('#deliveryAddress').hide();
                $('#company').show();
                $('#mapDeliveryPoint').hide();
            }
            if(item.id == 'B001'){
                $('#deliveryAddress').show();
                $('#company').show();
                $('#mapDeliveryPoint').show();
                window.dispatchEvent(new Event('resize'));
            }
        };

        //update image

        var fileButton = document.getElementById("fileButton");
        fileButton.addEventListener('change', function(e){
            var file = e.target.files[0];
            var storageRef = firebase.storage().ref(file.name);

            storageRef.put(file).then((snapshot) => {
                var image = snapshot.downloadURL;
                console.log('link', image);
                $scope.srcImage = {src : image};
            });
        });

        $('#mapDeliveryPoint').hide();
    }
});