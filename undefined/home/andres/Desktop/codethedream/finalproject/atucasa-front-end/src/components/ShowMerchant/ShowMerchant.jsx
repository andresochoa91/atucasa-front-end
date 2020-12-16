import React, { useState } from 'react';
import ShowProduct from '../ShowProducts/ShowProduct';
;
var ShowMerchant = function (_a) {
    var merchant = _a.merchant;
    var _b = merchant.location, country = _b.country, state = _b.state, city = _b.city, address = _b.address;
    var _c = useState(false), showProducts = _c[0], setShowProducts = _c[1];
    var _d = useState([{
            productName: "Papaya",
            unitPrice: 2,
            amount: 3,
            tax: 0.2
        }]), cart = _d[0], setCart = _d[1];
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
      {showProducts && (merchant.products.map(function (product) { return (<div key={product.id}>
              <ShowProduct cart={cart} setCart={setCart} product={product}/>
            </div>); }))}
      <br />
      <h3>Cart:</h3> 
        {cart.map(function (cartProduct) {
        return (<>
                <p><strong>Product Name</strong>: {cartProduct.productName}</p>
                <p><strong>Unit Price</strong>: {cartProduct.unitPrice}</p>
                <p><strong>Amount</strong>: {cartProduct.amount}</p>
                <p><strong>Tax</strong>: {cartProduct.tax}</p>
                <br />
              </>);
    })}
    </div>);
};
export default ShowMerchant;