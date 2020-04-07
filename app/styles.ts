import { makeStyles, Theme, createMuiTheme } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/blue';
import secondary from '@material-ui/core/colors/amber';

export const useStyles = makeStyles((theme: Theme) => ({
  header1: {
    fontWeight: 300,
    fontSize: 40,
    textAlign: 'center',
  },
}));

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary[300],
      light: primary[200],
      dark: primary[400],
    },
    secondary: {
      main: secondary[400],
      light: secondary[200],
      dark: secondary[600],
    },
  },
  typography: {
    fontFamily: "'Raleway', sans-serif",
  },
});
