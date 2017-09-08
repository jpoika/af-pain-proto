import PainSelector from '../../containers/pain/inputs/PainSelector';
import PainRadioSelector from '../../containers/pain/inputs/PainRadioSelector';
import {PainLevelInterface} from '../../res/data/pain';
import RaisedButton from 'material-ui/RaisedButton';
import {AssessmentInterface} from '../../res/data/assessments';
import * as React from "react";

export interface Props {
  selectPain(assessment: AssessmentInterface, categoryId: number, painLevel:PainLevelInterface);
  assessment: AssessmentInterface;
  categoryId: number;
  title: string;
  painLevel: PainLevelInterface;
  isSaved: boolean;
  step?: number;
  actions?: JSX.Element;
  onComplete?(): any;
  checkPain?: boolean;
  replaceContent(content: any): void;
  restoreContent(): void;
  selectorType?: string;
}

export interface State {
  painLevel: PainLevelInterface;
  isSaved: boolean;
}



export default class OverallPain extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      step: -1,
      actions: null,
      onComplete: () => {},
      checkPain: false,
      selectorType: 'dropdown'
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
    const {selectPain,assessment,categoryId,onComplete} = this.props;
    selectPain(assessment,categoryId,this.state.painLevel);
    onComplete();
  }

  render(){
    const {title,actions,restoreContent,replaceContent,categoryId} = this.props;
    const {painLevel,isSaved} = this.state;
    let additionalActions = null
    if(actions){
      additionalActions = actions;
    }
    
    let painSelector = <PainSelector skipNoPain={categoryId === 3} restoreContent={restoreContent} replaceContent={replaceContent}  selectPain={this.handleSelectPain} painLevel={painLevel} />;
    if(this.props.selectorType !== 'dropdown'){
      painSelector = <PainRadioSelector skipNoPain={categoryId === 3} restoreContent={restoreContent} replaceContent={replaceContent}  selectPain={this.handleSelectPain} painLevel={painLevel} />;
    }
    return <div>
              <h1 style={{color: isSaved ? painLevel.color : 'black'}}>{title}: {isSaved && painLevel.level}</h1>
              {isSaved && <h3 style={{color: painLevel.color}}>{painLevel.description}</h3>}
              {!isSaved && <h3>Select a Pain Level Below</h3>}
              {/*<img src={require("../res/images/scale_top.jpg")} width="400" />*/}
              {painSelector}
              {this.props.children}
              <div style={{margin: '12px 0',clear: 'both'}}>
                     <RaisedButton 
                              label={additionalActions ? 'Next' : 'Save'}
                              disableTouchRipple={true}
                              disableFocusRipple={true}
                              primary={true} 
                              type="button" 
                              onTouchTap={this.handleSave}
                              labelColor="#FFFFFF"
                              style={{marginRight: 12}}
                            />

                        {additionalActions}

              </div>
           </div>
  }

}