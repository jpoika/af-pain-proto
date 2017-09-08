import * as React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PainRadioSelector from '../../containers/pain/inputs/PainRadioSelector';
import {PainLevelInterface} from '../../res/data/pain';
import {BodySectionInterface} from '../../res/data/body';
import PainExplanationButton from '../../containers/pain/inputs/PainExplanationButton';
export interface Props {
  handleClose(): any;
  selectPain(painLevel:PainLevelInterface): any;
  open: boolean;
  painLevel:PainLevelInterface;
  section?: BodySectionInterface;
  deleteSection?: (sectionId: number) => void;
  replaceContent(content: any): void;
  restoreContent(): void;
}

const customContentStyle = {
  width: '100%',
  maxWidth: 'none'
};

export default class PainSelectorDialog extends React.Component<Props, any> {

  public static defaultProps: Partial<Props> = {
    deleteSection: (sectionId: number) => {}
  };


  constructor(props){
    super(props);
    this.state = {
      open: this.props.open
    }
  }

  componentWillReceiveProps(nextProps){

      this.setState(
        {
          open: nextProps.open
        }
      ) 

  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleDelete = (event) => {
    const {deleteSection, section} = this.props;
    console.log(section);
    section && deleteSection(section.id);
    this.handleClose();
  }

  handleClose = () => {
    const {handleClose} = this.props;
    handleClose();
    this.setState({open: false});
  };



  handleSelect = (painLevel) => {
    const {selectPain} = this.props;
    selectPain(painLevel);
    this.handleClose(); 
  }

  render() {
    const {replaceContent,restoreContent} = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    
    if(this.props.painLevel){
      actions.push(
          <FlatButton
            label="Remove"
            secondary={true}
            onTouchTap={this.handleDelete}
          />

        );
    }

    return (
      <div>
        <Dialog
          title={<div><span>Pain Level</span><PainExplanationButton top={4} restoreContent={restoreContent} replaceContent={replaceContent} /></div>}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
        >
         <PainRadioSelector restoreContent={restoreContent} replaceContent={replaceContent} painLevel={this.props.painLevel} selectPain={this.handleSelect} /> 
        </Dialog>
      </div>
    );
  }
}
