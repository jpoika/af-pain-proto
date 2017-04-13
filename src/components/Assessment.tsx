import * as React from "react";
import Form, {ValidationResultInterface} from './Form';
import Helmet from 'react-helmet';
export interface ItemInterface{
  title: string;
  questions: any[];
  [propName: string]: any;
}


export interface Props { 
  appBarTitle(msg: string): any;
  item: ItemInterface;
  values: any;
  submitData(data: any): void;
  validateData(data: any): ValidationResultInterface; 
  cancel(): void;
  questions: any;
}

export interface State { 
  questions: any[];
}

export default class Assessment extends React.Component<Props, State> {
    constructor (props) {
      super(props);
      const {item,questions} = this.props;
      this.state = {
        questions: questions
      };
    }

    componentWillMount () {
      const {item} = this.props;

      this.props.appBarTitle(item.title);
      window.scrollTo(0,0);
    }

    handleChange = (values) => {
      const {item} = this.props;
      let newQuestions = this.props.item.calcQuestions(values);
      if(newQuestions){
        this.setState({questions: this.props.item.calcQuestions(values)});
      }
    }

    componentWillReceiveProps(nextProps) {
      const {item} = nextProps;
 
      this.props.appBarTitle(item.title);
    }
    render() {
        const {item, submitData, validateData,cancel,values} = this.props;
        const {questions} = this.state;
        return (
          <div>
                  <Helmet>
                      <title>{item.title}</title>
                  </Helmet>
                  <Form values={values} handleChange={this.handleChange} items={questions} cancel={cancel} validateData={validateData} submitData={submitData} />
          </div>
          
          );
    }
}