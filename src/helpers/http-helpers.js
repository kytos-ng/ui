const post_error = (
  _this,
  error,
  title = "Status",
  description = { prefix: "", suffix: "" }
) => {
  let notification = {
    icon: "gear",
    title: `${title} (${error.response.status}):`,
    description: `${description.prefix}${
      error.response.data.description
        ? error.response.data.description
        : error.response.data
    }${description.suffix}`,
  };

  _this.$kytos.eventBus.$emit("setNotification", notification);
};

const http_helpers = { post_error };

export default http_helpers;
