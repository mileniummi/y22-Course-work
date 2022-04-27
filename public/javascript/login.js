supertokens.init({
  apiDomain: "https://home-hunter.herokuapp.com",
  apiBasePath: "/docs",
});

const form = document.getElementById("log__page-form");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const res = await fetch("/auth/authorizationurl?thirdPartyId=google", {
      method: "GET",
      headers: {
        rid: "thirdpartyemailpassword",
      },
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
});
