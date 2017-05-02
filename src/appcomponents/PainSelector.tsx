import * as React from "react";
import PainExplanationDialog from './PainExplanationDialog';
import {PainLevelInterface} from '../res/data/pain';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
export interface Props {
  selectPain(painLevel: PainLevelInterface);
  painLevels: any[];
  painLevel?: PainLevelInterface
}
export interface State {
}



export default class PainSelector extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      painLevel: null
  };

  constructor(props){
    super(props);
    this.state = {
    };
  }
  handlePainColor = (painLevel) => {
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

  handleChange = (event, index, value) => {
      const {selectPain} = this.props;
      value && selectPain(value);
  }

  renderSelectItemText = (lvl) => {
    return <div>
              <span style={{fontWeight: 'bolder',color: this.handlePainColor(lvl)}}>{lvl.title}</span> 
              &nbsp;&nbsp;<span>{lvl.description}</span>
            </div>;
  }

  render(){
    const {painLevels} = this.props;
    return <div>
            <PainExplanationDialog painLevels={painLevels} />
              <SelectField
                floatingLabelText="Pain Level"
                value={this.props.painLevel}
                onChange={this.handleChange}
                
                autoWidth={true}
              >
                {painLevels.map(lvl => <MenuItem value={lvl} primaryText={this.renderSelectItemText(lvl)} />)}
              </SelectField>
      </div>

   }
}
