import React, {useEffect} from 'react';
import GenericModal from '../shared/Modal';
import history from '../history';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from  '../../actions'
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

const renderActions = (deleteStream, id) => {
    return (
        <React.Fragment>
            <Button onClick={() => deleteStream(id)} style={{color: '#fff', backgroundColor: '#d32f2f', marginRight: '10px'}} >Delete</Button>
            <Link to="/" className="ui button"><Button style={{color: '#fff', backgroundColor: '#e91e63'}}>Cancel</Button></Link>
        </React.Fragment>
    );
}

const renderContent = (stream) => {
    if (!stream) {
        return;
    }
    const { title } = stream;
    return `Are you sure you want to delete ${title}?`
}

const Delete = (props) => {
    const { id } = props.match.params;
    const { stream, deleteStream, fetchStream } = props;

    useEffect(() => {fetchStream(id)}, [fetchStream, id]);
    
    return (
        <GenericModal 
            title="Delete a Stream" 
            content={renderContent(stream)}
            actions={renderActions(deleteStream, id)}
            onDismiss={() => history.push('/')}
        />
    );
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(Delete);