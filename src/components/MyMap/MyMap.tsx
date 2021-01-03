import React, { FC, useContext } from 'react';
import { AtucasaContext } from '../../Context';
import { MapContainer, TileLayer, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface ILatLngProps {
  lat: number
  lng: number
}

const MyMap: FC<ILatLngProps> = ({ lat, lng }): JSX.Element => {

  const { location } = useContext<TContextProps>(AtucasaContext);

  return (
    <div>
      <MapContainer
        center={[	lat, lng]} 
        zoom={20} 
        minZoom={ 10 }
        style={{ height: "400px", width: "700px" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle
          center={[lat, lng]}
          radius={ 8000 }
          pathOptions={{ 
            fillColor: "#00a",
            stroke: false 
          }}
        >
        </Circle>

        <Circle
          center={[lat, lng]}
          radius={14}
          pathOptions={{ 
            fillColor: "#00a",
            weight: 6 
          }}
        >
          <Popup>
            <p>{`Your location: ${location?.address}`}</p>
          </Popup>
        </Circle>


      </MapContainer>
    </div>
  );
};

export default MyMap;
