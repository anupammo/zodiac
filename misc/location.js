function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocation, showError);
    } else {
        document.getElementById("status").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function sendLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://yourserver.com/location?lat=${latitude}&lon=${longitude}`;
    
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById("status").innerHTML = "Location shared successfully!";
        })
        .catch(error => {
            document.getElementById("status").innerHTML = "Error sharing location.";
        });
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
