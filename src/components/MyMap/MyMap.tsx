import React, { FC/* , useEffect */ } from 'react';
import { MapContainer, TileLayer/* , Marker */, Popup, Circle } from "react-leaflet";
// import CurrentLocation from './CurrentLocation';
// import Store from './Store';
import "leaflet/dist/leaflet.css";
// import L from 'leaflet';
// import marker_icon_2x from "leaflet/dist/images/marker-icon-2x.png";
// import marker_icon from "leaflet/dist/images/marker-icon.png"
// import marker_shadow from "leaflet/dist/images/marker-shadow.png";

const MyMap: FC = (): JSX.Element => {

  // const DefaultIcon = L.icon({
  //   iconRetinaUrl: marker_icon_2x,
  //   iconUrl: marker_icon,
  //   shadowUrl: marker_shadow
  // })

  // useEffect(() => {

  //   // delete L.Icon.Default.prototype._getIconUrl;

  //   // L.Icon.Default.mergeOptions({
  //   //   iconRetinaUrl: marker_icon_2x,
  //   //   iconUrl: marker_icon,
  //   //   shadowUrl: marker_shadow
  //   // });  

  //   // L.Icon.Default.imagePath = "../leaflet/dist/images/"
  //   // console.log(L.Icon.Default.imagePath)

  //   let DefaultIcon = L.icon({
  //     iconRetinaUrl: marker_icon_2x,
  //     iconUrl: marker_icon,
  //     shadowUrl: marker_shadow
  //   })

  //   L.Marker.prototype.options.icon = DefaultIcon;

  // })


  return (
    <div>
      <MapContainer
        center={[	37.747131, -122.472583]} 
        zoom={20} 
        // maxZoom={ 20 }
        minZoom={ 5 }
        style={{ height: "400px", width: "700px" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* <Marker 
          icon={ DefaultIcon }
          position={[37.747131, -122.472583]}
        >  
          <Popup>
            {37.747131}{-122.472583}
          </Popup>
        </Marker> */}

        <Circle
          center={[37.747131, -122.472583]}
          radius={ 8000 }
          pathOptions={{ 
            fillColor: "#00a",
            stroke: false 
          }}
        >
        </Circle>

        <Circle
          center={[37.747131, -122.472583]}
          radius={14}
          pathOptions={{ 
            fillColor: "#00a",
            weight: 6 
          }}
        >
          <Popup>
            <p>{`Your location: ${37.747131}, ${-122.472583}`}</p>
          </Popup>
        </Circle>


      </MapContainer>
    </div>
  );
};

export default MyMap;
