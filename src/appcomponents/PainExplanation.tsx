import * as React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {PainLevelInterface} from '../res/data/pain';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui/svg-icons/action/info';
export interface Props {
  //selectPain(painLevel: PainLevelInterface);
  painLevels: any[];
  restoreContent(): void;
}
export interface State {
  //open: boolean;
}

const customContentStyle = {
  width: '100%',
  maxWidth: 'none'
};

const getPainColumn = (level,width) => {
  return <td key={level.id}><img src={level.image} width={width} height="16" /></td>;
}
export default class PainExplanation extends React.Component<Props, State>{


  render(){
    const {painLevels,restoreContent} = this.props;
    return (
          <div>
            <div style={{margin: '10px auto 0px auto',width: 400}}>
              <h3>Please Rate Your Pain According to the Graphic Below</h3>
              <img src={require("../res/images/scale_top.jpg")} width="400" />
              <table cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                     {getPainColumn(painLevels[0],'36')}
                     {getPainColumn(painLevels[1],'35')}
                     {getPainColumn(painLevels[2],'32')}
                     {getPainColumn(painLevels[3],'32')}
                     {getPainColumn(painLevels[4],'34')}
                     {getPainColumn(painLevels[5],'31')}
                     {getPainColumn(painLevels[6],'33')}
                     {getPainColumn(painLevels[7],'31')}
                     {getPainColumn(painLevels[8],'32')}
                     {getPainColumn(painLevels[9],'34')}
                     {getPainColumn(painLevels[10],'30')}
                  </tr>
                </tbody>
              </table>
              <img src={require("../res/images/scale_bottom.jpg")} width="400" />
              <div>
                <RaisedButton primary={true} onTouchTap={() => restoreContent()} label="Got It!" />
              </div>
            </div>

          </div>
                );
  }
}