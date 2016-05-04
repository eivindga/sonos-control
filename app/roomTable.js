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

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  }
];

var RoomTable = React.createClass({

  getInitialState: function () {
    return {
      fixedHeader: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: false,
      showCheckboxes: true,
      width: '4%',
      rooms: tableData
    }
  },
  handleToggle: (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  },
  handleChange: (event) => {
    this.setState({height: event.target.value});
  },
  render() {
    return (
        <div>
          <Table
              width={this.state.width}
              fixedHeader={this.state.fixedHeader}
              selectable={this.state.selectable}
              multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
                displaySelectAll={this.state.showCheckboxes}
                adjustForCheckbox={this.state.showCheckboxes}
                enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
            >
              {tableData.map( (row, index) => (
                  <TableRow key={index} selected={row.selected}>
                    <TableRowColumn>{index}</TableRowColumn>
                    <TableRowColumn>{row.name}</TableRowColumn>
                    <TableRowColumn>{row.status}</TableRowColumn>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
       </div>
    );
  }
});

export default RoomTable;