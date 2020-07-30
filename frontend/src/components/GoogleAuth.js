import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles(() => ({
    button: {
        color: '#fff',
        backgroundColor: '#d32f2f',
        marginLeft: '12px',
        "&:hover": {
            backgroundColor: '#d32f2f'
        }
    },
    icon: {
        marginRight: '4px'
    }

}));

const GoogleAuth = (props) => { 
    const classes = useStyles();
    const { isSignedIn } = props;
    let [auth, setAuth] = useState(null);
    
    useEffect(() => {
        window.gapi.load('client:auth2', () => { 
            window.gapi.client.init({
                clientId: '906224778962-l54fopsbh6j5bvranh637s4c214snaf5.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                let instance = window.gapi.auth2.getAuthInstance();
                setAuth(instance);
            });
        });
    }, []);

    useEffect(() => {
        const onAuthChange = (isSignedIn) => {
            if (isSignedIn) {
                props.signIn(auth.currentUser.get().getId());
            } else {
                props.signOut();
            }
        };

        if (auth) {
            onAuthChange(auth.isSignedIn.get());
            auth.isSignedIn.listen(onAuthChange);
        }
    }, [auth]);

    const onSignIn = () => {
        auth.signIn();
    }

    const onSignOut = () => {
        auth.signOut();
    }

    const renderAuthButton = (isSignedIn) => {
        if (isSignedIn === null) {
            return null
        } else {
            return (
                <Button className={classes.button} onClick={(isSignedIn) ? onSignOut : onSignIn}>
                    <FontAwesomeIcon className={classes.icon} icon={faGoogle} />
                    {(isSignedIn) ? 'Sign Out' : 'Sign In'}
                </Button>
            )
        }
    }
   
    return (
        <div>
            { renderAuthButton(isSignedIn) }
        </div>
    );
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);