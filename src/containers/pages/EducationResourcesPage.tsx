import EducationResourcesPage from '../../components/book/Book'; //TODO rename BookPage
import {connect} from 'react-redux';
import book from '../../res/data/book';

const stateToProps = (state,ownProps) => {
  console.log(ownProps);
  const isOpen = typeof ownProps.match.params.open !== 'undefined' ? true : false
  return {
    title: 'Pain Education & Resources',
    book: book,
    isOpen: isOpen
  }
}
const dispatchToProps = (dispatch,ownProps) => {
  return {
    //pageOpen: ownProps.pathOnTouchTap('/main/resources/open'),
    pageOpen: () => {
      ownProps.history.push('/main/resources/open')
    }
  }
}
export default connect(stateToProps,dispatchToProps)

(EducationResourcesPage);