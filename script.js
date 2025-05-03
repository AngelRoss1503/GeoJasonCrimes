const map = L.map('map').setView([38.89511, -77.03637], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors',
}).addTo(map);

fetch('data/crimenes.geojson')
    .then(response => response.json())
    .then(data => {
        console.log("GeoJSON cargado:", data);

        const geojsonLayer = L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 3,
                    fillColor: "#ff0000",
                    color: "#800000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.7
                });
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties) {
                    const props = Object.entries(feature.properties)
                        .map(([k, v]) => `<strong>${k}:</strong> ${v}`)
                        .join("<br>");
                    layer.bindPopup(props);
                }
            }
        }).addTo(map);

        map.fitBounds(geojsonLayer.getBounds());
    })
    .catch(error => console.error("Error al cargar GeoJSON:", error));