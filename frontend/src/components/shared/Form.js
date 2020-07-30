import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    error: {
        color: 'red'
    },
    none: {
        display: 'none'
    },
    button: {
        color: '#fff',
        backgroundColor: '#e91e63',
        width: '200px',
        marginTop: '15px',
        "&:hover": {
            backgroundColor: '#e91e63'
        }
    },
    field: {
        width: '400px',
    },
    area: {
        width: '400px',
        marginTop: '10px'
    }
}));

const renderInput = ({ input, label, meta, key, custom, multiline, rows, className }) => {
    return (
        <div>
            <TextField
                error={(meta.error && meta.touched)}
                id={key}
                label={label}
                multiline={multiline}
                rows={rows}
                className={className}
                {...input}
                {...custom}
                helperText={(meta.error && meta.touched) ? meta.error : ''}
            />
        </div>
    );
}

const Form = (props) => {
    const classes = useStyles();
    return (
        <form onSubmit={props.handleSubmit}>
            <Field className={classes.field} key="title" name="title" component={renderInput} label="Enter Title" />
            <Field className={classes.area} rows={4} multiline key="description" name="description" component={renderInput} label="Enter Description" />
            <Button type="submit" className={classes.button}>Submit</Button>
        </form>
    );
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
}

export default reduxForm({
    form: 'Form',
    validate
})(Form);

