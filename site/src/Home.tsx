import * as React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  banner: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
  },
  logo: {
    width: 200,
    margin: '0 auto',
  },
  intro: {
    marginTop: 40,
    color: '#ddd',
  },
  introMain: {
    fontSize: '1.3rem',
    fontFamily: `"Fira Code", monospace`,
  },
  introSmall: {
    fontSize: '0.8rem',
    fontFamily: `"Fira Code", monospace`,
  },
  introSub: {
    fontSize: '1.1rem',
    fontFamily: `"Fira Code", monospace`,
    marginTop: 30,
    // fontWeight: 500,
  },
  section: {
    padding: '60px 0',
    background: 'linear-gradient(top, #ffffff 0%, #f9f8f7 100%)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  img: {
    maxWidth: '100%',
    maxHeight: 270,
    height: 'auto',
    display: 'block', // To get rid of bottom spacing
    margin: '0px auto',
  },
  dropShadow: {
    boxShadow: `rgba(0, 0, 0, 0.55) 0px 9px 12px`,
  },
  title: {
    color: `rgba(0, 0, 0, 0.87)`,
    fontWeight: 600,
  },
  body: {
    color: `#555`,
    fontSize: `1.2em`,
  },
  sub: {
    color: `rgba(0, 0, 0, 0.5)`,
  },
});

function Section({
  title,
  body,
  sub = undefined,
  img,
  alt,
  rtl = false,
  dropShadow = false,
}) {
  const classes = useStyles();
  return (
    <section className={classes.section}>
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={3}>
          {rtl && (
            <Grid item xs={6}>
              <img src={img} alt={alt} className={classes.img} />
            </Grid>
          )}
          <Grid item xs={6}>
            <Typography variant="h2" className={classes.title} gutterBottom>
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.body}
              gutterBottom>
              {body}
            </Typography>
            {sub && (
              <Typography variant="body2" className={classes.sub} gutterBottom>
                {sub}
              </Typography>
            )}
          </Grid>
          {!rtl && (
            <Grid item xs={6}>
              <img
                src={img}
                alt={alt}
                className={clsx(classes.img, dropShadow && classes.dropShadow)}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </section>
  );
}

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Vest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classes.banner}>
        <img src="images/logo.svg" alt="vest logo" className={classes.logo} />
        <div className={classes.intro}>
          <Typography
            className={classes.introMain}
            variant="body1"
            gutterBottom
            align="center">
            We believe front-end code should be tested in the browser.
          </Typography>
          <Typography
            className={classes.introSmall}
            variant="body1"
            gutterBottom
            align="center">
            Not in node. Not using JSDOM.
          </Typography>
          <Typography
            className={classes.introSub}
            variant="body1"
            gutterBottom
            align="center">
            Vest, together with webpack, make your tests an integral part of
            your app.
          </Typography>
        </div>
      </div>

      <main>
        <Section
          title="Test Everywhere"
          body="Bundle tests with your app and load them dynamically on demand. Then run them everywhere."
          sub="Even your mom's iPhone."
          img="images/test-everywhere.png"
          alt="A mobile phone, tablet and laptop with and app and tests labels on screen"
        />
        <Section
          title="Poly-syntax"
          body={
            <>
              Vest currently supports:
              <ul>
                <li>Mocha</li>
                <li>Cucumber/Gherkin</li>
              </ul>
              You can use both in your suite.
            </>
          }
          sub="Vest can be extended to support Jest, Ava, and the likes."
          img="images/poly-syntax.svg"
          alt="A word cloud with test related keywords"
          rtl
        />
        <Section
          title="All-inclusive"
          body={
            <>
              With Vest you can run all these tests under one roof:
              <ul>
                <li>Unit</li>
                <li>Integration</li>
                <li>Rendering/Snapshot</li>
                <li>E2E</li>
              </ul>
            </>
          }
          sub="This can have quite an effect on your coverage report and overall testing strategy."
          img="images/all-inclusive.svg"
          alt="A graph showing 3 circles within 3 circles"
        />
        <Section
          title="Zero Setup"
          body="Webpack is already set to compile your app. With Vest, you simply add your tests to that process. No extra setup. No extra compilation."
          sub="Ever tried to test a Typescript React Component that imports a css module? Save the time and complexity involved in installing additional packages and setting-up custom transformers."
          img="images/zero-setup.png"
          alt="A code snippet"
          dropShadow
          rtl
        />
        <Section
          title="Familiar Debugging"
          body="Use your browser's developer tools to debug your tests."
          img="images/familiar-debugging.png"
          alt="The source panel of Chrome developer tools"
          dropShadow
        />
        <Section
          title="CI"
          body="Tests run on CI by spinning a headless browser, or using Browsertsack el al."
          sub="Surely you do that already."
          img="images/cl.svg"
          alt="Command line logo"
          rtl
        />
        <Section
          title="Minimalisticomposition"
          body="Vest is composed of a few small packages. It adheres to the Minimal API Surface principle."
          sub="No assertion, stubs, mocks or related API - use existing libraries of your choice for these."
          img="images/architecture.svg"
          alt="A diagram showing the component of Vest"
        />
      </main>
    </div>
  );
}
