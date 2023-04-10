function getLatLong() {
    if ("geolocation" in navigator) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=63090f1ffaba40fd9f75b76c3b7b0aa3`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
            }, function(error) {
                reject(error);
            });
        });
    } else {
      return Promise.reject("Geolocation is not supported by this browser.");
    }
}

module.exports = getLatLong()