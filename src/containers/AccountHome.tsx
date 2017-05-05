import AccountHome from '../appcomponents/AccountHome';
import {homePage} from '../res/data/page';
import {connect} from 'react-redux';

import {deleteAccount} from '../actions'

const stateToProps = (state, ownProps) => {
  return {
    title: 'Home',
    page: {title: homePage.title, subtitle: 'Pain Proto', content: homePage.content},
  }
}
const dispatchToProps = (dispatch) => {
  return {
    deleteAccount: () => {
      dispatch(deleteAccount());
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(AccountHome);