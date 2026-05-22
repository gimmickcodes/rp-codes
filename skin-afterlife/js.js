
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

const fadeTarget = document.querySelector('.hero')
const maxScrollDepth = 800;

window.addEventListener('scroll', () => {
   const scrollTop = window.scrollY;

   // Calculate opacity: 1 at top of page, 0 at maxScrollDepth
   // Math.max guarantees it won't drop below 0
   const opacity = Math.max(0, 1 - (scrollTop / maxScrollDepth));
   const blur = Math.max(0, 0 + (scrollTop / maxScrollDepth * 5)) + 'px';

   // Update the CSS variable
   fadeTarget.style.setProperty('--scroll-opacity', opacity);
   fadeTarget.style.setProperty('--scroll-blur', blur);

}, { passive: true }); // passive: true optimizes scroll performance



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