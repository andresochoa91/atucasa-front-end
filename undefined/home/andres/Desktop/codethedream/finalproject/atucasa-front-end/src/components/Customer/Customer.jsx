import React, { useState, useContext, useEffect } from 'react';
import { AtucasaContext } from '../../Context';
import EditUser from '../EditUser/EditUser';
import EditCustomer from './EditCustomer';
import EditLocation from '../Location/EditLocation';
import Location from '../Location/Location';
import ShowMerchants from '../ShowMerchant/ShowMerchants';
import Orders from '../Orders/Orders';
var Customer = function () {
    var _a = useContext(AtucasaContext), currentUser = _a.currentUser, location = _a.location;
    var _b = useState(null), currentCustomer = _b[0], setCurrentCustomer = _b[1];
    var _c = useState(false), showOrder = _c[0], setShowOrder = _c[1];
    var _d = useState(false), showMerchants = _d[0], setShowMerchants = _d[1];
    var handleCurrentCustomer = function () {
        fetch(process.env.REACT_APP_API + "/current_user/customer", {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            setCurrentCustomer(data.customer);
        })
            .catch(console.error);
    };
    useEffect(handleCurrentCustomer, []);
    return (<>
      {(currentUser && currentCustomer && location) && (<>
            <h1>Customer</h1>
            <button onClick={function () { return setShowOrder(!showOrder); }}>
              {!showOrder ? "Show Orders" : "Do Not Show Orders"}
            </button>
            {showOrder && (<Orders />)}
            <br />
            <br />
            <button onClick={function () { return setShowMerchants(!showMerchants); }}>
                {showMerchants ? "Don't show merchants" : "Show Merchants"}
            </button>
            {showMerchants && (<ShowMerchants currentCustomer={currentCustomer}/>)}
            <EditUser />
            <EditCustomer handleCurrentCustomer={handleCurrentCustomer}/>
            <EditLocation />
            <h2>User information</h2>
            <p><strong>Email: </strong>{currentUser.email}</p>
            <p><strong>Role: </strong>{currentUser.role}</p>
            <h2>Personal information</h2>
            <p><strong>Username: </strong>{currentCustomer.username}</p>
            <p><strong>First Name: </strong>{currentCustomer.first_name}</p>
            <p><strong>Last Name: </strong>{currentCustomer.last_name}</p>
            <p><strong>Slug: </strong>{currentCustomer.slug}</p>
            <p><strong>Phone Number: </strong>{currentCustomer.phone_number}</p>
            <p><strong>Profile Picture: </strong>{currentCustomer.profile_picture}</p>
            <Location />
          </>)}
    </>);
};
export default Customer;