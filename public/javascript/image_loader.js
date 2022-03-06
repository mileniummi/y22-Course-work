let imageSources = [];
let fileInput = document.getElementById("file-input");
let fileDisplayArea = document.getElementById("file_display_area");

fileInput.addEventListener(
  "change",
  function (e) {
    for (let i = 0, file; (file = fileInput.files[i]); i++) {
      let imageType = "image.*";

      if (file.type.match(imageType)) {
        let reader = new FileReader();
        reader.onload = function (e) {
          let img = new Image();
          img.src = e.target.result;
          img.classList.add("ad-adv__form__image");
          fileDisplayArea.appendChild(img);
          imageSources.push(img.src);
        };
        reader.readAsDataURL(file);
      }
    }
  },
  false
);
