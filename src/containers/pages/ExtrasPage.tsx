import ExtrasPage from '../../appcomponents/pages/ExtrasPage';
import {connect} from 'react-redux';


const stateToProps = (state, ownProps) => {
  return {
    title: 'Extras',
    page: {title: 'Extras', subtitle: 'Pain Proto', content: ''}
  }
}
const dispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(stateToProps,dispatchToProps)

(ExtrasPage);