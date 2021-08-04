import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import EmployeeHeader from '../EmployeeHeader/EmployeeHeader';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 195,
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
}));

const EmployeeOrderPage = () => {
  const history = useHistory();
  const { orderNumber, id } = useParams();
  // const orders = useSelector((store) => store.orders); // I think this is the store with the orders in it?
  const productOrderReducer = useSelector((store) => store.productOrderReducer);
  const user = useSelector((store) => store.user);
  const [order, setOrder] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();

  // Data that needs to be sent with our useEffect below
  const data = {
    id: id,
    cus_order_number: orderNumber,
  };

  useEffect(() => {
    dispatch({ type: 'GET_PRODUCT_ORDER', payload: data });
  }, []);

  //Sends Error Package to Saga
  //Data is error status, order number, user id

  const imageErrorColumn = () => {
    const data = {
      cus_error_image: true,
      cus_order_number: productOrderReducer[0]?.cus_order_number,
      id: productOrderReducer[0]?.user_id_ref,
    };

    dispatch({ type: 'IMAGE_ERROR_BUTTON', payload: { data } });
  };

  const imageErrorStatus = () => {
    const data = {
      cus_progress_status: 'Image Rejected',
      cus_order_number: productOrderReducer[0]?.cus_order_number,
      id: productOrderReducer[0]?.user_id_ref,
    };

    dispatch({ type: 'PRODUCT_ORDER_COMPLETE_BUTTON', payload: { data } });
  };

  useEffect(() => {
    dispatch({ type: 'GET_PRODUCT_ORDER', payload: data });
  }, []);

  const imageError = () => {
    imageErrorColumn();
    imageErrorStatus();
    window.location.reload();
  };

  const imageErrorColumnFixed = () => {
    const data = {
      cus_error_image: false,
      cus_order_number: productOrderReducer[0]?.cus_order_number,
      id: productOrderReducer[0]?.user_id_ref,
    };

    dispatch({ type: 'IMAGE_ERROR_BUTTON', payload: { data } });
  };

  const imageErrorStatusFixed = () => {
    const data = {
      cus_progress_status: 'In Progress',
      cus_order_number: productOrderReducer[0]?.cus_order_number,
      id: productOrderReducer[0]?.user_id_ref,
    };

    dispatch({ type: 'PRODUCT_ORDER_COMPLETE_BUTTON', payload: { data } });
  };

  const imageErrorFixed = () => {
    imageErrorStatusFixed();
    imageErrorColumnFixed();
    window.location.reload();
  };

  const onDownload = (orderNumber) => {
  // const link = document.createElement("a");
  //   link.download = `Order ${productOrderReducer[0]?.cus_order_number}.pdf`;
  //   link.href = `/orderPage/${user.id}/${orderNumber}./download.pdf`;
  //   link.click();

  // const toPrint = document.getElementById("orderNumber");
  // const newWin = window.open();
  // newWin.document.write(`<div>${toPrint}</div>`);
  // newWin.print()
  }
  //Sends Complete Notification to Saga
  //Data is status, order number, user id
  const setComplete = () => {
    const data = {
      cus_progress_status: 'Complete',
      cus_order_number: productOrderReducer[0]?.cus_order_number,
      id: productOrderReducer[0]?.user_id_ref,
    };
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Complete',
      confirmButtonColor: '#000000',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'PRODUCT_ORDER_COMPLETE_BUTTON', payload: { data } });
        Swal.fire({
          icon: 'success',
          title: 'Order Complete!',
          confirmButtonColor: '#000000',})
      }
      history.push(`/employee`);
    })
  };
  const downloadImage = (event) => {
    console.log(`download image?`, productOrderReducer[0]?.cus_image);
    fetch(productOrderReducer[0]?.cus_image).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = `Order ${productOrderReducer[0]?.cus_order_number}`;
        a.click();
      });
    });
  };
  const unassignOrder = (event) => {
    console.log(`click unassign order`, productOrderReducer[0]?.cus_order_number)
    const data = {
      cus_progress_status: 'Not Started',
      cus_order_isStarted: false,
      cus_order_number: productOrderReducer[0]?.cus_order_number,
      user_id_ref: null,
      id: productOrderReducer[0]?.user_id_ref,
      employee_full_name: null
    }

    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Unassign',
      confirmButtonColor: '#000000',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: 'PRODUCT_UNASSIGN_ORDER_BUTTON',
          payload: { data }
        });
      }
      history.push(`/employee`);
    })

  }
  return (
    <div>
      <EmployeeHeader />
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <div id="orderNumber">
          <p>Order Number: {productOrderReducer[0]?.cus_order_number}</p>
        </div>

        <div id="fullName">
          <p>
            Name:{' '}
            {`${productOrderReducer[0]?.cus_first_name} ${productOrderReducer[0]?.cus_last_name}`}
          </p>
        </div>

        <div id="phone">
          <p>Phone: {productOrderReducer[0]?.cus_phone_number}</p>
        </div>

        <div id="email">
          <p>Email: {productOrderReducer[0]?.cus_email}</p>
        </div>

        <div id="note">
          <p>Note: {productOrderReducer[0]?.cus_notes}</p>
        </div>

        <div id="image">
          <img
            src={productOrderReducer[0]?.cus_image}
            style={{ height: 150, width: 150 }}
          />
        </div>

        <Button
          onClick={(event) => downloadImage(event)}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Download Image
        </Button>

        {/* Renders button or static message */}
        {productOrderReducer[0]?.cus_error_image ? (
          <Button
            onClick={imageErrorFixed}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Resolve Image Error
          </Button>
        ) : (
          <Button
            onClick={imageError}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Error with Image
          </Button>
        )}

        <Button
          onClick={setComplete}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Complete
        </Button>

        <Button className={classes.button} variant="contained" color="primary">
          Download 
        </Button>

          {productOrderReducer[0]?.user_id_ref !== Number(id) ? '': (
 
        <Button className={classes.button}
          variant="contained"
          color="secondary"
          onClick={unassignOrder}>
          Unassign
        </Button>
          )}
      </Grid>
    </div>
  );
};

export default EmployeeOrderPage;
