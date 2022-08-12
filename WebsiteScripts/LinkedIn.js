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

list = document.querySelectorAll(".jobs-search-results__list > li");

jobs = Object.values(list).map((li) => {
  li.querySelector(".job-card-container--clickable").click();

  offerLink = li.querySelector(".job-card-container__link").href;
  logoLink = li.querySelector("img").src;
  title = li.querySelector(".job-card-list__title").textContent.trim();
  companyName = li
    .querySelector(".job-card-container__company-name")
    .textContent.trim();

  dateInfo = document
    .querySelector(".jobs-unified-top-card__posted-date")
    .textContent.trim();
  publishedDateObj = new Date();
  if (dateInfo.includes("tygodni") || dateInfo.includes("tydzień")) {
    publishedDateObj.setDate(
      publishedDateObj.getDate() - dateInfo.slice(0, 1) * 7
    );
  } else if (dateInfo.includes("dni") || dateInfo.includes("dzień")) {
    publishedDateObj.setDate(publishedDateObj.getDate() - dateInfo.slice(0, 1));
  } else if (dateInfo.includes("godzin")) {
    publishedDateObj.setHours(
      publishedDateObj.getHours() - dateInfo.slice(0, 1)
    );
  } else if (dateInfo.includes("mies")) {
    publishedDateObj.setMonth(
      publishedDateObj.getMonth() - dateInfo.slice(0, 1)
    );
  }

  publishedDate = extractDate(publishedDateObj);

  mainPane = document.querySelector(".jobs-search__job-details--container");

  if (
    mainPane.querySelector(".jobs-unified-top-card__job-insight > span") != null
  ) {
    etatInfo = mainPane
      .querySelector(".jobs-unified-top-card__job-insight > span")
      .textContent.trim();
    workSchedule = etatInfo.split("·")[0].trim();
    tmp = mainPane.querySelectorAll(".jobs-unified-top-card__job-insight")[1];
    companyInfo = tmp.querySelector("span").textContent.split("·");
    companySize = companyInfo[0].trim();
    tags = document.querySelector(".jobs-search-box__text-input").value + ",";
    tags += companyInfo[1].trim();
  }

  locationVar = li
    .querySelector(".job-card-container__metadata-item")
    .textContent.trim();

  remote = null;
  remoteInfo = "";
  if (
    li.querySelector(".job-card-container__metadata-item--workplace-type") !=
    null
  ) {
    remoteInfo = li
      .querySelector(".job-card-container__metadata-item--workplace-type")
      .textContent.trim();
  }
  if (remoteInfo.includes("zdalna")) remote = true;
  else if (remoteInfo.includes("hybryd")) remote = "Hybrydowa";
  else remote = false;

  description = document.querySelector("#job-details span").textContent.trim();

  return {
    offerLink,
    logoLink,
    title,
    companyName,
    companySize,
    publishedDate,
    workSchedule,
    location: locationVar,
    remote,
    tags,
    description,
  };
});

console.log(jobs);

/*
fetch("https://localhost:5001/offers/m", {
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": JSON.stringify(jobs)
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});

*/
