import AccountHome from '../appcomponents/AccountHome';
import {homePage} from '../res/data/page';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {deleteAccount} from '../actions'

const stateToProps = (state, ownProps) => {
  return {
    title: 'Home',
    page: {title: homePage.title, subtitle: 'Pain Proto', content: homePage.content},
    image: homePage.image && !(state.device.width > 600 || state.device.width > state.device.height)? homePage.image : '',
    
    actions: [

    ]
  }
}
const dispatchToProps = (dispatch) => {
  return {
    deleteAccountAction: () => {
      dispatch(deleteAccount());
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(AccountHome as any);