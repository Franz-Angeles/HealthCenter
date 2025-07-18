// Drop-up menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("dropup-toggle");
  const close = document.getElementById("close");
  const open = document.getElementById("open");

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      close.classList.remove("hidden");
      open.classList.add("hidden");
    } else {
      close.classList.add("hidden");
      open.classList.remove("hidden");
    }
  });
});
