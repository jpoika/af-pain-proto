import * as React from "react";
import {PainLevelInterface} from '../res/data/pain';
export interface Props {
  selectPain(painLevel: PainLevelInterface);
  painLevels: any[];
}
const getPainColumn = (level,width,selectPain) => {
  return <td><img src={level.image} onClick={selectPain(level)} width={width} height="16" /></td>;
}
export default class PainSelector extends React.Component<Props, any>{

  selectPain = (pain: PainLevelInterface) => {
    const {selectPain} = this.props;
    return (event) => {
     
      selectPain(pain);
    }
    
  }


  render(){
    const {painLevels} = this.props;
    return <div>
      <h3>Select Your Pain Level from the Graphic Below</h3>
          <table cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr>
                 {getPainColumn(painLevels[0],'36',this.selectPain)}
                 {getPainColumn(painLevels[1],'35',this.selectPain)}
                 {getPainColumn(painLevels[2],'32',this.selectPain)}
                 {getPainColumn(painLevels[3],'32',this.selectPain)}
                 {getPainColumn(painLevels[4],'34',this.selectPain)}
                 {getPainColumn(painLevels[5],'31',this.selectPain)}
                 {getPainColumn(painLevels[6],'33',this.selectPain)}
                 {getPainColumn(painLevels[7],'31',this.selectPain)}
                 {getPainColumn(painLevels[8],'32',this.selectPain)}
                 {getPainColumn(painLevels[9],'34',this.selectPain)}
                 {getPainColumn(painLevels[10],'30',this.selectPain)}
      

              </tr>
              </tbody>
            </table>
      </div>

   }
}
