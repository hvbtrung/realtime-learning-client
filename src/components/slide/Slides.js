import React from "react";
import { Box } from "@mui/material";
import HeaderSlide from "./header/Header";
import BodySlide from "./bodySlide/BodySlide";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Slides() {
  const params = useParams();
  const location = useLocation();
  const [slides, setSlides] = useState(null);

  const presentation = location.state;

  useEffect(() => {
    const getSlides = async () => {
      const SERVER_DOMAIN = process.env.REACT_APP_API_URL;
      const res = await axios.get(
        `${SERVER_DOMAIN}/api/presentations/${params.presentationId}/slides`, {
        withCredentials: true,
        validateStatus: () => true,
      });

      setSlides(res.data.data);
    }

    getSlides();
  }, [params.presentationId]);

  return (
    <div
      className="container"
      style={{
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingBottom: "5px",
      }}
    >
      {slides && (
        <Box className="slides">
          <Box className="slides__header">
            <HeaderSlide
              presentation={presentation}
              slides={slides}
              setSlides={setSlides}
            />
          </Box>
          <Box className="slides__body" sx={{ mt: 4 }}>
            <BodySlide
              presentation={presentation}
              slides={slides}
              setSlides={setSlides}
            />
          </Box>
        </Box>
      )}
    </div>
  );
}
