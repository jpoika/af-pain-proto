import Page from '../../appcomponents/medication/MedTrackerPage';
import {homePage} from '../../res/data/page';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';

const stateToProps = (state, ownProps) => {
  return {
    title: 'Med Tracker',
    page: {title: "Medications Tracker", subtitle: 'Pain Proto', content: ''},
  }
}
const dispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(stateToProps,dispatchToProps)

(Page);