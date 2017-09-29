import * as React from 'react';
import {MedicationInterface} from '../../res/data/medication';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
export interface Props{
  medicationChoice: MedicationInterface;
  onSave: (medicationChoice: MedicationInterface) => void;
  onCancel: (any) => void;
}

export interface State{
  medicationChoice: MedicationInterface;
}


export default class MedicationChoiceEdit extends React.Component<Props, State>{

  constructor(props){
    super(props);
    this.state = {
      medicationChoice: props.medicationChoice
    }
  }

  handleSubmit = () => {

  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      medicationChoice: {...this.state.medicationChoice,[name]: value}
    });
  };

  handleSave = (event) => {
    const {onSave} = this.props;
    onSave(this.state.medicationChoice);
  }

  render(){
    const {medicationChoice} = this.state;

    return <div>
              <TextField
                floatingLabelText={'Medication Name'}
                hintText={'Enter medication here'}
                value={medicationChoice.name}
                name={'name'}
                onChange={this.handleChange}
              /> 
              <RaisedButton onTouchTap={this.handleSave} label={'Add'} />
              <RaisedButton onTouchTap={this.props.onCancel}label={'Cancel'} />
    </div>;
  }
}