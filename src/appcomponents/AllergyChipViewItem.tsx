import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import ChipSvgIcon from 'material-ui/svg-icons/editor/mode-edit';
import {AllergyInterface} from '../res/data/allergy';
const styles = {
  chip: {
    margin: 4,
  }
};

export interface Props{
  allergy: AllergyInterface;
  onSelect(alergy: AllergyInterface): any;
  onDelete(id: number): any;
}

export interface State{

}


export default class AllergyChipViewItem extends React.Component<Props, State>{

  handleOnSelect = (event) => {
   const {allergy,onSelect} = this.props;
   onSelect(allergy);
  }
  handleOnDelete = (event) => {
    const {allergy,onDelete} = this.props;
    onDelete(allergy.id);
  }
  render(){
    const {allergy} = this.props;
    if(!allergy.name){
      return <div />
    }
    return <Chip
                onRequestDelete={this.handleOnDelete}
                onTouchTap={this.handleOnSelect}
                style={styles.chip}
              >
              <Avatar icon={<ChipSvgIcon />} />
              {allergy.name || "New"}
            </Chip>
  }
}