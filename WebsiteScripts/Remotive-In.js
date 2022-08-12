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

locationVar = document.querySelector(".tw-align-middle").textContent.trim();
workSchedule = document
  .querySelectorAll(".tw-flex.tw-flex-col.tw-m-auto > span")[5]
  .textContent.trim();

publishedDateObj = new Date();
dateObj = document.querySelectorAll(".tw-flex.tw-flex-col.tw-m-auto > span")[7];
if (dateObj != "-") {
  dateInfo = dateObj.textContent.trim();
  if (dateInfo.includes("wk")) {
    publishedDateObj.setDate(
      publishedDateObj.getDate() - dateInfo.slice(0, 1) * 7
    );
  } else if (dateInfo.includes("d")) {
    publishedDateObj.setDate(publishedDateObj.getDate() - dateInfo.slice(0, 1));
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

description = "";
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
