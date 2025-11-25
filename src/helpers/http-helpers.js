  /**
   * @param {Object} _this - The current Vue component instance.
   * @param {Object} error - The error returned by Axios.
   * @param {string} title - A title for the error notification.
   * @param {Object} description - A description object for the body of the error notification. This contains:
   * @param {string} description.prefix - The text that will go before the error description from the error object.
   * @param {string} description.suffix - The text that will go after the error description from the error object.
   * @returns {void}
   * @description Emits an error notification that will be displayed in the terminal.
   */

const post_error = (
  _this,
  error,
  title = "Status",
  description = { prefix: "", suffix: "" }
) => {
  let notification = {
    icon: "gear",
    title: `${title} (${error.response?.status || 0}):`,
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
