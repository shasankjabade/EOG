import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { Provider, createClient, useQuery } from "urql";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MetricData from "./MetricData";
const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

const query = `
query{
  getMetrics
}
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const getMetrics = state => {
  const metrics = state.metric.metrics;
  return metrics;
};
export default () => {
  return (
    <Provider value={client}>
      <Metric />
    </Provider>
  );
};
const getSelectedMetrics = state => {
  const selectedMetrics = state.metric.selectedMetrics;
  return selectedMetrics;
};
const Search = () => {
  const dispatch = useDispatch();
  const selectedMetrics = useSelector(getSelectedMetrics);
  const updateSelectedMetrics = event => {
    dispatch({ type: actions.UPDATE_SELECTED_METRICS, event });
  };
  return (
    <FormControl style={{ width: "85%", paddingTop: 50 }}>
      <Select
        multiple
        displayEmpty
        value={selectedMetrics}
        onChange={updateSelectedMetrics}
        input={<Input />}
        MenuProps={MenuProps}
      >
        {useSelector(getMetrics).map((name, index) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Metric = () => {
  const dispatch = useDispatch();
  // const { metrics } = useSelector(getMetrics);
  const [result] = useQuery({ query });
  const { fetching, data, error } = result;
  const selectedMetrics = useSelector(getSelectedMetrics);
  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    const metrics = data["getMetrics"];
    dispatch({ type: actions.METRICS_DATA_RECEIVED, metrics });
  }, [dispatch, data, error]);
  console.log(selectedMetrics);
  return (
    <Container>
      <Search />
      <MetricData />
    </Container>
  );
};
