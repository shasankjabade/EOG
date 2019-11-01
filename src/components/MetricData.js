import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { Provider, createClient, useQuery } from "urql";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

const getSelectedMetrics = state => {
  const selectedMetrics = state.metric.selectedMetrics;
  return selectedMetrics;
};

export default () => {
  return (
    <Provider value={client}>
      <MetricsData />
    </Provider>
  );
};
const MetricsData = () => {
  return (
    <Grid container style={{ paddingTop: 20 }} spacing={2}>
      <Grid item sm={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="h2">
              be nev o lent
            </Typography>
            <Typography color="textSecondary">adjective</Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="h2">
              be nev o lent
            </Typography>
            <Typography color="textSecondary">adjective</Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
