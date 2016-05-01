/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  }
});

var Main  = React.createClass({
  getInitialState: function () {
    return {
      open: false
    }
  },
  handleRequestClose() {
    this.setState({
      open: false,
    });
  },

  handleTouchTap: function(e) {
    this.setState({
      open: true,
    });
  },

  render() {
    const standardActions = (
        <FlatButton
            label="Ok"
            secondary={true}
            onTouchTap={this.handleRequestClose}
        />
    );

    return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div style={styles.container}>
            <Dialog
                open={this.state.open}
                title="Super Secret Password"
                actions={standardActions}
                onRequestClose={this.handleRequestClose}
            >
              1-2-3-4-5
            </Dialog>
            <h1>material-ui</h1>
            <h2>example project</h2>
            <RaisedButton
                label="Super Secret Password"
                primary={true}
                onTouchTap={this.handleTouchTap}
            />
          </div>
        </MuiThemeProvider>
    );
  }
});

export default Main;
//module.exports = Main;
