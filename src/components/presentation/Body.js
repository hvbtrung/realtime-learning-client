import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Typography,
} from "@mui/material";
import { EditButton } from "./EditPresentation";

export function BodyPres() {
  const navigate = useNavigate();

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
        presentation.updatedAt = customizeDate(presentation.updatedAt);
      }
      setPresentation(presentations);
    } catch (e) {
      console.error("Get presentation error", e);
    }
  };

  useEffect(() => {
    getAllPresentations();
  }, [isReload]);

  const handleClick = (presentation) => {
    navigate(`/presentations/${presentation._id}/slides`, { state: presentation });
  }

  return (
    <div>
      {typeNotification && (
        <CustomizedSnackbars
          type={typeNotification}
          status={isAppearNotification}
          message={messageNotification}
        />
      )}
      {presentations.length !== 0 ? (
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
                    <span onClick={() => handleClick(row)} style={{ cursor: "pointer" }}>
                      {row.title}
                    </span>
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
      ) : (
        <Typography variant="h6" gutterBottom>
          You don't create any presentation
        </Typography>
      )}
    </div>
  );
}
