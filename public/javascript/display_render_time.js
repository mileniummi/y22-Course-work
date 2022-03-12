document.addEventListener("DOMContentLoaded", function () {
  const getServerLoadingTime = function () {
    if (document.cookie.includes("server-loading-time")) {
      return parseInt(
        document.cookie.match(/server-loading-time=(.+?);*/)[1],
        10
      );
    } else return -1;
  };
  const DOMLoadTime = window.performance.now().toFixed(2);
  document.getElementById(
    "load-time"
  ).innerText = `Total load time: ${DOMLoadTime}ms (client), ${getServerLoadingTime()}ms (server)`;
});
