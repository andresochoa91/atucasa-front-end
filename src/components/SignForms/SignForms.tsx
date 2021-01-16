import React, { FC, useContext } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Row, Col, Jumbotron, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainModal from '../MainModal/MainModal';
import { AtucasaContext } from '../../Context';

const SignForms: FC = () => {

  const { currentMessage, currentTitleMessage } = useContext<TContextProps>(AtucasaContext);

  return (
    <>
      <MainModal titleMessage={ currentTitleMessage }>
        <p>{ currentMessage }</p>
      </MainModal>

      <div className="d-flex justify-content-center mt-5">
        <Jumbotron 
          className="rounded text-center text-white p-5" 
          fluid
          style={{
            backgroundColor: "rgba(0,0,0,0.65)"
          }}
        >
          <Container>
            <h1 className="display-4">Start ordering with A Tu Casa!</h1>
            <Row>
              <Col>
                <SignIn />
              </Col>
              <Col>
                <SignUp />
              </Col>
            </Row>
            <br/>
            <br/>
            <span style={{ fontSize: 20 }}>Do you want to see all merchants close to you?</span>
            <br/>
            <Link 
              style={{ 
                color: "#fff", 
                textDecoration: "underline",
                fontSize: 20 
              }} 
              to="/map"
            >
              Click here
            </Link>
          </Container>
        </Jumbotron>
      </div>
    </>
  );
}

export default SignForms;