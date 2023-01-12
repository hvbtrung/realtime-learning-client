import React from "react";

import { HeaderPres } from "./Header";
import { BodyPres } from "./Body";
import { NotificationProvider } from "../../context/NotificationContext";
import { PresentationProvider } from "../../context/PresentationContext";

export function Presentation() {
  return (
    <PresentationProvider>
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
    </PresentationProvider>
  );
}
