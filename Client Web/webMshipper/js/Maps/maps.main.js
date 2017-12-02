angular.module('mShipperApp').component('mapsMain', {
    templateUrl: './Maps/Main.html',
    controller: function MapQuanlyController($rootScope, $scope, $http, $sce, $compile, $filter, $location, $timeout) {

        $(document).ready(function () {
            getLocationFuntion();
        });

        $scope.path = [];

        function createMap() {
            var scriptAllMap = "<shape name=\"polyline\" id=\"foo\"\n" +
                "                                   path=\"{{path}}\"\n" +
                "                                   stroke-color=\"#FF0000\"\n" +
                "                                   stroke-opacity=\"1.0\"\n" +
                "                                   stroke-weight=\"3\">\n" +
                "                            </shape>";
            // $scope.allMap = $sce.trustAsHtml(scriptAllMap);

            window.dispatchEvent(new Event('resize'));

            var content = $compile(scriptAllMap)($scope);
            $('#allNgMap').append(content);
        }

        var stavanger = new google.maps.LatLng(58.983991, 5.734863);
        var amsterdam = new google.maps.LatLng(52.395715, 4.888916);
        var london = new google.maps.LatLng(51.508742, -0.120850);

        var mapCanvas = document.getElementById("map");
        var mapOptions = {center: amsterdam, zoom: 4};
        var map = new google.maps.Map(mapCanvas, mapOptions);

        var flightPath = new google.maps.Polyline({
            path: [stavanger, amsterdam, london],
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2
        });
        flightPath.setMap(map);

        $scope.addMarkerAndPath = function (event) {
            $scope.path.push([event.latLng.lat(), event.latLng.lng()]);
        };

        function getLocationFuntion() {
            $http({
                method: 'POST',
                url: $rootScope.api_url.getLocation,
                headers: {'Content-Type': 'application/json'},
                data: {id: 'xxxx'}
            }).then(function successCallback(response) {
                console.log(response.data);
                var newPath = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.path.push([response.data[i]._latitude, response.data[i]._longitude]);
                    var newPoint = new google.maps.LatLng(response.data[i]._latitude, response.data[i]._longitude);
                    newPath.push(newPoint);
                }

                // var newPolyline = new google.maps.Polyline({
                //     path: newPath,
                //     strokeColor: "#ff232f",
                //     strokeOpacity: 0.8,
                //     strokeWeight: 2
                // });
                // newPolyline.setMap(map);

                var myLastPoint = response.data[response.data.length - 1];
                var lastPoint = new google.maps.LatLng(myLastPoint._latitude, myLastPoint._longitude);
                var marker = new google.maps.Marker({
                    position: lastPoint,
                    label: myLastPoint._delivery_man,
                });
                marker.setMap(map);

                // createMap();
                // $scope.$apply();
            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });
        }

        //////////////////////////////////////////////////////
        map111();

        function map111() {
            var styles = [
                {
                    featureType: 'landscape',
                    elementType: 'all',
                    stylers: [
                        {
                            hue: '#e5e3df'
                        },
                        {
                            saturation: -62
                        },
                        {
                            lightness: 0
                        },
                        {
                            visibility: 'on'
                        }
                    ]
                },
                {
                    featureType: 'water',
                    elementType: 'all',
                    stylers: [
                        {
                            hue: '#aad3d4'
                        },
                        {
                            saturation: -27
                        },
                        {
                            lightness: -1
                        },
                        {
                            visibility: 'on'
                        }
                    ]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [
                        {
                            hue: '#dfdbd4'
                        },
                        {
                            saturation: -85
                        },
                        {
                            lightness: 59
                        },
                        {
                            visibility: 'simplified'
                        }
                    ]
                },
                {
                    featureType: 'road.arterial',
                    elementType: 'all',
                    stylers: [
                        {
                            hue: '#eeeceb'
                        },
                        {
                            saturation: -92
                        },
                        {
                            lightness: 68
                        },
                        {
                            visibility: 'simplified'
                        }
                    ]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'all',
                    stylers: [
                        {
                            hue: '#cadb9b'
                        },
                        {
                            saturation: 7
                        },
                        {
                            lightness: -6
                        },
                        {
                            visibility: 'on'
                        }
                    ]
                },
                {
                    featureType: 'road.local',
                    elementType: 'all',
                    stylers: [
                        {
                            hue: '#ffffff'
                        },
                        {
                            saturation: -100
                        },
                        {
                            lightness: 100
                        },
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'poi.school',
                    elementType: 'geometry',
                    stylers: [
                        {
                            hue: '#dfdbd4'
                        },
                        {
                            saturation: -69
                        },
                        {
                            lightness: 13
                        },
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'poi.business',
                    elementType: 'all',
                    stylers: [
                        {
                            hue: '#dfdbd4'
                        },
                        {
                            saturation: -2
                        },
                        {
                            lightness: 2
                        },
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'water',
                    elementType: 'all',
                    stylers: []
                },
                {
                    featureType: 'poi.medical',
                    elementType: 'geometry',
                    stylers: [
                        {
                            hue: '#d2cec8'
                        },
                        {
                            saturation: -76
                        },
                        {
                            lightness: -8
                        },
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'road',
                    elementType: 'labels',
                    stylers: [
                        {
                            hue: '#ffffff'
                        },
                        {
                            saturation: -100
                        },
                        {
                            lightness: 100
                        },
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'transit',
                    elementType: 'labels',
                    stylers: [
                        {
                            hue: '#ffffff'
                        },
                        {
                            saturation: 0
                        },
                        {
                            lightness: 100
                        },
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'poi.attraction',
                    elementType: 'geometry',
                    stylers: [
                        {
                            hue: '#d2cec8'
                        },
                        {
                            saturation: -77
                        },
                        {
                            lightness: 11
                        },
                        {
                            visibility: 'simplified'
                        }
                    ]
                },
                {
                    featureType: 'landscape.man_made',
                    elementType: 'geometry',
                    stylers: [
                        {
                            hue: '#d2cec8'
                        },
                        {
                            saturation: -63
                        },
                        {
                            lightness: -10
                        },
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'road.local',
                    elementType: 'all',
                    stylers: [
                        {
                            hue: '#e2e1dd'
                        },
                        {
                            saturation: -92
                        },
                        {
                            lightness: -12
                        },
                        {
                            visibility: 'simplified'
                        }
                    ]
                }
            ];

            var cur_zoom = 7,
                prev_zoom = cur_zoom;


            // Load the station data. When the data comes back, create an overlay.
            var map = new google.maps.Map(d3.select("#map1").node(), {
                zoom: cur_zoom,
                center: new google.maps.LatLng(30.331227, -97.725019),
                'styles': styles,
                //mapTypeId: google.maps.MapTypeId.TERRAIN,
                maxZoom: 12,
                minZoom: 5
            });

            //test data file
            file = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/125707/clusters.json';
            //file = 'clusters.json';

            //function to caculate dist btw points. Args in format [x, y]
            function coords_dist(point1, point2) {
                var xs = 0;
                var ys = 0;

                xs = point2[0] - point1[0];
                xs = xs * xs;

                ys = point2[1] - point1[1];
                ys = ys * ys;

                return Math.sqrt(xs + ys);
            }

            d3.json(file, function (error, data) {
                if (error) return console.warn(error);

                //save full cluster data, then get
                var clusters = data,
                    data = clusters[cur_zoom];

                var overlay = new google.maps.OverlayView();

                //set bounds based on data's max lat and long
                var latmax = d3.max(data, function (d) {
                        return d.latitude
                    }),
                    latmin = d3.min(data, function (d) {
                        return d.latitude
                    }),
                    longmax = d3.max(data, function (d) {
                        return d.longitude
                    }),
                    longmin = d3.min(data, function (d) {
                        return d.longitude
                    }),
                    southWest = new google.maps.LatLng(latmin, longmin),
                    northEast = new google.maps.LatLng(latmax, longmax),
                    new_bounds = new google.maps.LatLngBounds(southWest, northEast);

                // map marker radius to values between 6px and 20px
                var marker_radius = d3.scale.linear()
                    .domain(d3.extent(data, function (d) {
                        return d.size;
                    }))
                    .range([8, 16]);

                // Add the container when the overlay is added to the map.
                overlay.onAdd = function () {
                    //map.fitBounds(new_bounds);
                    var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
                        .attr("class", "stations");

                    // Draw each marker as a separate SVG element.
                    // We could use a single SVG, but what size would it have?
                    overlay.draw = function () {
                        prev_zoom = cur_zoom;
                        cur_zoom = map.getZoom();

                        console.log("zoom is " + cur_zoom + ", prev zoom is " + prev_zoom);
                        data = clusters[cur_zoom];

                        var projection = this.getProjection(),
                            padding = 10;

                        var marker = layer.selectAll("svg")
                        //.data(d3.values(data))
                            .data(data, function (d) {
                                return d3.values(d);
                            })
                            .each(display); // update existing markers

                        // add new markers, with some custom transitions
                        marker.enter().append("svg:svg")
                            .each(display)
                            .attr("width", function (d) {
                                return marker_radius(d.size) * 2 + padding * 2
                            })
                            .attr("height", function (d) {
                                return marker_radius(d.size) * 2 + padding * 2
                            })
                            .attr("class", "marker")
                            .style("margin-top", function (d) {
                                return "-" + (marker_radius(d.size) + padding) / 2 + "px";
                            })
                            .style("margin-left", function (d) {
                                return "-" + (marker_radius(d.size) + padding) / 2 + "px";
                            })
                            .each(animateIn);

                        // remove markers, add some exit transitions later
                        marker.exit()
                            .each(display)
                            .each(animateOut);

                        // Add a circle.
                        marker.append("svg:circle")
                            .attr("r", function (d) {
                                return marker_radius(d.size);
                            })
                            .attr("cx", function (d) {
                                return marker_radius(d.size) + padding
                            })
                            .attr("cy", function (d) {
                                return marker_radius(d.size) + padding
                            });

                        // Add a label in the center of the circle
                        marker.append("svg:text")
                            .attr("x", function (d) {
                                return marker_radius(d.size) + padding
                            })
                            .attr("y", function (d) {
                                return marker_radius(d.size) + padding
                            })
                            .style("text-anchor", "middle")
                            .attr("dy", ".31em")
                            .text(function (d) {
                                return d.size;
                            });

                        function display(d) {
                            var pos = map_pixel(d.latitude, d.longitude);

                            return d3.select(this)
                                .style("left", (pos.x - padding) + "px")
                                .style("top", (pos.y - padding) + "px");
                        }

                        function map_pixel(lat, long) {
                            var pos = new google.maps.LatLng(lat, long);
                            pos = projection.fromLatLngToDivPixel(pos);

                            return pos;
                        }

                        //animate the markers from the position of their "parent" cluster to their actual position
                        function animateIn(d) {
                            var el = d3.select(this);
                            // check if element's "zoom" data is equal to the current zoom
                            if (d.zoom == cur_zoom) {
                                //only animate position if we're zooming in
                                if (cur_zoom > prev_zoom) {
                                    var parent_data = clusters[cur_zoom - 1][d.parent],
                                        parent_map_pos = map_pixel(parent_data.latitude, parent_data.longitude),
                                        self_pos = map_pixel(d.latitude, d.longitude);

                                    return d3.select(this).style('left', (parent_map_pos.x - padding) + 'px')
                                        .style('top', (parent_map_pos.y - padding) + 'px')
                                        .attr('opacity', 0)
                                        .transition()
                                        .duration(800)
                                        .style("left", (self_pos.x - padding) + "px")
                                        .style("top", (self_pos.y - padding) + "px")
                                        .attr('opacity', 1);
                                } else {
                                    // fade in if zooming out
                                    return d3.select(this).attr('opacity', 0)
                                        .transition()
                                        .duration(800)
                                        .attr('opacity', 1);
                                }
                            } // end zoom check. don't transition if el is not in the current zoom bucket.
                        }

                        // exit animation
                        // animate position of markers from current position to parent position
                        function animateOut(d) {
                            el = d3.select(this);

                            // check if elements "zoom" data attribute is equal to cur_zoom + 1
                            //only animate position if zooming out and the element is from one zoom level down
                            if (d.zoom == (cur_zoom + 1) && cur_zoom < prev_zoom) {
                                var parent_data = data[d.parent],
                                    parent_map_pos = map_pixel(parent_data.latitude, parent_data.longitude);

                                return d3.select(this).transition()
                                    .duration(800)
                                    .style('left', (parent_map_pos.x - padding) + 'px')
                                    .style('top', (parent_map_pos.y - padding) + 'px')
                                    .attr('opacity', 0)
                                    .each("end", function () {
                                        d3.select(this).remove();
                                    });
                            } else if (d.zoom == (cur_zoom - 1) && cur_zoom > prev_zoom) {
                                // if zooming in and element is from one zoom level up, fade out opacity
                                console.log("removing element during zoom in");
                                return d3.select(this).transition()
                                    .delay(400)
                                    .duration(400)
                                    .attr('opacity', 0)
                                    .each("end", function () {
                                        d3.select(this).remove();
                                    });
                            } else {
                                // if element is not from the immediately preceding zoom level, remove immediately
                                console.log("remove immediately");
                                return d3.select(this).remove();
                            }
                        }

                    };
                };

                // Bind overlay to the map…
                overlay.setMap(map);
            });
        };


        //////////////////////////////////////////////////////
    }
});