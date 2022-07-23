"use strict";

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll(".titles a.active");
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");  }

  /* add class 'active' to the clicked link */
   console.log('clickedElement:', clickedElement);
  clickedElement.classList.add("active");
  

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".posts article.active");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  // console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  // console.log(targetArticle);

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
  // console.log(titleList);
  const clearTitleList = function(){
  titleList.innerHTML = " ";
  }

  clearTitleList()

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  // console.log(customSelector)
  // console.log(optArticleSelector + customSelector)

  /* find all the articles and save them to variable: articles */
  /* ... */

  let html = " ";

  for (let article of articles) {
    // console.log(article);

    /* get the article id */
    const articleId = article.getAttribute("id");
    // console.log(articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    // console.log(articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + "</span></a></li>";
    // console.log(linkHTML);

    // /* insert link into titleList */
    //   titleList.insertAdjacentHTML("afterbegin", linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;

    // console.log(html);
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

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
   
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    // console.log(tagList);

    /* make html variable with empty string */
    
    let html = "";

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

      /* create HTML of the link */
      const tagHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';

      /* insert link into html variable */
      html = html + tagHTML;
     
      // console.log(html);
    }

    tagList.innerHTML = html;
  }
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
  console.log("href:" , tagSelector);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const onlyTag = tagSelector.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll("a.active[href^='#tag-']");

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {

    /* remove class active */
      activeTag.classList.remove("active");

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeHrefTags = document.querySelectorAll(  '[href="' + href + '"]');
  
  /* START LOOP: for each found tag link */
for (let activeHrefTag of activeHrefTags){

  /* add class active */
  activeHrefTag.classList.add("active");

  /* END LOOP: for each found tag link */
}
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
const tagLinks = document.querySelectorAll('[href^="#tag-"]');
console.log(tagLinks)

  /* START LOOP: for each link */
  for (let tagLink of tagLinks){

  /* add tagClickHandler as event listener for that link */
  tagLink.addEventListener("click", titleClickHandler);


  /* END LOOP: for each link */
  }
}

addClickListenersToTags();