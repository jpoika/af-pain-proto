import {
  orangeA200, orangeA100, orangeA400,
  grey900,
  fullWhite
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
/**
https://www.materialpalette.com/blue-grey/green

.dark-primary-color    { background: #303F9F; }
.default-primary-color { background: #3F51B5; }
.light-primary-color   { background: #C5CAE9; }
.text-primary-color    { color: #FFFFFF; }
.accent-color          { background: #FF5252; }
.primary-text-color    { color: #212121; }
.secondary-text-color  { color: #757575; }
.divider-color         { border-color: #BDBDBD; }


 */
export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#303F9F',
    primary2Color: '#3F51B5',
    primary3Color: '#C5CAE9',
    accent1Color: '#FF5252',
    accent2Color: orangeA400,
    accent3Color: '#757575',
    textColor: '#212121',

    alternateTextColor: fullWhite,
    canvasColor: fullWhite,
    borderColor: fade('#BDBDBD', 0.3),
    disabledColor: fade('#BDBDBD', 0.3),
    pickerHeaderColor: fade('#BDBDBD', 0.12),
    clockCircleColor: fade('#BDBDBD', 0.12)
  }
};
