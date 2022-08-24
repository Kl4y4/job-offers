description = "";
list = document.querySelectorAll(".listing-container > *");
list.forEach((el) => {
  if (el.nodeName == "DIV") {
    description += el.textContent + "\n";
  } else if (el.nodeName == "UL") {
    lst = el.querySelectorAll("li");
    lst.forEach((elm) => {
      description += elm.textContent + "\n";
    });
  }
});
console.log(description);
