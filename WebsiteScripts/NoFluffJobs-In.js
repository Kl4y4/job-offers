const extractDate = (jsDate) => {
  day = "0";
  if (jsDate.getDate() < 10) {
    day += jsDate.getDate();
  } else {
    day = jsDate.getDate();
  }
  month = "0";
  if (jsDate.getMonth() < 10) {
    month += jsDate.getMonth() + 1;
  } else {
    month = jsDate.getMonth() + 1;
  }

  return `${day}.${month}.${jsDate.getFullYear()}`;
};

// tags

tags = "";
soft_skills = document.querySelectorAll(
  "button.btn.btn-outline-success.btn-sm.no-cursor.text-truncate"
);
hard_skills = document.querySelectorAll("common-posting-requirements a");

tagsList = [];
tagsList.push.apply(tagsList, soft_skills);
tagsList.push.apply(tagsList, hard_skills);

tagsList.forEach((tag) => {
  tags += tag.textContent.trim() + ",";
});

// date

dateInfo = document
  .querySelector("common-posting-time-info > div")
  .textContent.trim();
publishedDateObj = new Date();
if (dateInfo.includes("tygodni") || dateInfo.includes("tydzień")) {
  num = dateInfo.replace(/\D/g, "");
  publishedDateObj.setDate(publishedDateObj.getDate() - num * 7);
} else if (dateInfo.includes("dni") || dateInfo.includes("dzień")) {
  num = dateInfo.replace(/\D/g, "");
  publishedDateObj.setDate(publishedDateObj.getDate() - num);
} else if (dateInfo.includes("godzin")) {
  num = dateInfo.replace(/\D/g, "");
  publishedDateObj.setHours(publishedDateObj.getHours() - num);
} else if (dateInfo.includes("mies")) {
  num = dateInfo.replace(/\D/g, "");
  publishedDateObj.setMonth(publishedDateObj.getMonth() - num);
}

publishedDate = extractDate(publishedDateObj);

// company size
if (document.querySelector("p.mb-0.d-flex.flex-lg-column") != null) {
  companySize = document
    .querySelectorAll("p.mb-0.d-flex.flex-lg-column")[1]
    .textContent.trim()
    .split(":  ")[1];
} else {
  companySize = null;
}

description = document.querySelector(".font-weight-normal").textContent.trim();

job = {
  publishedDate,
  tags,
  companySize,
  description,
};
