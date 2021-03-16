import React, { FC, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { AtucasaContext } from '../../Context';

interface IProps {
  children: React.ReactNode,
  titleMessage: string
}

/**Modal that sends alerts to user */
const MainModal: FC<IProps> = ({ titleMessage, children }) => {
  const { currentMessageValidation, setCurrentMessageValidation } = useContext<TContextProps>(AtucasaContext);  

  /**Handles when user closes the modal */
  const handleClose = () => setCurrentMessageValidation(false);

  return(
    <Modal show={ currentMessageValidation } onHide={ handleClose } size="lg">
      <Modal.Header closeButton>
      <Modal.Title>{ titleMessage }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { children }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ handleClose }>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MainModal;