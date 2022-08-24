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

list = document.querySelectorAll(
  "#results > .results__list-container > li.results__list-container-item:not(.ad-container)"
);

jobs = Object.values(list).map((li) => {
  // offerlink
  if (li.querySelector("a.offer-details__title-link") != null) {
    offerLink = li.querySelector("a.offer-details__title-link").href;
  } else {
    li.querySelector("li.offer-labels__item--location").click();

    offerLink = li.querySelector(".offer-regions__label").href;
  }

  // title
  title = li.querySelector(".offer-details__title-link").textContent.trim();

  // logo link
  logoLink = null;
  if (li.querySelector("img.offer-logo__image") != null) {
    logoLink = li.querySelector("img.offer-logo__image").src;
  }

  // company name
  companyName = li.querySelector(".offer-company__name").textContent.trim();

  // contract
  contract = null;
  if (
    li.querySelector('li[data-test="list-item-offer-type-of-contract"]') != null
  ) {
    contract = li
      .querySelector('li[data-test="list-item-offer-type-of-contract"]')
      .textContent.trim();
  }

  // remote
  if (li.querySelector('li[data-test="list-item-offer-work-modes"]') == null) {
    remote = null;
  } else {
    remote = li
      .querySelector('li[data-test="list-item-offer-work-modes"]')
      .textContent.trim();

    if (
      remote.includes("remote") ||
      remote.includes("zdalna") ||
      remote.includes("full office")
    ) {
      remote = true;
    }
  }

  // etat
  workSchedule = null;
  if (
    li.querySelector('li[data-test="list-item-offer-work-schedule"]') != null
  ) {
    workSchedule = li
      .querySelector('li[data-test="list-item-offer-work-schedule"]')
      .textContent.trim();
  }

  // salary
  salary = null;
  if (li.querySelector('li[data-test="list-item-offer-salary"]') != null) {
    salary = li
      .querySelector('li[data-test="list-item-offer-salary"]')
      .textContent.trim();
  }

  // location
  if (
    li.querySelector(
      '[data-test="list-item-offer-location"]:not(.offer-labels__item--expand-trigger)'
    ) != null
  ) {
    locationVar = li
      .querySelector('[data-test="list-item-offer-location"]')
      .textContent.trim();
  } else if (li.querySelector(".offer-labels__item--expand-trigger") != null) {
    location_list = li.querySelectorAll(".offer-regions__label");

    locationVar = "";

    location_list.forEach((loc) => {
      locationVar += loc.textContent.trim() + "; ";
    });
  }

  // date
  publishedDate = null;
  if (li.querySelector("span.offer-actions__date") != null) {
    publishedDate = li
      .querySelector("span.offer-actions__date")
      .textContent.trim();
  }

  day = publishedDate.split(" ")[1].trim();
  month = publishedDate.split(" ")[2].trim().slice(0, 3);
  year = publishedDate.split(" ")[3].trim();

  switch (month) {
    case "sty":
      month = 0;
      break;
    case "lut":
      month = 1;
      break;
    case "mar":
      month = 2;
      break;
    case "kwi":
      month = 3;
      break;
    case "maj":
      month = 4;
      break;
    case "cze":
      month = 5;
      break;
    case "lip":
      month = 6;
      break;
    case "sie":
      month = 7;
      break;
    case "wrz":
      month = 8;
      break;
    case "lis":
      month = 9;
      break;
    case "paź":
      month = 10;
      break;
    case "paz":
      month = 10;
      break;
    case "gru":
      month = 11;
      break;
  }

  publishedDate = extractDate(new Date(year, month, day));

  return {
    offerLink,
    logoLink,
    title,
    contract,
    workSchedule,
    companyName,
    publishedDate,
    remote,
    salary,
    location: locationVar,
  };
});
