import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../core/Button/Button";

interface ModalProps {
  handleClose: () => void;
  handleSave: () => void;
  handleCancel: () => void;
  show: boolean;
  title: string;
  loading: boolean;
  description: string;
  saveLabel: string;
}
const CustomPopupModal = ({
  handleClose,
  handleSave,
  handleCancel,
  saveLabel,
  loading,
  description,
  title,
  show,
}: ModalProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button revertColor onClick={handleCancel} title={"No"}></Button>
        <Button
          onClick={handleSave}
          title={saveLabel}
          loading={loading}
        ></Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomPopupModal;
