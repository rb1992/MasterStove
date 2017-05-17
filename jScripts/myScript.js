var myCenter = new google.maps.LatLng(32.0163, 34.773295);


function initialize() {
    var mapOptions = {
        center: myCenter,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        //mapTypeId: google.maps.MapTypeId.TERRAIN


    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
    var myIcon = '../Images/googleMarker.png';

    var marker = new google.maps.Marker({
        position: myCenter,
        icon: myIcon,
        animation: google.maps.Animation.DROP,
    });
    marker.setMap(map);

    //var infowindow = new google.maps.InfoWindow({
    //    //content: "<h2>Hello World!</h2>"
    //});


    //google.maps.event.addListener(marker, 'click', function () {
    //    infowindow.open(map, marker);
    //});




}

google.maps.event.addDomListener(window, 'load', initialize);