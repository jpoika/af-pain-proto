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
  side: string;
  markPain(assessmentId: number, side: string, sectionId: number, painLevel: PainLevelInterface): any
}

export interface State{

}
export default class BodyMap extends React.Component<Props, State>{

  handleMarkPain = (sectionId: number, painLevel: PainLevelInterface) => {
    const {assessmentId, side, markPain} = this.props;

    markPain(assessmentId,side,sectionId,painLevel);
  }

  render(){
    const {bodySections,assessmentId} = this.props;
 
    let sectionRows = [];
    for (var i=0; i < 26; i++) {
      sectionRows.push(i);
    }
    let offset: number;
    const cols = 15
    return <div style={{overflow: 'auto'}}>
              <h3>Body Map</h3>
              <table style={ {borderCollapse: 'separate',borderSpacing: '0px' }} cellPadding="0" cellSpacing="0">
                <tbody>

                
                      <tr key={offset = 0 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>

                      
                      <tr key={offset = 1 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                      </tr>

                   
                      <tr key={offset = 2 * cols} style={trBody}>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>






                      <tr key={offset = 3 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>

                      <tr key={offset = 4 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 5 * cols} style={trBody}>
                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 6 * cols} style={trBody}>


                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 7 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 8 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 9 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 10 * cols} style={trBody}>


                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 11 * cols} style={trBody}>


                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 12 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 13 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 14 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 15 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 16 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 17 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>

                      <tr key={offset = 18 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 19 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 20 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 21 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 22 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 23 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>


                      <tr key={offset = 24 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>

                      <tr key={offset = 25 * cols} style={trBody}>

                                <td style={tdBody}><div></div><BodySection assessmentId={assessmentId} markPain={this.handleMarkPain} section={bodySections[offset +1]} /></td>
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

                       </tr>
                </tbody>                            
              </table>
                
            </div>;
  }
}