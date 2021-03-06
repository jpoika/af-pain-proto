import * as React from "react";
import Helmet from 'react-helmet';

export interface Props { 
  appBarTitle(msg: string): any;
  replaceContent(content: JSX.Element): void;
  restoreContent(): void;
  title: string;
  page: {title: string, content: string, subtitle: string}
}

export interface State { 

}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export default class BasicPage extends React.Component<Props, State> {
    componentWillMount () {
      const {title} = this.props;

      this.props.appBarTitle && this.props.appBarTitle(title);
    }

    componentWillReceiveProps(nextProps) {
      const {title} = nextProps;
 
      this.props.appBarTitle && this.props.appBarTitle(title);
    }
    //<CardTitle title={subtitle} />
    render() {
      const {page} = this.props;
      return (
              <div>
                <Helmet>
                    <title>{page.title}</title>
                </Helmet>
                   {this.props.children}
               </div>
              );
    }
}