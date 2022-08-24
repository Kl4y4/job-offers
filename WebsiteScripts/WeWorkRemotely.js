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

sections = document.querySelectorAll(".jobs");
list = [];

sections.forEach((element) => {
  sectionList = element.querySelectorAll("li:not(.view-all)");
  sectionList.forEach((element) => {
    list.push(element);
  });
});

console.log(list);

jobs = Object.values(list)
  .slice(0, list.length)
  .map((li) => {
    offerLink =
      "weworkremotely.com" + li.querySelectorAll("a")[1].getAttribute("href") ||
      null;

    logoLink = null;
    img = li.querySelector(".flag-logo");
    if (img != null) {
      style = img.style || window.getComputedStyle(img, false);
      logoLink = style.backgroundImage.slice(4, -1).replace(/['"]/g, "");
    }

    title = li.querySelector(".title").innerText;
    companyName = li.querySelector(".company").innerText;

    publishedDate = "";
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
    postedSite = window.location.host;

    // firma, tytul, etat, lokacja, data dodania, logo
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

fetch("https://localhost:5001/offers/m", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: [],
})
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });

console.log(jobs);
