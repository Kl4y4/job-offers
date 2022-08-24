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

const checkIfRemote = (locVar) => {
  if (locVar == null) return null;
  if (locVar.includes("Worldwide")) {
    return true;
  } else {
    return false;
  }
};

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

  console.log(descObjs);
  description = "";
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

  publishedDate = "";
  dateObj = tr.querySelector("time");
  if (dateObj != null) {
    time = new Date(dateObj.getAttribute("datetime"));
    publishedDate = extractDate(time);
  } else {
    publishedDate = extractDate(new Date());
  }

  locationVar = null;
  salary = null;
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

  //remote = checkIfRemote(locationVar);
  remote = true;

  tags = "";
  tagsList = tr.querySelectorAll(".tag");
  tagsList.forEach((tag) => {
    tags += tag.querySelector("h3").textContent.trim() + ",";
  });

  postedSite = window.location.host;

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

console.log(jobs);
