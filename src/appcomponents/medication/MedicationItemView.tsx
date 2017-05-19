import * as React from 'react';
import {MedicationInterface} from '../../res/data/medication';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import ChipSvgIcon from 'material-ui/svg-icons/editor/mode-edit';

const styles = {
  chip: {
    margin: 4,
  }
};

export interface Props{
  medication: MedicationInterface;
  onSelect(medication: MedicationInterface): any;
  onDelete(id: number): any;
}

export interface State{

}


export default class MedicationItemView extends React.Component<Props, State>{

  handleOnSelect = (event) => {
   const {medication,onSelect} = this.props;
   onSelect(medication);
  }
  handleOnDelete = (event) => {
    const {medication,onDelete} = this.props;
    onDelete(medication.id);
  }
  render(){
    const {medication} = this.props;
    if(!medication.name){
      return null;
    }
    return <Chip
                onRequestDelete={this.handleOnDelete}
                onTouchTap={this.handleOnSelect}
                style={styles.chip}
              >
              <Avatar icon={<ChipSvgIcon />} />
              {medication.name || "New"}
            </Chip>;
  }
}