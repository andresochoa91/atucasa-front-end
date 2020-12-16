import React, { useState } from 'react';
;
var EditMerchant = function (_a) {
    var handleCurrentMerchant = _a.handleCurrentMerchant;
    var _b = useState(""), merchantName = _b[0], setMerchantName = _b[1];
    var _c = useState(""), phoneNumber = _c[0], setPhoneNumber = _c[1];
    var _d = useState(""), taxId = _d[0], setTaxId = _d[1];
    var _e = useState(""), description = _e[0], setDescription = _e[1];
    var _f = useState(""), profilePicture = _f[0], setProfilePicture = _f[1];
    var _g = useState(""), backgroundPicture = _g[0], setBackgroundPicture = _g[1];
    var handleInput = function (event) {
        event.preventDefault();
        var _a = event.target, name = _a.name, value = _a.value;
        (name === "merchantName" ?
            setMerchantName :
            name === "phoneNumber" ?
                setPhoneNumber :
                name === "taxId" ?
                    setTaxId :
                    name === "description" ?
                        setDescription :
                        name === "profilePicture" ?
                            setProfilePicture :
                            setBackgroundPicture)(value);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        var newDataMerchant = {};
        if (merchantName)
            newDataMerchant.merchant_name = merchantName;
        if (phoneNumber)
            newDataMerchant.phone_number = phoneNumber;
        if (taxId)
            newDataMerchant.tax_id = taxId;
        if (description)
            newDataMerchant.description = description;
        if (profilePicture)
            newDataMerchant.profile_picture = profilePicture;
        if (backgroundPicture)
            newDataMerchant.background_picture = backgroundPicture;
        fetch(process.env.REACT_APP_API + "/current_user/merchant", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDataMerchant)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            if (!data.error) {
                setMerchantName("");
                setPhoneNumber("");
                setTaxId("");
                setDescription("");
                setProfilePicture("");
                setBackgroundPicture("");
                handleCurrentMerchant();
            }
        })
            .catch(console.error);
    };
    return (<>
      <h2>Edit Merchant</h2>
      <form onSubmit={handleSubmit}>
        <label>Merchant Name</label>
        <input type="text" name="merchantName" value={merchantName} onChange={handleInput}/>
        <br />
        <label>Phone Number</label>
        <input type="text" name="phoneNumber" value={phoneNumber} onChange={handleInput}/>
        <br />
        <label>Tax ID</label>
        <input type="text" name="taxId" value={taxId} onChange={handleInput}/>
        <br />
        <label>Description</label>
        <input type="text" name="description" value={description} onChange={handleInput}/>
        <br />
        <label>Profile Picture</label>
        <input type="text" name="profilePicture" value={profilePicture} onChange={handleInput}/>
        <br />
        <label>Background Picture</label>
        <input type="text" name="backgroundPicture" value={backgroundPicture} onChange={handleInput}/>
        <br />
        <input type="submit" value="Update"/>
      </form>
      <br />
    </>);
};
export default EditMerchant;