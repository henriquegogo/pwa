(function() {
  const keys = document.getElementsByTagName("td");
  for (let key of keys) {
    key.onclick = function() {
      if (key.dataset.value == "backspace") {
        content.value = content.value.slice(0, -1);
      } else {
        content.value += key.dataset.value || key.innerText;
      }
      content.scrollTop = content.scrollHeight;
    }
  }
})();
