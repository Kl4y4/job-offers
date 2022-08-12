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

const stripEmojis = (str) =>
  str
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();

offerLink = "";
logoLink = null;
title = "";
companyName = "";
companySize = null;
publishedDate = new Date();
workSchedule = null;
locationVar = "";
salary = null;
remote = null;
contract = null;
tags = "";
postedSite = window.location.host;
description = "";

list = [];
jobs = [];
/*
  public Uri OfferLink { get; init; }
  public Uri LogoLink { get; init; }
  public string Title { get; init; }
  public string CompanyName { get; init; }
  public string PublishedDate { get; init; }
  public string Location { get; init; }
  public string Salary { get; init; }
  public string Remote { get; init; }
  public string Tags { get; init; }
  public string PostedSite { get; init; }

  //these be inside
  publishedDate not always visible outside
  public string PublishedDate { get; init; }
  //location info is sometimes cut badly (by the website)
  public string Location { get; init; }
  public string WorkSchedule { get; init; }
*/

function angelCo() {

  // getting jobs, grouped by companies
  sections = document.querySelectorAll(".styles_component__uTjje");
  sections.forEach((element) => {

    list = element.querySelectorAll(".styles_component__Ey28k");

    // fields common for every job offer in group
    logoLink = element.querySelector("img.rounded-md").src;
    companyName = element
      .querySelector(".styles_name__zvQcy")
      .textContent.trim();

    companySize = element
      .querySelector(".styles_companySize__gMajF")
      .textContent.split(" ")[0]
      .trim();

    // getting individual offers
    list.forEach((el) => {
      offerLink = el.querySelector(
        ".styles_component__UCLp3.styles_defaultLink__eZMqw.styles_jobLink__US40J"
      ).href;

      title = el
        .querySelector(".styles_titleBar__f7F5e > span")
        .textContent.trim();

      // getting date information
      dateObj = el.querySelector(
        ".styles_posted__X7_j0.styles_recentlyPosted__DKE_R.styles_tablet__Zoadf"
      );

      publishedDateObj = new Date();
      if (dateObj != null) {
        dateInfo = dateObj.textContent.trim();
        if (dateInfo.includes("week")) {
          publishedDateObj.setDate(
            publishedDateObj.getDate() - dateInfo.slice(0, 1) * 7
          );
        } else if (dateInfo.includes("day")) {
          publishedDateObj.setDate(
            publishedDateObj.getDate() - dateInfo.slice(0, 1)
          );
        } else if (dateInfo.includes("hour")) {
          publishedDateObj.setHours(
            publishedDateObj.getHours() - dateInfo.slice(0, 1)
          );
        } else if (dateInfo.includes("month")) {
          publishedDateObj.setMonth(
            publishedDateObj.getMonth() - dateInfo.slice(0, 1)
          );
        }
      }

      publishedDate = extractDate(publishedDateObj);

      // checking location and remoteness
      locationObjs = el.querySelectorAll(".styles_location__O9Z62");
      locationObjs.forEach((elm) => {
        if (
          elm.textContent.includes("emote") ||
          elm.textContent.includes("nsite")
        )
          remote = elm.textContent.trim();
        else locationVar += elm.textContent.trim() + ",";
      });

      salary = el
        .querySelector(".styles_compensation__3JnvU")
        .textContent.trim();
      salary = salary.replace("•", "");

      // single offer object
      obj = {
        offerLink,
        logoLink,
        title,
        companyName,
        companySize,
        publishedDate,
        location: locationVar,
        salary,
        remote,
        postedSite,
      };

      jobs.push(obj);
    });
  });
}

function angelCoIn() {

  // getting tags
  tagsObjs = document.querySelectorAll(".mb-1");
  tagsObjs.forEach((el) => {
    tags += el.textContent.trim() + ",";
  });

  // getting work schedule by finding the correct container
  infoObjs = document.querySelectorAll(".styles_characteristic__nbbma");
  infoObjs.forEach((el) => {
    if (el.querySelector("dt").textContent.includes("Job type")) {
      workSchedule = el.querySelector("dd").textContent.trim();
    }
  });

  // getting description, filtering the tags, so the text is formatted correctly
  list = document.querySelectorAll(".styles_description__uLHQ_ > *");
  list.forEach( el => {
    if (el.nodeName == "UL") {
      lst = el.querySelectorAll("li");
      lst.forEach( elm => {
        description += elm.textContent.trim() + "\n";
      });
    } else {
      description += el.textContent.trim() + "\n";
    }
  });

  job = {
    tags,
    workSchedule,
    description
  };

  console.log(job);

}

function linkedIn() {

  list = document.querySelectorAll(".jobs-search-results__list > li");

  jobs = Object.values(list).map((li) => {

    // TODO:
    // making the loop wait for the click - how
    li.querySelector(".job-card-container--clickable").click();

    offerLink = li.querySelector(".job-card-container__link").href;
    logoLink = li.querySelector("img").src;
    title = li.querySelector(".job-card-list__title").textContent.trim();
    companyName = li
      .querySelector(".job-card-container__company-name")
      .textContent.trim();

    // getting date info
    dateInfo = document
      .querySelector(".jobs-unified-top-card__posted-date")
      .textContent.trim();
    publishedDateObj = new Date();
    if (dateInfo.includes("tygodni") || dateInfo.includes("tydzień")) {
      publishedDateObj.setDate(
        publishedDateObj.getDate() - dateInfo.slice(0, 1) * 7
      );
    } else if (dateInfo.includes("dni") || dateInfo.includes("dzień")) {
      publishedDateObj.setDate(
        publishedDateObj.getDate() - dateInfo.slice(0, 1)
      );
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
      mainPane.querySelector(".jobs-unified-top-card__job-insight > span") !=
      null
    ) {
      workScheduleInfo = mainPane
        .querySelector(".jobs-unified-top-card__job-insight > span")
        .textContent.trim();
      workSchedule = workScheduleInfo.split("·")[0].trim();
      tmp = mainPane.querySelectorAll(".jobs-unified-top-card__job-insight")[1];
      companyInfo = tmp.querySelector("span").textContent.split("·");
      companySize = companyInfo[0].trim();
      tags = document.querySelector(".jobs-search-box__text-input").value + ",";
      companyInfo[1] != null
        ? (tags += companyInfo[1].trim())
        : (tags = tags.trim());
    }

    locationVar = li
      .querySelector(".job-card-container__metadata-item")
      .textContent.trim();

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

    description = document
      .querySelector("#job-details span")
      .textContent.trim();

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
}

function noFluffJobs() {

  sections = document.querySelectorAll(".list-container");

  sections.forEach((element, index, array) => {
    sectionList = element.querySelectorAll(
      "a.posting-list-item.ng-star-inserted"
    );
    sectionList.forEach((element) => {
      list.push(element);
    });
  });

  jobs = Object.values(list).map((el) => {
    offerLink = el.href;
    logoLink = el.querySelector("img").src;
    title = el.querySelector("h3").textContent.trim();
    companyName = el
      .querySelector("span.d-block.posting-title__company.text-truncate")
      .textContent.trim();

    el.querySelector(".posting-info__location").textContent.trim() == "Zdalna"
      ? (remote = true)
      : (remote = false);

    if (
      el.querySelector(
        "nfj-posting-item-city.mr-1.flex-shrink-0.ng-star-inserted"
      ) != null
    ) {
      locationvar = el
        .querySelector(
          "nfj-posting-item-city.mr-1.flex-shrink-0.ng-star-inserted"
        )
        .textContent.trim();

      if (locationvar.includes("+")) {
        locationvar = locationvar.split("\n ")[0];
      }
    } else {
      locationvar = "";
    }

    salary = el.querySelector("span.salary").textContent.trim();

    return {
      offerLink,
      logoLink,
      title,
      companyName,
      remote,
      salary,
      location: locationvar,
    };

  });

}

function noFluffJobsIn() {

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

  if (document.querySelector("p.mb-0.d-flex.flex-lg-column") != null) {
    companySize = document
      .querySelectorAll("p.mb-0.d-flex.flex-lg-column")[1]
      .textContent.trim()
      .split(":  ")[1];
  }

  description = document
    .querySelector(".font-weight-normal")
    .textContent.trim();

  job = {
    publishedDate,
    tags,
    companySize,
    description,
  };

  console.log(job);

}

function pracujPl() {

  list = document.querySelectorAll(
    "#results > .results__list-container > li.results__list-container-item:not(.ad-container)"
  );

  jobs = Object.values(list).map((li) => {

    if (li.querySelector("a.offer-details__title-link") != null) {
      offerLink = li.querySelector("a.offer-details__title-link").href;
    } else {
      li.querySelector("li.offer-labels__item--location").click();

      offerLink = li.querySelector(".offer-regions__label").href;
    }

    title = li.querySelector(".offer-details__title-link").textContent.trim();

    if (li.querySelector("img.offer-logo__image") != null) {
      logoLink = li.querySelector("img.offer-logo__image").src;
    }

    companyName = li.querySelector(".offer-company__name").textContent.trim();

    if (
      li.querySelector('li[data-test="list-item-offer-type-of-contract"]') !=
      null
    ) {
      contract = li
        .querySelector('li[data-test="list-item-offer-type-of-contract"]')
        .textContent.trim();
    }

    if (
      li.querySelector('li[data-test="list-item-offer-work-modes"]') == null
    ) {
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

    if (
      li.querySelector('li[data-test="list-item-offer-work-schedule"]') != null
    ) {
      workSchedule = li
        .querySelector('li[data-test="list-item-offer-work-schedule"]')
        .textContent.trim();
    }

    if (li.querySelector('li[data-test="list-item-offer-salary"]') != null) {
      salary = li
        .querySelector('li[data-test="list-item-offer-salary"]')
        .textContent.trim();
    }

    if (
      li.querySelector(
        '[data-test="list-item-offer-location"]:not(.offer-labels__item--expand-trigger)'
      ) != null
    ) {
      locationVar = li
        .querySelector('[data-test="list-item-offer-location"]')
        .textContent.trim();
    } else if (
      li.querySelector(".offer-labels__item--expand-trigger") != null
    ) {
      location_list = li.querySelectorAll(".offer-regions__label");

      locationVar = "";

      location_list.forEach((loc) => {
        locationVar += loc.textContent.trim() + "; ";
      });
    }

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

}

function pracujPlIn() {

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

}

function remoteOk() {

  // making sure the "hide closed" option is clicked 
  if (document.querySelector(".action-hide-closed") != null) {
    document.querySelector(".action-hide-closed > a").click();
  } else {
    console.log("already closed");
  }

  list = document.querySelectorAll(".job");

  jobs = Object.values(list).map((tr) => {

    tr.click();

    id = tr.id.replace(/\D/g, "");
    classString = "expand-" + id;

    descObj = document.getElementsByClassName(classString)[0];
    descObjs = descObj.querySelectorAll(".html > *");

    descObjs.forEach((el) => {
      if (el.nodeName == "UL") {
        lst = el.querySelectorAll("li");
        lst.forEach((elm) => {
          description += elm.textContent.trim() + "\n";
        });
      } else {
        description += el.textContent.trim() + "\n";
      }
    });

    offerLink = "remoteok.com" + tr.getAttribute("data-url");
    logoLink = tr.querySelector(".logo").src || null;
    title = tr.querySelector("h2").textContent.trim();
    companyName = tr.querySelector("h3").textContent.trim();

    dateObj = tr.querySelector("time");
    if (dateObj != null) {
      time = new Date(dateObj.getAttribute("datetime"));
      publishedDate = extractDate(time);
    } else {
      publishedDate = extractDate(new Date());
    }

    locsal = tr.querySelectorAll(".location");
    if (locsal.length == 2) {
      locationVar = locsal[0].textContent;
      locationVar = stripEmojis(locationVar);
      salary = locsal[1].textContent;
      salary = stripEmojis(salary);
    } else if (locsal.length == 1) {
      if (locsal[0].textContent.includes("$")) {
        salary = locsal[0].textContent;
        salary = stripEmojis(salary);
      } else {
        locationVar = locsal[0].textContent;
        locationVar = stripEmojis(locationVar);
      }
    }

    remote = true;

    tagsList = tr.querySelectorAll(".tag");
    tagsList.forEach((tag) => {
      tags += tag.querySelector("h3").textContent.trim() + ",";
    });

    tr.click();

    return {
      offerLink,
      logoLink,
      title,
      companyName,
      publishedDate,
      location: locationVar,
      salary,
      remote,
      tags,
      postedSite,
      description,
    };

  });

}

function remotive() {

  // WIP - if you use the search feature on the site, 
  //you have to click "more jobs" button a few times, 
  // (to get all them offers)
  let scroller = setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
    if (document.querySelector("#morejobs > button") != null) {
      document.querySelector("#morejobs > button").click();
    } else {
      clearTimeout(scroller);
    }
  }, 100);

  list = document.querySelectorAll("#hits > ul > .tw-cursor-pointer");

  jobs = Object.values(list).map((div) => {
    offerLink = div.querySelector(".job-tile-apply.remotive-btn-info").href;

    img = div.querySelector(".tw-px-2.tw-flex-shrink-0 > img");
    img != null ? (logoLink = img.src) : (logoLink = null);

    title = stripEmojis(div.querySelector(".remotive-bold").textContent);
    companyName = div.querySelectorAll(".remotive-bold")[2].textContent.trim();

    publishedDateObj = new Date();
    dateObj = div.querySelector(".tw-text-xs.tw-mr-4");
    if (dateObj != null) {
      dateInfo = dateObj.textContent.trim();
      if (dateInfo.includes("wk")) {
        publishedDateObj.setDate(
          publishedDateObj.getDate() - dateInfo.slice(0, 1) * 7
        );
      } else if (dateInfo.includes("d")) {
        publishedDateObj.setDate(
          publishedDateObj.getDate() - dateInfo.slice(0, 1)
        );
      } else if (dateInfo.includes("hr")) {
        publishedDateObj.setHours(
          publishedDateObj.getHours() - dateInfo.slice(0, 1)
        );
      } else if (dateInfo.includes("mth")) {
        publishedDateObj.setMonth(
          publishedDateObj.getMonth() - dateInfo.slice(0, 1)
        );
      } else if (dateInfo.includes("Yday")) {
        publishedDateObj.setDate(publishedDateObj.getDate() - 1);
      }
    }

    publishedDate = extractDate(publishedDateObj);

    locationVar = div
      .querySelector(".tag-small.remotive-tag-light.tw-flex.left-tag")
      .textContent.trim();

    salaryInfo = div.querySelector(
      ".tw-ml-0-important.tag-small.remotive-tag-chocolate.remotive-text-sand"
    );
    if (salaryInfo != null) {
      salary = stripEmojis(salaryInfo.textContent);
    }

    remote = true;

    tags = div.querySelector(".remotive-url").textContent.trim() + ",";
    if (tags.includes("All") || tags.includes(".all")) {
      tags = null;
    }

    return {
      offerLink,
      logoLink,
      title,
      companyName,
      publishedDate,
      location: locationVar,
      salary,
      remote,
      tags,
      postedSite,
    };

  });

}

function remotiveIn() {

  locationVar = document.querySelector(".tw-align-middle").textContent.trim();
  workSchedule = document
    .querySelectorAll(".tw-flex.tw-flex-col.tw-m-auto > span")[5]
    .textContent.trim();

  publishedDateObj = new Date();
  dateObj = document.querySelectorAll(
    ".tw-flex.tw-flex-col.tw-m-auto > span"
  )[7];
  if (dateObj != "-") {
    dateInfo = dateObj.textContent.trim();
    if (dateInfo.includes("wk")) {
      publishedDateObj.setDate(
        publishedDateObj.getDate() - dateInfo.slice(0, 1) * 7
      );
    } else if (dateInfo.includes("d")) {
      publishedDateObj.setDate(
        publishedDateObj.getDate() - dateInfo.slice(0, 1)
      );
    } else if (dateInfo.includes("hr")) {
      publishedDateObj.setHours(
        publishedDateObj.getHours() - dateInfo.slice(0, 1)
      );
    } else if (dateInfo.includes("mth")) {
      publishedDateObj.setMonth(
        publishedDateObj.getMonth() - dateInfo.slice(0, 1)
      );
    } else if (dateInfo.includes("Yday")) {
      publishedDateObj.setDate(publishedDateObj.getDate() - 1);
    }
  }

  publishedDate = extractDate(publishedDateObj);

  descObj = document.querySelector(".left > div");
  descObjs = descObj.querySelectorAll("*");
  console.log(descObjs);
  descObjs.forEach((el) => {
    if (el.nodeName == "UL") {
      lst = el.querySelectorAll("li");
      lst.forEach((elm) => {
        description += elm.textContent.trim() + "\n";
      });
    } else if (el.nodeName == "P") {
      description += el.textContent.trim() + "\n";
    }
  });

  job = {
    publishedDate,
    location: locationVar,
    workSchedule,
    description,
  };

  console.log(job);

}

function weWorkRemotely() {

  sections = document.querySelectorAll(".jobs");

  sections.forEach((element) => {
    sectionList = element.querySelectorAll("li:not(.view-all)");
    sectionList.forEach((element) => {
      list.push(element);
    });
  });

  jobs = Object.values(list)
    .slice(0, list.length)
    .map((li) => {
      offerLink =
        "weworkremotely.com" +
          li.querySelectorAll("a")[1].getAttribute("href") || null;

      img = li.querySelector(".flag-logo");
      if (img != null) {
        style = img.style || window.getComputedStyle(img, false);
        logoLink = style.backgroundImage.slice(4, -1).replace(/['"]/g, "");
      }

      title = li.querySelector(".title").innerText;
      companyName = li.querySelector(".company").innerText;

      dateObj = li.querySelector("time");
      if (dateObj != null) {
        time = new Date(dateObj.getAttribute("datetime"));
        time.setMonth(time.getMonth());
        publishedDate = extractDate(time);
      } else {
        publishedDate = extractDate(new Date());
      }

      workSchedule = li.querySelectorAll(".company")[1].innerText;
      locationVar = li.querySelector(".region.company").innerText;
      remote = true;
      tags = document.querySelector(".jobs a").innerText;

      return {
        offerLink,
        logoLink,
        title,
        companyName,
        publishedDate,
        workSchedule,
        location: locationVar,
        remote,
        tags,
        postedSite,
      };

    });

}

function weWorkRemotelyIn() {

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

}

switch(window.location.host) {
  case 'angel.co':
    angelCo();
    break;
  case 'www.linkedin.com':
    linkedIn();
    break;
  case 'nofluffjobs.com':
    noFluffJobs();
    break;
  case 'www.pracuj.pl':
    pracujPl();
    break;
  case 'remoteok.com':
    remoteOk();
    break;
  case 'remotive.com':
    remotive();
    break;
  case 'weworkremotely.com':
    weWorkRemotely();
    break;
  default:
    jobs = [];
    break;
}

console.log(jobs);

fetch("https://localhost:5001/offers/m", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(jobs),
})
.then((response) => {
  console.log(response);
})
.catch((err) => {
  console.error(err);
});
