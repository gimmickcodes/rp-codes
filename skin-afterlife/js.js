
// remove ' -' from recent topics timestamp

var rt = document.getElementsByClassName('recent-topics-info');
for (var i = 0; i < rt.length; i++) {
   console.log(rt[i])
}

$(".recent-topics-info").each(function () {
   console.log("hi")
   var by = '- by '
   $(this).html($(this).html().replace(by, "by "));
});





// Hamburger menu on mobile
// by Quartz 

$(document).ready(function () {
   const clicktodismiss = $(document.createElement("div")).hide().attr("id", "clicktodismiss").attr("onclick", "menuFunction()")
   $(document.body).append(clicktodismiss);

   $('#navstrip').prepend('<div class="topnav-themetoggle" onclick="toggleTheme()"><i class="ph ph-sun"></i><i class="ph ph-moon-stars"></i></div>');

});

function menuFunction() {
   const hamburger = document.getElementById("navbar");
   if (hamburger.className === "") {
      hamburger.className += "responsive";

      $('#navpanel').addClass('openmenu');
      $('#navbar').addClass('openmenu');
      $("#clicktodismiss").css({ "opacity": "1", "backdrop-filter": "blur(5px)" }).fadeIn(300);

   } else {
      hamburger.className = "";
      $('#navpanel').removeClass('openmenu');
      $('#navbar').removeClass('openmenu');
      $("#clicktodismiss").fadeOut(300);
   }
}

$(document).on("click", "#clicktodismiss", function () {
   $("#clicktodismiss").fadeOut(300);
});

// Close menu on Escape key
document.addEventListener('keydown', function (e) {
   if (e.key === 'Escape') {
      $('#navpanel').removeClass('openmenu');
      $('#navbar').removeClass('openmenu'); $("#clicktodismiss").fadeOut(300);
   }
});





// Blur out hero on scroll 

const fadeTarget = document.querySelector('#siteheader');

window.addEventListener('scroll', () => {
   const scrollTop = window.scrollY;

   // Dynamically get the height of the hero element (or use window.innerHeight)
   const maxScrollDepth = (fadeTarget.offsetHeight * 1.5) || 800; // Fallback to 800 if 0

   // Calculate ratio (clamped between 0 and 1)
   const scrollRatio = Math.min(1, Math.max(0, scrollTop / maxScrollDepth));

   // Calculate opacity: 1 at top, 0 at maxScrollDepth
   const opacity = 1 - scrollRatio;

   // Calculate blur: 0px at top, 5px at maxScrollDepth
   const blur = (scrollRatio * 5) + 'px';

   // Update the CSS variables
   fadeTarget.style.setProperty('--scroll-opacity', opacity);
   fadeTarget.style.setProperty('--scroll-blur', blur);

}, { passive: true });



// Guidebook tabs
// Javascript to enable link to tab
// Adapted from https://codepen.io/ciprian/pen/WEwPop

// find page hash
var hash = document.location.hash;
var hashString = hash.replace('#', '');
var tabLinks = document.querySelectorAll('.gb-nav a');
var sections = document.querySelectorAll('.gb-page');

for (var i = 0; i < tabLinks.length; i++) {
   // if hash matches guidebook a tab link, mark tab active
   // if hash is empty, make first tab active
   if (tabLinks[i].getAttribute('href') == hash) {
      $(tabLinks[i]).addClass('is-selected')
      $(document.getElementById(hashString)).show()
      $(document.getElementById(hashString)).addClass('active')

   } if (hash == '') {
      $(tabLinks[0]).addClass('is-selected')
      $(sections[0]).show()
      $(sections[0]).addClass('active')

   }

   // add click toggle to each links
   tabLinks[i].addEventListener('click', function (e) {
      // Remove active class from all links then add it to the one clicked
      tabLinks.forEach(el => el.removeAttribute('class'))

      // Hide all content tabs by default
      for (var j = 0; j < sections.length; j++) {
         sections[j].style.display = 'none';
         $(sections[j]).removeClass('active');
      }

      // mark clicked link active
      // return href value of clicked link as a string
      // then show the tab content with matching ID
      $(this).addClass('is-selected')
      var tabID = this.getAttribute('href').replace('#', '');
      $(document.getElementById(tabID)).show()
      $(document.getElementById(tabID)).addClass('active')

      // prevent default behavior of jumping to anchor point
      e.preventDefault();
      history.pushState({}, "", this.href);

   })
};

// Guidebook nav on mobile

var gbTabsToggle = document.querySelector('.gb-nav-toggle');
var gbTabsToggleFiller = document.querySelector('.gb-nav-toggle-placehold-content');
var gbNavTabs = document.querySelectorAll('.gb-nav a');

// Populate dropdown toggle with the name of the selected tab
gbTabsToggleFiller.innerHTML = document.getElementsByClassName('is-selected')[0].innerHTML;
console.log(gbTabsToggleFiller)

// Open dropdown menu on clicking toggle
gbTabsToggle.addEventListener('click', function (e) {
   document.querySelector('.gb-nav-links').classList.toggle('-is-open')

   $(this).toggleClass('-is-open')
});

for (var i = 0; i < gbNavTabs.length; i++) {
   gbNavTabs[i].addEventListener('click', function (e) {

      // Close dropdown menu when clicking another tab
      $(this).parent().parent().removeClass('-is-open')

      // Re-populate dropdown toggle with name of newly selected tab
      var selectedTabName = document.getElementsByClassName('is-selected')[0].innerHTML
      gbTabsToggleFiller.innerHTML = selectedTabName;

      $(gbTabsToggle).toggleClass('-is-open')


   });
}



// Member page filters stick on scroll

document.addEventListener("DOMContentLoaded", function () {
   const wrapper = document.querySelector('.ml-drawer-btn-wrapper');
   const button = document.querySelector('.ml-drawer-btn');

   if (wrapper && button) {
      const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
            // Get the element's position relative to the viewport
            const bounding = entry.boundingClientRect;

            // Only stick if it leaves the viewport via scrolling DOWN (top of element went above top of screen)
            if (!entry.isIntersecting && bounding.top < 0) {
               button.classList.add('is-sticky');
            } else {
               button.classList.remove('is-sticky');
            }
         });
      }, {
         threshold: 0
      });

      observer.observe(wrapper);
   }
});


// Account switch toggle
document.addEventListener('DOMContentLoaded', () => {
   const navSection = document.querySelector('.navpanel-section');
   const openToggle = document.querySelector('.accswitch-toggle');
   const closeToggle = document.querySelector('.accswitch-close');

   // Open the panel
   if (openToggle && navSection) {
      openToggle.addEventListener('click', (e) => {
         e.preventDefault();
         navSection.classList.add('acc-switch-open');
      });
   }

   // Close the panel and return to user details
   if (closeToggle && navSection) {
      closeToggle.addEventListener('click', (e) => {
         e.preventDefault();
         navSection.classList.remove('acc-switch-open');
      });
   }

   // NEW: Close the panel when clicking anywhere outside of it
   document.addEventListener('click', (e) => {
      // Only run this logic if the panel is actually open
      if (navSection && navSection.classList.contains('acc-switch-open')) {

         // Check if the click happened inside the panel, the open button, or the close button
         const clickedInsidePanel = e.target.closest('.accswitch-panel');
         const clickedOpenToggle = e.target.closest('.accswitch-toggle');

         // If the click was NOT inside the panel AND NOT on the open toggle, close it
         if (!clickedInsidePanel && !clickedOpenToggle) {
            navSection.classList.remove('acc-switch-open');
         }
      }
   });
});