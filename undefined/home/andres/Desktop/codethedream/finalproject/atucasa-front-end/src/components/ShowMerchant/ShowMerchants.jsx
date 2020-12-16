import React, { useEffect, useState } from 'react';
import ShowMerchant from './ShowMerchant';
var ShowMerchants = function (_a) {
    var currentCustomer = _a.currentCustomer;
    var _b = useState([]), merchants = _b[0], setMerchants = _b[1];
    useEffect(function () {
        fetch(process.env.REACT_APP_API + "/merchants", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            setMerchants(data.merchants);
        });
    }, []);
    return (<>
      <h1>Merchants</h1>
      {merchants.map(function (merchant) { return (<div key={merchant.merchant_info.user_id}>
            <h2>{merchant.merchant_info.merchant_name}</h2>
            <p><strong>Description</strong>: {merchant.merchant_info.description}</p>
            <p><strong>Phone Number</strong>: {merchant.merchant_info.phone_number}</p>
            <ShowMerchant currentCustomerID={currentCustomer.id} merchant={merchant}/>
            <br />
            <br />
          </div>); })}
    </>);
};
export default ShowMerchants;