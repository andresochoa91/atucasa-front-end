import React, { FC, useContext, useEffect } from 'react';
import { AtucasaContext } from './Context';
import SignUp from './components/SignForms/SignIn';
import SignIn from './components/SignForms/SignUp';
import SignOut from './components/SignForms/SignOut';
import Customer from './components/Customer/Customer';
import Merchant from './components/Merchant/Merchant';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import MyMap from './components/MyMap/MyMap';
import ShowMerchant from './components/ShowMerchant/ShowMerchant';

const App:FC = () => {
  const { currentUser, loggedOut } = useContext<TContextProps>(AtucasaContext);
  const url = `This is me`;

  useEffect(() => {
    const getCachedData = async() => {
      const fetchData = await fetch(`${process.env.REACT_APP_API}/cache/${url}`);
      const data = await fetchData.json();
      if (data.status === "Success") {
        console.log("In Cache :)");
        console.log(data);
      } else {
        console.log("Not in Cache");
        const fetchData = await fetch(`${process.env.REACT_APP_API}/cache/${url}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            strData: "yayayayaya"
          })
        });
        const data = await fetchData.json();
        console.log(data);
      }
    };
    getCachedData();
  }, [url]);
  

  return (
    <div>
      {
        (false) && (
          <Switch>
            {
              (loggedOut || !currentUser) ? (
                <>
                  {
                    loggedOut && <Redirect to="/" />
                  }
                  <Route exact path="/" render={() => (
                    <>
                      <SignUp />
                      <SignIn />
                      <Link to="/home/map">Show Map</Link>
                    </>
                  )}/>
                  {/* <Route path="/merchants" render={() => <ShowMerchants />} /> */}
                  <Route path="/home/map" render={() => <MyMap />} />
                  <Route 
                    exact path="/merchants/:slug" 
                    render={(props) => (
                      <ShowMerchant {...props} />
                    )} 
                  />
                </>
              ) : (
                <>
                  <Route exact path="/" render={() => <Redirect to="/home" />}/>
                  <Route path="/home" render={() => (
                    <>
                      <SignOut />
                      {
                        currentUser.role === "customer" ? <Customer /> : <Merchant />
                      }
                      {/* <Link to="/merchants">Yayaya</Link> */}
                    </> 
                  )}/>
                  {/* <Route exact path="/merchants" render={() => <ShowMerchants />} /> */}
                  {
                    !currentUser && (
                      <Route exact path="/home/map" render={() => <MyMap />} />
                    )
                  }
                  <Route 
                    exact path="/merchants/:slug" 
                    render={(props) => (
                      <ShowMerchant {...props} />
                    )} 
                  />
                </>
              )
            }
          </Switch>
        )
      }
      <h1>Welcome to atucasa.com</h1>
    </div>
  );
};

export default App;
