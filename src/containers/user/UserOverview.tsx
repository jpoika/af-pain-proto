import UserOverview from '../../appcomponents/user/UserOverview';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const getViewPortSize = (state) => {
  const width = state.device.width;
  if(width < 450){
    return 'small';
  }  
  if(width >= 450 && width <= 1000){
    return 'medium';
  }
  return 'large';
}

const stateToProps = (state, ownProps) => {
  return {
    user: state.user,
    viewPortSize: getViewPortSize(state)
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    editClick: () => {
      ownProps.history.push('/main/settings');
    }
  }
}
export default withRouter(connect(stateToProps,dispatchToProps)

(UserOverview));