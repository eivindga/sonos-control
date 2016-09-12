import React from 'react';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
var axios = require('axios');

const styles = {
    customWidth: {
        width: '100%'
    },
};

export default class LimitDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: props.maxVolume};
    }
    handleChange = (event, index, value) => this.setState({value});
    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.props.handleRequestClose}
            />
        ];
        return (<div>
            <Dialog open={this.props.open}
                    title="Set max volume limit"
                    actions={actions}
                    onRequestClose={this.props.handleRequestClose}
            >
                <Table
                    width={this.props.width}
                    fixedHeader={true}
                    selectable={false}
                    multiSelectable={false}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="The Room">Room</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Volume">Current Volume</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={false}
                    >   { this.props.rooms.filter(function (row) {
                            return row.selected;
                        }).map((row, index) => (
                                <TableRow key={index} selected={row.selected}>
                                    <TableRowColumn>{row.roomName}</TableRowColumn>
                                    <TableRowColumn>{row.state.volume}</TableRowColumn>
                                </TableRow>
                            )
                        )
                    }
                    </TableBody>
                </Table>
                <br/>
                <br/>
                <SelectField
                    value={this.props.maxVolume}
                    onChange={this.props.handleUpdateVolume}
                    style={styles.customWidth}
                    floatingLabelText="Do not allow volume above">
                    <MenuItem value={100} primaryText="No limit"/>
                    <MenuItem value={90} primaryText="90%"/>
                    <MenuItem value={80} primaryText="80%"/>
                    <MenuItem value={70} primaryText="70%"/>
                    <MenuItem value={60} primaryText="60%"/>
                    <MenuItem value={50} primaryText="50%"/>
                    <MenuItem value={40} primaryText="40%"/>
                    <MenuItem value={30} primaryText="30%"/>
                    <MenuItem value={20} primaryText="20%"/>
                    <MenuItem value={10} primaryText="10%"/>
                    <MenuItem value={0} primaryText="Mute"/>
                </SelectField>
            </Dialog>
        </div>)
    }
}

LimitDialog.propTypes = {
    handleTouchTap: React.PropTypes.func.isRequired,
    handleRequestClose: React.PropTypes.func.isRequired,
    handleUpdateVolume: React.PropTypes.func.isRequired,
    open: React.PropTypes.bool.isRequired,
    rooms: React.PropTypes.array.isRequired,
    maxVolume: React.PropTypes.number.isRequired
};
