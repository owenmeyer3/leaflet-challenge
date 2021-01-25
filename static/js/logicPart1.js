// Make background layer
var backLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("mapid", {
    center: [38.6, -98],
    zoom: 4.45
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
            depthThreshs[i] + (depthThreshs[i + 1] ? '&ndash;' + depthThreshs[i + 1] + ' km</div><br>': ' km +</div>')
    }
    return div;
};

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    console.log(data)
    var features = data.features

    // Create a GeoJSON layer, Make feature circle radius, color and size, give each feature a popup
    var earthquakesLayer = L.geoJSON(features, {
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
    // Add layer to map
    earthquakesLayer.addTo(myMap);
});
// Add layers to map
legend.addTo(myMap);
backLayer.addTo(myMap);