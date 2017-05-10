import * as React from "react";
import {BodySectionInterface} from '../res/data/body';
import {PainLevelInterface} from '../res/data/pain';
import PainSelectorDialog from './PainSelectorDialog';
export interface Props{
  section: BodySectionInterface
  markPain(sectionId: number, painLevelId: number): any;
  assessmentId: number;
  savedPain: PainLevelInterface;
}

export interface State{
  selected: boolean;
  painLevel: PainLevelInterface;
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


export default class BodySection extends React.Component<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      selected: false,
      painLevel: props.savedPain
    }
  }

  handleClick = (event) => {
    const {section,markPain} = this.props;
    if(!section.isBlank){
      this.setState({
        selected: true
      });
    }
  }

  handleSelectPain = (painLevel) => {

    const {section,markPain} = this.props;

    markPain(section.id,painLevel);
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
  handlePainColor = () => {
    const {painLevel} = this.state;
    if(painLevel.level === 0){
      return '#000000'
    }
    if(painLevel.level < 3){
      return '#3C9344';
    }
    if(painLevel.level < 5){
      return '#8FB545';
    }
    if(painLevel.level < 7){
      return '#EAD23A';
    }
    if(painLevel.level < 9){
      return '#D67034';
    }
    return '#A12629';
  }
  render(){
    const {section} = this.props;
    let imageStyles = {opacity: this.state.painLevel.level > 0 ? 0.5 : 1};
    let painStyles = {color: this.handlePainColor(), fontSize: '2.2em',position: 'absolute',top: '20px', left: '5px'};
    if(this.state.painLevel.level !== 10){
      painStyles = {...painStyles,left: '12px'};
    }
    imageStyles = {...imageStyles, width: '40px', height: '40px'}

    return (
      <div style={{position: 'relative'}}>
          {this.state.painLevel.level > 0 && <div style={painStyles as any}>{this.state.painLevel.level}</div>}
          <img style={imageStyles} onClick={this.handleClick} src={section.image}  key={section.id} />
          <PainSelectorDialog handleClose={this.handleClose} selectPain={this.handleSelectPain} open={this.state.selected} />
      </div>
      )
    
  }
}



