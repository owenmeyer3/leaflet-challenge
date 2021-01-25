// Make light base layer
var lightLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

// Make dark base layer
var darkLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
});
// Make objects to hold base and overlay layers
var baseLayers = {'Light Map' : lightLayer, 'Dark Map' : darkLayer}
var overlayLayers = {}

// Get local plate data
var earthquakesLayer2
d3.json(queryUrl, function(data) {
    var features = data.features

    // Create a GeoJSON layer, Make feature circle radius, color and size, give each feature a popup
    earthquakesLayer2 = L.geoJSON(features, {
        pointToLayer: function(feature, latlng){return L.circle(latlng, {radius: feature.properties.mag * 10000})},
        style: function(feature){return {fillColor: depthColor(feature.geometry.coordinates[2]), color:'black', weight: 0.5}},
        onEachFeature: function(feature, layer){
            layer.bindPopup(
                "<h3>" + feature.properties.place + 
                "</h3><hr><p>" + new Date(feature.properties.time) + 
                "</p><p>Depth: " + feature.geometry.coordinates[2] +
                " km </p><p>Magnitude: " + feature.properties.mag +
                "</p>"
                )}
    })
    // User defined function to add layer to overlays and attach to maps if both overlays are in the object
    addOverlayLayers('Earthquakes', earthquakesLayer2);
});

// Perform a GET request to the query URL
var platesLayer
d3.json('/static/data/plates.json', function(data) {
    console.log(data)
    var features = data.features

    // Create a GeoJSON layer, Make feature circle radius, color and size, give each feature a popup
    platesLayer = L.geoJSON(features, {
        pointToLayer: function(feature, latlng){return L.polyline(latlng)},
        style: function(feature){return {fillOpacity: 0, color:'orange', weight: 0.5}}
    })
    // User defined function to add layer to overlays and attach to maps if both overlays are in the object
    addOverlayLayers('Tectionic Plates', platesLayer);
});

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap2 = L.map("mapid2", {
    center: [38.6, -98],
    zoom: 4.45,
    layers: [lightLayer, darkLayer]
});

// Make legend
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    // Add legend title
    div.innerHTML = '<h4>Earthquake Depth</h4>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < depthThreshs.length; i++) {
        div.innerHTML +=
            '<div><i style="background:' + depthColor(depthThreshs[i] + 1) + '"></i> ' +
            depthThreshs[i] + (depthThreshs[i + 1] ? '&ndash;' + depthThreshs[i + 1] + '</div><br>': '+</div>')
    }
    return div;
};
// Add layers to map
legend.addTo(myMap2);

// User defined function to add layer to overlays and attach to maps if both overlays are in the object
function addOverlayLayers(key, val){
    if (Object.keys(overlayLayers).length === 0){
        overlayLayers[key] = val;
    }else{
        overlayLayers[key] = val;
        L.control.layers(baseLayers, overlayLayers).addTo(myMap2);
    }
};

