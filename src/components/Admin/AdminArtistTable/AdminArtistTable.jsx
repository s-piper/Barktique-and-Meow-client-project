import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import material-ui
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// variable useStyles for class names
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '33.33%',
        flexShrink: 0,
    },
}));

// function for Artist table component
function AdminArtistTable() {

    // variable for material-ui classes
    const classes = useStyles();
    // set dispatch variable
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_EMPLOYEES_FROM_SERVER' })
    }, []);

    // get artist info from store
    const artists = useSelector(store => store.adminEmployeeInfoReducer);

    return (
        <>
            <div>
                {artists[0]?.map(((artist, i) => {
                    return (
                        <div key={i} className={classes.root}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography
                                        className={classes.heading}
                                    >
                                        {artist.employee_first_name} {artist.employee_last_name}
                                    </Typography>
                                    <Typography
                                        className={classes.secondaryHeading}
                                    >
                                        <Button variant="contained" color="primary">Edit Artist</Button>
                                    </Typography>
                                    <Typography
                                        className={classes.secondaryHeading}
                                    >
                                        <Button variant="contained" color="secondary">Delete Artist</Button>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {artist.username} {artist.employee_phone_number}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    )
                }))}
            </div>
        </>
    )
} // end AdminArtistTable

// export AdminArtistTable
export default AdminArtistTable;