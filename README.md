# Overview
This project visualizes earthquake and tectonic geoJson data on a global scale. There are two parts to this project, which each post a map to the webpage. Earthquake data is taken from the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). Tectonic plate data is taken from [Fraxen's tectonicplayes repository](https://github.com/fraxen/tectonicplates)

### Part 1: Basic Earthquake Visualization

![part-1](Images/map1.png)


* Creates a map using Leaflet that plots all of the earthquakes from USGS based on longitude and latitude

* Data markers reflect the magnitude of the earthquake by radius and depth of the earthquake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color

* Popups provide additional information about the earthquake when a marker is clicked

* The legend that provides context for map data.

### Level 2: Earthquake and Tectonic Plate Visualization

![part-2](Images/map2.png)

* Plots a tectonic plate data set on the map to illustrate the relationship between tectonic plates and seismic activity

* Adds a number of base maps to choose from as well as separating tectonic plate and earthquake data into overlays that can be turned on and off independently