import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions'
import Form from '../shared/Form';

const Create = (props) => {

    const onSubmit = (formValues) => {
        props.createStream(formValues);
    }

    return (
        <div>
            <h3>Create a Stream</h3>
            <Form onSubmit={onSubmit}/>
        </div>
    );
}

export default connect(null, { createStream })(Create);