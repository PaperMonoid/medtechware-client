import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const styles = {
    dialog: {
        display: 'flex',
        textAlign: 'center',
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogTitle: {
        fontSize: '3rem',
        textAlign: 'center',
        fontWeight: 700,
    },
    dialogContent: {
        margin: 'auto',
        maxWidth: '75%',
    },
    dialogActions: {
        justifyContent: 'center',
    },
    agreeButton: {
        fontSize: '1rem',
        padding: 10,
        fontWeight: 700,
        marginBottom: 30
    },
};


export default function ResponsiveDialog({ isOpen, handleAccept }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
          open={isOpen}
          fullScreen={true}
          onClose={handleAccept}
          aria-labelledby="responsive-dialog-title"
          style={styles.dialog}
        >
          <DialogTitle id="responsive-dialog-title" style={styles.dialogTitle}>
            {"Disclaimer"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span style={styles.dialogContent}>
                This website is a portfolio project created for the <span style={{fontWeight: 700, color: theme.palette.text.primary}}>iTjuana Bootcamp</span>. <span style={{fontWeight: 700, color: theme.palette.text.primary }}>MedTechWare</span> is a fictitious company and none of the products or services listed on this website are real. We collect data about usage statistics for the purpose of demonstrating the capabilities of the website, such as product recommendations. By entering this website, you <span style={{fontWeight: 700, color: theme.palette.text.primary }}>acknowledge and accept</span> that all information, products, and services are purely demonstrative.
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={styles.dialogActions}>
            <Button
              onClick={handleAccept}
              autoFocus
              variant='contained'
              disableElevation
              size='large'
              style={styles.agreeButton}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
    );
}
