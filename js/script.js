'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
 console.log('Link was clicked!');
 
 /* remove class 'active' from all article links */
 const activeLinks = document.querySelectorAll('.titles a.active');
for(let activeLink of activeLinks){
 activeLink.classList.remove('active');
}

 /* add class 'active' to the clicked link */
//  console.log('clickedElement:', clickedElement);
//  const clickedElement = this;
 for(let activeLink of activeLinks){
    activeLink.classList.add('active');
   }

 /* remove class 'active' from all articles */
 const activeArticles = document.querySelectorAll('.active');
for(let activeArticle of activeArticles){
 activeArticle.classList.remove('active');
}

 /* get 'href' attribute from the clicked link */

 const articleSelector = clickedElement.getAttribute('href')
console.log(articleSelector);

 /* find the correct article using the selector (value of 'href'
attribute) */
const targetArticle = document.querySelector(articleSelector)
console.log(targetArticle)

//  /* add class 'active' to the correct article */
//  console.log('clickedElement:', targetArticle);

 targetArticle.classList.add('active');
}


const links = document.querySelectorAll('.titles a');
for(let link of links){
    link.addEventListener('click', titleClickHandler);
   }

  //  -----------------------------------------------------------------------------------------------



  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector)
  console.log(titleList)
    titleList.innerHTML = '';
  
  

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector)
  for(let article of articles){
console.log(article)
  }
    /* get the article id */

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

}

generateTitleLinks();
   