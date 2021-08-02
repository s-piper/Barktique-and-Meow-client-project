import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminIssuesDetail from './AdminIssuesDetail';

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
    useEffect(() => {
        dispatch({ type: 'FETCH_ISSUES_WITH_ORDERS' })
    }, []);

    // all orders in the store 
    const orders = useSelector(store => store.adminIssuesReducer);

    // // convert to ms
    // let upload = new Date(order.cus_upload_date);
    // let ms = upload.getTime();
    // let currentDate = new Date();
    // let timeStamp = currentDate.getTime();
    // let difference = timeStamp - ms;
    // let fiveDays = 432_000_000;

    // // console logs to see ms 
    // console.log('is timeStamp in ms?', timeStamp);
    // console.log('upload in ms', ms);
    // console.log('This is the time of image upload', upload.toISOString().slice(11, -8));
    // console.log('the difference in time:', difference > fiveDays);

    return (
        <>
            <div className="issues-table">
                {orders?.map((order, i) => {
                    return (
                        <>
                            { !order.cus_error_image === true 
                            ? 
                            (
                                ''
                            ) : (
                                <AdminIssuesDetail order={order} key={i} />
                            )
                            }
                        </>
                )
                })}
            </div>
        </>
    )
} // end AdminIssuesTable

// export AdminIssuesTable
export default AdminIssuesTable;