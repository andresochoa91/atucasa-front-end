import React, { FC } from 'react';
import { Container, Table, Card } from 'react-bootstrap';

interface IMultiPurposeCardProps {
  children: React.ReactNode
}

const MultiPurposeCard: FC<IMultiPurposeCardProps> = ({ children }) => {
  return (
    <>
      <Container 
        className="mx-auto text-center text-white py-3 mt-5 rounded" 
        style={{ 
          width: '30rem', 
          backgroundColor: "rgba(0,0,0,0.65)"
        }}>    
        <Table striped bordered className="mb-3 text-white">
          { children }
        </Table>

        {/* <Card.Link 
          href="https://getcityweather.netlify.app" 
          target="_black"
        >
          Get more information
        </Card.Link> */}
      </Container>
    </>
  );
};

export default MultiPurposeCard;