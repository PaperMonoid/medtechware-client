import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, styled } from '@mui/material/styles';

import Layout from "../../../components/Layout.jsx";
import { DarkTheme, LightTheme } from "../../../components/Theme.jsx";
import SignUpForm from "../../../components/forms/SignUpForm.jsx";
import LogInForm from "../../../components/forms/LogInForm.jsx";


const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), url(/craiyon_123901_person_interacting_with_IoT_system_in_futuristic_environment__teal_colors.png)',
    backgroundSize: 'cover',
    backgroundPosition: '0% 60%',
    filter: "blur(5px)",
};


const Section = styled(Container)(({ theme }) => ({
    width: '100%',
    height: '100vh',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
    marginTop: '-64px',
}));

export default function auth() {
    const variants = {
        "normal": ["h4", "subtitle1", "body1"],
        "mobile": ["h6", "subtitle1", "caption"],
    };
    const getVariants = () => {
        if (window.innerWidth >= 600) {
            return variants["normal"];
        } else {
            return variants["mobile"];
        }
    };
    const getXs = () => {
        if (window.innerWidth >= 600) {
            return [9, 6];
        } else {
            return [12, 12];
        }
    };
    const [ signInXs, setSignInXs ] = useState(getXs());
    const [ signInVariants, setSignInVariants ] = useState(getVariants());


    useEffect(() => {
        const handleResize = () => {
            setSignInXs(getXs());
            setSignInVariants(getVariants());
        };

        window.addEventListener('resize', handleResize, false);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Layout>
          <ThemeProvider theme={DarkTheme}>
            <CssBaseline />
            <Section maxWidth={false}>
              <div style={backgroundStyle}></div>
              <Grid container item spacing={2} xs={signInXs[0]}>
                <Grid item xs={signInXs[1]}>
                  <Typography variant={signInVariants[0]} component="h1" gutterBottom>
                    Join MedTechWare Community
                  </Typography>
                  <Typography variant={signInVariants[1]} gutterBottom>
                    Access Personalized Health Technology
                  </Typography>
                  <Typography variant={signInVariants[2]} gutterBottom>
                    Explore our range of innovative health monitoring devices and services designed to enhance your well-being.
                  </Typography>
                </Grid>
                <Grid item xs={signInXs[1]}>
                  <SignUpForm/>
                </Grid>
              </Grid>
              {/* <Grid item> */}
              {/*   <LogInForm/> */}
              {/* </Grid> */}
	    </Section>

          </ThemeProvider>
        </Layout>
    );
}



                // <Grid item xs={12} style={{ display: 'flex', gap: '50px', alignItems: 'center', justifyContent: 'center',}}>
                //   <Button variant='contained' disableElevation>Sign Up</Button>
                //   <Button variant='contained' color='secondary' disableElevation>Log In</Button>
                // </Grid>
