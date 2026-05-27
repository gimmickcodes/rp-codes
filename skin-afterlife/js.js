// Hamburger menu on mobile
// by Quartz 

$(document).ready(function () {
   const clicktodismiss = $(document.createElement("div")).hide().attr("id", "clicktodismiss").attr("onclick", "menuFunction()")
   $(document.body).append(clicktodismiss);
});

function menuFunction() {
   const navbar = document.getElementById("navbar");
   if (navbar.className === "") {
      navbar.className += "responsive";

      $('#navpanel').addClass('openmenu');
      $('#navbar').addClass('openmenu');
      $("#clicktodismiss").css({ "opacity": "1", "backdrop-filter": "blur(5px)" }).fadeIn(300);

   } else {
      navbar.className = "";
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



function goToAnchor() {

   // No URL Change Smooth Scroll by Athena
   document.querySelectorAll(".scrollButton").forEach(button => {
      button.addEventListener("click", function () {
         const targetElement = document.querySelector(this.dataset.target);
         if (targetElement) {
            const targetPosition = targetElement.offsetTop;
            window.scrollTo({
               top: targetPosition,
               behavior: "smooth"
            });
         }
      });
   });
}




// Blur out hero on scroll 

function scrollBlur() {
   const fadeTarget = document.querySelector('#siteheader');

   window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;

      // Dynamically get the height of the hero element (or use window.innerHeight)
      const maxScrollDepth = (fadeTarget.offsetHeight * 1.25) || 800; // Fallback to 800 if 0

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
}




// Account switch toggles
function accountSwitchButtons() {

   document.addEventListener('click', (e) => {
      // 1. Handle Opening the Panel
      const openToggle = e.target.closest('.accswitch-toggle');
      if (openToggle) {
         e.preventDefault();

         // Climbs the DOM tree until it hits the specified boundary class
         const swapArea = openToggle.closest('.accswitch-swap-area');
         if (swapArea) {
            swapArea.classList.add('acc-switch-open');
         }
         return;
      }

      // 2. Handle Closing the Panel (Via close button OR outside click)
      const activeSwapArea = document.querySelector('.acc-switch-open');

      if (activeSwapArea) {
         const closeBtn = e.target.closest('.accswitch-close');
         // Check if the click happened anywhere inside the active swap area
         const clickedInsideArea = e.target.closest('.acc-switch-open');

         // Close if the close button was clicked OR if the click was entirely outside the swap area
         if (closeBtn || !clickedInsideArea) {
            if (closeBtn) e.preventDefault();
            activeSwapArea.classList.remove('acc-switch-open');
         }
      }
   });

}




// Guidebook tabs
// Javascript to enable link to tab
// Adapted from https://codepen.io/ciprian/pen/WEwPop

function guidebookTabs() {
   // check on right page before firing
   if (!document.querySelector('.guidebook')) return;

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
}


// Guidebook nav on mobile

function guidebookDropdownMobile() {
   // check on right page before firing
   if (!document.querySelector('.guidebook')) return;

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
}


// Member page filters stick on scroll

function memberFiltersMobile() {
   // check on right page before firing
   if (!document.querySelector('#Members')) return;

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
}








// Avatar Everywhere by Athena

function pullAvatarURL() {
   const avatarImg = document.querySelector(".pullAvatarURL img");
   if (avatarImg && avatarImg.src) {
      document.documentElement.style.setProperty("--pullAvatarURL", `url("${avatarImg.src}")`);
   } else {
      setTimeout(pullAvatarURL, 300);
   }
}





// Messages and alerts everywhere

function pullMessages() {
   // check on right page before firing
   if (!document.querySelector('#idx')) return;

   const msgCount = document.querySelector(".pullMsgCount").innerHTML + ' ';
   const userboxMsg = document.querySelector(".userbox--userlinks a[href*='act=Msg']")

   console.log(msgCount + " messages")
   userboxMsg.prepend(msgCount)

   const alertCount = document.querySelector(".pullAlertCount").innerHTML + ' ';
   const userboxAlerts = document.querySelector(".userbox--userlinks a[href*='CODE=alerts']")

   console.log(alertCount + " alerts")
   userboxAlerts.prepend(alertCount)
}





// Run all scripts

document.addEventListener('DOMContentLoaded', () => {
   accountSwitchButtons()
   goToAnchor()
   scrollBlur()

   guidebookTabs()
   memberFiltersMobile()
   pullAvatarURL()
   pullMessages()
});


