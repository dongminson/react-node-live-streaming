import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '350px'
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 2, 3, 2),
    },
    background: {
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '10px 25px 0 0'
    },
}));

const GenericModal = (props) => {
    const classes = useStyles();

    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className={classes.background}>
            <div onClick={(e) => { e.stopPropagation()} } className={classes.modal}>
                <div className={classes.paper}>
                    <div>
                        <DialogTitle>{props.title}</DialogTitle>
                        <DialogContent>
                            {props.content}
                        </DialogContent>
                        <div className={classes.actions}>
                            {props.actions}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ,
        document.querySelector('#modal')
    )
}

export default GenericModal;