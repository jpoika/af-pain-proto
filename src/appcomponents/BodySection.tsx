import * as React from "react";
import PainSelector, {Props as PainSelectProps} from './PainSelector';
export interface Props{
  image: string;
  id?: string;
}

export interface State{
  selected: boolean;
  painLevel: number;
}

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */

export interface DialogProps extends PainSelectProps{
  open: boolean;
  handleClose(): any;
}
export interface DialogState{
  open: boolean;
  painLevel: 0;
}
class BodySectionDialog extends React.Component<any, any> {

  constructor(props){
    super(props);
    this.state = {
      open: this.props.open,
      painLevel: 0
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
    
    this.setState({
      painLevel: painLevel
    });
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


export default class BodySection extends React.Component<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      selected: false,
      painLevel: 0
    }
  }

  handleClick = (event) => {

    this.setState({
      selected: true
    });
  }

  handleSelectPain = (painLevel) => {
    console.log(painLevel)
    this.setState({
      painLevel: painLevel,
      selected: false
    });
  }

  handleClose = () => {
    this.setState({
      selected: false
    });
  }

  render(){
    const {image,id} = this.props;

    return (
      <div style={{position: 'relative'}}>
          {this.state.painLevel > 0 && <div style={{fontSize: '4em',position: 'absolute',top: '20px', left: '10px'}}>{this.state.painLevel}</div>}
          <img style={{opacity: this.state.painLevel > 0 ? 0.5 : 1}} onClick={this.handleClick} src={image}  id={id} />
          <BodySectionDialog handleClose={this.handleClose} selectPain={this.handleSelectPain} open={this.state.selected} /> 
      </div>
      )
    
  }
}