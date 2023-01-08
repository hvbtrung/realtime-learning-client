import React, { useEffect, useState } from "react";
import Member from "./Member";
import axiosInstance from "../../utils/axiosInstance";
import { useDetailGrContext } from "../../hooks/useDetailGrContext";

export default function Group() {
  const [owners, setOwners] = useState([]);
  const [coOwners, setCoOwners] = useState([]);
  const [members, setMembers] = useState([]);
  const [role, setRole] = useState("");
  const { isReloadMember } = useDetailGrContext();

  const pathname = window.location.pathname;

  let id = pathname.slice("/group/detail-information/".length, pathname.length);

  const setRoleMember = () => {
    let search = window.location.search.slice(1);

    switch (search) {
      case "own":
        setRole("ROLE_OWNER");
        break;
      case "coown":
        setRole("ROLE_COOWNER");
        break;
      default:
        setRole("ROLE_MEMBER");
    }
  };
  const getMembers = async ({ type }) => {
    try {
      const response = await axiosInstance.get(
        `/api/group?groupId=${id}&type=${type}`
      );

      if (type === "ROLE_OWNER") {
        setOwners(response.data.members);
      } else if (type === "ROLE_COOWNER") {
        setCoOwners(response.data.members);
      } else {
        setMembers(response.data.members);
      }
    } catch (e) {
      console.error("error get member", e);
    }
  };

  useEffect(() => {
    getMembers({ type: "ROLE_COOWNER" });
    getMembers({ type: "ROLE_MEMBER" });
    getMembers({ type: "ROLE_OWNER" });
    setRoleMember();
    // eslint-disable-next-line
  }, [isReloadMember]);

  return (
    <div className="group-detail-container" style={{ minHeight: "110vh" }}>
      <Member role="Owner" members={owners} itsRole={role} />
      <Member role="Co-Owner" members={coOwners} itsRole={role} />
      <Member role="Member" members={members} itsRole={role} />
    </div>
  );
}
