/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashboardComponent from './components/dashboardComponent';
import FontIcon from 'material-ui/FontIcon';
var axios = require('axios');

const iconStyles = {
  marginRight: 24
};


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 100
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
      open: false,
      isLoading: true,
      rooms: []
    }
  },
  handleRequestClose() {
    this.setState({
      open: false
    });
  },

  handleTouchTap: function(e) {
    this.setState({
      open: true
    });
  },

  handleZoneReply(response) {
    var rooms = [];
    response.data.forEach(function(zone) {
      rooms = rooms.concat(zone.members);
    });
    return rooms;
  },
  componentDidMount: function() {
    axios.get('/zones')
        .then(this.handleZoneReply)
        .then(rooms => {
          this.setState({
            isLoading: false,
            rooms: rooms
          });
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
            <h1>Sonos control panel</h1>
            <h2>For the advanced home user</h2>
            <br/>
            <DashboardComponent
            standardActions={standardActions}
            isLoading={this.state.isLoading}
            handleTouchTap={this.handleTouchTap}
            handleRequestClose={this.handleRequestClose}
            rooms={this.state.rooms}
            open={this.state.open}/>
          </div>
        </MuiThemeProvider>
    )
  }
});

export default Main;
//module.exports = Main;
