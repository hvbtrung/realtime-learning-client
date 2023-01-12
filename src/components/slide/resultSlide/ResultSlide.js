import "./resultSlide.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import moment from "moment";

const ResultSlide = () => {
    const params = useParams();
    const [slideResult, setSlideResult] = useState(null);

    useEffect(() => {
        const getSlideResult = async () => {
            const res = await axiosInstance.get(`/api/slideResults/${params.slideId}`);

            setSlideResult(res.data.data);
        }

        getSlideResult();
    }, [params.slideId]);

    return (
        slideResult && (
            <div className="resultSlideWrapper">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Choice</TableCell>
                                <TableCell>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {slideResult.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.user}
                                    </TableCell>
                                    <TableCell>{row.choice}</TableCell>
                                    <TableCell>{moment(row.createdAt).format("DD-MM-YYYY, hh:mm:ss a")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    );
}

export default ResultSlide;
