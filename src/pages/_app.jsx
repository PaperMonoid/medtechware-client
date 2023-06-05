import { useState, useEffect } from 'react';
import Head from "next/head";
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';

import '../styles/global.css';
import Disclaimer from "../components/modals/Disclaimer.jsx";
import { LightTheme } from '../components/Theme.jsx';
import AuthService from '../services/AuthService.js';


export default function App({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasAgreed = typeof window !== 'undefined' && AuthService.hasAgreedDisclaimer();
    setSession(hasAgreed);
    setIsLoading(false);
  }, []);

  const handleAccept = () => {
    AuthService.agreeDisclaimer();
    setSession(true);
  };

  return (
    <ThemeProvider theme={LightTheme}>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Daniel Santiago Aguila Torres" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MedTechWare</title>
        <link rel="icon" type="image/x-icon" href="/medtechware.ico"/>
      </Head>
      {isLoading ? (
          <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100vw',
              height: '100vh'
          }}>
            <CircularProgress size='10em' />
          </div>
      ) : !session ? (
        <Disclaimer isOpen={!session} handleAccept={handleAccept} />
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}

// export default function App({ Component, pageProps }) {
//     const [ session, setSession ] = useState(AuthService.hasAgreedDisclaimer());

//     useEffect(() => {
//         //setSession();
//     }, []);

//     const handleAccept = () => {
//         AuthService.agreeDisclaimer();
//         setSession(true);
//     };

//     return (
//         <ThemeProvider theme={LightTheme}>
//           <Head>
            // <meta charset="UTF-8" />
            // <meta name="keywords" content="titla, meta, nextjs" />
            // <meta name="author" content="Daniel Santiago Aguila Torres" />
            // <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            // <title>MedTechWare</title>
            // <link rel="icon" type="image/x-icon" href="/medtechware.ico"/>
//           </Head>
//           {
//               !session
//                   ? (<Disclaimer isOpen={!session} handleAccept={handleAccept} />)
//                   : (<Component {...pageProps} />)

//           }
//         </ThemeProvider>
//     );
// }
