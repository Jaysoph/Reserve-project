/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "@mui/material";
import React from "react";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const ModalCustom = ({ open, setOpen, children }: IProps) => {
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalCustom;
