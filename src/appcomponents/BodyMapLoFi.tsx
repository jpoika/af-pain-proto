import * as React from "react";
import BodySection from '../containers/BodySection';
import {BodySectionInterface} from '../res/data/body';
import {PainLevelInterface} from '../res/data/pain';
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

export interface Props{
  title: string;
  bodySections: {
    [propName: string]: BodySectionInterface;
  }
  assessmentId: number;
  markPain(assessmentId: number, sectionId: number, painLevel: PainLevelInterface): any
}

export interface State{

}
export default class BodyMapLoFi extends React.Component<Props, State>{

  handleMarkPain = (sectionId: number, painLevel: PainLevelInterface) => {
    const {assessmentId,markPain} = this.props;

    markPain(assessmentId,sectionId,painLevel);
  }

  render(){
    const {bodySections,assessmentId} = this.props;
    return <div>
              <h3>Body Map</h3>
              <table style={ {borderCollapse: 'separate',borderSpacing: '0px' }} cellPadding="0" cellSpacing="0">
                <tbody>
                <tr style={trBody}>
                    <td style={tdBody}><img  src={require('../res/images/body_map_lofi/bodyMap1.png')} /></td>
                    <td style={tdBody}><div id="bm1_value"></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[1]} /></td>
                    <td style={tdBody}><div id="bm2_value"></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[2]}  /></td>
                    <td style={tdBody}><img  src={require('../res/images/body_map_lofi/bodyMap4.png')} /></td>
                </tr>
                <tr style={trBody}>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[3]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[4]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[5]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[6]} /></td>
                </tr>
                <tr style={trBody}>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[7]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[8]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[9]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[10]} /></td>
                </tr>
                <tr style={trBody}>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[11]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[12]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[13]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[14]} /></td>
                </tr>   
                <tr style={trBody}>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[15]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[16]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[17]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[18]} /></td>
                </tr>
                <tr style={trBody}>
                    <td style={tdBody}><img  src={require('../res/images/body_map_lofi/bodyMap21.png')} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[19]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[20]} /></td>
                    <td style={tdBody}><img  src={require('../res/images/body_map_lofi/bodyMap24.png')} /></td>
                </tr>
                <tr style={trBody}>
                    <td style={tdBody}><img  src={require('../res/images/body_map_lofi/bodyMap25.png')} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[21]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[22]} /></td>
                    <td style={tdBody}><img  src={require('../res/images/body_map_lofi/bodyMap28.png')} /></td>
                </tr>
                <tr style={trBody}>
                    <td style={tdBody}><img src={require('../res/images/body_map_lofi/bodyMap29.png')} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[23]} /></td>
                    <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[24]} /></td>
                    <td style={tdBody}><img src={require('../res/images/body_map_lofi/bodyMap32.png')} /></td>
                </tr> 
                </tbody>                            
              </table>
                
            </div>;
  }
}