// Inicializar el mapa centrado en Washington D.C.
const map = L.map('map').setView([38.89511, -77.03637], 12);

// Añadir capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors',
}).addTo(map);

// Cargar el archivo GeoJSON local
fetch('data/crimenes.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                if (feature.properties) {
                    let popup = "";
                    for (let key in feature.properties) {
                        popup += `<strong>${key}:</strong> ${feature.properties[key]}<br>`;
                    }
                    layer.bindPopup(popup);
                }
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error al cargar el archivo GeoJSON:', error));
