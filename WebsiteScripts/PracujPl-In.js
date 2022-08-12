description = "";
tags = null;
i = 0;

list = document.querySelectorAll(".offer-viewIPoRwg");

if (list[0].getAttribute("data-scroll-id") == "technologies-1") {
  tags = "";
  tagsInfo = list[0];
  lst = tagsInfo.querySelectorAll("li");
  lst.forEach((el) => {
    tags += el.textContent.trim() + ",";
  });
  i = 1;
}

for (i; i < list.length; i++) {
  description += list[i].querySelector("h2").textContent.trim() + "\n";

  lst = [];
  if (list[i].querySelector("ul") != null) {
    lst = list[i].querySelectorAll("li");
  } else {
    lst = list[i].querySelectorAll("*:not(h2)");
  }

  lst.forEach((elm) => {
    description += elm.textContent.trim() + "\n";
  });
}

job = {
  tags,
  description,
};

console.log(job);
