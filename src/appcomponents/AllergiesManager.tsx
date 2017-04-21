import * as React from 'react';
import {AllergyInterface} from '../res/data/allergy';
import AllergyItemEdit from '../containers/AllergyItemEdit';
import AllergyChipViewItem from '../appcomponents/AllergyChipViewItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {topRightButtonStyle} from '../components/commonStyles';
const styles = {

  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};
export interface Props{
  allergies: AllergyInterface[];
  addAllergy(): any;
  step: number;
  deleteAllergy(allergyId: number): any;
  onComplete?(): any;
  actions?: JSX.Element;
}

export interface State{
  activeEdit: AllergyInterface;
}
export default class AllergiesManager extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      step: -1,
      actions: null,
      onComplete: () => {}
  };

  constructor (props) {
    super(props);
    this.state = {
      activeEdit: null
    }
    this.setLastMedToEditIfEmpty(this.props.allergies);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.allergies.length > this.props.allergies.length){
      this.setLastMedToEditIfEmpty(nextProps.allergies);
    }
  }

  setLastMedToEditIfEmpty = (allergies) => {
    if(allergies.length){
       const lastAdded = allergies.map(i => i).pop();
       if(lastAdded && !lastAdded.name){ //if it's a new allergy with no name assume user wants to edit it
          this.state = {
            activeEdit: lastAdded
          }
       }
    }
  }

  handleAdd = (event) => {
    const {addAllergy} = this.props;
    addAllergy()
  }

  handleSelect = (allergy: AllergyInterface) => {
    this.setState({
      activeEdit: allergy
    });
  }
  handleDeleteItem = (allergyId: number) => {
    const {deleteAllergy} = this.props;
    deleteAllergy(allergyId)
    this.setState({
      activeEdit: null
    });
  }
  handleItemSave = (allergy: AllergyInterface) => {
    this.setState({
      activeEdit: null
    });
  }

  handleSave = (event) => {
    const {onComplete} = this.props;
    onComplete();
  }

  render(){
    const {allergies, actions, deleteAllergy} = this.props;
    let additionalActions = null
    if(actions){
      additionalActions = actions;
    }
    const addButtonText = allergies.length > 0  ? 'Add More': 'Add Allergy';
    return <div>
              <h1>Allergies</h1>
              <h3>Please list any allergies you have.</h3>
              <div style={styles.wrapper as any}>
                {allergies.map((med) => {
                  return <AllergyChipViewItem key={med.id} onDelete={this.handleDeleteItem}  onSelect={this.handleSelect} allergy={med} />
                })}
              </div>
              {this.state.activeEdit && <AllergyItemEdit onSave={this.handleItemSave} deleteItem={this.handleDeleteItem} allergy={this.state.activeEdit} />}
              <div>
                <FlatButton disabled={!!this.state.activeEdit} style={topRightButtonStyle} secondary={true} type="button" onTouchTap={this.handleAdd}>{addButtonText}</FlatButton>
              </div>

              <div style={{clear: 'both'}}>
                <RaisedButton 
                          disableTouchRipple={true}
                          disableFocusRipple={true}
                          primary={true} type="button" onTouchTap={this.handleSave}
                          style={{marginRight: 12}}
                        >{additionalActions ? 'Next' : 'Save'}</RaisedButton>

                {additionalActions}
              </div>

           </div>;
  }
}