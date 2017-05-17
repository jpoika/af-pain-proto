import DoNotDisturbControll from '../appcomponents/DoNotDisturbControll';
import {connect} from 'react-redux';
import {userDisableDoNotDisturb,userEnableDoNotDisturb} from '../actions/'

const stateToProps = (state, ownProps) => {
  return {
    enabled: state.user.doNotDisturb
  }
}

const dispatchToProps = (dispatch) => {
  return {
    enable: () => {
      dispatch(userEnableDoNotDisturb());
    },
    disable: () => {
      dispatch(userDisableDoNotDisturb());
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(DoNotDisturbControll);