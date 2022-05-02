const paginationItems = document.getElementsByClassName("pagination__item");
const paginationContainer = document.getElementById("pagination");
if (totalPages <= 1) {
  paginationContainer.style.display = "none";
}
const paintCurrentPageItem = () => {
  for (const item of paginationItems) {
    if (currentPage === parseInt(item.innerHTML)) {
      item.classList.add("active");
    } else if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
    let href = `${location.pathname}${location.search}`;
    if (href.includes("page=")) {
      href = href.replace(/page=[0-9]+/, `page=${item.innerHTML}`);
    } else {
      if (href.includes("?")) {
        href = href.concat(`&page=${item.innerHTML}`);
      } else {
        href = href.concat(`?page=${item.innerHTML}`);
      }
    }
    item.href = href;
  }
};
paintCurrentPageItem();
for (const item of paginationItems) {
  item.addEventListener("click", () => {
    for (const item of paginationItems) {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    }
    item.classList.add("active");
    currentPage = parseInt(item.innerHTML);
  });
}
const changeCurrentPage = (operation) => {
  operation === "next" ? currentPage++ : currentPage !== 1 && currentPage--;
  paintCurrentPageItem();
  document.querySelector(".pagination__item.active").click();
};

document.getElementById("pagination_next").addEventListener("click", () => {
  changeCurrentPage("next");
});

document.getElementById("pagination_prev").addEventListener("click", () => {
  changeCurrentPage("prev");
});

if (currentPage === 1) {
  document.getElementById("pagination_prev").style.display = "none";
}

if (currentPage === totalPages) {
  document.getElementById("pagination_next").style.display = "none";
}
