import { useState } from 'react';
import Head from "next/head";
import { ThemeProvider } from '@mui/material/styles';

import '../styles/global.css';
import Disclaimer from "../components/modals/Disclaimer.jsx";
import { LightTheme } from '../components/Theme.jsx';


export default function App({ Component, pageProps }) {
    const [ session, setSession ] = useState(null);

    const handleAccept = () => {
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
          {
              !session
                  ? (<Disclaimer isOpen={!session} handleAccept={handleAccept} />)
                  : (<Component {...pageProps} />)

          }
        </ThemeProvider>
    );
}
