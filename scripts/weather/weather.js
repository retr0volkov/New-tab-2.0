var WeatherData;

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        WeatherData = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
    }
};
xhr.open("GET", 'https://api.weather.yandex.ru/v2/forecast?lat=45.043267&lon=39.976630&lang=ru_RU&limit=1&extra=true', true);
xhr.setRequestHeader('X-Yandex-API-Key', '30e41990-0087-4ae7-ad52-256a0ade00d7');
// xhr.send();

// Geolocation.getCurrentPosition((loc) => console.log(loc))