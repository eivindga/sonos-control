import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';
import RoomTable from './roomTable';
import LimitDialog from './limitDialog';

function DashboardComponent (props) {
  return props.isLoading === true
      ? <CircularProgress size={2}/>
      :
        <div>
          <RoomTable rooms={props.rooms} ></RoomTable>
          <LimitDialog
              handleTouchTap={props.handleTouchTap}
              handleRequestClose={props.handleRequestClose}
              handleUpdateVolume={props.handleUpdateVolume}
              open={props.open}
              rooms={props.rooms}
              maxVolume={props.maxVolume}
          />
          <br/>
          <RaisedButton label="Set max volume" primary={true} onTouchTap={props.handleTouchTap} />
        </div>
}

DashboardComponent.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  handleTouchTap: React.PropTypes.func.isRequired,
  handleRequestClose: React.PropTypes.func.isRequired,
  handleUpdateVolume: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired,
  maxVolume: React.PropTypes.number.isRequired,
  rooms: React.PropTypes.array.isRequired
};

export default DashboardComponent;