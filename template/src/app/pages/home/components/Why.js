import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Container, Grid, Button, Link} from '@material-ui/core';


const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(2),
      minHeight: 160,
      marginTop: theme.spacing(8),
    },

    link: {
      marginTop: theme.spacing(1),
      display: 'block',
    },
    img: {
      maxWidth: 960,
      width: '100%',
      height: 'auto',
      marginTop: theme.spacing(4),
    },
    button: {
      margin: theme.spacing(4, 0, 6),
    },
  }),
  { name: 'Themes' },
);

const TryOreactLink = React.forwardRef((props, ref) => {
  return (
    <Link
      href={'http://oreactjs.com/docs/getting-started/installation'}
      underline={'none'}
      role={"button"}
      {...props}
    />
  );
});

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            {'Why OREACT'}
          </Typography>
          <Typography color="textSecondary" align="center" gutterBottom className={'text-18'}>
            {'Forget all the boilerplate and focus on implementing application features.'}
          </Typography>
          <div className={'pt-64 pb-32'}>
              <Grid container spacing={3} justify="center" alignItems="center">
                  <Grid item xs={12} xl={4} md={4}>
                      <Typography gutterBottom variant="h5" component="h2" className={'text-center'}>
                          Fully Extensible
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Need to customize a piece of Oreact? No problem. Complete control over customizing Server, Babel, Webpack and many more. Oreact is based on a powerful modular architecture.
                      </Typography>
                  </Grid>
                  <Grid item xs={12} xl={4} md={4}>
                      <Typography gutterBottom variant="h5" component="h2" className={'text-center'}>
                          Modern web techs
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Oreact is a bundle of latest web technologies: React.js, Material-UI, GraphQL, Webpack, modern JavaScript and CSS and more — all set up and waiting for you to start building.
                      </Typography>
                  </Grid>
                  <Grid item xs={12} xl={4} md={4}>
                      <Typography gutterBottom variant="h5" component="h2" className={'text-center'}>
                          Enjoyable
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Oreact handed with tools that provide amazing developer experience. Expect appealing solutions, descriptive error messages, powerful defaults and detailed documentation.
                      </Typography>
                  </Grid>
              </Grid>
          </div>
          <Grid container justify="center">
            <Button variant="outlined" component={TryOreactLink} className={classes.button}>{'TRY OREACT'}</Button>
          </Grid>
        </Container>
    </div>
  );
}
