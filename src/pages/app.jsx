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
                secondary="Displays user data in a table, with modal for detailed user information. Users can be clicked to display details in a modal, sorted by different categories, and searched for."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Charts Page" 
                secondary="Visualizes data using ApexCharts, showing product sales and cart size distribution. Also includes a pie chart for gender distribution, and you can click on the product chart to bring up the product detail modal. Products can be searched to show in how many carts they are."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Products Page" 
                secondary="Implements search functionality, category filters, highlights when low on stock, modal for details, and sorting by price."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Authentication" 
                secondary="Implemented Google Sign-In for user authentication and sign-out."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Deployment" 
                secondary="Dockerized the app and deployed to GitHub Pages."
              />
            </ListItem>
          </List>
        </Box>
      </Container>
    </>
  );
}
