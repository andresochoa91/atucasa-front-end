import React, { FC } from 'react';
import { Container, Table, Card } from 'react-bootstrap';

const MultiPurposeCart: FC = () => {
  return (
    <>
      <Container 
        className="mx-auto text-center text-white py-3 mt-5 rounded" 
        style={{ 
          width: '30rem', 
          backgroundColor: "rgba(0,0,0,0.65)"
        }}>    
        <Table striped bordered className="mb-3 text-white">
          <thead>
            <tr>
              <th className="text-capitalize h3">
                <h2>
                  {/* <strong>
                    { currentWeather.name }
                  </strong> */}
                </h2>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <tr><td><img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`} alt=""/></td></tr>
            <tr><td className="h3">Description: { currentWeather.weather[0].description }</td></tr>
            <tr><td>Feels like: { currentWeather.main.feels_like } F°</td></tr>
            <tr><td>Humidity: { currentWeather.main.humidity } F°</td></tr>
            <tr><td>Pressure: { currentWeather.main.pressure } hPa</td></tr>
            <tr><td>Current temperature: { currentWeather.main.temp }%</td></tr>
            <tr><td>Maximum temperature: { currentWeather.main.temp_max } F°</td></tr>
            <tr><td>Minimum temperature: { currentWeather.main.temp_min } F°</td></tr> */}
          </tbody>
        </Table>

        <Card.Link 
          href="https://getcityweather.netlify.app" 
          target="_black"
        >
          Get more information
        </Card.Link>
      </Container>
    </>
  );
};

// export default MultiPurposeCart;
export {};