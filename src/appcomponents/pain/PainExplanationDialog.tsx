import * as React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui/svg-icons/action/info';
export interface Props {
  //selectPain(painLevel: PainLevelInterface);
  painLevels: any[];

}
export interface State {
  open: boolean;
}

const customContentStyle = {
  width: '100%',
  maxWidth: 'none'
};

const getPainColumn = (level,width) => {
  return <td key={level.id}><img src={level.image} width={width} height="16" /></td>;
}
export default class PainExplanationDialog extends React.Component<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
  }
  handleClose = () => {
    this.setState({open: false});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  render(){
    const actions = [
      <FlatButton
        label="Got It!"
        secondary={true}
        onTouchTap={this.handleClose}
      />
    ];
    const {painLevels} = this.props;
    return <span>
              <IconButton style={{position: 'relative',top: -9}} onTouchTap={this.handleOpen} ><InfoIcon /></IconButton>
  
                <Dialog
                  title="Pain Levels"
                  modal={false}
                  autoScrollBodyContent={true}
                  open={this.state.open}
                  actions={actions}
                  onRequestClose={this.handleClose}
                  contentStyle={customContentStyle}

                >

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
              </Dialog>
      </span>

   }
}
