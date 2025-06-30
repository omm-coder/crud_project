export default function themChanger(ele1, ele2, ele3) {
    //UI theme changer
if (localStorage.getItem("theme") !== "dark-theme") {
  document.body.classList.remove("dark-theme");
  ele1.classList.replace("fa-moon", "fa-sun");
  ele2.forEach((a_tag) => {
    a_tag.classList.remove("darkThem-ul-li-a");
  });
  ele3.classList.remove("dark-thead");
} 
else {
  document.body.classList.add("dark-theme");
  ele1.classList.replace("fa-sun", "fa-moon");
  ele2.forEach((a_tag) => {
    a_tag.classList.add("darkThem-ul-li-a");
  });
  ele3.classList.add("dark-thead");
}

ele1.addEventListener("click", () => {
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    ele1.classList.replace("fa-moon", "fa-sun");
    ele2.forEach((a_tag) => {
      a_tag.classList.remove("darkThem-ul-li-a");
    });
    ele3.classList.remove("dark-thead");
    localStorage.setItem("theme", "light-theme");
  } else {
    document.body.classList.add("dark-theme");
    ele1.classList.replace("fa-sun", "fa-moon");
    ele2.forEach((a_tag) => {
      a_tag.classList.add("darkThem-ul-li-a");
    });
    ele3.classList.add("dark-thead");
    localStorage.setItem("theme", "dark-theme");
  }
});

}