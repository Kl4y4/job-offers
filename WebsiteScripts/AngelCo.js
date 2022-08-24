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

postedSite = window.location.host;
sections = document.querySelectorAll(".styles_component__uTjje");
jobs = [];

sections.forEach((element) => {
  list = element.querySelectorAll(".styles_component__Ey28k");

  logoLink = element.querySelector("img.rounded-md").src;
  companyName = element.querySelector(".styles_name__zvQcy").textContent.trim();
  companySize = element
    .querySelector(".styles_companySize__gMajF")
    .textContent.split(" ")[0]
    .trim();

  list.forEach((el) => {
    offerLink = el.querySelector(
      ".styles_component__UCLp3.styles_defaultLink__eZMqw.styles_jobLink__US40J"
    ).href;
    title = el
      .querySelector(".styles_titleBar__f7F5e > span")
      .textContent.trim();

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

    remote = null;
    locationVar = "";
    locationObjs = el.querySelectorAll(".styles_location__O9Z62");
    locationObjs.forEach((elm) => {
      if (
        elm.textContent.includes("emote") ||
        elm.textContent.includes("nsite")
      )
        remote = elm.textContent.trim();
      else locationVar += elm.textContent.trim() + ",";
    });

    salary = el.querySelector(".styles_compensation__3JnvU").textContent.trim();
    salary = salary.replace("•", "");

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

console.log(jobs);

/*
return {
  //offerLink,
  //logoLink,
  //title,
  //companyName,
  //companySize,
  //publishedDate,
  //location,
  //salary,
  //remote,
  //postedSite
}

//w srodku:
//workSchedule, tags
*/
