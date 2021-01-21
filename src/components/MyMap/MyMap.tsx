import React, { FC, useContext, useEffect, useState } from 'react';
import { AtucasaContext } from '../../Context';
import { MapContainer, TileLayer, Popup, Circle, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Place from './Place';
import L from 'leaflet';
import house from '../../pictures/house.png';
import { getCachedData } from '../GetCachedData';
import { Link, useHistory } from 'react-router-dom';

interface ILatLngProps {
  lat?: number,
  lng?: number
}

const MyMap: FC<ILatLngProps> = ({ lat, lng }): JSX.Element => {

  const { location, currentUser, currentCustomer, currentMerchant, merchants, searchMerchants } = useContext<TContextProps>(AtucasaContext);
  const [ latitude, setLatitude ] = useState<number>(lat ? lat : 0);
  const [ longitude, setLongitude ] = useState<number>(lng ? lng : 0);
  const [ currentAddress, setCurrentAddress ] = useState<string>(location?.address ? location?.address : "");
  const [ currentCity, setCurrentCity ] = useState<string>(location?.city ? location?.city : "");
  const [ currentState, setCurrentState ] = useState<string>(location?.state ? location?.state : "");

  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      navigator.geolocation.getCurrentPosition((position) => {
        getCachedData(`${position.coords.latitude},${position.coords.longitude}`, "coords")
        .then(response => {
          return JSON.parse(response.data.stringified_data);
        })
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

  console.log(history.location.pathname)

  return (
    <>
      {
        (latitude && longitude && currentCustomer && history.location.pathname === "/home/map") ? (
          <h3>These are the merchants close to you!</h3>
        ) : latitude && longitude && currentMerchant && history.location.pathname === "/home/map" ? (
          <>
            <h3 className="mb-3">This is your current location</h3>
            <h6 className="mb-5">Do you have to update your location? <Link to="/home/edit_location" >Click here</Link></h6>
          </>
        ) : (
          <></>
        )
      }
      {
        (latitude && longitude) ? (
          <div 
            style={{
              width: "900px"
            }}
            className="mx-auto"
          >
            {
              currentCustomer && (
                <h5 className="mb-4">Click on merchant on map and visit their website to start buying</h5>
              )
            }
            <MapContainer
              center={[ latitude, longitude]} 
              zoom={ 12 } 
              // minZoom={ 10 }
              style={{ height: "500px", width: "900px" }}
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
                    icon={ L.divIcon({html: `<img height="25" src="${house}"/><strong style="font-size:12px; color:#000">Your Location</strong>`, className:""}) }  
                  >
                    <Popup>
                      <p>{ currentUser ? `Your location: ${location?.address}` : "Your area"}</p>
                    </Popup>
                  </Marker>
                )
              }

              {
                (currentUser?.role === "customer" || !currentUser) && (
                  (searchMerchants ? searchMerchants : merchants).map((merchant, id) => (
                    <Place 
                      merchant={ merchant }
                      key={ `${merchant.email}${id}` }
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
        ) : !currentUser ? (
          <p>Loading map...</p>
        ) : (
          <p className="text-warning">Please set up your location to display map</p>
        )
      }
    </>
  );
};

export default MyMap;
