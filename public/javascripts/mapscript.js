console.log(markers[0].lat)
console.log(markers[0].long)
var geocoder;
var map;

function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 40.824169, lng: -73.915452},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    // var marker = new google.maps.Marker({
    //   position: bronx,
    //   map: map
    // });
    var infoWindow = new google.maps.InfoWindow();
    $(".food").on("click", function(){
        for (i = 0; i < markers.length; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(markers[i].lat, markers[i].long),
                map: map
            });
            var message = markers[i].name

            addName(marker, message)

        }

    })
};

function addName(marker, message) {
    infowindow = new google.maps.InfoWindow({
        content: message
    });

    marker.addListener('click', function() {
        infowindow.setContent(message);
        infowindow.open(marker.get('map'), marker);
        $('#form').text("<p>"+ message+"</p>")

    });
}

function codeAddress() {
    // var address = document.getElementById('address').value;
    geocoder = new google.maps.Geocoder();
    var address = $("#address").val();
    var name = $("#name").val();
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            console.log(JSON.stringify(results[0].geometry.location));
            console.log(lat);
            console.log(lng);
            addName(marker, name);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
