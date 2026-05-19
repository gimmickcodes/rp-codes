
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





$(document).ready(function () {
   const clicktodismiss = $(document.createElement("div")).hide().attr("id", "clicktodismiss").attr("onclick", "menuFunction()")
   $(document.body).append(clicktodismiss);

   $('#navstrip').prepend('<div class="topnav-themetoggle" onclick="toggleTheme()"><i class="ph ph-sun"></i><i class="ph ph-moon-stars"></i></div>');

});

// Hamburger menu on mobile
// by Quartz 

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
