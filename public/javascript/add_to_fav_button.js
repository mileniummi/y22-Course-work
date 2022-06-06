function addAndRemoveFromFav(className) {
  let buttons = document.getElementsByClassName(className);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.add("active");
    buttons[i].addEventListener("click", async function (e) {
      e.preventDefault();
      //axios here
      const advId = buttons[i].dataset.advId;
      axios.put(`/favourites/${advId}`);
      if (buttons[i].classList.contains("favourites_active")) {
        buttons[i].innerHTML = "Добавить в избранное";
        buttons[i].classList.remove("favourites_active");
      } else {
        buttons[i].classList.add("favourites_active");
        buttons[i].innerHTML = '<i class="fas fa-heart"></i> В избранном';
      }
    });
  }
}

if (username) {
  addAndRemoveFromFav("favourites_button");
}
