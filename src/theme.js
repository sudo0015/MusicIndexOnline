import { createTheme } from '@mui/material/styles';

const lightPalette = {
  mode: 'light',
  background: {
    default: '#F8F4EB',
    paper: '#F2EBDF',
  },
  text: {
    primary: '#3A322C',
    secondary: '#73665A',
  },
  primary: {
    main: '#8C5D3E',
    light: '#B08566',
    dark: '#6B4528',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#B88C4A',
    light: '#D4AE71',
    dark: '#8C6A35',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#A64B4B',
  },
  divider: '#D9CFC1',
};

const darkPalette = {
  mode: 'dark',
  background: {
    default: '#1E1B18',
    paper: '#2D2925',
  },
  text: {
    primary: '#EAE5DD',
    secondary: '#A89F94',
  },
  primary: {
    main: '#9E6B47',
    light: '#B88566',
    dark: '#7A4E30',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#D4AF76',
    light: '#E8C997',
    dark: '#A88657',
    contrastText: '#1E1B18',
  },
  error: {
    main: '#D47070',
  },
  divider: '#443E38',
};

const fontSerif = '"EB Garamond", "Times New Roman", Georgia, serif';
const fontDisplay = '"Playfair Display", "EB Garamond", Georgia, serif';
const fontSans = '"Source Sans 3", "Helvetica Neue", Arial, sans-serif';

const commonTypography = {
  fontFamily: fontSerif,
  fontSize: 15,
  h1: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: '-0.01em' },
  h2: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: '-0.01em' },
  h3: { fontFamily: fontDisplay, fontWeight: 600 },
  h4: { fontFamily: fontDisplay, fontWeight: 600 },
  h5: { fontFamily: fontSerif, fontWeight: 700 },
  h6: { fontFamily: fontSerif, fontWeight: 700 },
  subtitle1: { fontFamily: fontSerif, fontWeight: 600 },
  subtitle2: { fontFamily: fontSerif, fontWeight: 600 },
  body1: { fontFamily: fontSerif, lineHeight: 1.7 },
  body2: { fontFamily: fontSans, lineHeight: 1.6 },
  button: { fontFamily: fontSerif, textTransform: 'none', letterSpacing: '0.01em' },
  caption: { fontFamily: fontSans },
  overline: { fontFamily: fontSans, letterSpacing: '0.08em' },
};

const commonComponents = {
  MuiPaper: {
    styleOverrides: {
      root: {
        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: lightPalette,
  typography: commonTypography,
  components: commonComponents,
});

export const darkTheme = createTheme({
  palette: darkPalette,
  typography: commonTypography,
  components: commonComponents,
});

export { fontSerif, fontDisplay, fontSans };

export default lightTheme;