import React, { FC } from 'react';
import { Container, Table/* , Card */ } from 'react-bootstrap';

interface IMultiPurposeCardProps {
  children: React.ReactNode
}

const MultiPurposeCard: FC<IMultiPurposeCardProps> = ({ children }) => {
  return (
    <>
      <Container 
        className="mx-auto text-center text-dark pt-3 pb-1 rounded" 
        style={{ 
          width: '30rem', 
          backgroundColor: "#fff"
        }}>    
        <Table className="mb-3 text-dark">
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