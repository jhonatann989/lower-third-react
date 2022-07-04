import * as React from 'react';
import { Snackbar, Card, CardHeader, Avatar, CardContent, Typography } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getStorageData, encodedLogo, getCurrentSlideData } from './App';

export default function SingleSackbar(props) {
  const { snackbarId } = props
  const [properties, setProperties] = React.useState({})
  const [calledTimeOut, setCalledTimeout] = React.useState(0)

  if (calledTimeOut == 0) {
    setTimeout(() => {
      setCalledTimeout(calledTimeOut + 1)
      let storageProperties = getStorageData(`Snackbar_${snackbarId}`)
      setProperties(JSON.parse(storageProperties))
    }, 500)
  } else { setCalledTimeout(calledTimeOut - 1) }

  return (
    <ThemeProvider theme={darkTheme}>
        <Snackbar
          anchorOrigin={{ 
            vertical: properties.vertical? properties.vertical : "top", 
            horizontal: properties.horizontal? properties.horizontal : "left"
          }}
          open={properties.isOpen}
        >
          <Card >
            
            {properties.useOpenLpSource === "true" ?
              <CardContent>
                <div style={{ textAlign: properties.horizontal }}>{getCurrentSlideData()}</div>
              </CardContent>
            :
            <CardHeader 
              avatar={properties.hasAvatar === "true"? <Avatar src={encodedLogo} /> : null} 
              title={properties.title} 
              subheader={properties.subHeader} 
            />}
          </Card>
        </Snackbar>
    </ThemeProvider>
  );
}

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