import {connect} from 'react-redux';
import AppBarComponent from '../components/AppBar';


const stateToProps = (state,ownProps) => {
  return {
    title: state.view.page.title,
    leftIcon: ownProps.leftIcon,
    rightIcon: ownProps.rightIcon
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
  }
}

export default connect(stateToProps,dispatchToProps)(AppBarComponent);