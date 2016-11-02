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
import IconButton from 'material-ui/IconButton';
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
      rooms: [],
      maxVolume: 100
    }
  },
  handleRequestClose() {
    this.setState({
      open: false
    });
  },
  handleUpdateVolume(event, index, value) {
    var selectedRoom = this.state.rooms.find(function(room) {
      return room.selected;
    });
    if (selectedRoom) {
      if (value == 100) {
        axios.get('/' + selectedRoom.roomName + '/clearmaxvolume')
            .then(
                this.setState({
                      open: false
                    }
                ));
      } else {
        axios.get('/' + selectedRoom.roomName + '/setmaxvolume/' + value)
            .then(this.setState({
              open: false
            }));
      }
    }
    console.log("event: ", event);
    console.log("index: ", index);
    console.log("value: ", value);
  },
  openDialogFn: function(e) {
    var selectedRoom = this.state.rooms.find(function (row) {
      return row.selected;
    });
    if (selectedRoom) {
      axios.get('/' + selectedRoom.roomName + '/getmaxvolume')
          .then(response => {
            this.setState({
              maxVolume: response.data,
              open: true
            });
          })
    }
  },

  handleZoneReply(response) {
    var rooms = [];
    response.data.forEach(function(zone) {
      rooms = rooms.concat(zone.members);
    });
    return rooms;
  },
  loadZones: function () {
    axios.get('/zones')
        .then(this.handleZoneReply)
        .then(rooms => {
          this.setState({
            isLoading: false,
            rooms: rooms
          });
        });
  },
  handleReload: function () {
    this.setState({
      isLoading: true,
    }, this.loadZones);
  },
  componentDidMount: function() {
    this.loadZones();
  },
  render() {

    return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div style={styles.container}>
            <h1>Sonos control panel
              <IconButton
                iconClassName="material-icons"
                tooltip="Reload"
                onClick={this.handleReload}
              >autorenew</IconButton>
            </h1>

            <br/>
            <DashboardComponent
            isLoading={this.state.isLoading}
            handleTouchTap={this.openDialogFn}
            handleRequestClose={this.handleRequestClose}
            handleUpdateVolume={this.handleUpdateVolume}
            rooms={this.state.rooms}
            open={this.state.open}
            maxVolume={this.state.maxVolume}/>
          </div>
        </MuiThemeProvider>
    )
  }
});

export default Main;
//module.exports = Main;
