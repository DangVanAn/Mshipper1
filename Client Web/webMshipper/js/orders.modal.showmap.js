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


        $scope.selectedCities = [];
        $scope.cities = [
            {id: 1,name: 'Oslo', pos:[59.923043, 10.752839]},
            {id: 2,name: 'Stockholm',pos:[59.339025, 18.065818]},
            {id: 3,name: 'Copenhagen',pos:[55.675507, 12.574227]},
            {id: 4,name: 'Berlin',pos:[52.521248, 13.399038]},
            {id: 5,name: 'Paris',pos:[48.856127, 2.346525]}
        ];

        $scope.selectionsChanged = function(){
            $scope.selectedCities = [];
            $scope.selectedValues.forEach(function(cid){
                var city = $scope.cities.filter(function(c){
                    if(c.id == parseInt(cid))
                        return c;
                })[0];
                $scope.selectedCities.push(city);
            });

            $scope.zoomToIncludeMarkers();
        };

        $scope.zoomToIncludeMarkers = function() {
            var bounds = new google.maps.LatLngBounds();
            $scope.selectedCities.forEach(function(c) {
                var latLng = new google.maps.LatLng(c.pos[0],c.pos[1]);
                bounds.extend(latLng);
            });
            $scope.map.fitBounds(bounds);
            if($scope.selectedCities.length == 1){
                $scope.map.setZoom(5);
            }
        };


        $scope.ok = function () {
            $uibModalInstance.close($scope.data);
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
    ]);