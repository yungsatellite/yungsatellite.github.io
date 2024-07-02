let config = {
    minZoom: -1,
    maxZoom: 18,
};

// Define tile layers
var combined = L.tileLayer('combined', { maxZoom: 19 });
var political = L.tileLayer('political', { maxZoom: 19 });
var terrain = L.tileLayer('terrain', { maxZoom: 19 });

var bounds = [
    [0, 0],
    [792, 1000]
];

// Create map
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: config.minZoom,
    maxZoom: config.maxZoom,
    zoom: 1,
    zoomDelta: 0.25,
    zoomSnap: 0,
    layers: [combined] // Initial layer set to combined
});

// Add base image overlay
var image = L.imageOverlay('assets/solar/solarmap.png', bounds).addTo(map);

map.fitBounds(bounds);
map.setMaxBounds(bounds);

var center = [bounds[1][0], bounds[0][1]];

map.setView(center, 1);

// Define other overlays
var stations = L.imageOverlay('assets/solar/stations.png', bounds);
var colonies = L.imageOverlay('assets/solar/countries_colonies.png', bounds);
var planets = L.imageOverlay('assets/solar/planets.png', bounds);

// Define and add buttons
var buttons = [
    { coords: [597, 307], radius: 17, url: "plateia.html" },
    { coords: [596, 437], radius: 11, url: "vasati.html" },
    { coords: [204.17, 335], radius: 5, url: "apason.html" },
    { coords: [596, 872], radius: 4, url: "danavus.html" },
    { coords: [596, 214], radius: 15, url: "sophia.html" },
    { coords: [596, 344], radius: 5, url: "luna.html" }
];

buttons.forEach(button => {
    var circle = L.circle(button.coords, { radius: button.radius, stroke: false, fillOpacity: 0 }).addTo(map);
    circle.on('click', () => window.location.href = button.url);
});

// Disable panning outside map bounds
map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: false });
});

// Layer controls
var baseMaps = {
    "Combined": combined,
    "Political": political,
    "Terrain": terrain
};

var overlays = {
    "Colonies": colonies,
    "Planets": planets,
    "Stations": stations
};

L.control.layers(baseMaps, overlays).addTo(map);

map.on('overlayadd', function (e) {
    if (overlays[e.name]) {
        overlays[e.name].addTo(map);
    }
});

map.on('overlayremove', function (e) {
    if (overlays[e.name]) {
        map.removeLayer(overlays[e.name]);
    }
});

//function that interacts with html elements to change
function myFunction(name) {
    document.getElementById("info").innerHTML = name;
}

// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
// }
// map.on('click', onMapClick);
