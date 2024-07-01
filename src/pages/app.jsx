// src/pages/app.jsx
import { Helmet } from 'react-helmet-async';
import { Typography, Container, Box, List, ListItem, ListItemText } from '@mui/material';

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Web Challenge </title>
      </Helmet>

      <Container maxWidth="xl">
        <Box sx={{ my: 5 }}>
          <Typography variant="h2" sx={{ mb: 5 }}>
            Web Challenge
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Implementation Details:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Technologies Used" 
                secondary="React, Material-UI template, Vite, React Router, Google OAuth"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="User Page" 
                secondary="Displays user data in a table, with modal for detailed user information"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Charts Page" 
                secondary="Visualizes data using ApexCharts, showing product sales and cart size distribution"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Products Page" 
                secondary="Implements infinite scrolling, search functionality, and sorting options"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Authentication" 
                secondary="Implemented Google Sign-In for user authentication"
              />
            </ListItem>
          </List>
        </Box>
      </Container>
    </>
  );
}