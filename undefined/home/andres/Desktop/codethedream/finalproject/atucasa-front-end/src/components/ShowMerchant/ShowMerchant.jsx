import React, { useState } from 'react';
import ShowProducts from '../ShowProducts/ShowProducts';
;
var ShowMerchant = function (_a) {
    var merchant = _a.merchant, currentCustomerID = _a.currentCustomerID;
    var _b = merchant.location, country = _b.country, state = _b.state, city = _b.city, address = _b.address;
    var _c = useState(false), showProducts = _c[0], setShowProducts = _c[1];
    return (<div key={merchant.merchant_info.id}>
      <p><strong>Email</strong>: {merchant.email}</p>
      <p><strong>Location</strong>
        : {country + ", " + state + ", " + city + ", " + address + "."}
      </p>
      <br />
      <h3>Links</h3>
      {merchant.links.map(function (link) { return (<div key={link.id}>
            <p><strong>{link.site_name}</strong>: {link.url}</p>
          </div>); })}
      <br />
      <h3>Products</h3>
      <button onClick={function () { return setShowProducts(!showProducts); }}>
        {showProducts ? "Do not show products" : "Show products"}
      </button>
      <br />
      <br />
      {showProducts && (<ShowProducts merchantID={merchant.merchant_info.id} currentCustomerID={currentCustomerID} products={merchant.products}/>)}
    </div>);
};
export default ShowMerchant;