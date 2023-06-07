///Sistema de monitoreo  

// Mapa base
var map = L.map("mapid");

// Centro del mapa y nivel de acercamiento
var mapacoopevi = L.latLng([10.0803, -84.1574]);   
var zoomLevel = 9;

// Definición de la vista del mapa
map.setView(mapacoopevi, zoomLevel);

//Control de escala 
L.control.scale({position:'topleft',imperial:false}).addTo(map);

// Adición de las capas base
esri = L.tileLayer.provider("Esri.WorldImagery").addTo(map);
osm = L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);
topo = L.tileLayer.provider("OpenTopoMap.Mapnik").addTo(map);

//function updateOpacity() {
//	document.getElementById("span-opacity").innerHTML = document.getElementById("sld-opacity").value;
//	ndvi.setOpacity(document.getElementById("sld-opacity").value);
//}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Conjunto de control de Capas Base
var baseMaps = {
	"OpenStreetMap": osm,
	"ESRI World Imagery": esri,
        "Topografía": topo
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Conjunto de capas overlay
var overlayMaps = {
	
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Selección de los cantones segun interes 

var cantones_select = L.layerGroup().addTo(map);

function colorFincas(d) { 
	return d == "TODOS" ? '#FF0000' :
		d == "ABANGARES" ? '#FF0000' : 
		d == "ACOSTA" ? '#FF0000' : 
		d == "AGUIRRE" ? '#FF0000' : 
		d == "ALAJUELA" ? '#FF0000' :
		d == "ALAJUELITA" ? '#FF0000' :
		d == "ALFARO RUIZ" ? '#FF0000' :
		d == "ALVARADO" ? '#FF0000' :
		d == "ASERRI" ? '#FF0000' :
		d == "ATENAS" ? '#FF0000' :
		d == "BAGACES" ? '#FF0000' :
		d == "BARVA" ? '#FF0000' :
		d == "BELEN" ? '#FF0000' :
		d == "BUENOS AIRES" ? '#FF0000' :
		d == "CANAS" ? '#FF0000' :
		d == "CARRILLO" ? '#FF0000' :
		d == "CARTAGO" ? '#FF0000' :
		d == "CORREDORES" ? '#FF0000' :
		d == "COTO BRUS" ? '#FF0000' :
		d == "CURRIDABAT" ? '#FF0000' :
		d == "DESAMPARADOS" ? '#FF0000' :
		d == "DOTA" ? '#FF0000' :
		d == "EL GUARCO" ? '#FF0000' :
		d == "ESCAZU" ? '#FF0000' :
		d == "ESPARZA" ? '#FF0000' :
		d == "FLORES" ? '#FF0000' : 
		d == "GARABITO" ? '#FF0000' : 
		d == "GOICOECHEA" ? '#FF0000' : 
		d == "GOLFITO" ? '#FF0000' :
		d == "GRECIA" ? '#FF0000' :
		d == "GUACIMO" ? '#FF0000' :
		d == "GUATUSO" ? '#FF0000' :
		d == "HEREDIA" ? '#FF0000' :
		d == "HOJANCHA" ? '#FF0000' :
		d == "JIMENEZ" ? '#FF0000' :
		d == "LA CRUZ" ? '#FF0000' :
		d == "LA UNION" ? '#FF0000' :
		d == "LEON CORTES" ? '#FF0000' :
		d == "LIBERIA" ? '#FF0000' :
		d == "LIMON" ? '#FF0000' :
		d == "LOS CHILES" ? '#FF0000' :
		d == "MATINA" ? '#FF0000' :
		d == "MONTES DE OCA" ? '#FF0000' :
		d == "MONTES DE ORO" ? '#FF0000' :
		d == "MORA" ? '#FF0000' :
		d == "MORAVIA" ? '#FF0000' :
		d == "NANDAYURE" ? '#FF0000' :
		d == "NARANJO" ? '#FF0000' :
		d == "NICOYA" ? '#FF0000' :
		d == "OREAMUNO" ? '#FF0000' : 
		d == "OROTINA" ? '#FF0000' : 
		d == "OSA" ? '#FF0000' : 
		d == "PALMARES" ? '#FF0000' :
		d == "PARAISO" ? '#FF0000' :
		d == "PARRITA" ? '#FF0000' :
		d == "PEREZ ZELEDON" ? '#FF0000' :
		d == "POAS" ? '#FF0000' :
		d == "POCOCI" ? '#FF0000' :
		d == "PUNTARENAS" ? '#FF0000' :
		d == "PURISCAL" ? '#FF0000' :
		d == "SAN CARLOS" ? '#FF0000' :
		d == "SAN ISIDRO" ? '#FF0000' :
		d == "SAN JOSE" ? '#FF0000' :
		d == "SAN MATEO" ? '#FF0000' :
		d == "SAN PABLO" ? '#FF0000' :
		d == "SAN RAFAEL" ? '#FF0000' :
		d == "SAN RAMON" ? '#FF0000' :
		d == "SANTA ANA" ? '#FF0000' :
		d == "SANTA BARBARA" ? '#FF0000' :
		d == "SANTA CRUZ" ? '#FF0000' :
		d == "SANTO DOMINGO" ? '#FF0000' :
		d == "SARAPIQUI" ? '#FF0000' :
		d == "SIQUIRRES" ? '#FF0000' :
		d == "TALAMANCA" ? '#FF0000' : 
		d == "TARRAZU" ? '##FF0000' : 
		d == "TIBAS" ? '#FF0000' : 
		d == "TILARAN" ? '#FF0000' :
		d == "TURRIALBA" ? '#FF0000' :
		d == "TURRUBARES" ? '#FF0000' :
		d == "UPALA" ? '#FF0000' :
		d == "VALVERDE VEGA" ? '#FF0000' :
		d == "VASQUEZ DE CORONADO" ? '#FF0000' :
		'#000000'; 
	};
	
	
function estilo_fincas (feature) {
	return{
		fillColor: colorFincas(feature.properties.NCANTON),
	};
};

function myFunction() {
	$.getJSON("https://raw.githubusercontent.com/CIAUCR/LRN/main/cantones_textura.geojson", function(geodata){
		var layer_geojson_cantones_select = L.geoJson(geodata, {
			style: estilo_fincas,
			onEachFeature: function(feature, layer) {
				var popupText = "Clase Textural Modal" +  " (n= " + feature.properties.N_CLASE_TXT + "): " + feature.properties.CLASE_TEXT_MODAL + "<br>" + "Rango Arenas: " + "Max: " + feature.properties.ARENA_MAX + " - " + "Min:" + feature.properties.ARENA_MIN + "<br>" + "Rango Limos: " + "Max: " + feature.properties.LIMO_MAX + " - " + "Min:" + feature.properties.LIMO_MIN + "<br>" + "Rango Arcillas: " + "Max: " + feature.properties.ARCILLA_MAX + " - " + "Min:" + feature.properties.ARCILLA_MIN + "<br>"
                            + "Valor promedio de Arenas: " +  Math.round(feature.properties.ARENA_PROM) + "<br>" + "Valor promedio de Limos: " +  Math.round(feature.properties.LIMO_PROM) + "<br>" + "Valor promedio de Arcillas: " +  Math.round(feature.properties.ARCILLA_PROM) + "<br>" + "Total de calicatas del cantón: " +  feature.properties.N_MUESTRAS + "<br>";
layer.bindPopup(popupText);
			}
		});
	cantones_select.addLayer(layer_geojson_cantones_select);
	control_layers.addOverlay(layer_geojson_cantones_select, 'Cantones');
	layer_geojson_cantones_select.remove();
	});
};


// Calicatas
$.getJSON("https://raw.githubusercontent.com/CIAUCR/LRN/main/cantones_textura.geojson", function(geodata) {
	var layer_geojson_cantones_textura = L.geoJson(geodata, {
		style: function(feature) {
			return {'color': "red", 'weight': 1, 'fillOpacity': 0.0}
		},
		onEachFeature: function(feature, layer) {
			var popupText = "Horizonte superficial (A) (Entre 0 y 60 cm)" + "<br>" + "Clase Textural Modal" +  " (n= " + feature.properties.N_CLASE_TXT + "): " + feature.properties.CLASE_TEXT_MODAL + "<br>" + "Rango Arenas: " + "Max: " + feature.properties.ARENA_MAX + " - " + "Min:" + feature.properties.ARENA_MIN + "<br>" + "Rango Limos: " + "Max: " + feature.properties.LIMO_MAX + " - " + "Min:" + feature.properties.LIMO_MIN + "<br>" + "Rango Arcillas: " + "Max: " + feature.properties.ARCILLA_MAX + " - " + "Min:" + feature.properties.ARCILLA_MIN + "<br>"
                            + "Valor promedio de Arenas: " +  Math.round(feature.properties.ARENA_PROM) + "<br>" + "Valor promedio de Limos: " +  Math.round(feature.properties.LIMO_PROM) + "<br>" + "Valor promedio de Arcillas: " +  Math.round(feature.properties.ARCILLA_PROM) + "<br>" + "Total de calicatas del cantón: " +  feature.properties.N_MUESTRAS + "<br>";
layer.bindPopup(popupText);
		}			
	}).addTo(map);
	control_layers.addOverlay(layer_geojson_cantones_textura, 'Clase textural Modal por Cantón');
});

// Calicatas
$.getJSON("https://raw.githubusercontent.com/CIAUCR/LRN/main/calicatas.geojson", function(geodata) {
	var layer_geojson_calicatas = L.geoJson(geodata, {
		style: function(feature) {
			return {'color': "red", 'weight': 1, 'fillOpacity': 0.0}
		},
		onEachFeature: function(feature, layer) {
			var popupText = "Id: " + feature.properties.ID_Calicat + "<br>" + "Cantón: " + feature.properties.Canton + "<br>" + "Id Horizonte: " + feature.properties.id_hz + "<br>"+ "Clase textural: " + feature.properties.Clase_Text + "<br>" + "Régimen Climático: " + feature.properties.Clima  + "<br>" + "Geomorfología: " + feature.properties.Geomorfo + "<br>" + "Orden: " + feature.properties.Orden + "<br>" + "SubOrden: " + feature.properties.Suborden + "<br>" + "Gran Grupo: " + feature.properties.Gran_Grupo + "<br>" + "Sub Grupo: " + feature.properties.Sub_Grupo + "<br>";
layer.bindPopup(popupText);
		}			
	}).addTo(map);
	control_layers.addOverlay(layer_geojson_calicatas, 'Calicatas');
});


function estiloSelect() {
	var miSelect = document.getElementById("estilo").value;
	
	$.getJSON("https://raw.githubusercontent.com/CIAUCR/LRN/main/cantones_textura.geojson", function(geodata){
		var layer_geojson_cantones_select = L.geoJson(geodata, {
			filter: function(feature, layer) {								
				if(miSelect != "TODOS")		
				return (feature.properties.NCANTON == miSelect );
				else
				return true;
			},	
			style: estilo_fincas,
			onEachFeature: function(feature, layer) {
				var popupText = "<Strong>" + "Datos de textura" + "Horizonte superficial (A) (Entre 0 y 60 cm)" + "<br>" + "Clase Textural Modal" + " (n= " + feature.properties.N_CLASE_TXT + "): " + feature.properties.CLASE_TEXT_MODAL + "<br>" + "Rango Arenas: " + "Max: " + feature.properties.ARENA_MAX + " - " + "Min:" + feature.properties.ARENA_MIN + "<br>" + "Rango Limos: " + "Max: " + feature.properties.LIMO_MAX + " - " + "Min:" + feature.properties.LIMO_MIN + "<br>" + "Rango Arcillas: " + "Max: " + feature.properties.ARCILLA_MAX + " - " + "Min:" + feature.properties.ARCILLA_MIN + "<br>"
                            + "Valor promedio de Arenas: " +  Math.round(feature.properties.ARENA_PROM) + "<br>" + "Valor promedio de Limos: " +  Math.round(feature.properties.LIMO_PROM) + "<br>" + "Valor promedio de Arcillas: " +  Math.round(feature.properties.ARCILLA_PROM) + "<br>" + "Total de calicatas del cantón: " +  feature.properties.N_MUESTRAS + "<br>";
layer.bindPopup(popupText);
				map.fitBounds(layer.getBounds());
			}
		});
 		cantones_select.clearLayers();
		cantones_select.addLayer(layer_geojson_cantones_select);
	});		
};
	
	
	






// Ubicacion del control de capas
control_layers = L.control.layers(baseMaps, overlayMaps, {position:'topright', "autoZIndex": true, collapsed:true}).addTo(map);	

 
















