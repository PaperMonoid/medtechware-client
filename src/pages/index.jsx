import { useEffect, useState } from 'react';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled, ThemeProvider } from '@mui/material/styles';
import { grey, deepOrange, pink } from '@mui/material/colors';

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Favorite as FavoriteIcon,
  AccessibilityNew as WellnessIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';

import Layout from "../components/Layout.jsx";
import MUILink from "../components/MUILink.jsx";
import { LightTheme, DarkTheme } from '../components/Theme.jsx';
import Background from "../components/HomeBackground.jsx";
import Testimonials from "../components/Testimonials.jsx";
import ContactForm from "../components/forms/ContactForm.jsx";

const SubtitleTypography = styled(Typography)(({ theme }) => ({
    color: grey[400],
}));


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    '&:hover': {
        backgroundColor: deepOrange[700],
    },
    fontWeight: 600,
}));

const HeroSection = styled(Container)(({ theme }) => ({
    width: '100%',
    display: 'flex',
}));


const AboutSection = styled(Container)(({ theme }) => ({
    width: '100%',
    background: theme.palette.grey[100],
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
}));


const SloganSection = styled(Container)(({ theme }) => ({
    width: '100%',
    background: theme.palette.primary.main,
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
}));

const TestimonialsSection = styled(Container)(({ theme }) => ({
    width: '100%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(/craiyon_011310_medical_tools_pastel_colors_svg_seamless_tileable_pattern_blurred.png)',
    backgroundSize: 'cover',
    backgroundPosition: '0% 0%',
    //background: theme.palette.grey[900],
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
}));


const ContactSection = styled(Container)(({ theme }) => ({
    width: '100%',
    background: theme.palette.grey[100],
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
}));


const styles = {
    parentLayout: {
        background: 'rgba(255, 0, 0, 0)',
        display: 'block',
        height: '80vh',
        marginTop: '-64px',
        overflow: 'hidden'
    },
    divisor: {
        display: 'block',
        height: '80px'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '80%',
    },
    flexGrow: {
        flexGrow: 1
    }
};


export default function Home() {
    const bigVariants = [ "h2", "h1", "h4", "h3", "body2", "h3", "caption"];
    const normalVariants = [ "h3", "h2", "h5", "h4", "body2", "h4", "caption"];
    const mobileVariants = [ "h5", "h4", "h7", "h6", "body2", "h6", "caption"];


    const getVariants = () => {
        if (window.innerWidth >= 1050 && window.innerHeight >= 750) {
            return bigVariants;
        } else if (window.innerWidth >= 600 && window.innerHeight >= 600) {
            return normalVariants;
        } else {
            return mobileVariants;
        }
    };
    const getXs = () => {
        if (window.innerWidth >= 600) {
            return 6;
        } else {
            return 12;
        }
    };
    const [ heroVariants, setHeroVariants ] = useState(getVariants());
    const [ aboutXs, setAboutXs ] = useState(getXs());


    useEffect(() => {

        const handleResize = () => {
            setHeroVariants(getVariants());
            setAboutXs(getXs());
        };

        window.addEventListener('resize', handleResize, false);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Layout>
          <HeroSection maxWidth={false}>
            <div style={styles.parentLayout}>
              <div style={styles.divisor}/>
              <Grid container item spacing={2} xs={9}>
                <Grid item xs={12}>
                  <Typography variant={heroVariants[0]}>
                    Welcome to <Typography variant={heroVariants[1]} component="span">MedTechWare</Typography>
                  </Typography>
                  <div>
                    <Typography variant={heroVariants[2]} gutterBottom>
                      Your future of personalized{' '}
                      <Typography variant={heroVariants[3]} component="span" color="primary">
                        Health Technology
                      </Typography>
                    </Typography>
                  </div>
                  <SubtitleTypography variant={heroVariants[4]} style={{ width: '70%'}}>
                    Discover our cutting-edge health monitoring devices, designed to empower you on your health journey.
                  </SubtitleTypography>
                </Grid>
                <Grid item style={styles.flexGrow}>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: 'flex', gap: '15px', display: 'flex', alignItems: 'center',  }}>
                    <Typography variant={heroVariants[5]} component='span'>
                      Get started!
                    </Typography>
                    <Link href='/auth'>
                      <ColorButton>Shop now</ColorButton>
                    </Link>
                  </div>
                  <SubtitleTypography variant={heroVariants[6]}>
                    <MUILink href='/auth' style={{ textDecoration: 'underline', color: deepOrange[500] }}>Access</MUILink> and experience health technology like never before.
                  </SubtitleTypography>
                </Grid>
              </Grid>
            </div>
            <Background/>
          </HeroSection>

          <AboutSection maxWidth={false}>
            <ThemeProvider theme={LightTheme}>
              <Grid container item spacing={2} xs={9}>
                <Grid item xs={12}>
                  <Typography variant="h5" color="secondary">
                    At MedTechWare, we're committed to transforming lives through our personalized health monitoring technology. We offer a wide range of products and services tailored to various health needs.
                  </Typography>
                </Grid>
                <Grid item xs={aboutXs}>
        <img src='/craiyon_003911_diverse_range_of_individuals_engaged_in_various_health_related_activities_in_minimalist_corporate_art_style.png' style={{ width: '100%' }}/>
                </Grid>
                <Grid item xs={aboutXs}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <HospitalIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Diabetes Management"
                        secondary="Explore our Smart Insulin Pens and Continuous Glucose Monitors."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Cardiovascular Health"
                        secondary="Discover our Blood Pressure and Heart Rate Monitors."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WellnessIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Overall Wellness"
                        secondary="Check out our Smart Scales, Sleep Monitors, and Fitness Trackers."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LanguageIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Virtual Health Services"
                        secondary="Benefit from our Telemedicine Kits, Remote Monitoring Service, Personalized Health Insights, 24/7 Health Support, and Virtual Diabetes Education and Management Program."
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </ThemeProvider>
          </AboutSection>

          <SloganSection maxWidth={false}>
            <Grid container item xs={12} style={{ textAlign: 'center', color: pink[100] }}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    <span style={{ fontWeight: 900 }}>MedTechWare</span>. Here to help <span style={{ fontWeight: 900 }}>you</span> live your healthiest life.
                  </Typography>
                </Grid>
            </Grid>
          </SloganSection>

          <TestimonialsSection maxWidth={false}>
            <ThemeProvider theme={DarkTheme}>
              <Grid container item xs={9}>
                <Grid item xs={12}>
                  <Typography variant="h4" color={DarkTheme.palette.grey[100]}>Testimonials</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Testimonials/>
                </Grid>
              </Grid>
            </ThemeProvider>
          </TestimonialsSection>

          <ContactSection maxWidth={false}>
            <ThemeProvider theme={LightTheme}>
              <Grid container item xs={9}>
                <Grid item xs={12}>
                  <Typography variant="h4" color='secondary'>
                    Contact us
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" color='secondary' component='div'>
                    We're always here to help. Feel free to reach out with any questions or feedback.
                  </Typography>
                  <Typography variant="caption" color='secondary' style={{ verticalAlign: 'top', fontSize: '0.5em'}}>
                    Please note that this form will direct your message to the creator's personal email as MedTechWare is a fictitious company for portfolio demonstration.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <ContactForm/>
                </Grid>
              </Grid>
            </ThemeProvider>
          </ContactSection>
        </Layout>
    );
}
