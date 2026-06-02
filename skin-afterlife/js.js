
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





// No URL Change Smooth Scroll by Athena

function goToAnchor() {
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
   if (!document.getElementById('Members')) return;

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



// Profile ID everywhere

function pullProfileID() {
   if (!document.getElementById('idx')) return;

   const userID = document.querySelector(".pullProfileID").innerHTML;
   const userboxUsername = document.querySelector(".userbox--username");
   const userboxAvi = document.querySelector(".userbox--avi");
   userboxUsername.href += userID;
   userboxAvi.href += userID;

}



// Messages and alerts everywhere

function pullMessages() {
   if (!document.getElementById('idx')) return;

   const msgCount = document.querySelector(".pullMsgCount").innerHTML + ' ';
   const userboxMsg = document.querySelector(".userbox--userlinks a[href*='act=Msg']")
   userboxMsg.prepend(msgCount)

   const alertCount = document.querySelector(".pullAlertCount").innerHTML + ' ';
   const userboxAlerts = document.querySelector(".userbox--userlinks a[href*='CODE=alerts']")
   userboxAlerts.prepend(alertCount)
}




function emptyProfileFields() {
   if (!document.getElementById('Profile')) return;
   console.log("Is profile")

   const emptyFields = document.querySelectorAll('i');
   console.log("Find i")


   emptyFields.forEach(el => {
      if (el.textContent.trim() === 'No information') {
         console.log("Empty")
         const newHTML = '<i>—</i>';
         el.outerHTML = newHTML;
      }
   });
}







// Stability meter progress bars

const toPercentage = (num) => `${num}%`;

const progressBars = document.querySelectorAll('[class*="stability_meter"]');

progressBars.forEach(bar => {
   const numValue = bar.dataset.percent;
   bar.style.setProperty('--stability-percentage', toPercentage(numValue));
});




function stabilityMeterLogic() {
   const hasProfile = document.getElementById('Profile');

   document.querySelectorAll('[class*="stability_meter"]').forEach(meter => {
      const pct = meter.dataset.percent;
      const num = parseFloat(pct);

      // Convert profile field to % and set as variable
      meter.style.setProperty('--stability-percentage', `${pct}%`);

      // Icon and status label logic
      const icon = num === 0 ? 'ph-heart-skull' : (num <= 30 ? 'ph-heart-break' : 'ph-heart');
      const text = num === 0 ? 'Faded' : (num <= 30 ? 'Unstable' : 'Stable');

      // Remove old icons it exists and add new one based on logic
      meter.querySelectorAll('i').forEach(oldIcon => oldIcon.remove());

      const iconClass = isNaN(num) ? 'ph-ghost' : icon;
      meter.insertAdjacentHTML('afterbegin', `<i class="ph ${iconClass}"></i>`);

      // Update status text based on %
      if (hasProfile) {
         const container = meter.closest('.profile') || meter.parentElement;
         const status = container.querySelector('.profile--stability_status');
         if (status) {
            status.textContent += text;
            status.style.display = isNaN(num) ? 'none' : '';
         }
      }
   });
}





// Run all scripts

document.addEventListener('DOMContentLoaded', () => {
   accountSwitchButtons()
   goToAnchor()
   scrollBlur()

   guidebookTabs()
   memberFiltersMobile()
   pullProfileID()
   pullAvatarURL()
   pullMessages()

   emptyProfileFields()
   stabilityMeterLogic()
});























// Avatars in online list

import(`https://scripts.jcodesresources.com/board-index/online-user-avatars/script.js?_=${location.host}`).then(mod => mod.default({
   onlineUserContainer: '.boardstats-online-listbox',
   avatarImgURL: 'https://placehold.co/150x150',
   width: 72,
   height: 72
}));




// Clip subaccounts 

$(function () {
   var defaultAvatar = 'DEFAULT_AVATAR_URL';
   var bName = location.href.split('.jcink.net')[0].split('https://')[1];

   // 1. Clean up native layout
   var $masterLink = $('#subacct_link');
   $masterLink.find('a').click().end().find('form').hide().end().html($masterLink.html().replace(' · ', ''));

   // 2. Build the basic HTML structure for the buttons
   $masterLink.find('option').each(function () {
      var uID = $(this).val();
      var uName = $(this).text().replace('»', '').trim();

      if (uID !== '------------') {
         // We pass the avatar URLs as custom data attributes (data-avatar) 
         // so the CSS can grab them for the sidebar version, while the clip version ignores them.
         var avatarPaths = 'url(https://files.jcink.net/uploads/' + bName + '//av-' + uID + '.png), url(https://files.jcink.net/uploads/' + bName + '//av-' + uID + '.gif), url(https://files.jcink.net/uploads/' + bName + '//av-' + uID + '.jpg), url(' + defaultAvatar + ')';

         $masterLink.append('<div id="u-' + uID + '" class="subacct-btn" style="--avatar-urls: ' + avatarPaths + '"><span class="subacct-name">' + uName + '</span></div>');
      }
   });

   // 3. Clone to targets (First category clip + sidebar instances)
   var $targets = $('.subacct_clip').first().add('.subacct_sidebar');
   $targets.each(function () {
      var $clone = $masterLink.clone(true);
      $(this).append($clone);
   });

   // 4. Global click handler
   $(document).on('click', '.subacct-btn', function () {
      var uID = $(this).attr('id').split('u-')[1];
      $('#subacct_link select').val(uID);
      $('#subacct_link form').submit();
   });

   $masterLink.hide();
});







/* Clip the Recent Topic Activity display to another location */
$("#recent-topics").appendTo("#recents");


//*************** recent topics code by essi ******************//
var topic = "/index.php?act=idx";
$.get(topic, function (data) {
   var str = "";
   $('#recent-topics tr', data).each(function () {
      var title = $(this).find('.recent-topics-info').html();
      var date = $(this).find('.recent-topics-date').html();

      // Use regex to wipe out " - by " regardless of weird spaces or trailing breaks
      var cleanTitle = title.replace(/\s*-\s*by\s*/i, '');

      str = str + "<div class='holdrec'><div class='rec-title'>" + cleanTitle + "<span class='rec-date'>" + date + "</span></div></div></div>";

   })
   $('#recents').append(str);
});




