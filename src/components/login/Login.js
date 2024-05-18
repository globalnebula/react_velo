import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { withStyles, Paper, TextField } from '@material-ui/core';
// import GoogleButton from 'react-google-button'; // optional

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 3,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing.unit * 2,
  },
  submitButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: '0 30px',
    height: 48,
    margin: theme.spacing.unit,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  textField: {
    '& input': {
      transition: 'transform 50ms ease-in-out',
    },
    '& input:focus': {
      transform: 'scale(1.1)',
    },
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bike: {
        color: '', // Initial value
      },
      username: '', // Initial value or get from props if needed
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      [name]: value,
      bike: name === 'color' ? { ...prevState.bike, color: value } : prevState.bike
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { firebase, username } = this.props;
    const { bike } = this.state;
    // Call the login function from firebase with the username
    firebase.login({ email: username });
    // Reset the state after submission
    this.setState({
      bike: {
        color: '',
      },
      username: '',
    });
  };
  
  render() {
    const { classes } = this.props;
    const { username, bike } = this.state;
  
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="string"
              name="username"
              fullWidth
              onChange={this.handleChange}
              value={username}
              inputProps={{ tabIndex: 1 }}
              className={classes.textField}
            />
            <TextField
              margin="dense"
              id="color"
              label="Color"
              type="string"
              name="color"
              onChange={this.handleChange}
              fullWidth
              value={bike.color}
              inputProps={{ tabIndex: 2 }}
              className={classes.textField}
            />
            <div className={classes.buttonContainer}>
              <button type="submit" className={classes.submitButton}>
                Login
              </button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object,
  username: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.firebase.authError,
});

const mapDispatchToProps = dispatch => ({
  // Calling the action creator using dispatch
  // This is not necessary in this component but could be in other components
  // handleAuth: (user) => dispatch(authActions.authenticate(user)),
});

const wrappedLogin = compose(
  withStyles(styles),
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(Login);

export default wrappedLogin;