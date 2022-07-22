"use strict";

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll(".titles a.active");
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* add class 'active' to the clicked link */
  //  console.log('clickedElement:', clickedElement);
  //  const clickedElement = this;
  for (let activeLink of activeLinks) {
    activeLink.classList.add("active");
  }

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".active");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  //  /* add class 'active' to the correct article */
  //  console.log('clickedElement:', targetArticle);

  targetArticle.classList.add("active");
}

//  -----------------------------------------------------------------------------------------------

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list";

function generateTitleLinks (customSelector = ''){
  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  titleList.innerHTML = " ";

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  // console.log(customSelector)
  // console.log(optArticleSelector + customSelector)

  /* find all the articles and save them to variable: articles */
  /* ... */

  let html = " ";

  for (let article of articles) {
    console.log(article);

    /* get the article id */
    const articleId = article.getAttribute("id");
    // console.log(articleId);

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
      "</span></a></li>";
    console.log(linkHTML);

    // /* insert link into titleList */
    //   titleList.insertAdjacentHTML("afterbegin", linkHTML);
    /* insert link into html variable */
    html = html + linkHTML;

    console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");
  console.log(links);
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();

//  ----------------------------------------------------------------------------------------------- MODUŁ 6 --------------------

function generateTags() {
  /* find all articles */

  const articles = document.querySelectorAll("article");

  /* START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    // console.log(tagList);

    /* make html variable with empty string */
    tagList.innerHTML = "  ";
    let html = " ";

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    // console.log(articleTags);

    /* split tags into array */
    // .split(' ')
    const articleTagsArray = articleTags.split(" ");
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);

      /* generate HTML of the link */

      /* add generated code to html variable */

      /* END LOOP: for each tag */

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + "</span></a></li>";

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

//  -----------------------------------------------------------------------------------------------

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log("Link was clicked!");

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const tagSelector = clickedElement.getAttribute("href");
  console.log(tagSelector);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const targetTag = document.querySelector(tagSelector);
  console.log(targetTag);
  
  const onlyTag = targetTag.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll(".active");

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {

    /* remove class active */
      activeTag.classList.remove("active");

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeHrefTags = document.querySelectorAll('a.active[href^="#tag-"]');
  'a[href="' + href + '"]'

  /* START LOOP: for each found tag link */
for (let activeHrefTag of activeHrefTags){
    

  /* add class active */
  activeHrefTag.classList.add("active");

  /* END LOOP: for each found tag link */
}
  /* execute function "generateTitleLinks" with article selector as argument */


  generateTitleLinks('[data-tags~="' + tag + '"]');
  function generateTitleLinks(customSelector = ''){
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

  }
function addClickListenersToTags() {
  /* find all links to tags */
  /* START LOOP: for each link */
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}
}
// // addClickListenersToTags();