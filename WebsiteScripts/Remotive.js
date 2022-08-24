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

  //just started getting date info ^^ :D
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

  salary = null;
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

  postedSite = window.location.host;

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
  public string Etat { get; init; }
*/
