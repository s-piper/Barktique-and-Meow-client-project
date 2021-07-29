import React from 'react';

// import material-ui
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

    return (
        <>
            <div>
                <div className={classes.root}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
                                className={classes.heading}
                            >
                                Artist Name
                            </Typography>
                            <Typography
                                className={classes.secondaryHeading}
                            >
                                Edit Artist
                            </Typography>
                            <Typography
                                className={classes.secondaryHeading}
                            >
                                Delete Artist
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Artist Information (Email Address and Phone Number)
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </>
    )
} // end AdminArtistTable

// export AdminArtistTable
export default AdminArtistTable;