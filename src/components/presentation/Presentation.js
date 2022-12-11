import React, { useEffect, useState } from "react";

import { HeaderPres } from "./Header";
import { BodyPres } from "./Body";
import { NotificationProvider } from "../../context/NotificationContext";
import { useNotificationContext } from "../../hooks/useNotificationContext";
import CustomizedSnackbars from "../notification/snackbars";

export function Presentation() {
  const { typeNotification, messageNotification, isAppearNotification } =
    useNotificationContext();

  return (
    <NotificationProvider>
      <div
        className="presentations"
        style={{
          paddingLeft: "100px",
          paddingRight: "100px",
          paddingBottom: "150px",
        }}
      >
        <div className="presentation-header">
          <HeaderPres />
        </div>

        <div className="presentation-list" style={{ marginTop: "50px" }}>
          <BodyPres />
        </div>
      </div>
    </NotificationProvider>
  );
}
