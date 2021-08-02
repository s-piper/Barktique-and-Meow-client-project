import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

function AdminIssuesTable() {

    // variable for material-ui classes
    const classes = useStyles();
    // set dispatch variable
    const dispatch = useDispatch();

    // fetch all orders to find any with errors
    // will need to target a new FETCH for image errors------------------
    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_PRODUCT_ORDERS' })
    }, []);

    // Need to target a new store for errors ------------------
    const orders = useSelector(store => store.employee)

    if (orders.cus_error_image === true) {
        
    }

    return (
        <>
            <div className="issues-table">
                {orders.map(((order, i) => {
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
                                        Order # {order.cus_order_number}
                                    </Typography>
                                    <Typography
                                        className={classes.heading}
                                    >
                                        {order.cus_first_name} {order.cus_last_name}
                                    </Typography>
                                    <Typography
                                        className={classes.heading}
                                    >
                                        {order.cus_error_image}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Contact Customer: {order.cus_phone_number}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    )
                }))}
            </div>
        </>
    )
} // end AdminIssuesTable

// export AdminIssuesTable
export default AdminIssuesTable;