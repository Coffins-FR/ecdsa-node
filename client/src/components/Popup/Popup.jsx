import React, { forwardRef } from "react";
import "./Popup.scss";
import * as Toast from "@radix-ui/react-toast";

const Popup = forwardRef(({ open, setopen, title, description }, ref) => {
  return (
    <Toast.Root
      duration={3000}
      className="c-toast__root"
      open={open}
      setOpen={setopen}
      ref={ref}
    >
      <Toast.Title className="c-toast__title">{title}</Toast.Title>
      <Toast.Description className="c-toast__description">
        {description}
      </Toast.Description>
    </Toast.Root>
  );
});

export default Popup;
