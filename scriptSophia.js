//basic map stuff
let config = {
    minZoom: 7,
    maxZoom: 18,
};

var combined = L.tileLayer('combined', {
    maxZoom: 19
});

var political = L.tileLayer('politicall', {
    maxZoom: 19
});

var terrain = L.tileLayer('terrainn', {
    maxZoom: 19
});
var atmosphere = L.tileLayer('atmospheree', {
    maxZoom: 19
});

var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -5,
    zoomDelta: 0.25,
    zoomSnap: 0,
    layers: [combined, political, terrain, atmosphere]
});

var bounds = [
    [0, 0],
    [738, 1000]
];

var image = L.imageOverlay('assets/sophia/combined.png', bounds).addTo(map);

var countries = L.imageOverlay('assets/sophia/countries.png', bounds);
var cities = L.imageOverlay('assets/sophia/cities.png', bounds);
var manmadestruct = L.imageOverlay('assets/sophia/manmadestruct.png', bounds);
var meteorology = L.imageOverlay('assets/sophia/meteorology.png', bounds);

var politicalOverlay = L.imageOverlay('assets/sophia/political.png', bounds);
var geoOverlay = L.imageOverlay('assets/sophia/terrain.png', bounds);
var atmosphereOverlay = L.imageOverlay('assets/sophia/atmosphere.png', bounds);




map.fitBounds(bounds);
map.setMaxBounds(bounds);

var center = [bounds[1][0], bounds[0][1]];

map.setView(center, 0.5);

//disables panning outside map
map.on('drag', function () {
    map.panInsideBounds(bounds, {animate: false});
});


//function that interacts with html elements to change
var baseMaps = {
    "Combined": combined,
    "Terrain": terrain,
    "Political": political,
    "Atmosphere" : atmosphere,
};

var citiesOn = Boolean(false);
var countriesOn = Boolean(false);
var manmadeStructOn = Boolean(false);
var meteorologyEnvOn = Boolean(false);

map.on('baselayerchange', function (e) {
    if (e.name == "Atmosphere") {
        atmosphereOverlay.addTo(map);
    }
    if (e.name != "Atmosphere") {
        map.removeLayer(atmosphereOverlay);
    }
    if (e.name == "Political") {
        politicalOverlay.addTo(map);
    }
    if (e.name != "Political") {
        map.removeLayer(politicalOverlay);
    }
    if (e.name == "Terrain") {
        geoOverlay.addTo(map);
    }
    if (e.name != "Terrain") {
        map.removeLayer(geoOverlay);
    }
    readdLayersOnTop();
});

function readdLayersOnTop(e) {
    map.removeLayer(legend);
    legend.addTo(map);
    if (countriesOn == true) {
        map.removeLayer(countries);
        countries.addTo(map);
    }
    if (citiesOn == true) {
        map.removeLayer(cities);
        cities.addTo(map);
    }
    if (manmadeStructOn == true) {
        map.removeLayer(manmadestruct);
        manmadestruct.addTo(map);
    }
    if (meteorologyEnvOn == true) {
        map.removeLayer(meteorology);
        meteorology.addTo(map);
    }
}

var layerControl = L.control.layers(baseMaps, null).addTo(map);

var placeholder = L.layerGroup();
var placeholder1 = L.layerGroup();
var placeholder2 = L.layerGroup();
var placeholder3 = L.layerGroup();
layerControl.addOverlay(placeholder, "Countries");
layerControl.addOverlay(placeholder1, "Cities");
layerControl.addOverlay(placeholder2, "Manmade Structures & Facilities");
layerControl.addOverlay(placeholder3, "Meteorology");

map.on('overlayadd', function (e) {
    if (e.name == "Countries") {
        countries.addTo(map);
        countriesOn = true;
    }
    if (e.name == "Cities") {
        cities.addTo(map);
        citiesOn = true;
    }
    if (e.name == "Manmade Structures & Facilities") {
        manmadestruct.addTo(map);
        manmadeStructOn = true;
    }
    if (e.name == "Meteorology") {
        meteorology.addTo(map);
        meteorologyEnvOn = true;
    }
});

map.on('overlayremove', function (e) {
    if (e.name == "Countries") {
        map.removeLayer(countries);
        countriesOn = false;
    }
    if (e.name == "Cities") {
        map.removeLayer(cities);
        citiesOn = false;
    }
    if (e.name == "Manmade Structures & Facilities") {
        map.removeLayer(manmadestruct);
        manmadeStructOn = false;
    }
    if (e.name == "Meteorology") {
        map.removeLayer(meteorology);
        meteorologyEnvOn = false;
    }
});


//function that interacts with html elements to change
function myFunction(name) {
    document.getElementById("info").innerHTML = name;
}

// function that reveals coordinate of where you clicked,

// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
// }
//
// map.on('click', onMapClick);