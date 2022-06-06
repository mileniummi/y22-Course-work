document.addEventListener("DOMContentLoaded", function () {
  const DOMLoadTime = window.performance.now().toFixed(2);
  document.getElementById("load-time").innerText = `Total load time: ${DOMLoadTime}ms (client), `;
});
