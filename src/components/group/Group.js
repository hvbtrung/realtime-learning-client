import React, { useContext, useEffect, useState } from "react";
import Member from "./Member";
import axios from "axios";
import { useDetailGrContext } from "../../hooks/useDetailGrContext";

export default function Group() {
  const [owners, setOwners] = useState([]);
  const [coOwners, setCoOwners] = useState([]);
  const [members, setMembers] = useState([]);
  const [role, setRole] = useState("");
  const { callApi } = useDetailGrContext();

  const url = process.env.REACT_APP_API_URL;

  const pathname = window.location.pathname;

  let id = pathname.slice("/group/detail-information/".length, pathname.length);

  const setRoleMember = () => {
    let search = window.location.search.slice(1);

    switch (search) {
      case "ronr":
        setRole("ROLE_OWNER");
        break;
      case "rconr":
        setRole("ROLE_COOWNER");
        break;
      default:
        setRole("ROLE_MEMBER");
    }
  };
  const getMembers = async ({ type }) => {
    const response = await axios.get(`${url}/api/group/${id}/${type}/`, {
      withCredentials: true,
      validateStatus: () => true,
    });

    if (type === "ROLE_OWNER") {
      setOwners(response.data.members);
    } else if (type === "ROLE_COOWNER") {
      setCoOwners(response.data.members);
    } else {
      setMembers(response.data.members);
    }
  };

  useEffect(() => {
    getMembers({ type: "ROLE_COOWNER" });
    getMembers({ type: "ROLE_MEMBER" });
    getMembers({ type: "ROLE_OWNER" });
    setRoleMember();
  }, [callApi]);

  return (
    <div className="group-detail-container" style={{ minHeight: "110vh" }}>
      <Member role="Owner" members={owners} itsRole={role} />
      <Member role="Co-Owner" members={coOwners} itsRole={role} />
      <Member role="Member" members={members} itsRole={role} />
    </div>
  );
}
