import * as React from "react";
import PainExplanationButton from '../containers/PainExplanationButton';
import {PainLevelInterface} from '../res/data/pain';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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



export default class PainSelector extends React.Component<Props, State>{
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



  handleChange = (event, index, value) => {
      const {selectPain} = this.props;
      value && selectPain(value);
  }

  renderSelectItemText = (lvl) => {
    return <div>
              <span style={{fontWeight: 'bolder',color: lvl.color}}>{lvl.title}</span> 
              &nbsp;&nbsp;<span>{lvl.description}</span>
            </div>;
  }

  render(){
    const {painLevels,restoreContent,replaceContent,skipNoPain} = this.props;
    const pLevels = painLevels.filter((v,i) => {
                                      if(skipNoPain && !i){
                                        return false;
                                      }
                                      return true;
                                    });
    return <div>

              <SelectField
                floatingLabelText="Pain Level"
                value={this.props.painLevel}
                onChange={this.handleChange}
                
                autoWidth={true}
              >
                {pLevels.map((lvl,index) => <MenuItem key={index} value={lvl} primaryText={this.renderSelectItemText(lvl)} />)}
              </SelectField>
            
            <PainExplanationButton restoreContent={restoreContent} replaceContent={replaceContent} />
            
            
      </div>

   }
}
