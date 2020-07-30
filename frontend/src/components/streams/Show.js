import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '70vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const Show = (props) => {
    const videoRef = useRef(null);
    const classes = useStyles();
    let [player, setPlayer] = useState(null);

    useEffect(() => {
        const { id } = props.match.params;
        props.fetchStream(id);
        return () => {
            if (player){
                player.destroy();
            }
        }
    }, []);

    useEffect(() => {
        const { id } = props.match.params;
        buildPlayer(id);
    });

    const buildPlayer = (id) => {
        if (player || !props.stream) {
            return;
        }
        const instance = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        instance.attachMediaElement(videoRef.current);
        instance.load();
        setPlayer(instance);
    }

    if (!props.stream) {
        return (
            <div className={classes.root}>
                <CircularProgress size='12rem' />
            </div>
        );
    }
    const { title, description } = props.stream;

    return (
        <div>
            <video ref={videoRef} style={{width: '100%' }} controls={true} />
            <h1>{title}</h1>
            <h5>{description}</h5>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {fetchStream})(Show);