var divMapa = document.getElementById('map');
      navigator.geolocation.getCurrentPosition( initMap, fn_mal);
      function fn_mal(){
        alert("No se pudo capturar la ubicación del usuario");
      }
      function initMap( position ){
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;

          var glatLon= new google.maps.LatLng( 10.007491, -84.216983 ); // ubicacion del usuario
          var glatLon2= new google.maps.LatLng( '10.034705099908384', ' -84.27387472702976' );//ubicacion del local
          var objConfig = {
            zoom: 13,
            center: glatLon
          }
          var gMapa = new google.maps.Map( divMapa, objConfig );
          var objConfigMarker = {
            position: glatLon,
            map: gMapa ,
            title: "Usted está acá"
          }
          var config = {                  
                  position: glatLon2,
                  map: gMapa ,
                  title: "Rebeca Fotografia"
                }
          var gMarker = new google.maps.Marker( objConfigMarker );
          gMarker.setIcon('assets/img/marcaCliente.png');
          var gMarkerDV = new google.maps.Marker( config );
          gMarkerDV.setIcon('assets/img/logo.png');
          
          var objHTML = {
                   content: '<div style="height: 100px; width:300px"><h2>Rebeca Fotografia</h2><h3>Fotografia profesional </h3></div>'
                 }
                 var gIW = new google.maps.InfoWindow( objHTML );

                 google.maps.event.addListener( gMarkerDV, 'click', function(){
                   gIW.open( gMapa, gMarkerDV );
                 });  
                 var objConfigDR = {
                   map: gMapa,
                   suppressMarkers: true
                 }
                 var objConfigDS = {
                   origin: glatLon,
                   destination: glatLon2,
                   travelMode: google.maps.TravelMode.DRIVING
                 }
            var ds = new google.maps.DirectionsService();
            //coordenadas
            var dr = new google.maps.DirectionsRenderer( objConfigDR );
            //Traduce coords a la ruta

                ds.route( objConfigDS, fnRutear );
                function fnRutear( resultados, status ){
                  //mostrar linea A y B
                  if( status == 'OK'){
                    dr.setDirections(resultados);
                  }else{
                    alert('Error '+ status);
                  }
                }
      }