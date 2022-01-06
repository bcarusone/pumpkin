import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import loadData from "../../thunks/load-data";
import { getAppClaims } from "../../selectors";

import styles from './home-page.css';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Grid,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#808080',
      color: '#FFFFFF',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

export default function HomePage() {
    const dispatch = useDispatch();
    const claims = useSelector(getAppClaims) || {};

    useEffect(() => {
        dispatch(loadData());
    }, []);

    const capitalize = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }

    return (
        <div className={styles.container}>
            <Grid container spacing={2}>
                <Grid item className={styles.customer} md={12}>
                    <Typography>
                        Customer: Paige Davenport
                    </Typography>
                    <Typography>
                        PKN690800
                    </Typography>
                    <Typography>
                        Claim: {claims.id}
                    </Typography>
                </Grid>
                <Grid item  md={12}>
                    <hr />
                </Grid>
                <Grid item md={6}>
                    <Typography>
                        Claim Type:
                    </Typography>
                    {claims.claim_type ? capitalize(claims.claim_type) : ""}
                </Grid>
                <Grid item md={6}>
                    <Typography>
                        Claimed Amount:
                    </Typography>
                    {claims.amount_claimed}
                </Grid>
                <Grid item md={3}>
                    {/* spacing */}
                </Grid>
                <Grid item md={6}>
                    <TableContainer component={Paper}>
                        <Table sx={{ maxWidth: 900 }} aria-label="claim-line-items">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Type</StyledTableCell>
                                    <StyledTableCell>Qty</StyledTableCell>
                                    <StyledTableCell>Amount Claimed</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {claims.line_items ? claims.line_items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">{item.claim_line_item_type}</TableCell>
                                        <TableCell align="left">{item.quantity}</TableCell>
                                        <TableCell align="left">{item.amount_claimed}</TableCell>
                                    </TableRow>
                                )) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item md={3}>
                    {/* spacing */}
                </Grid>
            </Grid>
        </div>
    );
}