import * as React from 'react';

import ArrowBack from 'material-ui/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';

const BackButton = ({path}) => {
  return <Link to={path}><IconButton><ArrowBack color="white" /></IconButton></Link>
}

export default BackButton;