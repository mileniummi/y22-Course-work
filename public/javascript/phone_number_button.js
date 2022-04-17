for (let phoneButton of document.getElementsByClassName("phone_number")) {
  phoneButton.addEventListener("click", function listener(event) {
    event.preventDefault();
    const phoneNumber = phoneButton.dataset.contactNumber;
    phoneButton.innerHTML = phoneNumber;
    phoneButton.setAttribute("href", `tel:${phoneNumber}`);
    phoneButton.removeEventListener("click", listener);
  });
}
