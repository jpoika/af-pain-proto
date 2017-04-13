import LoginPage from '../appcomponents/LoginPage';
import {homePage} from '../res/data/page';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';

const stateToProps = (state, ownProps) => {
  return {
    title: 'Home',
    page: {title: homePage.title, subtitle: 'Pain Proto Login', content: homePage.content},

  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    onCancelClick: (event: any) => {
      ownProps.pathOnTouchTap('/')
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(LoginPage);