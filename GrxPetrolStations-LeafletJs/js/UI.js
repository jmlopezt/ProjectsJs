class UI {
    constructor() {
        this.api = new API();
        this.markers = new L.LayerGroup();
        this.map = this.inicializarMapa();


    }

    inicializarMapa() {
        const map = L.map('map').setView([37.1881700, -3.6066700], 9);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;

    }


    showBusinessLocation(){
        this.api.getData()
            .then( data => {
                const eess = data.responseJSON.ListaEESSPrecio;
                this.showMarkers(eess);
            })
            .catch( error => {
                console.log(error);
            });
    }

    showMarkers(eess){
        this.markers.clearLayers();

        eess.forEach((element, index) => {
            const {Provincia} = element;
            if (Provincia === 'GRANADA') {
                let longitude = element["Longitud (WGS84)"];
                const {Latitud, Localidad, Horario, IDEESS} = element;
                const   postCode = element["C.P."],
                        gasoilAPrice = element["Precio Gasoleo A"],
                        address = element["Dirección"],
                        gasoilBPrice = element["Precio Gasoleo B"],
                        gasoline95Price = element["Precio Gasolina 95"],
                        gasoline98price = element["Precio Gasolina 98"];


                const popUpOptions = L.popup()
                    .setContent(`<p> Petrol Station ID: ${IDEESS}</p>
                                 <p> Adress: ${address}</p>
                                 <p> City: ${Localidad}</p>
                                 <p> Working Hours: ${Horario}</p>
                                 <p> Post Code: ${postCode}</p>
                                 <p><b>B Diesel:</b> ${gasoilBPrice} €</p>
                                 <p><b>A Diesel:</b> ${gasoilAPrice} €</p>
                                 <p><b>95 Gasoline:</b> ${gasoline95Price} €</p>
                                 <p><b>98 Gasoline:</b> ${gasoline98price} €</p>
                    `)

                let latitude = Latitud.replace(",",".");
                longitude = longitude.replace(",",".");
                const marker = new L.marker([
                    parseFloat(latitude),
                    parseFloat(longitude)
                ]).bindPopup(popUpOptions);
                this.markers.addLayer(marker);
            }
        });

        this.markers.addTo(this.map);
    }

    getSuggestions(suggestionText){
        this.api.getData()
            .then( data => {
                const eess = data.responseJSON.ListaEESSPrecio;
                this.sugestionsFiltering(eess, suggestionText);
            })
            .catch( error => {
                console.log(error);
            });
    }

    sugestionsFiltering(data, suggestionText){
        const filter = data.filter(filter => filter.Localidad.indexOf(suggestionText.toUpperCase()) !== -1)
        this.showMarkers(filter);
    }
}