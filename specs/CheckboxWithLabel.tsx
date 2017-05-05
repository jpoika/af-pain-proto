import * as React from 'react'
import * as ReactDOM from "react-dom";

interface CheckboxWithLabelProps{
  labelOff: string;
  labelOn: string;
}

interface State{
  isChecked: boolean;
}

export class CheckboxWithLabel extends React.Component<CheckboxWithLabelProps, State> {

  constructor(props){
    super(props)
    this.state = {
      isChecked: false
    }
  }

  onChange = () => {
    this.setState({isChecked: !this.state.isChecked});
  },

  render() {

    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
});

