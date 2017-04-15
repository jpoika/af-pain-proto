import * as React from "react";

export interface Props {
  selectPain(painLevel: number);
}

export default class PainSelector extends React.Component<Props, any>{

  selectPain = (pain: number) => {
    const {selectPain} = this.props;
    return (event) => {
     
      selectPain(pain);
    }
    
  }


  render(){

    return <div>
      <h3>Pain Select</h3>
          <table cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr>
                  <td><img src={require('../res/images/scale_0.jpg')} onClick={this.selectPain(0)} width="36" height="16" /></td>
                  <td><img src={require('../res/images/scale_1.jpg')} onClick={this.selectPain(1)} width="35" height="16"  /></td>
                  <td><img src={require('../res/images/scale_2.jpg')} onClick={this.selectPain(2)} width="32" height="16"  /></td>
                  <td><img src={require('../res/images/scale_3.jpg')} onClick={this.selectPain(3)} width="32" height="16"  /></td>
                  <td><img src={require('../res/images/scale_4.jpg')} onClick={this.selectPain(4)} width="34" height="16"  /></td>
                  <td><img src={require('../res/images/scale_5.jpg')} onClick={this.selectPain(5)} width="31" height="16"  /></td>
                  <td><img src={require('../res/images/scale_6.jpg')} onClick={this.selectPain(6)} width="33" height="16"  /></td>
                  <td><img src={require('../res/images/scale_7.jpg')} onClick={this.selectPain(7)} width="31" height="16"  /></td>
                  <td><img src={require('../res/images/scale_8.jpg')} onClick={this.selectPain(8)} width="32" height="16"  /></td>
                  <td><img src={require('../res/images/scale_9.jpg')} onClick={this.selectPain(9)} width="34" height="16"  /></td>
                  <td><img src={require('../res/images/scale_10.jpg')} onClick={this.selectPain(10)} width="30" height="16"   /></td>
              </tr>
              </tbody>
            </table>
      </div>

   }
}
