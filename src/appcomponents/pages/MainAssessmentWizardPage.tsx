import * as React from "react";
import BasicPage, {Props as PageProps} from '../../components/BasicPage';
import MainAssessmentWizardContainer from '../../containers/assessment/MainAssessmentWizard';
import CountDown from '../CountDown';

export interface Props extends PageProps{
  type: string;
  isReady: boolean;
  deadline: number;
}

export interface State {
  isReady: boolean;
}


export default class AssessmentWizardPage extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
    isReady: true,
    deadline: null
  }

  constructor(props){
    super(props);

    this.state = {
      isReady: props.isReady
    };
  }

  handleCountdownComplete = () => {
    console.log('handleCountdownComplete');
    this.setState({
      isReady: true
    });
  }

  render(){
    const {appBarTitle,page,title,type,replaceContent,restoreContent,deadline} = this.props;
    const {isReady} = this.state;
    const wizard = <MainAssessmentWizardContainer restoreContent={restoreContent} replaceContent={replaceContent} type={type} />;
    const countDown = <div>
                       <h2> You next Assessment is due in: </h2>
                        <CountDown onComplete={this.handleCountdownComplete} deadline={deadline} />
                      </div>;
    const content = isReady ? wizard : countDown ;
    return <BasicPage restoreContent={restoreContent} replaceContent={replaceContent} appBarTitle={appBarTitle} page={page} title={title}>
              {content}
           </BasicPage>
  }
}







