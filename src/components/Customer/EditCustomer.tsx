import React, { FC } from 'react';

const EditCustomer: FC = (): JSX.Element => {
  return (
    <>
      <h2>Edit Customer</h2>
      <form>
        <label>First Name</label>
        <input type="text"/>
        <br/>
        <label>Last Name</label>
        <input type="text"/>
        <br/>
        <label>Phone Number</label>
        <input type="text"/>
        <br/>
        <label>Profile picture</label>
        <input type="text"/>
        <br/>
      </form>
    </>
  );
}

export default EditCustomer;