import React from 'react';
var PropTypes = React.PropTypes;
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import RoomTable from './../roomTable';

function DashboardComponent (props) {
  console.log(props);
  return props.isLoading === true
      ? <CircularProgress size={2}/>
      :
        <div>
          <RoomTable rooms={props.rooms} ></RoomTable>
          <Dialog
                     open={props.open}
          title="My super dialog"
          actions={props.standardActions}
          onRequestClose={props.handleRequestClose}
          >{JSON.stringify(props.rooms)}
          </Dialog>
          <br/>
          <RaisedButton label="Set max volume" primary={true} onTouchTap={props.handleTouchTap} />
        </div>
}

DashboardComponent.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  handleTouchTap: React.PropTypes.func.isRequired,
  handleRequestClose: React.PropTypes.func.isRequired,
  standardActions: React.PropTypes.object.isRequired,
  open: React.PropTypes.bool.isRequired,
  rooms: React.PropTypes.array.isRequired
};

export default DashboardComponent;