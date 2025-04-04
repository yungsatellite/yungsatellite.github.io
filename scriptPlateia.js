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

var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -5,
    zoomDelta: 0.25,
    zoomSnap: 0,
    layers: [combined, political, terrain]
});

var bounds = [
    [0, 0],
    [792, 1000]
];

var image = L.imageOverlay('assets/plateia/map.png', bounds).addTo(map);

var legend = L.imageOverlay('assets/plateia/legend.png', bounds).addTo(map);

var countries = L.imageOverlay('assets/plateia/countries.png', bounds);
var cities = L.imageOverlay('assets/plateia/cities.png', bounds);
var manmadestruct = L.imageOverlay('assets/plateia/manmadstruct.png', bounds);
var geography = L.imageOverlay('assets/plateia/geography.png', bounds);

var politicalOverlay = L.imageOverlay('assets/plateia/political.png', bounds);
var geoOverlay = L.imageOverlay('assets/plateia/geo.png', bounds);




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
};

var citiesOn = Boolean(false);
var countriesOn = Boolean(false);
var manmadeStructOn = Boolean(false);
var geographyEnvOn = Boolean(false);

map.on('baselayerchange', function (e) {
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
    if (geographyEnvOn == true) {
        map.removeLayer(geography);
        geography.addTo(map);
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
layerControl.addOverlay(placeholder3, "Geography & Environmental Hazards");

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
    if (e.name == "Geography & Environmental Hazards") {
        geography.addTo(map);
        geographyEnvOn = true;
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
    if (e.name == "Geography & Environmental Hazards") {
        map.removeLayer(geography);
        geographyEnvOn = false;
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