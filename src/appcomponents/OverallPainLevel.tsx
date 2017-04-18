import PainSelector from '../containers/PainSelector';
import {PainLevelInterface} from '../res/data/pain';
import * as React from "react";

export interface Props {
  selectPain(assessmentId: number, categoryId: number, painLevel:PainLevelInterface);
  assessmentId: number;
  categoryId: number;
  title: string;
  painLevel: PainLevelInterface;
}

export interface State {
  
}

export default class OverallPain extends React.Component<Props, State>{

  handleSelectPain = (painLevel:PainLevelInterface) => {
    const {selectPain,assessmentId,categoryId} = this.props;
     
    selectPain(assessmentId,categoryId,painLevel);
    
  }

  render(){
    const {title,painLevel} = this.props;
    return <div>
              <h1>{title} {painLevel.level > 0 && painLevel.level}</h1>
              {painLevel.level > 0 && <div>Current Selection: {this.props.painLevel.description}</div>}
              {painLevel.level === 0 && <div>Select a Pain Level Below</div>}
              <img src={require("../res/images/scale_top.jpg")} width="400" />
              <PainSelector selectPain={this.handleSelectPain} />
           </div>
  }

}