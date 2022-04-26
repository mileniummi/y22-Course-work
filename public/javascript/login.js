const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  try {
    const res = await fetch("/", {
      method: "POST",
      body: JSON.strigify(formData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
  } catch {}
});
