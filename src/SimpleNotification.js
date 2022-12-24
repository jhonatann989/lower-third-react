import * as React from 'react';
import { Snackbar, Card, CardHeader, Avatar, CardContent, Typography, Fade, Collapse, Grow, Zoom } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getStorageData, encodedLogo, getCurrentSlideData } from './App';
import Slide, { SlideProps } from '@mui/material/Slide';

export default function SimpleNotification(props) {
  const { snackbarId } = props
  const [properties, setProperties] = React.useState({})
  const [shouldAnimate, setShouldAnimate] = React.useState(true)

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      let storageProperties = getStorageData(`Snackbar_${snackbarId}`)
      let storagePropertiesObject = JSON.parse(storageProperties)
      setShouldAnimate((storagePropertiesObject?.isOpen != properties?.isOpen))
      setProperties(storagePropertiesObject)
    }, 500)
    return () => clearTimeout(timeout)
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <Collapse direction={translateDirection(properties?.vertical)} in={properties.isOpen}>
        <Typography className="text-animation" >
          {properties?.title}
        </Typography>
      </Collapse>
    </ThemeProvider>
  );
}

export const darkTheme = createTheme({
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

const translateDirection = (string) => {
  switch(string) {
    case "top": return "up";
    case "bottom": return "down";
    default: return string
  }
}