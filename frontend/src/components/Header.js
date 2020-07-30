import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'left'
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    }
}));

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <FontAwesomeIcon icon={faCoffee} />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/" className={classes.link}>
                        CoffeeStreams
                    </Link>
                </Typography>
                <Link to="/" className={classes.link}>
                    All Streams
                </Link>
                <GoogleAuth />
            </Toolbar>
        </AppBar>
    );
}

export default Header