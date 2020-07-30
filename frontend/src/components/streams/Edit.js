import React, {useEffect} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import Form from '../shared/Form';

const Edit = (props) => {
    const { id } = props.match.params;
    const { fetchStream } = props;
    
    useEffect(() => {
        fetchStream(id)
    }, [fetchStream, id]);
    
    const onSubmit = (formValues) => {
        props.editStream(props.match.params.id, formValues);
    };

    return (
        <div>
            <h3>Edit a Stream</h3>
            <Form initialValues={_.pick(props.stream, 'title', 'description')} onSubmit={onSubmit}></Form>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, editStream })(Edit);