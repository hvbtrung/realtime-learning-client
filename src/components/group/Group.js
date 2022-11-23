import React, { useEffect } from "react";
import Member from "./Member";

export default function Group() {
  let members = [
    {
      photo: "",
      name: "Nguyễn Văn A",
    },
    {
      photo: "",
      name: "Nguyễn Văn B",
    },
  ];
  return (
    <div className="group-detail-container">
      <Member header="Owner" members={members} />
      <Member header="Member" members={members} />
    </div>
  );
}
