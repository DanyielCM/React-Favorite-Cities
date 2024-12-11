'use client';

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from './modal.module.css'

export default function Modal({ children, open, onClose}) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
     
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={classes.modal} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
