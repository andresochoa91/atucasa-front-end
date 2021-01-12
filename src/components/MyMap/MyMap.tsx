import React, { FC, useContext, useEffect, useState } from 'react';
import { AtucasaContext } from '../../Context';
import { MapContainer, TileLayer, Popup, Circle, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Place from './Place';
import { Link } from 'react-router-dom';
import L from 'leaflet';

interface ILatLngProps {
  lat?: number
  lng?: number
}

const MyMap: FC<ILatLngProps> = ({ lat, lng }): JSX.Element => {

  const { location, currentUser, merchants } = useContext<TContextProps>(AtucasaContext);
  const [ latitude, setLatitude ] = useState<number>(lat ? lat : 0);
  const [ longitude, setLongitude ] = useState<number>(lng ? lng : 0);
  const [ currentAddress, setCurrentAddress ] = useState<string>(location?.address ? location?.address : "");
  const [ currentCity, setCurrentCity ] = useState<string>(location?.city ? location?.city : "");
  const [ currentState, setCurrentState ] = useState<string>(location?.state ? location?.state : "");

  useEffect(() => {
    if (!currentUser) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(`${process.env.REACT_APP_MAPQUEST_API_THREE}${position.coords.latitude},${position.coords.longitude}`)
        .then(response => response.json())
        .then(data => {
          const { displayLatLng, street, adminArea3, adminArea4 } = data.results[0].locations[0];
          setLatitude(displayLatLng.lat);
          setLongitude(displayLatLng.lng);
          setCurrentAddress(street);
          setCurrentCity(adminArea4);
          setCurrentState(adminArea3);
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
            {
              !currentUser && <Link to="/">Go back to home page</Link>
            }
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
                radius={ 7000 }
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
                currentUser && (
                  <Marker
                    position={ [latitude, longitude] }
                    icon={ L.divIcon({html: `<img height="25" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fgoogle%2Fnoto-emoji-travel-places%2F1024%2F42486-house-icon.png&f=1&nofb=1"/><strong style="font-size:12px">Your Location</strong>`, className:""}) }
                    
                  >
                    <Popup>
                      <p>{ currentUser ? `Your location: ${location?.address}` : "Your area"}</p>
                    </Popup>
                  </Marker>
                )
              }

              {
                (currentUser?.role === "customer" || !currentUser) && (
                  merchants.map((merchant) => (
                    <Place 
                      merchant={ merchant }
                      key={ merchant.email }
                      lat={ latitude }
                      lng={ longitude }
                      currentAddress={ currentAddress }
                      currentCity={ currentCity }
                      currentState={ currentState }
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
