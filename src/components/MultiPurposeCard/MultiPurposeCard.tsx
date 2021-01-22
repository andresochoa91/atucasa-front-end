import React, { FC } from 'react';
import { Container, Table/* , Card */ } from 'react-bootstrap';

interface IMultiPurposeCardProps {
  children: React.ReactNode
}

/**Formats table information */
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
      </Container>
    </>
  );
};

export default MultiPurposeCard;