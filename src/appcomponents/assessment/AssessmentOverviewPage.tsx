import * as React from "react";
import BasicPage, {Props as PageProps} from '../../components/BasicPage';
import AssessmentOverview from '../../containers/AssessmentOverview';
import {AssessmentInterface, statusHash, typeHash} from '../../res/data/assessments';
interface Props extends PageProps {
  assessment: AssessmentInterface;
}

export interface State {

}

export default class AssessmentOverviewPage extends React.Component<Props, State>{
  render(){
    const {appBarTitle,page,title,assessment,replaceContent,restoreContent} = this.props
    return <BasicPage replaceContent={replaceContent} restoreContent={restoreContent} appBarTitle={appBarTitle} page={page} title={title}>
              <AssessmentOverview assessment={assessment} restoreContent={restoreContent} replaceContent={replaceContent}  />
           </BasicPage>
  }
}

