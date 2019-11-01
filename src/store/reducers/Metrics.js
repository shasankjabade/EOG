import * as actions from "../actions";

const initialState = {
  metrics: [],
  selectedMetrics: []
};

const MetricsDataReceived = (state, action) => {
  const getMetricsData = action;
  const { metrics } = getMetricsData;
  const selectedMetrics = [];
  return {
    metrics,
    selectedMetrics
  };
};
const UpdateSelectedMetrics = (state, action) => {
  const metrics = state["metrics"];
  const selectedMetrics = state["selectedMetrics"];
  selectedMetrics.indexOf(
    action.event.target["value"][action.event.target["value"].length - 1]
  ) === -1
    ? selectedMetrics.push(
        action.event.target["value"][action.event.target["value"].length - 1]
      )
    : selectedMetrics.pop(
        action.event.target["value"][action.event.target["value"].length - 1]
      );
  return { metrics, selectedMetrics };
};

const handlers = {
  [actions.METRICS_DATA_RECEIVED]: MetricsDataReceived,
  [actions.UPDATE_SELECTED_METRICS]: UpdateSelectedMetrics
};

export default (state = initialState, action) => {
  const handler = handlers[[action.type]];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
