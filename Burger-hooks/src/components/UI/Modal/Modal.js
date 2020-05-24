import React, { Fragment } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
    <Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}

            className={classes.Modal}>
            {props.children}
        </div>
    </Fragment>
);

//WE IMPLEMENT WHAT WE ACTUALLY WANT TO COMPARE WITH MEMO, BECAUSE THERE IS NO NEED TO COMPARE ALL PROPERTIES
export default React.memo(modal, (prevProps, nextProps) => {
    return nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
});