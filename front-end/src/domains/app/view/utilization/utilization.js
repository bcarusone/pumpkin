import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import loadUtilization from "../../thunks/load-utilization";
import { getUtilization } from "../../selectors";

import styles from './utilization.css';

import { Grid, Typography, Box } from '@mui/material';


export default function Utilization() {
    const dispatch = useDispatch();
    const utilization = useSelector(getUtilization) || {};
    console.log(utilization);

    useEffect(() => {
        dispatch(loadUtilization());
    }, []);

    return (
        <div className={styles.container}>
            <Grid container spacing={2}>
                <Grid item className={styles.header} md={12}>
                    <Typography variant='h2'>
                        Bella's Profile
                    </Typography>
                    <Typography>
                        <Box fontWeight='bold' flex='inline'>
                            Birthday:
                        </Box>
                        06/16/2018
                        <Box fontWeight='bold' flex='inline'>
                            Weight:
                        </Box>
                        16 lbs
                    </Typography>
                </Grid>
                <Grid item  md={12}>
                    <hr />
                </Grid>
                <Grid item md={12}>
                    <Typography variant='h4'>
                        Track Benefits:
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Typography variant='h6'>
                        Preventative Essentials Benefits
                    </Typography>
                </Grid>
                <Grid item md={12}>
                </Grid>
            </Grid>
        </div>
    );
}