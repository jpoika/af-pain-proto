import PainSelector from '../containers/PainSelector';
import {PainLevelInterface} from '../res/data/pain';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import * as React from "react";

export interface Props {
  selectPain(assessmentId: number, categoryId: number, painLevel:PainLevelInterface);
  assessmentId: number;
  categoryId: number;
  title: string;
  painLevel: PainLevelInterface;
  isSaved: boolean;
  step?: number;
  actions?: JSX.Element;
  onComplete?(): any;

}

export interface State {
  painLevel: PainLevelInterface;
  isSaved: boolean;
}



export default class OverallPain extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      step: -1,
      actions: null,
      onComplete: () => {}
  };

  constructor(props){
    super(props);
    this.state = {
      painLevel: this.props.painLevel,
      isSaved: this.props.isSaved
    }
  }

  handleSelectPain = (painLevel:PainLevelInterface) => {
    this.setState({
      painLevel: painLevel,
      isSaved: true //well not necessarily saved //TODO change name to ?isDirty?
    });
  }

  handleSave = (event) => {
    const {selectPain,assessmentId,categoryId,onComplete} = this.props;
    selectPain(assessmentId,categoryId,this.state.painLevel);
    onComplete();
  }

  render(){
    const {title,step,actions} = this.props;
    const {painLevel,isSaved} = this.state;
    let additionalActions = null
    if(actions){
      additionalActions = actions;
    }
    return <div>
              <h1>{title}: {isSaved && painLevel.level}</h1>
              {isSaved && <h3>{painLevel.description}</h3>}
              {!isSaved && <h3>Select a Pain Level Below</h3>}
              <img src={require("../res/images/scale_top.jpg")} width="400" />
              <PainSelector selectPain={this.handleSelectPain} />
              <div style={{margin: '12px 0'}}>

                    <RaisedButton 
                              disableTouchRipple={true}
                              disableFocusRipple={true}
                              primary={true}type="button" onTouchTap={this.handleSave}
                              style={{marginRight: 12}}
                            >{additionalActions ? 'Next' : 'Save'}</RaisedButton>

                        {additionalActions}

              </div>
           </div>
  }

}