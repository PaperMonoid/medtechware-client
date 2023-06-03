import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled, ThemeProvider } from '@mui/material/styles';
import { grey, deepOrange } from '@mui/material/colors';

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Favorite as FavoriteIcon,
  AccessibilityNew as WellnessIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';

import Layout from "../components/Layout.jsx";
import MUILink from "../components/MUILink.jsx";
import { LightTheme } from '../components/Theme.jsx';
import Background from "../components/HomeBackground.jsx";
import Testimonials from "../components/Testimonials.jsx";

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


const TestimonialsSection = styled(Container)(({ theme }) => ({
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
    return (
        <Layout>
          <HeroSection maxWidth={false}>
            <div style={styles.parentLayout}>
              <div style={styles.divisor}/>
              <Grid container item spacing={2} xs={9}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Welcome to <Typography variant="h4" component="span">MedTechWare</Typography>
                  </Typography>
                  <div>
                    <Typography variant="h7" gutterBottom>
                      Your future of personalized{' '}
                      <Typography variant="h6" component="span" color="primary">
                        Health Technology
                      </Typography>
                    </Typography>
                  </div>
                  <br/>
                  <SubtitleTypography variant="body2" style={{ width: '70%'}}>
                    Discover our cutting-edge health monitoring devices, designed to empower you on your health journey.
                  </SubtitleTypography>
                </Grid>
                <Grid item style={styles.flexGrow}>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <Typography variant="h6" component='span'>
                      Get started now!
                    </Typography>
                    <Link href='/auth'>
                      <ColorButton>Shop</ColorButton>
                    </Link>
                  </div>
                  <SubtitleTypography variant="caption">
                    <MUILink href='/auth' style={{ textDecoration: 'underline' }}>Sign in</MUILink> and experience health technology like never before.
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
                  <Typography variant="body1">
                    At MedTechWare, we're committed to transforming lives through our personalized health monitoring technology. We offer a wide range of products and services tailored to various health needs:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
        <img src='/craiyon_003911_diverse_range_of_individuals_engaged_in_various_health_related_activities_in_minimalist_corporate_art_style.png' style={{ width: '100%' }}/>
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={12}>
                  <Typography variant="body1">
                    MedTechWare. Here to help you live your healthiest life.
                  </Typography>
                </Grid>
              </Grid>
            </ThemeProvider>
          </AboutSection>

          <TestimonialsSection maxWidth={false}>
            <ThemeProvider theme={LightTheme}>
              <Testimonials/>
            </ThemeProvider>
          </TestimonialsSection>
        </Layout>
    );
}
