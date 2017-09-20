angular.module('mShipperApp')
    .component('accountUpdate', {
    templateUrl: './Accounts/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $routeParams, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        $scope.gender = $rootScope.gender;
        $scope.selectedGender = {};
        $scope.role = $rootScope.listRole;
        $scope.selectedRole = {};
        $scope.driverLicenses = $rootScope.listDriverLicense;
        $scope.selectedDriverLicenses = {};

        $scope.typeSelects = [{id: '001', name: 'Chọn Điểm'}, {id: '002', name: 'Chọn Vùng'}];
        $scope.selectedTypeSelect = [];
        $scope.selectedTypeSelect.selected = $scope.typeSelects[0];

        $scope.mapAddress = [0, 0];
        $scope.path1 = [[0, 0]];
        $scope.path = [];
        $scope.obj = {deliveryAddress : ''};

        $("#phoneForm").addClass("disabledbutton");
        $("#roleForm").addClass("disabledbutton");

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
            $scope.firstName = '';
            $scope.lastName = '';
            $scope.identityNumber = '';
            $scope.address = '';
            $scope.phoneNumber = '';
            $scope.srcImage = {src : '../assets/img/avatar.png'};

            $url = $rootScope.api_url.getAccountPhone;
            var data = {phone : $routeParams.phone};
            httpPost($http, $url, data,
                function (response) {
                    $scope.email = response.data[0]._email;
                    $scope.name = response.data[0]._name;
                    $("#birthday").datepicker("setDate", response.data[0]._date_of_birth);
                    $scope.identityNumber = response.data[0]._identify_card;
                    $scope.address = response.data[0]._address;
                    $scope.phoneNumber = response.data[0]._phone;
                    $scope.srcImage = {src : response.data[0]._image};

                    for(var i = 0; i < $scope.gender.length; i++)
                    {
                        if($scope.gender[i].name == response.data[0]._gender)
                        {
                            $scope.selectedGender.selected = $scope.gender[i];
                        }
                    }
                    for(var i = 0; i < $scope.role.length; i++)
                    {
                        if($scope.role[i].id == response.data[0]._permission_id)
                        {
                            $scope.selectedRole.selected = $scope.role[i];
                        }
                    }

                    var item = $scope.selectedRole.selected;

                    if (item.id == 'C001') {
                        $scope.company = response.data[0]._company;
                    }
                    if (item.id == 'C002') {
                        $scope.driverLicenseNumber = response.data[0]._driverLicenseNumber;

                        for(var i = 0; i < $scope.driverLicenses.length; i++)
                        {
                            if($scope.driverLicenses[i].id == response.data[0]._driverLicenseName)
                            {
                                $scope.selectedDriverLicenses.selected = $scope.driverLicenses[i];
                            }
                        }

                        $scope.company = response.data[0]._company;
                    }
                    if (item.id == 'B001') {
                        $scope.company = response.data[0]._company;
                        $scope.obj.deliveryAddress = response.data[0]._deliveryAddress;
                        if(response.data[0]._latitude != undefined && response.data[0]._longitude != undefined){
                            $scope.mapAddress = [response.data[0]._latitude, response.data[0]._longitude];
                            $scope.mapAddressCenter = [response.data[0]._latitude, response.data[0]._longitude];
                            tempMarker = [response.data[0]._latitude, response.data[0]._longitude];
                        }
                        else {
                            $scope.mapAddress = [0, 0];
                            $scope.mapAddressCenter = [0, 0];
                            tempMarker = [0, 0];
                        }

                        if(response.data[0]._polygon != undefined && response.data[0]._polygon.length > 0){
                            $scope.path = JSON.parse(response.data[0]._polygon);
                            // $scope.path1 = JSON.parse(response.data[0]._polygon);
                        }
                    }

                    selectRole(item);

                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $('#idShowMap').hide();
        function selectRole(item) {
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

        var tempMarker = [];
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

        $scope.showMapArea = false;
        $scope.addMarkerAndPath = function (event) {
            console.log(event);
            if ($scope.selectedTypeSelect.selected.id === '001') {
                $scope.showMapArea = false;
                $scope.mapAddress = [event.latLng.lat(), event.latLng.lng()];

                tempMarker = [event.latLng.lat(), event.latLng.lng()];
            }

            if ($scope.selectedTypeSelect.selected.id === '002') {
                $scope.showMapArea = true;
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

                    console.log($scope.obj.deliveryAddress);
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

                $url = $rootScope.api_url.postAccountUpdate;

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