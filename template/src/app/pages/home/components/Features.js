import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Container, Grid, Button, NoSsr} from '@material-ui/core';
import {Link} from '@oreact/core/router';

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
      data-ga-event-category="store"
      data-ga-event-action="click"
      data-ga-event-label="home"
      to={'/docs/getting-started/installation'}
      ref={ref}
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
            {'All The Features You\'ve Been Looking For.'}
          </Typography>
          <div className={'py-32'}>
              <Grid container spacing={3} justify="center" alignItems="center">
                  <Grid item xs={12} xl={4} md={4}>
                      <Typography gutterBottom variant="h5" component="h2" className={'text-center'}>
                          Authentication
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Authentication, registration, and password reset are ready out of the box.
                      </Typography>
                  </Grid>
                  <Grid item xs={12} xl={4} md={4}>
                      <Typography gutterBottom variant="h5" component="h2" className={'text-center'}>
                          Quick scaffolding
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Create App, Pages, Components, Stores and Themes and many more - right from the CLI!
                      </Typography>
                  </Grid>
                  <Grid item xs={12} xl={4} md={4}>
                      <Typography gutterBottom variant="h5" component="h2" className={'text-center'}>
                          SEO
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Server-Side rendering enabled SEO (document head tags management) for search engines that support indexing of JavaScript content. (eg. Google)
                      </Typography>
                  </Grid>
              </Grid>
          </div>
        </Container>
    </div>
  );
}
