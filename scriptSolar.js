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

var image = L.imageOverlay('assets/solar/solarmap.png', bounds).addTo(map);

var stations = L.imageOverlay('assets/solar/stations.png', bounds);
var colonies = L.imageOverlay('assets/solar/countries_colonies.png', bounds);
var planets = L.imageOverlay('assets/solar/planets.png', bounds);

var plateiaButton = L.circle([597, 307], {radius: 17, stroke: false, fillOpacity:0}).addTo(map);

var plateiaClick = function(event){
	window.location.href = "plateia.html";
};
plateiaButton.on('click', plateiaClick);

var vasatiButton = L.circle([596, 437], {radius: 11, stroke: false, fillOpacity:0}).addTo(map);

var vasatiClick = function(event){
	window.location.href = "vasati.html";
};
vasatiButton.on('click', vasatiClick);


var apasonButton = L.circle([204.17, 335], {radius: 5, stroke: false, fillOpacity:0}).addTo(map);

var apasonClick = function(event){
	window.location.href = "apason.html";
};
apasonButton.on('click', apasonClick);

var danavusButton = L.circle([596, 872], {radius: 4, stroke: false, fillOpacity:0}).addTo(map);

var danavusClick = function(event){
	window.location.href = "danavus.html";
};
danavusButton.on('click', danavusClick);

var sophiaButton = L.circle([596, 214], {radius: 15, stroke: false, fillOpacity:0}).addTo(map);

var sophiaClick = function(event){
	window.location.href = "sophia.html";
};
sophiaButton.on('click', sophiaClick);

var lunaButton = L.circle([596, 344], {radius: 5, stroke: false, fillOpacity:0}).addTo(map);

var lunaClick = function(event){
	window.location.href = "luna.html";
};
lunaButton.on('click', lunaClick);


map.fitBounds(bounds);

//disables panning outside map
map.on('drag', function () {
    map.panInsideBounds(bounds, {animate: false});
});


//function that interacts with html elements to change
var baseMaps = {
};


var layerControl = L.control.layers(baseMaps, null).addTo(map);

var placeholder = L.layerGroup();
var placeholder1 = L.layerGroup();
var placeholder2 = L.layerGroup();
layerControl.addOverlay(placeholder, "Colonies");
layerControl.addOverlay(placeholder1, "Planets");
layerControl.addOverlay(placeholder2, "Stations");

map.on('overlayadd', function (e) {
    if (e.name == "Colonies") {
        colonies.addTo(map);
    }
    if (e.name == "Planets") {
        planets.addTo(map);
    }
    if (e.name == "Stations") {
        stations.addTo(map);
    }
});

map.on('overlayremove', function (e) {
    if (e.name == "Colonies") {
        map.removeLayer(colonies);
    }
    if (e.name == "Planets") {
        map.removeLayer(planets);
    }
    if (e.name == "Stations") {
        map.removeLayer(stations);
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

 map.on('click', onMapClick);
