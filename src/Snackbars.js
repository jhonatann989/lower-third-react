import * as React from 'react';
import { Snackbar, Card, CardHeader, Avatar, CardContent, Typography } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Snackbars(props) {
  const darkTheme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(0,0,0,0.9)",
          }
        }
      },
    },
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/** Top center */}
        {/** ------------------------- */}
        {/** Top right */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={props.topRight.isOpen}
        >
          <Card >
            <CardHeader avatar={<Avatar src={props.encodedLogo} />} title={props.topRight.title} subheader={props.topRight.subheader} />
          </Card>
        </Snackbar>
        {/** ------------------------- */}
        {/** bottom right */}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={props.bottomRight.isOpen}
        >
          <Card >
            <CardHeader avatar={<Avatar src={props.encodedLogo} />} title={props.bottomRight.title} subheader={props.bottomRight.subheader} />
          </Card>
        </Snackbar>
        {/** ------------------------- */}
        {/** bottom center */}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={props.bottomCenter.isOpen}
        >
          <Card >
            <CardContent>
              <div style={{ textAlign: "center" }}><Typography variant='h5'>{props.bottomCenter.title}</Typography> </div>
              <div style={{ textAlign: "center" }}>{props.bottomCenter.subheader}</div>
            </CardContent>
          </Card>
        </Snackbar>
        {/** ------------------------- */}
        {/** bottom left */}
        {/** ------------------------- */}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={props.bottomLeft.isOpen}
        >
          <Card >
            <CardHeader avatar={<Avatar src={props.encodedLogo} />} title={props.bottomLeft.title} subheader={props.bottomLeft.subheader} />
          </Card>
        </Snackbar>
        {/** Top left */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={props.topLeft.isOpen}
        >
          <Card >
            <CardHeader avatar={<Avatar src={props.encodedLogo} />} title={props.topLeft.title} subheader={props.topLeft.subheader} />
          </Card>
        </Snackbar>
        {/** ------------------------- */}
        {/** transthird openLP */}
        <Snackbar
          id="snackbarOpenLP"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={props.transthird.isOpen}
        >
          <Card >
            <CardContent>
              <div style={{ textAlign: "center" }}>{props.transthird.title}</div>
            </CardContent>
          </Card>
        </Snackbar>
      </div>

    </ThemeProvider>
  );
}