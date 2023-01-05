//gets html piece with heading-primary class
//document.querySelector(".heading-primary");

//Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

//make mobile nav work
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', function(){
  headerEl.classList.toggle('nav-open');
});

//Smooth scrolling animation
//only select anchor elements
const allLinks = document.querySelectorAll('a:link');
allLinks.forEach(function(link){
  link.addEventListener('click', function(e){
    e.preventDefault();
    const href = link.getAttribute("href");

    //Scroll back to top
    if(href === "#"){
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    //Scroll to other links
    if(href !== "#" && href.startsWith('#')){
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({behavior: "smooth"});
    }

    //Close mobile navigation
    if(link.classList.contains("main-nav-link")){
      headerEl.classList.toggle('nav-open');
    }
  });

});

//Sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");
//function and options
const obs = new IntersectionObserver(function(entries){
  const ent = entries[0];
  console.log(ent);
  if(!ent.isIntersecting){
    document.body.classList.add('sticky');
  }

  if(ent.isIntersecting){
    document.body.classList.remove('sticky');
  }
}, 
{
  root: null, //in the viewport
  threshold: 0, //when 0% of hero section is in viewport
  rootMargin: '-80px', //to compensate for 8rem height of nav bar
});
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();