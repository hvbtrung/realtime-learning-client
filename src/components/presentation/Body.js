import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import customizeDate from "../customize/CustomizeDate";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotificationContext } from "../../hooks/useNotificationContext";
import CustomizedSnackbars from "../notification/snackbars";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { EditButton } from "./EditPresentation";

export function BodyPres() {
  const { isAppearNotification, typeNotification, messageNotification } =
    useNotificationContext();

  const [presentations, setPresentation] = useState([]);
  const { isReload } = useAuthContext();

  const getAllPresentations = async () => {
    const SERVER_DOMAIN = process.env.REACT_APP_API_URL;

    try {
      const res = await axios.get(`${SERVER_DOMAIN}/api/presentations`, {
        withCredentials: true,
        validateStatus: () => true,
      });

      let presentations = res.data.presentations;
      for (let presentation of presentations) {
        presentation.createdAt = customizeDate(presentation.createdAt);
        presentation.updatedAt = customizeDate(presentation.createdAt);
      }
      setPresentation(presentations);
    } catch (e) {
      console.error("Get presentation error", e);
    }
  };

  useEffect(() => {
    getAllPresentations();
  }, [isReload]);

  return (
    <div>
      {typeNotification && (
        <CustomizedSnackbars
          type={typeNotification}
          status={isAppearNotification}
          message={messageNotification}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Name Presentation
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Owner
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Modified
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Created
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Option
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {presentations.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.owner.name}</TableCell>
                <TableCell align="right">{row.updatedAt}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">
                  <EditButton
                    namePresentation={row.title}
                    idPresentation={row._id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
