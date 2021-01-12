import React, { FC, useContext, useEffect, useState } from 'react';
import { AtucasaContext } from '../../Context';
import { MapContainer, TileLayer, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Place from './Place';
import { Link } from 'react-router-dom';

interface ILatLngProps {
  lat?: number
  lng?: number
}

const MyMap: FC<ILatLngProps> = ({ lat, lng }): JSX.Element => {

  const { location, currentUser, merchants } = useContext<TContextProps>(AtucasaContext);
  const [ latitude, setLatitude ] = useState<number>(lat ? lat : 0);
  const [ longitude, setLongitude ] = useState<number>(lng ? lng : 0);

  useEffect(() => {
    if (!currentUser) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(`${process.env.REACT_APP_MAPQUEST_API_THREE}${position.coords.latitude},${position.coords.longitude}`)
        .then(response => response.json())
        .then(data => {
          const { displayLatLng } = data.results[0].locations[0];
          setLatitude(displayLatLng.lat);
          setLongitude(displayLatLng.lng);
        })
        .catch(console.error);
      })
    }
  }, [currentUser]);

  return (
    <>
      {
        (latitude && longitude) ? (
          <div>
            <Link to="/">Go back to home page</Link>      
            <MapContainer
              center={[ latitude, longitude]} 
              zoom={13} 
              // minZoom={ 10 }
              style={{ height: "400px", width: "700px" }}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Circle
                center={ [latitude, longitude] }
                radius={ 8000 }
                pathOptions={{ 
                  fillColor: "#00a",
                  stroke: false 
                }}
              >
              </Circle>
              <Circle
                center={ [latitude, longitude] }
                radius={ currentUser ? 14 : 2000 }
                pathOptions={{ 
                  fillColor: "#00a",
                  weight: currentUser ? 6 : 2 
                }}
              >
                {
                  currentUser && (
                    <Popup>
                      <p>{ currentUser ? `Your location: ${location?.address}` : "Your area"}</p>
                    </Popup>
                  )
                }
              </Circle>

            {
              (currentUser?.role === "customer" || !currentUser) && (
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
        ) : (
          <p>Loading map...</p>
        )
      }
    </>
  );
};

export default MyMap;
