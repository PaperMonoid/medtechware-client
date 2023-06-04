import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { amber, blueGrey, deepOrange, teal } from '@mui/material/colors';

import SearchBar from './SearchBar.jsx';
import { DarkTheme } from './Theme.jsx';



// const AppBarColor = blueGrey[800].substring(1);
// const AppBarColorInt = parseInt(AppBarColor, 16);
// const AppBarColorChannels = [
//     (AppBarColorInt >> 16) & 0xFF,
//     (AppBarColorInt >> 8) & 0xFF,
//     (AppBarColorInt) & 0xFF,
// ];

const AppBarColorChannels = [
    20, 50, 53
];


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    '&:hover': {
        backgroundColor: deepOrange[700],
    },
    fontWeight: 600,
}));


export default function Header({ isLight }) {
    const [ alpha, setAlpha ] = useState(isLight? 1 : 0);
    const [ displaySearchBar, setDisplaySearchBar ] = useState(window.innerWidth >= 600);
    const session = null;
    const rgba = `${AppBarColorChannels[0]}, ${AppBarColorChannels[1]}, ${AppBarColorChannels[2]}, ${alpha}`;

    useEffect(() => {
        if (!isLight) {
            const handleScroll = () => {
                setAlpha(Math.min(window.pageYOffset / 64.0, 1));
            };

            const handleResize = () => {
                setDisplaySearchBar(window.innerWidth >= 600);
            };

            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleResize, false);
            return () => {
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleResize);
            };
        }
        return () => {};
    }, []);


    return (
        <ThemeProvider theme={DarkTheme}>
          <CssBaseline />
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position="fixed"
              elevation={0}
              component='nav'
              style={{ backgroundColor: `rgba(${rgba})` }}
            >
              <Toolbar style={{ gap: 15 }}>
                <Link href='/' style={{ textDecoration: 'none', color: 'inherit', display: 'inherit', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
                  <img src='/medtechware_logo_light.svg' height='52'/>
                  <Typography
                    variant="h6"
                    noWrap
                    component="span"
                    sx={{ display: { xs: 'block', sm: 'block' } }}
                  >
                    MedTechWare
                  </Typography>
                </Link>

                { displaySearchBar
                  ? (
                      <span style={{ flexGrow: 1, marginLeft: '5%', marginRight: '5%' }}>
                        <SearchBar/>
                      </span>
                  ) : (
                      <span style={{ flexGrow: 1 }}/>
                  )
                }
                { session
                  ? (
                      <>
                        <IconButton>
                          <ShoppingCartIcon/>
                        </IconButton>
                        <IconButton>
                          <AccountCircleIcon/>
                        </IconButton>
                      </>
                  ) : (
                      <>
                      <Link href='/auth'>
                        <ColorButton
                          variant='contained'
                          style={{whiteSpace: 'nowrap'}}
                          disableElevation
                        >
                          Access
                        </ColorButton>
                      </Link>
                      </>
                  )
                }

              </Toolbar>
            </AppBar>
          </Box>
        </ThemeProvider>
    );
}
