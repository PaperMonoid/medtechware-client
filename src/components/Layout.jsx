import { Container, TableContainer } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";


export default function Layout({ isLight, children }) {
    return (
        <>
          <Header isLight={isLight}>
          </Header>
          <div style={{ marginBottom: '64px' }}/>
          <div style={{ display: 'flex', width: '100%', flexDirection: 'column'}}>
            <main style={{ display: 'flex', width: '100%', flexDirection: 'column'}}>{children}</main>
          </div>
          <Footer/>
        </>
  );
}
