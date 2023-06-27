import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const MovieModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    modalTextLoad();
  });
  useEffect(() => {
    modalShowHandler();
  });
  const modalTextLoad = () => {
    setModalText(props.data);
  };
  const modalShowHandler = () => {
    setModalShow(props.show);
  };
  return (
    <>
      <Modal show={modalShow} onHide={props.onHide}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default MovieModal;
