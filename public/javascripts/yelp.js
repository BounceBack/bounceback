/**
 * Created by juanitasoranno on 11/28/16.
 */
    // =========Start Yelp API=========

var foodStr = "";
var priceStr = "";

$("#food").change(function() {
    var foodSelected = [];
    $("#food option:selected").each(function() {
        foodSelected.push($(this).attr("value"));
        foodStr = foodSelected.join(", ");
        console.log(foodStr);
    });
});
//NEED TO HIDE
$("#FindRest").on("click", function() {
    var auth = {
        consumerKey: 'A57Bv67Jx1i_WTKhVxaiTg',
        consumerSecret: 'z4fnfyiWxl25JrABzDChCd8NGGI',
        accessToken: 'aDHmxuRU28TxZ_c4ltxXPkc7rb77UwUH',
        accessTokenSecret: 'L_Q6vCfuuCl5QuaXSFi4lZ9X_UM',
        serviceProvider: {
            signatureMethod: "HMAC-SHA1"
        }
    };

    var terms = foodStr;
    var near = $("#userLocation").val().trim();
    console.log(near);
    var limit = 12;
    var image_url = 'image_url';
    var rating_img_url_large = 'rating_img_url_large';
    var phone = 'phone';
    var yelpUrl = 'url';
    var radius = 3200;
    var price = priceStr; // This will come from the user input
    var open_now = true;

    var randomInt = Math.floor(Math.random() * 12); // This will be used to pick a restaurant result at random
    var accessor = {
        consumerSecret: auth.consumerSecret,
        tokenSecret: auth.accessTokenSecret
    };

    parameters = [];
    parameters.push(['url', yelpUrl]);
    parameters.push(['term', terms]);
    parameters.push(['location', near]);
    parameters.push(['limit', limit]);
    // parameters.push(['image_url', image_url]);
    // parameters.push(['rating_img_url_large', rating_img_url_large]);
    parameters.push(['open_now', true]);
    parameters.push(['phone', phone]);
    parameters.push(['radius', radius]);
    parameters.push(['price', price]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
    console.log(parameters);
    var message = {
        'action': 'http://api.yelp.com/v2/search',
        'method': 'GET',
        'parameters': parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);


    function formatPhoneNumber(number) {
        var phoneArray = number.split("");
        phoneArray.splice(0, 0, "(");
        phoneArray.splice(4, 0, ")");
        phoneArray.splice(5, 0, " ");
        phoneArray.splice(9, 0, "-");
        number = phoneArray.join("");

        return number;
    }

    $.ajax({
        'url': message.action,
        'method': 'GET',
        'data': parameterMap,
        'cache': true,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
    }).done(function(response) {

        var name = response.businesses[randomInt].name;
        var phone = response.businesses[randomInt].phone;
        phone = formatPhoneNumber(phone);
        var address = response.businesses[randomInt].location.address[0] + " " +
            response.businesses[randomInt].location.city + ", " +
            response.businesses[randomInt].location.state_code + " " +
            response.businesses[randomInt].location.postal_code;
        var isOpen = 'Open Now';
        var imageURL = response.businesses[randomInt].image_url;
        var yelpURL = response.businesses[randomInt].mobile_url;
        var latLng = {
            lat: response.businesses[randomInt].location.coordinate.latitude,
            lng: response.businesses[randomInt].location.coordinate.longitude,
        }
        var companyInfo = $("<div>")
        companyInfo.append('<h6 class="red-text darken-3">'+ name + '</h6><br>');
        companyInfo.append('<h7 class="red-text darken-3">'+ phone + '</h7><br>');
        companyInfo.append('<h7 class="red-text darken-3">'+ address + '</h7><br>');
        companyInfo.append('<img src="' + response.businesses[randomInt].image_url + '" width=150px height=150px>' + '<br>');
        companyInfo.append('<a class="btn waves-effect waves-light red darken-3" href=' + yelpURL + '>' + 'Link to Yelp' + '</a>' + '<br>');

        $("#results").html(companyInfo);

        initMap(latLng);
    }); //end done
});