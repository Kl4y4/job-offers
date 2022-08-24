tagsObjs = document.querySelectorAll(".mb-1");
tags = "";
tagsObjs.forEach((el) => {
  tags += el.textContent.trim() + ",";
});

workSchedule = null;
infoObjs = document.querySelectorAll(".styles_characteristic__nbbma");
infoObjs.forEach((el) => {
  if (el.querySelector("dt").textContent.includes("Job type")) {
    workSchedule = el.querySelector("dd").textContent.trim();
  }
});

description = "";
list = document.querySelectorAll(".styles_description__uLHQ_ > *");
list.forEach((el) => {
  if (el.nodeName == "UL") {
    lst = el.querySelectorAll("li");
    lst.forEach((elm) => {
      description += elm.textContent.trim() + "\n";
    });
  } else {
    description += el.textContent.trim() + "\n";
  }
});

job = {
  tags,
  workSchedule,
  description,
};

console.log(job);
