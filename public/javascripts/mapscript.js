console.log(foodmarkers[0].lat)
console.log(foodmarkers[0].long)
var geocoder;
var map;

function makeCard(title, address) {
    var card = '<div class="col s12"><div class="card"><div class="card-content"><span class="card-title">' + title + '</span>';
    card += '<p>' + address + '</p></div>';
    card += '<div class="card-action"><a class="waves-effect waves-light btn blue darken-3  white-text"><i class="material-icons left  white-text">call</i>Call</a> <a class="waves-effect waves-light btn blue darken-3  white-text"><i class="material-icons left  white-text">navigation</i>Find</a></div>';
    card += '</div></div>';
    return card;
}

function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        scrollwheel: false,
        center: {lat: 40.824169, lng: -73.915452},
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        fullscreenControl: true
    });
    // var marker = new google.maps.Marker({
    //   position: bronx,
    //   map: map
    // });
    var infoWindow = new google.maps.InfoWindow();
    $(".food").on("click", function(){

        var cardview = $('#map-cards');

        cardview.empty();

        for (i = 0; i < foodmarkers.length; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(foodmarkers[i].lat, foodmarkers[i].long),
                map: map
            });

            var data = foodmarkers[i];

            addName(marker, data.name,data);
        }

        setTimeout(function(){ $('#iconwrap').addClass('open'); }, 100);

        setTimeout(function(){

            for (i = 0; i < foodmarkers.length; i++) {

                var data = foodmarkers[i];
                var newCard = makeCard(data.name, data.strAdress);

                cardview.prepend(newCard);
            }

        }, 500);

    })

    $(".health").on("click", function(){

        var cardview = $('#map-cards');

        cardview.empty();

        for (i = 0; i < healthmarkers.length; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(healthmarkers[i].lat, healthmarkers[i].long),
                map: map
            });

            var data = healthmarkers[i];

            addName(marker, data.name,data);
        }

        setTimeout(function(){ $('#iconwrap').addClass('open'); }, 100);

        setTimeout(function(){

            for (i = 0; i < healthmarkers.length; i++) {

                var data = healthmarkers[i];
                var newCard = makeCard(data.name, data.strAdress);

                cardview.prepend(newCard);
            }

        }, 500);
    $(".home").on("click", function(){

        var cardview = $('#map-cards');

        cardview.empty();

        for (i = 0; i < homemarkers.length; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(homemarkers[i].lat, homemarkers[i].long),
                map: map
            });

            var data = homemarkers[i];

            addName(marker, data.name,data);
        }

        setTimeout(function(){ $('#iconwrap').addClass('open'); }, 100);

        setTimeout(function(){

            for (i = 0; i < homemarkers.length; i++) {

                var data = homemarkers[i];
                var newCard = makeCard(data.name, data.strAdress);

                cardview.prepend(newCard);
            }

        }, 500);

    $(".work").on("click", function(){

        var cardview = $('#map-cards');

        cardview.empty();

        for (i = 0; i < workmarkers.length; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(workmarkers[i].lat, workmarkers[i].long),
                map: map
            });

            var data = workmarkers[i];

            addName(marker, data.name,data);
        }

        setTimeout(function(){ $('#iconwrap').addClass('open'); }, 100);

        setTimeout(function(){

            for (i = 0; i < workmarkers.length; i++) {

                var data = workmarkers[i];
                var newCard = makeCard(data.name, data.strAdress);

                cardview.prepend(newCard);
            }

        }, 500);

    $(".law").on("click", function(){

        var cardview = $('#map-cards');

        cardview.empty();

        for (i = 0; i < lawmarkers.length; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lawmarkers[i].lat, lawmarkers[i].long),
                map: map
            });

            var data = lawmarkers[i];

            addName(marker, data.name,data);
        }

        setTimeout(function(){ $('#iconwrap').addClass('open'); }, 100);

        setTimeout(function(){

            for (i = 0; i < lawmarkers.length; i++) {

                var data = lawmarkers[i];
                var newCard = makeCard(data.name, data.strAdress);

                cardview.prepend(newCard);
            }

        }, 500);

    $(".addict").on("click", function(){

        var cardview = $('#map-cards');

        cardview.empty();

        for (i = 0; i < drugmarkers.length; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(drugmarkers[i].lat, drugmarkers[i].long),
                map: map
            });

            var data = drugmarkers[i];

            addName(marker, data.name,data);
        }

        setTimeout(function(){ $('#iconwrap').addClass('open'); }, 100);

        setTimeout(function(){

            for (i = 0; i < drugmarkers.length; i++) {

                var data = drugmarkers[i];
                var newCard = makeCard(data.name, data.strAdress);

                cardview.prepend(newCard);
            }

        }, 500);
    })
};

function addName(marker, message, data) {
    infowindow = new google.maps.InfoWindow({
        content: message
    });

    marker.addListener('click', function() {
        infowindow.setContent(message);
        infowindow.open(marker.get('map'), marker);

        $('#form').html(message);

        // map.setCenter(marker.getPosition());
        map.panTo(marker.getPosition());
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
