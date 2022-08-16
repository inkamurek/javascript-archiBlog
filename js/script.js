/* eslint-disable indent */
'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
 tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  // console.log(targetArticle);

  //  /* add class 'active' to the correct article */
  //  console.log('clickedElement:', targetArticle);

  targetArticle.classList.add('active');
}

//  -----------------------------------------------------------------------------------------------

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 5 ,
  optCloudClassPrefix = 'tag-size-';



function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  const clearTitleList = function () {
    titleList.innerHTML = '';
  };

  clearTitleList();

  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  let html = ' ';

  for (let article of articles) {
    // console.log(article);

    /* get the article id */
    const articleId = article.getAttribute('id');
    // console.log(articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    // console.log(articleTitle);

    /* create HTML of the link */
    // const linkHTML =
    //   '<li><a href="#' +
    //   articleId +
    //   '"><span>' +
    //   articleTitle +
    //   '</span></a></li>';

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}


generateTitleLinks();

//  ----------------------------------------------------------------------------------------------- MODUŁ 6 --------------------


const optTagsListSelector = '.tags.list';
console.log('optTagsListSelector' , optTagsListSelector);

let allTags = {};


function calculateTagsParams(tags) {

  const params = {max: 0, min: 9999};
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];}
    if(tags[tag] < params.min){
      params.min = tags[tag];}
  }
  return params;
}


function calculateTagClass (count, params) {

       const normalizedCount = count - params.min;
       const normalizedMax = params.max - params.min;
       const percentage = normalizedCount / normalizedMax;
       const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

      return (optCloudClassPrefix, classNumber);
}


function generateTags() {

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
   
    const tagList = article.querySelector(optArticleTagsSelector);

    let html = '';

    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {
     
    const tagHTMLData = {id: tag, title: tag};
    const tagHTML = templates.tagLink(tagHTMLData);
console.log("tagHTML", tagHTML)
      html = html + tagHTML;

      if(!allTags.hasOwnProperty(tag)) {

        allTags[tag] = 1;}
         else {
        allTags[tag]++;
      }
    }

    tagList.innerHTML = html;
  }

  const tagList = document.querySelector(optTagsListSelector);
  console.log('tagList:', tagList);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  
   const allTagsData = {tags: []};

   for(let tag in allTags){

       allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
  } 

   tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData:' , allTagsData);
}


generateTags();


//  -----------------------------------------------------------------------------------------------


function tagClickHandler(event) {

  event.preventDefault();

  const clickedElement = this;
  const tagSelector = clickedElement.getAttribute('href');
  const onlyTag = tagSelector.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  const activeHrefTags = document.querySelectorAll('[href="' + tagSelector + '"]');

  for (let activeHrefTag of activeHrefTags) {
    /* add class active */
    activeHrefTag.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + onlyTag + '"]');
}


function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('[href^="#tag-"]');
  console.log('tagLinks' , tagLinks);

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

// -------------------------------------------------------------------------------------------------------------------


const optAuthorsListSelector = '.authors.list';
console.log('optAuthorsListSelector' , optAuthorsListSelector);

let allAuthors = {};


function calculateAuthorsParams(authors) {

  const params = {max: 0, min: 9999};
  for(let author in authors){
    console.log(author + ' is used ' + authors[author] + ' times');
    if(authors[author] > params.max){
      params.max = authors[author];}
    if(authors[author] < params.min){
      params.min = authors[author];}
  }
  return params;
}


function calculateAuthorClass (count, params) {
  
       const normalizedCount = count - params.min;
       const normalizedMax = params.max - params.min;
       const percentage = normalizedCount / normalizedMax;
       const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

      return (optCloudClassPrefix, classNumber);
}


function generateAuthors() {

  const articles = document.querySelectorAll(optArticleSelector);
 
  for (let article of articles) {
    const authorList = article.querySelector(optArticleAuthorSelector);

    let html = '';

    const author = article.getAttribute('data-author');
   console.log("author", author)
    /* create HTML of the link */
    // const authorHTML =
    //   '<li><a href="#author-' + author + '"><span>' + author + '</span></a></li>';

const authorHTMLData = {id: author, title: author};
const authorHTML = templates.authorLink(authorHTMLData);
console.log("authorHTML",authorHTML)

    html = html + authorHTML;

      if(!allAuthors.hasOwnProperty(author)) {
        allAuthors[author] = 1;}
         else {
        allAuthors[author]++;
      }
    
    authorList.innerHTML = html;
  }

  const authorList = document.querySelector(optAuthorsListSelector);
  console.log("authorList ", authorList)
  const authorsParams = calculateAuthorsParams(allAuthors);
  const allAuthorsData = {authors: []};

   for(let author in allAuthors){
    console.log('author' , author);

      //  const authorLinkHTML = '<li><a class="tag-size-' + calculateAuthorClass(allAuthors[author], authorsParams) + '" href=#author-' +  author  +  '>' + author + '</a></li>'
      //  console.log('authorLinkHTML:', authorLinkHTML);
      //  allAuthorsHTML += authorLinkHTML;

      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateAuthorClass(allAuthors[author], authorsParams)
      });
    }
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
   console.log('allAuthorsData:', allAuthorsData);
  }

generateAuthors();

//  -----------------------------------------------------------------------------------------------


function authorClickHandler(event) {

  event.preventDefault();

  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const authorSelector = clickedElement.getAttribute('href');
  console.log('href:', authorSelector);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const onlyAuthor = authorSelector.replace('#author-', '');
  console.log('onlyAuthor' , onlyAuthor);

  /* find all tag links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */
  for (let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeHrefAuthors = document.querySelectorAll(
    '[href="' + authorSelector + '"]'
  );
  console.log('activeHrefAuthor' , activeHrefAuthors);

  /* START LOOP: for each found tag link */
  for (let activeHrefAuthor of activeHrefAuthors) {
    /* add class active */
    activeHrefAuthor.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author~="' + onlyAuthor + '"]');
}


function addClickListenersToAuthors() {
  /* find all links to tags */
  const authorLinks = document.querySelectorAll('[href^="#author-"]');
  console.log('authorLinks: ' , authorLinks);

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();

// ----------------------------------------------------------------------------------------------- CHMURA TAGÓW

  