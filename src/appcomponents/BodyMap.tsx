import * as React from "react";
import PainSelector, {Props as PainSelectorProps}  from './PainSelector';
const trBody = {
  paddingBottom: '0em',
  borderSpacing: '0px',
  borderCollapse: 'separate'
};
const tdBody = {
  padding:0, 
  margin:0,
  borderCollapse: 'separate',
  lineHeight: 0
};

export interface Props extends PainSelectorProps {

}
export default class AccountPage extends React.Component<Props, any>{

  mark = (event) => {
    console.log(event);
  }

  
  /*
    function mark(el) {
      
      if (el.style.opacity == 1)
      {
          el.style.opacity = .5;
      }
      else
      {
          el.style.opacity = 1;
      }
    }
    */


  render(){

    const {selectPain} = this.props

    return <div>
              <h3>Body Map</h3>
              <table style={ {borderCollapse: 'separate',borderSpacing: '0px' }} cellPadding="0" cellSpacing="0">
                <tbody>
                <tr style={trBody}>
                    <td style={tdBody}><img onClick={this.mark} src={require('../res/images/body_map/bodyMap1.png')} /></td>
                    <td style={tdBody}><div id="bm1_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap2.png')}  id="bm1" /></td>
                    <td style={tdBody}><div id="bm2_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap3.png')}  id="bm2" /></td>
                    <td style={tdBody}><img onClick={this.mark} src={require('../res/images/body_map/bodyMap4.png')} /></td>
                </tr>
                <tr style={trBody}>
                    <td style={tdBody}><div id="bm3_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap5.png')}  id="bm3" /></td>
                    <td style={tdBody}><div id="bm4_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap6.png')}  id="bm4" /></td>
                    <td style={tdBody}><div id="bm5_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap7.png')}  id="bm5" /></td>
                    <td style={tdBody}><div id="bm6_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap8.png')}  id="bm6" /></td>
                </tr>
                <tr style={trBody}>
                    <td style={tdBody}><div id="bm7_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap9.png')}  id="bm7" /></td>
                    <td style={tdBody}><div id="bm8_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap10.png')}  id="bm8" /></td>
                    <td style={tdBody}><div id="bm9_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap11.png')}  id="bm9" /></td>
                    <td style={tdBody}><div id="bm10_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap12.png')}  id="bm10" /></td>
                </tr>
                <tr style={trBody}>
                    <td style={tdBody}><div id="bm11_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap13.png')}  id="bm11" /></td>
                    <td style={tdBody}><div id="bm12_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap14.png')}  id="bm12" /></td>
                    <td style={tdBody}><div id="bm13_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap15.png')}  id="bm13" /></td>
                    <td style={tdBody}><div id="bm14_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap16.png')}  id="bm14" /></td>
                </tr>   
                <tr style={trBody}>
                    <td style={tdBody}><div id="bm15_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap17.png')}  id="bm15" /></td>
                    <td style={tdBody}><div id="bm16_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap18.png')}  id="bm16" /></td>
                    <td style={tdBody}><div id="bm17_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap19.png')}  id="bm17" /></td>
                    <td style={tdBody}><div id="bm18_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap20.png')}  id="bm18" /></td>
                </tr>
                <tr style={trBody}>
                    <td style={tdBody}><img onClick={this.mark} src={require('../res/images/body_map/bodyMap21.png')} /></td>
                    <td style={tdBody}><div id="bm19_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap22.png')}  id="bm19" /></td>
                    <td style={tdBody}><div id="bm20_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap23.png')}  id="bm20" /></td>
                    <td style={tdBody}><img onClick={this.mark} src={require('../res/images/body_map/bodyMap24.png')} /></td>
                </tr>
                <tr style={trBody}>
                    <td style={tdBody}><img onClick={this.mark} src={require('../res/images/body_map/bodyMap25.png')} /></td>
                    <td style={tdBody}><div id="bm21_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap26.png')}  id="bm21" /></td>
                    <td style={tdBody}><div id="bm22_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap27.png')}  id="bm22" /></td>
                    <td style={tdBody}><img onClick={this.mark} src={require('../res/images/body_map/bodyMap28.png')} /></td>
                </tr>
                <tr style={trBody}>
                    <td style={tdBody}><img onClick={this.mark} src={require('../res/images/body_map/bodyMap29.png')} /></td>
                    <td style={tdBody}><div id="bm23_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap30.png')}  id="bm23" /></td>
                    <td style={tdBody}><div id="bm24_value"></div><img onClick={this.mark} src={require('../res/images/body_map/bodyMap31.png')}  id="bm24" /></td>
                    <td style={tdBody}><img onClick={this.mark} src={require('../res/images/body_map/bodyMap32.png')} /></td>
                </tr> 
                </tbody>                            
              </table>
              <PainSelector selectPain={selectPain} />    
            </div>;
  }
}