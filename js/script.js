/* eslint-disable indent */
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
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
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
  optAuthorListSelector = '.authors.list',
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
  // console.log(customSelector)
  // console.log(optArticleSelector + customSelector)

  /* find all the articles and save them to variable: articles */
  /* ... */

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
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    // console.log(linkHTML);

    // /* insert link into titleList */
    //   titleList.insertAdjacentHTML("afterbegin", linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;

    // console.log(html);
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


const optTagsListSelector = '.tags.list';
console.log('optTagsListSelector' , optTagsListSelector);


/* [NEW] create a new variable allTags with an empty object*/
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

  // classNumber = Math.floor( 0.5 * 5 + 1 );
  // classNumber = Math.floor( 0.5 * optCloudClassCount + 1 );
  // classNumber = Math.floor( ( 4 / 8 ) * optCloudClassCount + 1 );
  // classNumber = Math.floor( ( (6 - 2) / (10 - 2) ) * optCloudClassCount + 1 );
  // classNumber = Math.floor( ( (count - 2) / (10 - 2) ) * optCloudClassCount + 1 );
  // classNumber = Math.floor( ( (count - 2) / (params.max - 2) ) * optCloudClassCount + 1 );
  // classNumber = Math.floor( ( (count - params.min) / (params.max - 2) ) * optCloudClassCount + 1 );
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );

  
      //  const normalizedCount = count - params.min;
      //  const normalizedMax = params.max - params.min;
      //  const percentage = normalizedCount / normalizedMax;
      //  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
}


function generateTags() {
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    console.log('tagList' , tagList);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('articleTags' , articleTags);

    /* split tags into array */
    // .split(' ')
    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
     

      /* create HTML of the link */
      const tagHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

        // console.log("tagHTML" , tagHTML)

      /* insert link into html variable */
      html = html + tagHTML;

      /* [NEW] check if this link is NOT already in allTags */
      // eslint-disable-next-line no-undef
      if(!allTags.hasOwnProperty(tag)) {

        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;}
         else {
        allTags[tag]++;
      }

      // console.log('HTML', html);
    }

    tagList.innerHTML = html;
    console.log("HTML0" , html)
    console.log("tagList1" , tagList)
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  console.log("tagListNew" , tagList)
  console.log("allTags" , allTags)




//  



  // console.log(allTags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  
   /* [NEW] create variable for all links HTML code */
   let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags */
   for(let tag in allTags){
    console.log("tag" , tag)
       /* [NEW] generate code of a link and add it ti allTagsHTML */
       allTagsHTML += tag + ' (' + allTags[tag] + ')' ;

      console.log("allTags" , allTags)

      //  const tagLinkHTML = '<li><a href=#tag-' + calculateTagClass(allTags[tag], tagsParams) + '</a></li>'
       const tagLinkHTML = '<li><a href="#tag-' + calculateTagClass(allTags[tag], tagsParams) + '"></a></li>';
       console.log('taglinkHTML:', tagLinkHTML);

       allTagsHTML += tagLinkHTML;


   /* [NEW] END LOOP: for each tag in allTags: */
  } 

   /* [NEW] add html from allTagshTML to tagList */
   tagList.innerHTML = allTagsHTML;
}



generateTags();


//  -----------------------------------------------------------------------------------------------

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const tagSelector = clickedElement.getAttribute('href');
  console.log('href:', tagSelector);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const onlyTag = tagSelector.replace('#tag-', '');
  console.log('onlyTag:', onlyTag);

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
  console.log('tagSelector:' , tagSelector);

  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeHrefTags = document.querySelectorAll('[href="' + tagSelector + '"]');

console.log ('activeHrefTags:' , activeHrefTags);

  /* START LOOP: for each found tag link */
  for (let activeHrefTag of activeHrefTags) {
    /* add class active */
    activeHrefTag.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
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

function generateAuthors() {

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles:', articles);
  // const authorList = document.querySelector(optAuthorListSelector);

  /* make html variable with empty string */


  

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find author */

    const authorList = article.querySelector(optArticleAuthorSelector);
    // console.log('auhtorList:', authorList);

    let html = '';
    
    /* get tags from data-tags attribute */
    // const author = article.getAttribute('class');
    const author = article.getAttribute('data-author');
   
    // const author = authorWrapper.innerHTML.replace('by ', '');
  // console.log('author:', author);

    /* create HTML of the link */
    const authorHTML =
      // `<li><a href="#${author}"><span>${author}</span></a></li>`;
      '<li><a href="#author-' + author + '"><span>' + author + '</span></a></li>';

      // "<li><a href='#'" + author + "><span>" + author + "</span></a></li>";

    /* insert link into html variable */
    html = html + authorHTML;

    // console.log('html:' , html);
  
  authorList.innerHTML = html;
  }
}

generateAuthors();

//  -----------------------------------------------------------------------------------------------

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new0 constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const authorSelector = clickedElement.getAttribute('href');
  console.log('href:', authorSelector);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = authorSelector.replace('#author-', '');
  console.log('author' , author);

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
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const authorLinks = document.querySelectorAll('[href^="#author-"]');
  console.log(authorLinks);

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();

// ----------------------------------------------------------------------------------------------- CHMURA TAGÓW

  

  /* find all articles */

  /* START LOOP: for every article: */

    /* find tags wrapper */

    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

    /* START LOOP: for each tag */

      /* generate HTML of the link */

      /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */