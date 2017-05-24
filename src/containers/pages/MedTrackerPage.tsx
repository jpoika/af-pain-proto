import Page from '../../appcomponents/medication/MedTrackerPage';
import {connect} from 'react-redux';

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