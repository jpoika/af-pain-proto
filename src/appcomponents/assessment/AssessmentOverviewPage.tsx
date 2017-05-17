import * as React from "react";
import BasicPage, {Props as PageProps} from '../../components/BasicPage';
import AssessmentOverview , {Props as OverviewProps}from './AssessmentOverview';

interface Props extends PageProps, OverviewProps {

}

export interface State {

}

export default class AssessmentOverviewPage extends React.Component<Props, State>{
  render(){
    const {appBarTitle,page,title,assessment,replaceContent,restoreContent,overalPainRatings} = this.props
    return <BasicPage replaceContent={replaceContent} restoreContent={restoreContent} appBarTitle={appBarTitle} page={page} title={title}>
              <AssessmentOverview overalPainRatings={overalPainRatings} assessment={assessment} restoreContent={restoreContent} replaceContent={replaceContent}  />
           </BasicPage>
  }
}

