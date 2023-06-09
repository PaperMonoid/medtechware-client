import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, styled } from '@mui/material/styles';

import Layout from "../../components/Layout.jsx";
import { DarkTheme, LightTheme } from "../../components/Theme.jsx";
import AuthForm from "../../components/forms/AuthForm.jsx";


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

    const getAuthXs = () => {
        if (window.innerWidth >= 600) {
            return 6;
        } else {
            return 12;
        }
    };

    const getTitleSize = () => {
        if (window.innerWidth >= 600) {
            return 'h3';
        } else {
            return 'h5';
        }
    };
    const [ authXs, setAuthXs ] = useState(getAuthXs());
    const [ titleSize, setTitleSize ] = useState(getTitleSize());
    useEffect(() => {

        const handleResize = () => {
            setAuthXs(getAuthXs());
            setTitleSize(getTitleSize());
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
              <Grid container item spacing={2} xs={9}>
                <Grid item xs={12}>
                  <Typography variant={titleSize} component="h1">
                    Experience MedTechWare
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" component="span">
                    Please enter your email address to continue with your personalized health technology journey.
                  </Typography>
                </Grid>
                <Grid item xs={authXs}>
                  <AuthForm/>
                </Grid>
              </Grid>
	    </Section>

          </ThemeProvider>
        </Layout>
    );
}
