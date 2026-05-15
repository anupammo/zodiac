document.getElementById('shareLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocation, showError);
    } else {
        document.getElementById("status").innerHTML = "Geolocation is not supported by this browser.";
    }
});

function sendLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=Here%20is%20my%20location:%20${locationUrl}`;
    window.open(whatsappUrl, '_blank');
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("status").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("status").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("status").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("status").innerHTML = "An unknown error occurred.";
            break;
    }
}
