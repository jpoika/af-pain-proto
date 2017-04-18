import * as React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PainSelector from '../containers/PainSelector';
import {PainLevelInterface} from '../res/data/pain';
export interface Props {
  handleClose(): any;
  selectPain(painLevel:PainLevelInterface): any;
  open: boolean;
}
export default class PainSelectorDialog extends React.Component<Props, any> {

  constructor(props){
    super(props);
    this.state = {
      open: this.props.open
    }
  }

  componentWillReceiveProps = (nextProps)=> {

      this.setState(
        {
          open: nextProps.open
        }
      ) 

  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    const {handleClose} = this.props;
    handleClose();
    this.setState({open: false});
  };



  handleSelect = (painLevel) => {
    const {selectPain} = this.props;
    selectPain(painLevel);
    this.handleClose(); 
  }

  render() {
    
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
         <PainSelector selectPain={this.handleSelect} /> 
        </Dialog>
      </div>
    );
  }
}
