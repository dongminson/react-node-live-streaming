import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const renderActions = (stream, currentUserId) => {
    if (stream.userId === currentUserId) {
        return (
            <div style={{minWidth: '50px', marginLeft: '10px'}}>
                <Link style={{marginRight: '10px'}} to={`streams/edit/${stream.id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                </Link> 
                <Link to={`streams/delete/${stream.id}`}>
                    <FontAwesomeIcon icon={faTrash} />
                </Link>
            </div>
        )
    }
}

const renderList = (streams, currentUserId) => {
    return(
        <List style={{width: '100%', maxWidth: 960}}>
            {streams.map(stream => {
                return (
                    <ListItem key={stream.id}>
                        <ListItemAvatar>
                            <Avatar>
                                <FontAwesomeIcon icon={faCoffee} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={
                                <Link to={`/streams/${stream.id}`} style={{textDecoration:'none'}}>
                                    {stream.title}
                                </Link>
                            } 
                            secondary={
                                <span style={{wordBreak: 'break-all', maxWidth: '800px'}}>
                                    {stream.description}
                                </span>
                            }
                        />
                        { renderActions(stream, currentUserId) }
                    </ListItem>
                )
            })}
        </List>
    );
}

const renderCreate = (isSignedIn) => {
    if (isSignedIn) {
        return (
            <div style={{textAlign: 'right'}}>
                <Link to="/streams/new">
                    <Button style={{color: '#fff', backgroundColor: '#e91e63', margin: '10px 275px'}}>Create Stream</Button>
                </Link>
            </div>
        )
    }
}

const GenericList = (props) =>  {

    const { isSignedIn, streams, currentUserId, fetchStreams } = props;
    useEffect(() => {
        fetchStreams()
    }, [fetchStreams]);

    return (
        <div>
            <h2>Streams</h2>
            <div style={{display: 'flex', justifyContent: 'center'}}>{renderList(streams, currentUserId)}</div>
            { renderCreate(isSignedIn) }
        </div>
    );
}

const mapStateToProps = (state) => {
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStreams })(GenericList);