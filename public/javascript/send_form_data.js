const form = document.getElementById("loginForm");
const inputs = form.getElementsByTagName("input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const credentials = {};
  for (const input of inputs) {
    credentials[input.name] = formData.get(input.name);
  }
  console.log(credentials);
  const res = await fetch("/auth/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(credentials),
  });
  console.log(res.data);
});
