import { createTheme } from '@mui/material/styles';


const lightOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#04a491',
    },
    secondary: {
      main: '#455a64',
    },
    error: {
      main: '#ff1744',
    },
  },
};


const darkOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#04a491',
    },
    secondary: {
      main: '#455a64',
    },
    error: {
      main: '#ff1744',
    },
  },
};

export const DarkTheme = createTheme(darkOptions);
export const LightTheme = createTheme(lightOptions);
