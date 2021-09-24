document.addEventListener("DOMContentLoaded", function() {
  //美食
  const food = document.querySelectorAll(".foodpic");
  const intr = document.querySelectorAll(".foodIntr");
  for (let i = 0; i < food.length; i++) {
    food[i].addEventListener("click", function () {
      for (let j = 0; j < intr.length; j++) {
        if (intr[j].id === this.id) {
          intr[j].classList.remove("hidden");
        } else {
          intr[j].classList.add("hidden");
        }
      }
    });

    food[i].addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
    });
    food[i].addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  }
});