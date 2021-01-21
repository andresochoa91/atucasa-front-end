import React, { FC } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

interface IConteinerJumbotronProps {
  children: React.ReactNode
}

/**
 * Component that add format to other components
 */
const ContainerJumbotron: FC<IConteinerJumbotronProps> = ({ children }) => {
  return (
    <Container className="text-center mt-5">
      <Jumbotron
        className="rounded text-center text-white p-5" 
        fluid
        style={{
          backgroundColor: "rgba(0,0,0,0.65)"
        }}
      >
        { children }
      </Jumbotron>
    </Container>
  );
};

export default ContainerJumbotron;
