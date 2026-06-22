
// Wrap jcink defaults for mobile formatting

document.addEventListener('DOMContentLoaded', () => {

   if (document.getElementById("UserCP") || document.getElementById("Msg")) {
      const tables = document.querySelectorAll('.sitebody--inset > table');
      tables.forEach(table => table.classList.add('ucptable'));
   }

   if (document.getElementById("ST")) {
      const tables = document.querySelectorAll('.sitebody--inset > table');
      tables.forEach(table => table.classList.add('threadfunctions'));
   }

   if (document.getElementById("Search")) {
      const elements = document.querySelectorAll('.sitebody--inset > .tableborder');
      elements.forEach(el => el.classList.add('active-posts'));
   }

});



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







// Monastery subboard images on hover 
function subboardImages() {
   if (!document.getElementById('idx')) return;

   document.querySelectorAll('.forum-monastery-grid').forEach(grid => {
      const imageBox = grid.querySelector('.forum-monastery-imagebox');
      const links = grid.querySelectorAll('.subforums a');

      links.forEach((link, index) => {
         // Compute the target class name once based on the 1-based index
         const targetClass = `show-subboard${index + 1}`;

         link.addEventListener('mouseenter', () => {
            imageBox.classList.add(targetClass);
         });

         link.addEventListener('mouseleave', () => {
            imageBox.classList.remove(targetClass);
         });
      });
   });
}








// Guidebook tabs
// Javascript to enable link to tab
// Adapted from https://codepen.io/ciprian/pen/WEwPop

function guidebookTabs() {
   console.log("Guidebook check")

   // Check that we are on the correct page before firing
   if (!document.querySelector('.guidebook')) return;

   // Find the initial page hash from the URL
   var hash = document.location.hash;
   var hashString = hash.replace('#', '');
   var tabLinks = document.querySelectorAll('.gb-nav a, .gb-link'); // for in-page guidebook links
   var sections = document.querySelectorAll('.gb-page');

   // Track if a valid tab was successfully activated on load
   var tabActivated = false;

   for (var i = 0; i < tabLinks.length; i++) {

      // On load
      // If a URL hash exists, look for any links pointing to it
      if (hash !== '') {
         if (tabLinks[i].getAttribute('href') === hash) {
            $(tabLinks[i]).addClass('is-selected');

            // Show the section that matches the hash ID
            var targetSection = document.getElementById(hashString);
            if (targetSection) {
               $(targetSection).show();
               $(targetSection).addClass('active');
            }
            tabActivated = true;
         }
      }

      // On click
      tabLinks[i].addEventListener('click', function (e) {
         // Get the href target of the clicked element (e.g., "#features")
         var clickedTarget = this.getAttribute('href');

         // Remove active classes from all navigation/inline links
         tabLinks.forEach(el => el.removeAttribute('class'));

         // Hide all content tabs by default
         for (var j = 0; j < sections.length; j++) {
            sections[j].style.display = 'none';
            $(sections[j]).removeClass('active');
         }

         // Mark ALL links pointing to this same ID as selected 
         tabLinks.forEach(link => {
            if (link.getAttribute('href') === clickedTarget) {
               $(link).addClass('is-selected');
            }
         });

         // get link ID and show matching content section
         var tabID = clickedTarget.replace('#', '');
         var targetSection = document.getElementById(tabID);
         if (targetSection) {
            $(targetSection).show();
            $(targetSection).addClass('active');
         }

         // Prevent default page jump behavior and update browser history URL cleanly
         e.preventDefault();
         history.pushState({}, "", this.href);
      });
   }

   // no page set
   // if URL has no hash, show first tab
   if (hash == '' || !tabActivated) {
      if (tabLinks[0]) $(tabLinks[0]).addClass('is-selected');
      if (sections[0]) {
         $(sections[0]).show();
         $(sections[0]).addClass('active');
      }
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








function emptyProfileFields() {
   if (!document.getElementById('Profile')) return;

   const emptyFields = document.querySelectorAll('i');

   emptyFields.forEach(el => {
      if (el.textContent.trim() === 'No information') {
         const newHTML = '<i>—</i>';
         el.outerHTML = newHTML;
      }
   });
}







function stabilityMeterLogic() {
   const hasProfile = document.getElementById('Profile');
   const hasMembers = document.getElementById('Members'); // Added global check for #Members


   document.querySelectorAll('[class*="stability_meter"]').forEach(meter => {
      const pct = meter.dataset.percent;
      const num = parseFloat(pct);

      // Convert profile field to % and set as variable
      meter.style.setProperty('--stability-percentage', `${pct}%`);

      // Icon and status label logic
      const icon = num === 0 ? 'ph-skull' : (num <= 30 ? 'ph-heart-break' : 'ph-heart');
      const text = num === 0 ? 'Faded' : (num <= 30 ? 'Unstable' : 'Stable');

      // Remove old icons it exists and add new one based on logic
      meter.querySelectorAll('i').forEach(oldIcon => oldIcon.remove());
      console.log("Hi heart")

      const iconClass = isNaN(num) ? 'ph-question-mark' : icon;
      meter.insertAdjacentHTML('afterbegin', `<i class="ph ${iconClass}"></i>`);

      // Append status class to .membercard if #Members element exists
      if (hasMembers) {
         const memberCard = meter.closest('.membercard');
         if (memberCard) {
            memberCard.classList.add(`status-${text.toLowerCase()}`);
         }
      }

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







// Add categories to UCP

function addFieldHeader(beforeCell, headerTitle) {
   if (!document.getElementById('UserCP')) return;
   $('tr[id*="field"] td.pformleft:contains(' + beforeCell + ')').parent('tr').before('<tr class="userCP-section-header"><td><span>' + headerTitle + '</span><i class="ph ph-caret-down"></i><i class="ph ph-caret-up"></i></td></tr>');
}

addFieldHeader('Player Name', 'About the Player');
addFieldHeader('250x450 Hover', 'Graphics');
addFieldHeader('Inventory Thread', 'Links');
addFieldHeader('Name(s)', 'Basics');
addFieldHeader('In Memoriam', 'Background');
addFieldHeader('Plot Hooks', 'Plotter');
addFieldHeader('Cause of Death', 'In Death');




document.addEventListener("DOMContentLoaded", () => {
   if (!document.getElementById('UserCP')) return;

   const sectionMapping = {
      "About the Player": ["field_1", "field_2", "field_3", "field_4"],
      "Graphics": ["field_5", "field_6", "field_7"],
      "Links": ["field_8", "field_9"],
      "Basics": ["field_10", "field_11", "field_12", "field_13", "field_14", "field_15", "field_16", "field_17"],
      "Background": ["field_19", "field_20", "field_21", "field_22", "field_23"],
      "Plotter": ["field_24"],
      "In Death": ["field_25", "field_26", "field_27", "field_28"]
   };

   document.querySelectorAll('.userCP-section-header').forEach(header => {
      const headerText = header.querySelector('td > span')?.textContent.trim();
      const targetIds = sectionMapping[headerText];
      if (!targetIds) return;

      // 1. Create a modern, independent div wrapper instead of a tbody element
      const fieldsWrapper = document.createElement('div');
      fieldsWrapper.classList.add('ucp-section-container', 'is-collapsed');

      // 2. Create a singular full-width table row to house our wrapper inside Jcink's main table
      const parentRow = document.createElement('tr');
      const parentCell = document.createElement('td');
      parentCell.setAttribute('colspan', '2'); // Ensure it bridges across Jcink's native 2-cell split
      parentCell.style.padding = '0';

      // 3. Chain them together and insert directly after the section header
      parentCell.appendChild(fieldsWrapper);
      parentRow.appendChild(parentCell);
      header.parentNode.insertBefore(parentRow, header.nextSibling);

      // 4. Move the custom profile fields completely out of the table matrix into our container block
      targetIds.forEach(id => {
         const row = document.getElementById(id);
         if (row) {
            fieldsWrapper.appendChild(row);
            row.style.display = 'none'; // Keep them hidden initially
         }
      });

      // 5. Handle the click toggle on the header
      header.classList.add('is-collapsed');
      header.addEventListener('click', () => {
         const isHeaderCollapsed = header.classList.toggle('is-collapsed');
         fieldsWrapper.classList.toggle('is-collapsed', isHeaderCollapsed);

         targetIds.forEach(id => {
            const row = document.getElementById(id);
            if (row) {
               // Restores rows safely as modern block components inside our block container
               row.style.setProperty('display', isHeaderCollapsed ? 'none' : 'grid', 'important');
            }
         });
      });
   });
});






document.addEventListener("DOMContentLoaded", function () {
   if (!document.getElementById('UserCP')) return;

   // Helper check to see if restricted permissions exist on the page
   const hasRestrictedPermissions = () => {
      return !!document.querySelector('.gperms-7, .gperms-8, .gperms-9');
   };

   // Actively scan for both inputs in the HTML
   const findTargetInputs = setInterval(() => {
      const stabilityInput = document.getElementById("field_27_input");
      const deathInput = document.getElementById("field_28_input");

      // Once both target fields are found, clear the interval and run the setups
      if (stabilityInput && deathInput) {
         clearInterval(findTargetInputs);
         initStabilitySlider(stabilityInput);
         initDeathCounter(deathInput);
      }
   }, 100);

   // --- STABILITY SLIDER ---
   function initStabilitySlider(originalInput) {
      // Check permission status
      const isDisabled = hasRestrictedPermissions();

      // 1. Transform the text input into a slider in-place
      originalInput.type = "range";
      originalInput.min = "1";
      originalInput.max = "100";

      // Disable the slider if restricted permissions are found
      if (isDisabled) {
         originalInput.disabled = true;
      }

      if (!originalInput.value || originalInput.value < 1 || originalInput.value > 100) {
         originalInput.value = "50";
      }

      // Locate the description text node to append our dynamic status to
      const parentRow = originalInput.closest("tr");
      const descriptionElement = parentRow ? parentRow.querySelector(".pformleft") : null;

      // Base description text to reset back to before adding the status
      const baseDescription = "";

      // 2. Create the container wrapper for the icon
      const iconWrapper = document.createElement("span");
      iconWrapper.className = "stability_preview";

      // Insert the icon wrapper directly BEFORE the slider field
      originalInput.parentNode.insertBefore(iconWrapper, originalInput);

      // 3. Create the number display sibling element
      const numberSibling = document.createElement("div");
      numberSibling.className = "stability_preview-number";

      // Insert the number display directly AFTER the slider field
      originalInput.parentNode.insertBefore(numberSibling, originalInput.nextSibling);

      // 4. Helper function to update all values, icons, and text dynamically
      const updatePreview = (value) => {
         const num = parseFloat(value);

         // Update the immediate text sibling
         numberSibling.textContent = `${num}%`;

         // Pass percentage variable to your existing icon gradient rules
         iconWrapper.style.setProperty('--stability-percentage', `${num}%`);

         // Apply icon logic based on value thresholds
         const icon = num === 0 ? 'ph-skull' : (num <= 30 ? 'ph-heart-break' : 'ph-heart');

         // Dynamic revival bracket evaluation & description text assignment
         let revivals = 0;
         let statusText = "";

         if (num >= 1 && num <= 30) {
            revivals = 0;
            statusText = "Resident is <strong>unstable</strong>. Resurrections will require Builder intervention.";
         } else if (num >= 31 && num <= 60) {
            revivals = 1;
            statusText = "Resident is <strong>stable</strong> and can resurrect 1 more time unaided.";
         } else if (num >= 61 && num <= 90) {
            revivals = 2;
            statusText = "Resident is <strong>stable</strong> and can resurrect 2 times unaided.";
         } else if (num > 90) {
            revivals = 3;
            statusText = "Resident is <strong>stable</strong> and can resurrect 3 times unaided.";
         }

         // Apply data attribute to the wrapper
         iconWrapper.setAttribute('data-revivals', revivals);

         // Render the icon inside its specific wrapper element
         iconWrapper.innerHTML = `<i class="ph ${icon}"></i>`;

         // Update the label description text cell if it exists
         if (descriptionElement) {
            // Restores the precise structural <label> element pattern
            descriptionElement.innerHTML = `<label for="field_27_input" style="font-weight: bold;">Stability (%)</label><br>${baseDescription} <span class="stability_status-text">${statusText}</span>`;
         }
      };

      // 5. Run the initial update for whatever value is currently loaded
      updatePreview(originalInput.value);

      // 6. Bind the live input event listener for smooth real-time scrubbing (only if not disabled)
      if (!isDisabled) {
         originalInput.addEventListener("input", (e) => {
            updatePreview(e.target.value);
         });
      }
   }

   // --- DEATH COUNTER ---
   function initDeathCounter(originalInput) {
      // Check permission status
      const isDisabled = hasRestrictedPermissions();

      // 1. Set default values if empty or non-numeric
      if (!originalInput.value || isNaN(parseInt(originalInput.value))) {
         originalInput.value = "0";
      }

      // 2. Hide the original text input entirely from view
      originalInput.style.display = "none";

      // 3. Create the control container wrapper
      const counterWrapper = document.createElement("div");
      counterWrapper.className = "death_counter-container";

      // 4. Create the custom control buttons (Minus / Plus)
      const minusBtn = document.createElement("button");
      minusBtn.type = "button";
      minusBtn.className = "death_counter-btn minus";
      minusBtn.innerHTML = '<i class="ph-bold ph-minus"></i>';

      const plusBtn = document.createElement("button");
      plusBtn.type = "button";
      plusBtn.className = "death_counter-btn plus";
      plusBtn.innerHTML = '<i class="ph-bold ph-plus"></i>';

      // Disable buttons if restricted permissions are found
      if (isDisabled) {
         minusBtn.disabled = true;
         plusBtn.disabled = true;
         counterWrapper.classList.add("disabled"); // Optional: adds a class for styling disabled wrapper state via CSS
      }

      // 5. Create the pure text display element for the number value
      const valueDisplay = document.createElement("span");
      valueDisplay.className = "death_counter-value";
      valueDisplay.textContent = originalInput.value;

      // 6. Inject the controls into the cell right before the hidden input
      originalInput.parentNode.insertBefore(counterWrapper, originalInput);
      counterWrapper.appendChild(minusBtn);
      counterWrapper.appendChild(valueDisplay);
      counterWrapper.appendChild(plusBtn);

      // 7. Button click logic updates the hidden input (only if not disabled)
      if (!isDisabled) {
         minusBtn.addEventListener("click", () => {
            let currentVal = parseInt(originalInput.value) || 0;
            if (currentVal > 0) { // Prevents negative numbers
               const newVal = currentVal - 1;
               originalInput.value = newVal;
               valueDisplay.textContent = newVal;

               // Dispatch events so underlying form logic knows the data updated
               originalInput.dispatchEvent(new Event('input', { bubbles: true }));
               originalInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
         });

         plusBtn.addEventListener("click", () => {
            let currentVal = parseInt(originalInput.value) || 0;
            const newVal = currentVal + 1;
            originalInput.value = newVal;
            valueDisplay.textContent = newVal;

            // Dispatch events
            originalInput.dispatchEvent(new Event('input', { bubbles: true }));
            originalInput.dispatchEvent(new Event('change', { bubbles: true }));
         });
      }
   }
});






// Custom inventory post row
function inventoryHTMLFormat() {
   document.querySelectorAll('.postrow').forEach(row => {
      if (row.querySelector('.inventory')) {
         row.classList.add('inventory');
      }
   });
}

// Custom missive post row
function missiveHTMLFormat() {
   if (!document.querySelector('#ST .missive')) return;
   document.querySelector('.sitebody--inset').classList.add('missive-html');
}



// Run all scripts

document.addEventListener('DOMContentLoaded', () => {
   guidebookTabs()

   goToAnchor()
   scrollBlur()
   accountSwitchButtons()
   // pullAvatarURL()
   // pullProfileID()
   // pullMessages()
   subboardImages()

   memberFiltersMobile()
   emptyProfileFields()
   stabilityMeterLogic()

   inventoryHTMLFormat()
   missiveHTMLFormat()
   // customUCPTitle()
});








var emoji_redirect = 1;

/* clickable unicode emoji by FizzyElf - https://fizzyelf.jcink.net */
var emoji_list = "😉😀😛🤨😲😂😎🙄😒😊😠🙁🥺🤪🥷"
$("#smilies-table").after(`<div id="emoji-table"><b>Clickable Smilies</b>${[...emoji_list].map(x => `<span onclick="jBBCode.addTag('${x}')">${x}</span>`).join('')}<b><a href="https://symbl.cc/en/emoji/">More Emoji</a></b></div>`);







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








/*** AUTO-MEMBER COUNT CODE BY ESSI
sourced.jcink.net
***/

const members = [
   { 'gid7': 0 },
   { 'gid8': 0 },
   { 'gid9': 0 }
];

$.get("/index.php?act=Members&max_results=1000&st=0", function (data) {
   $(".mem-count", data).each(function () {
      var g = $(this).text();

      $.each(members, function (index, value) {

         if (value.hasOwnProperty(g)) {
            value[g]++
         }

      });
   });

   let group = members.map(a => Object.values(a).reduce((p, c) => p + (typeof c === 'number' ? c : 0)));
   var endcount = group.reduce((a, b) => a + b, 0);

   var percents = [];


   $.each(group, function (index, value) {
      var convert = percents.push((value / endcount) * 100);
   });


   var rounded = [];

   $.each(group, function (index, value) {
      rounded.push(Math.round((value / endcount) * 100));
   });


   /*** access the information in the arrays and display it how you want by appending or placing it within the html of a container div. the below is an example but can be edited as you please. change the number within the [0] brackets to switch the group. ***/

   $('.boardstats-members-census').append('<div class="census-faction forechosen">' + group[0] + '<span>in the cloisters</span></div> <div class="census-faction cryptdweller">' + group[1] + '<span>in the crypts</span></div> <div class="census-faction faded">' + group[2] + '<span>forever faded</span></div>');
});







// CODE AREA SCRIPT BY NICOLE/THUNDERSTRUCK OF CTTW @ JCINK
// thank you to stackoverflow for the selectText function

$('table#CODE-WRAP').addClass('nicole-code');
$('table#CODE-WRAP').attr('cellpadding', '0');
$('table#CODE-WRAP #CODE').wrapInner('<div class="code-scroll"></div>');
$('table.nicole-code #CODE').parent('tr').prev('tr').children('td').html('<div class="code-top"><div class="code-title">Code <span class="code-toggle">toggle height</span></div> <div class="code-highlight">click to highlight</div></div>');

$('table.nicole-code .code-scroll').each(function () {
   if ($(this).height() < 250) {
      $(this).closest('tr').prev('tr').children('td').children('.code-top').children('.code-title').children('.code-toggle').hide();
   } else { }
});

$('table.nicole-code .code-toggle').click(function () {
   if ($(this).closest('tr').next('tr').children('td').children('.code-scroll').hasClass('auto-code')) {
      $(this).closest('tr').next('tr').children('td').children('.code-scroll').removeClass('auto-code');
   } else {
      $(this).closest('tr').next('tr').children('td').children('.code-scroll').addClass('auto-code');
   }
});

jQuery.fn.selectText = function () {
   var doc = document
      , element = this[0]
      , range, selection
      ;
   if (doc.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
   } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
   }
};

$(function () {
   $('table.nicole-code .code-highlight').click(function () {
      $(this).closest('tr').next('tr').children('td').children('.code-scroll').selectText();
   });
});

// END CODE AREA SCRIPT




// Reusable tabs

const setupTabs = ({
   outerwrap = '.tabbedsection',
   button = '.tab',
   contentwrap = '.tabcontentwrap',
   content = '.tabcontent'
} = {}) => {

   const outerwraps = document.querySelectorAll(outerwrap);

   outerwraps.forEach((outer) => {
      const buttons = Array.from(outer.querySelectorAll(button));
      const contents = Array.from(outer.querySelectorAll(content));
      const wrap = outer.querySelector(contentwrap);

      if (!wrap || buttons.length === 0 || contents.length === 0) return;

      // --- NEW: Default to the first tab if no active tab is preset ---
      const hasActiveButton = buttons.some(b => b.classList.contains('active'));
      const hasActiveContent = contents.some(c => c.classList.contains('active'));

      if (!hasActiveButton || !hasActiveContent) {
         // Clear any partial mismatched active states
         buttons.forEach(b => b.classList.remove('active'));
         contents.forEach(c => c.classList.remove('active'));

         // Force the first pair to be active
         buttons[0].classList.add('active');
         contents[0].classList.add('active');
      }
      // ---------------------------------------------------------------

      const updateHeight = () => {
         const activeContent = outer.querySelector(`${content}.active`);
         if (activeContent) wrap.style.height = `${activeContent.offsetHeight}px`;
      };

      const resizeObserver = new ResizeObserver(() => updateHeight());
      contents.forEach(c => resizeObserver.observe(c));

      buttons.forEach((btn, index) => {
         btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            contents.forEach((c, cIndex) => {
               c.classList.toggle("active", cIndex === index);
            });

            updateHeight();
         });
      });

      updateHeight();
   });
};