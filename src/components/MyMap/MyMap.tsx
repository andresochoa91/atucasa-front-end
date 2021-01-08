import React, { FC, useContext, useEffect, useState } from 'react';
import { AtucasaContext } from '../../Context';
import { MapContainer, TileLayer, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Place from './Place';
import { Link } from 'react-router-dom';

interface ILatLngProps {
  lat: number
  lng: number
}

const MyMap: FC<ILatLngProps> = ({ lat, lng }): JSX.Element => {

  const { location, currentUser } = useContext<TContextProps>(AtucasaContext);
  const [ merchants, setMerchants ] = useState<Array<TShowMerchant>>([]);
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/merchants`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      setMerchants(data.merchants);
    })
  }, []);

  return (
    <div>
      <Link to="/home">Go back to home page</Link>      
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

      {
        currentUser?.role === "customer" && (
          merchants.map((merchant) => (
            <Place 
              merchant={ merchant }
              key={ merchant.email }
            />
          ))
        )
      }

      </MapContainer>
    </div>
  );
};

export default MyMap;
