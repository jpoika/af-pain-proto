import EducationResourcesPage from '../components/Book';
import {connect} from 'react-redux';
import book from '../res/data/book';

const stateToProps = (state,ownProps) => {
  const isOpen = typeof ownProps.params.open !== 'undefined' ? true : false
  return {
    title: 'Pain Education & Resources',
    book: book,
    isOpen: isOpen
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    pageOpen: ownProps.pathOnTouchTap('main/resources/open')
  }
}
export default connect(stateToProps,dispatchToProps)

(EducationResourcesPage);