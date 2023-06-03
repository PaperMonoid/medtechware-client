import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GithubIcon from '@mui/icons-material/Github';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArticleIcon from '@mui/icons-material/Article';
import { ThemeProvider, styled } from '@mui/material/styles';

import MUILink from './MUILink.jsx';
import { DarkTheme } from './Theme.jsx';


const Footer = (props) => (<footer {... props}/>);
const Div = (props) => (<div {... props}/>);

//theme.palette.secondary.main
const DarkFooter = styled(Footer)(({theme}) => ({
    backgroundColor: theme.palette.grey[900],
    padding: theme.spacing(2),
    textAlign: 'center',
    maxWidth: '100vw',
}));

const Links = styled(Div)(({theme}) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    gap: 10,
}));

const Link = styled(MUILink)(({theme}) => ({
    margin: theme.spacing(0, 2),
    color: theme.palette.getContrastText(theme.palette.secondary.main),
}));

const WhiteButton = styled(Button)(({theme}) => ({
    display: 'flex',
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.20)',
    },
    gap: '5px',
}));


export default function() {
    return (
        <ThemeProvider theme={DarkTheme}>
          <DarkFooter>
            <Links>
              <Link href="https://www.linkedin.com/in/daniel-santiago-aguila-torres-0a3a60203/" target="_blank" rel="noopener">
                <WhiteButton variant="text">
                  <LinkedInIcon/>
                  LinkedIn
                </WhiteButton>
              </Link>
              <Link href="https://orcid.org/0000-0001-8164-0963" target="_blank" rel="noopener">
                <WhiteButton>
                  <ArticleIcon/>
                  ORCID
                </WhiteButton>
              </Link>
              <Link href="https://github.com/PaperMonoid" target="_blank" rel="noopener">
                <WhiteButton>
                  <GithubIcon/>
                  GitHub
                </WhiteButton>
              </Link>
            </Links>
            <Typography variant="caption" color="textSecondary" component='div'>
              &copy; 2023 MedTechWare | Created by Daniel Santiago Aguila Torres
            </Typography>
            <Typography variant="caption" color="textSecondary" component='div'>
              for iTjuana Full Stack Development Bootcamp
            </Typography>
            <Typography variant="caption" color="textSecondary" style={{fontSize: 10, opacity: 0.5}}>
              All content on this website is fictional and for demonstration purposes only.
            </Typography>
          </DarkFooter>
        </ThemeProvider>
    );
}
