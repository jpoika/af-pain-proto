import * as React from "react";
// import PainExplanationButton from '../containers/PainExplanationButton';
import {PainLevelInterface} from '../res/data/pain';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export interface Props {
  selectPain(painLevel: PainLevelInterface);
  painLevels: any[];
  painLevel: PainLevelInterface
  replaceContent(content: any): void;
  restoreContent(): void;
  skipNoPain?: boolean;
}
export interface State {
}



export default class PainRadioSelector extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      painLevel: null,
      skipNoPain: false
  };

  constructor(props){
    super(props);
    this.state = {
      painLevel: this.props.painLevel
    };
  }



  handleChange = (event, value) => {
      const {selectPain} = this.props;
      value && selectPain(value);
  }

  renderSelectItemText = (lvl,currentLevel) => {
    return <div>
              <span style={{fontWeight: 'bolder',color: lvl.color}}>{lvl.title}</span> 
              &nbsp;&nbsp;<span style={{fontWeight: 'bolder',color: lvl.color}}>{lvl.description}</span>
            </div>;
  }

  render(){
    const {painLevels, /*restoreContent,replaceContent,*/skipNoPain} = this.props;
    const pLevels = painLevels.filter((v,i) => {
                                      if(skipNoPain && !i){
                                        return false;
                                      }
                                      return true;
                                    });
    return <div>

    <RadioButtonGroup name="painSelect" onChange={this.handleChange} valueSelected={this.props.painLevel} >
      {pLevels.map((lvl,index) => <RadioButton style={{minHeight: 30}} key={index} value={lvl} label={this.renderSelectItemText(lvl,this.props.painLevel)} />)}
    </RadioButtonGroup>
            
            
            
      </div>

   }
}
