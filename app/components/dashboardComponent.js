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
  isLoading: PropTypes.bool.isRequired,
  handleTouchTap: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  standardActions: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  rooms: PropTypes.array.isRequired
};

export default DashboardComponent;