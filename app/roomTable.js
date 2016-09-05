import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  }
};


export default class RoomTable extends React.Component {

    constructor(props) {
        super(props);

        this.handleSelection = this.handleSelection.bind(this);
        this.state = {
            fixedHeader: true,
            stripedRows: false,
            showRowHover: true,
            selectable: true,
            multiSelectable: true,
            enableSelectAll: true,
            deselectOnClickaway: false,
            showCheckboxes: true,
            width: '4%',
            rooms: this.props.rooms
        };
    }

    handleSelection = (selectedRows) => {
        var rooms = this.state.rooms;
        if (selectedRows == 'all') {
        rooms = rooms.map(function(item, index) {
          item.selected = true;
            return item;
        });
        } else {
            rooms = rooms.map(function(item, index) {
                if (selectedRows.indexOf(index) != -1) {
                    item.selected = true;
                }
                return item;
            })
        }
        this.setState({
            rooms: rooms
        });
    //      console.log("this row was selected: " + selectedRows);
    };

    handleToggle = (event, toggled) =>{
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({height: event.target.value});
    };

    render() {
        return (
            <div>
                <Table
                    width={this.state.width}
                    fixedHeader={this.state.fixedHeader}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                    onRowSelection={this.handleSelection}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="The Room">Room</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Zone Status">Zone Status</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Volume">Room Volume</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Volume">Zone Volume</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Room mute">Room Mute</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Zone mute">Zone Mute</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Zone id">Zone id</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.state.rooms.map( (row, index) => (
                            <TableRow key={index} selected={row.selected}>
                                <TableRowColumn>{row.roomName}</TableRowColumn>
                                <TableRowColumn>{row.state.zoneState}</TableRowColumn>
                                <TableRowColumn>{row.state.volume}</TableRowColumn>
                                <TableRowColumn>{row.groupState.volume}</TableRowColumn>
                                <TableRowColumn>{JSON.stringify(row.state.mute)}</TableRowColumn>
                                <TableRowColumn>{JSON.stringify(row.groupState.mute)}</TableRowColumn>
                                <TableRowColumn>{row.coordinator}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
