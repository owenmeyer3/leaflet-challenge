// Depth to color discrete function
var depthThreshs = [-10, 10, 30, 50, 70, 90];
var color5 = 'rgb(255,0,0)';
var color4 = 'rgb(255,85,0)';
var color3 = 'rgb(255,170,0)';
var color2 = 'rgb(255,255,0)';
var color1 = 'rgb(127,255,0)';
var color0 = 'rgb(0,255,0)';
function depthColor(depth) {
    return depth > depthThreshs[5] ? color5 :
            depth > depthThreshs[4] ? color4 :
            depth > depthThreshs[3] ? color3 :
            depth > depthThreshs[2] ? color2 :
            depth > depthThreshs[1] ? color1 :
            color0;
}

// Store our API endpoint inside queryUrl (for earthquake data)
var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';