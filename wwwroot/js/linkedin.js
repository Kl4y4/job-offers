buttons = document.querySelectorAll('.artdeco-pagination__pages--number > li');
list = document.querySelectorAll('.jobs-search-results__list > li');

jobs = Array(Object.values(list).map(li=>{

    logoLink = li.querySelector('img').src;
    title = li.querySelector('.job-card-list__title').textContent.trim();
    companyName = li.querySelector('.job-card-container__company-name').textContent.trim();

    return {
        logoLink,
        title,
        companyName
    }

}
));
