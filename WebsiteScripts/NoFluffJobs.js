sections = document.querySelectorAll(".list-container");
list = [];

sections.forEach((element, index, array) => {
    
    sectionList = element.querySelectorAll("a.posting-list-item.ng-star-inserted");
    sectionList.forEach((element) => {
        list.push(element);
    });
    
});


jobs = Object.values(list).map( el => {
    
  offerLink = el.href;
  logoLink = el.querySelector("img").src;
  title = el.querySelector('h3').textContent.trim();
  companyName = el.querySelector('span.d-block.posting-title__company.text-truncate').textContent.trim();

  (el.querySelector('.posting-info__location').textContent.trim() == 'Zdalna') ? remote = true : remote = false;

  if (el.querySelector('nfj-posting-item-city.mr-1.flex-shrink-0.ng-star-inserted') != null)  {
    locationvar = el.querySelector('nfj-posting-item-city.mr-1.flex-shrink-0.ng-star-inserted').textContent.trim();

    if (locationvar.includes('+')) {
      locationvar = locationvar.split('\n ')[0];
    };
     
  } else {
    locationvar = null
  };
    
    salary = el.querySelector('span.salary').textContent.trim();
  
  return {
    offerLink,
    logoLink,
    title,
    companyName,
    remote,
    salary,
    location:locationvar
  }

});

console.log(jobs);