'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  //  console.log('clickedElement:', clickedElement);
  //  const clickedElement = this;
  for (let activeLink of activeLinks) {
    activeLink.classList.add('active');
  }

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  //  /* add class 'active' to the correct article */
  //  console.log('clickedElement:', targetArticle);

  targetArticle.classList.add('active');
}



//  -----------------------------------------------------------------------------------------------

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks() {
  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  titleList.innerHTML = ' ';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);

  /* find all the articles and save them to variable: articles */
  /* ... */

  let html = '';

  for (let article of articles) {
    console.log(article);
  
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    console.log(articleTitle);

    /* create HTML of the link */
    const linkHTML =
    '<li><a href="#' +
    articleId +
    '"><span>' +
    articleTitle +
    '</span></a></li>';
    console.log(linkHTML);

    // /* insert link into titleList */  
    //   titleList.insertAdjacentHTML("afterbegin", linkHTML);
    /* insert link into html variable */
    html = html + linkHTML;

    console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


//  ----------------------------------------------------------------------------------------------- MODUŁ 6 --------------------



function generateTags(){
  /* find all articles */

  const articles = document.querySelectorAll('article');

  /* START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);
  
  /* find tags wrapper */
  const tagList = article.querySelector(optArticleTagsSelector);
  // console.log(tagList);

  /* make html variable with empty string */
  tagList.innerHTML = ' ';
  let html = '';

  /* get tags from data-tags attribute */
  const articleTags = article.getAttribute('data-tags');
  // console.log(articleTags);

  /* split tags into array */
  // .split(' ')
  const articleTagsArray = articleTags.split(' ');
  console.log(articleTagsArray);

    

  /* START LOOP: for each tag */
for (let tag of articleTagsArray){
console.log(tag)


/* generate HTML of the link */

      /* add generated code to html variable */

    /* END LOOP: for each tag */

     /* create HTML of the link */
     const linkHTML =
     '<li><a href="#' +
     tag +
     '"><span>' +
      tag  +
     '</span></a></li>';
    //  console.log(linkHTML);
 
     // /* insert link into titleList */  
     //   titleList.insertAdjacentHTML("afterbegin", linkHTML);
     /* insert link into html variable */
     html = html + linkHTML;

    console.log(html);
  }

  tagList.innerHTML = html;

}
    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
}

generateTags();