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
export default class BodyMap extends React.Component<Props, State>{

  handleMarkPain = (sectionId: number, painLevel: PainLevelInterface) => {
    const {assessmentId,markPain} = this.props;

    markPain(assessmentId,sectionId,painLevel);
  }

  render(){
    const {bodySections,assessmentId} = this.props;
 
    let sectionRows = [];
    for (var i=0; i < 26; i++) {
      sectionRows.push(i);
    }
    
    return <div>
              <h3>Body Map</h3>
              <table style={ {borderCollapse: 'separate',borderSpacing: '0px' }} cellPadding="0" cellSpacing="0">
                <tbody>
                  {sectionRows.map(rowIdx => {
                    let offset =  rowIdx  * 15;

                    return (<tr style={trBody}>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset + 1]} /></td>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +2]} /></td>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +3]} /></td>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +4]} /></td>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +5]} /></td>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +6]} /></td>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +7]} /></td>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +8]} /></td>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +9]} /></td>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +10]} /></td>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +11]} /></td>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +12]} /></td>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +13]} /></td>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +14]} /></td>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +15]} /></td>
                            </tr>);
                  })}


                </tbody>                            
              </table>
                
            </div>;
  }
}