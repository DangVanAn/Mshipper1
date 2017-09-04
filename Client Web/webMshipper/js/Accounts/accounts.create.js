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

        $scope.driverLicenses = $rootScope.listDriverLicense;
        $scope.selectedDriverLicenses = {};
        $scope.selectedDriverLicenses.selected = $scope.driverLicenses[0];


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
            $scope.obj = {};
            $scope.obj.deliveryAddress = '';
            $scope.driverLicenseNumber = '';
            $scope.driverLicenseName = '';
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
                    _identify_card: $scope.identityNumber,
                    _name: $scope.name,
                    _email: $scope.email,
                    _date_of_birth: $("#birthday").datepicker("getDate").getTime(),
                    _address: $scope.address,
                    _phone: $scope.phoneNumber,
                    _gender: $scope.selectedGender.selected.name,
                    _permission_id: $scope.selectedRole.selected.id,
                    _is_enabled: true,
                    _image: $scope.srcImage.src
                };

                var item = $scope.selectedRole.selected;

                if (item.id == 'C001') {
                    data._company = $scope.company;
                }
                if (item.id == 'C002') {
                    data._driverLicenseNumber = $scope.driverLicenseNumber;
                    data._driverLicenseName = $scope.selectedDriverLicenses.selected.id;
                    data._company = $scope.company;
                }
                if (item.id == 'B001') {
                    data._deliveryAddress = $scope.obj.deliveryAddress;
                    data._latitude = tempMarker[0];
                    data._longitude = tempMarker[1];
                    data._radius = 50;
                    if($scope.path.length > 2)
                    {
                        data._polygon = JSON.stringify($scope.path);
                    }
                }

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

        $scope.inputVehicle = false;
        $scope.showCompany = false;
        $scope.showMap = false;
        $('#idShowMap').hide();
        $scope.selectRole = function (item) {
            console.log(item);

            if(item.id == 'A001' || item.id == 'A002' || item.id == 'A003' || item.id == 'A004')
            {
                $scope.showCompany = false;
                $scope.inputVehicle = false;
                $scope.showMap = false;
                $('#idShowMap').hide();
            }
            if(item.id == 'C001')
            {
                $scope.showCompany = true;
                $scope.inputVehicle = false;
                $scope.showMap = false;
                $('#idShowMap').hide();
            }
            if(item.id == 'C002'){
                $scope.inputVehicle = true;
                $scope.showCompany = true;
                $scope.showMap = false;
                $('#idShowMap').hide();
            }
            if(item.id == 'B001'){
                $scope.showCompany = true;
                $scope.showMap = true;
                $('#idShowMap').show();
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

        $scope.obj = {deliveryAddress  : 'Hồ CHí Minh.Việt Nam'};
        $scope.typeSelects = [{id: '001', name: 'Chọn Điểm'}, {id: '002', name: 'Chọn Vùng'}];
        $scope.selectedTypeSelect = [];
        $scope.selectedTypeSelect.selected = $scope.typeSelects[0];
        $scope.mapAddress = [0, 0];
        $scope.path1 = [[0, 0]];
        $scope.path = [];
        var tempMarker = [0, 0];

        $scope.showMapArea = false;
        $scope.selectTypeSelect = function (item) {
            if ($scope.selectedTypeSelect.selected.id === '001') {
                $scope.showMapArea = false;

                $scope.mapAddress = tempMarker;
                $scope.path1 = [[0, 0]];
                $scope.mapAddressCenter = tempMarker;
            }

            if ($scope.selectedTypeSelect.selected.id === '002') {
                $scope.showMapArea = true;

                $scope.mapAddress = [0, 0];
                $scope.path1 = $scope.path;
                $scope.mapAddressCenter = $scope.path1[0];
            }
        };
        $scope.addMarkerAndPath = function (event) {
            console.log(event);
            if ($scope.selectedTypeSelect.selected.id === '001') {
                $scope.mapAddress = [event.latLng.lat(), event.latLng.lng()];

                tempMarker = [event.latLng.lat(), event.latLng.lng()];
            }

            if ($scope.selectedTypeSelect.selected.id === '002') {
                $scope.path.push([event.latLng.lat(), event.latLng.lng()]);
                $scope.path1 = $scope.path;
            }
        };

        $scope.removePoint = function () {
            $scope.path.splice(-1, 1)
        };

        $scope.enterInputMap = function () {
            console.log('158');
            getLatLng();
        }

        function getLatLng(){
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                $scope.obj.deliveryAddress + '&key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM')
                .then(function (coord_results) {
                        $scope.queryResults = coord_results.data.results;
                        $scope.geodata = $scope.queryResults[0].geometry;

                        tempMarker[0] = JSON.stringify($scope.queryResults[0].geometry.location.lat);
                        tempMarker[1] = JSON.stringify($scope.queryResults[0].geometry.location.lng);

                        $scope.mapAddressCenter = tempMarker;
                        $scope.mapAddress = tempMarker;
                    },
                    function error(_error) {
                        $scope.queryError = _error;
                        getLatLng();
                    });
        }
    }
});