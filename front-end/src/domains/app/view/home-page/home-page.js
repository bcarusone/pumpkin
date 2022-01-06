import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import loadData from "../../thunks/load-data";
import updateData from '../../thunks/update-data';
import { getAppClaims } from "../../selectors";

import styles from './home-page.css';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Button, Grid, Paper, Table, TableContainer, TableHead, TableBody, TableRow, Typography, FormControl, Select, MenuItem } from '@mui/material';

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
    const [decisions, setDecisions] = useState({});

    const dispatch = useDispatch();
    const claims = useSelector(getAppClaims) || {};

    useEffect(() => {
        dispatch(loadData());
    }, []);

    const capitalize = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }

    const handleChange = (lineId) => {
        let updatedDecisions = Object.assign({}, decisions);

        let updatedDecision = !decisions[lineId];
        updatedDecisions[lineId] = updatedDecision;

        setDecisions(updatedDecisions);
    }

    const onSave = () => {
        dispatch(updateData(claims.id, decisions));
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
                                    <StyledTableCell>Decision</StyledTableCell>
                                    <StyledTableCell>Amount Claimed</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {claims.line_items ? claims.line_items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">{item.claim_line_item_type}</TableCell>
                                        <TableCell align="left">{item.quantity}</TableCell>
                                        <TableCell align="left">
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="decision-select-label"
                                                    id="decision-select"
                                                    value={decisions[item.id] === undefined ? false : decisions[item.id]}
                                                    label="Decision"
                                                    autoWidth
                                                    onChange={() => handleChange(item.id)}
                                                >
                                                    <MenuItem value={true}>Approved</MenuItem>
                                                    <MenuItem value={false}>Denied</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
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
                <Grid item md={12}>
                    <Button variant='filled' color='#fee300' onClick={onSave}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}