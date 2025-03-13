
// Slider Tabs Script
// by Quartz
// Applies a class to the container of tab content based on active tab. Allows for carousel type transitions

function tabsSlider(outerWrapper, tabs, tabSlidesWrap) {
   // Find all things with tab class inside outerWrapper
   var tabs = document.querySelector(outerWrapper).querySelectorAll(tabs);
   for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", toggleTab);
      tabs[i].dataset.index = i;
   }

   // Apply active class to first tab automatically
   tabs[0].classList.add('active-tab')
   $(outerWrapper).find(tabSlidesWrap).addClass('active-tab-0');

   // Create indexable array from tabs
   const alltabs = Array.from(tabs)

   function toggleTab() {
      activeTabIndex = parseInt(this.dataset.index);

      // removes active class from every tab except the one clicked 
      alltabs.forEach(el => $(el).removeClass('active-tab'))

      $(this).addClass('active-tab')

      // Toggle slides to match clicked tab 

      // get ID of the selected tab
      var selectedTabID = 'active-' + $(this).attr('id')
      var selectedTabID = 'active-tab-' + parseInt(this.dataset.index);

      // ARCHIVE: If using only 1 parameter, tab menu wrapper and slide wrapper should have the same prefix. 
      // get the slides wrapper that corresponds with the tab menu being navigated
      // tabContentsWrap = '#' + $(this).parent().attr('id').split('-')[0] + '-slideswrap'

      // Find tab content area and swap its ID to match selectedTab
      $(outerWrapper).find(tabSlidesWrap).removeAttr('class').addClass(selectedTabID);
   }


   // FOR BACK AND FORWARD BUTTONS. CAN REMOVE IF NOT APPLICABLE

   // if outerwrapper contains a next button, apply back/forward scripts
   if (document.querySelector(outerWrapper).querySelector('.next')) {

      numOfTabs = alltabs.length - 1; // Generate index numbers based on number of tabs
      activeTabIndex = 0; // Index of active tab

      // When clicking prev, decrease index by 1. If index goes below number of tabs, loop from the end
      document.querySelector(outerWrapper + ' .prev').addEventListener('click', function (e) {
         activeTabIndex = activeTabIndex - 1;
         if (+activeTabIndex < 0) {
            activeTabIndex = numOfTabs;
         }
         prevnextTab(activeTabIndex)
      });

      // When clicking next, increase index by 1. If index exceeds number of tabs, loop from the beginning
      document.querySelector(outerWrapper + ' .next').addEventListener('click', function (e) {
         activeTabIndex = activeTabIndex + 1;
         if (+activeTabIndex > numOfTabs) {
            activeTabIndex = 0;
         }
         prevnextTab(activeTabIndex)
      });

      function prevnextTab() {
         selectedTabID = 'active-tab-' + activeTabIndex;

         alltabs.forEach(el => $(el).removeClass('active-tab'))
         $(alltabs[activeTabIndex]).addClass('active-tab')

         $(outerWrapper).find(tabSlidesWrap).removeAttr('class').addClass(selectedTabID);
      }
   }
   // END ADD-ON FOR BACK AND FORWARD BUTTONS

}












// Individual Tabs Script
// by Quartz
// Applies a class to individual tab content slides

function tabsIndividual(outerWrapper, tabs, tabSlides) {
   // find tabs within the designated container
   var tabs = document.querySelector(outerWrapper).querySelectorAll(tabs);
   for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', toggleTab);
      tabs[i].dataset.index = i;
   }

   // find slides within the designated container
   var tabContents = document.querySelector(outerWrapper).querySelectorAll(tabSlides);
   for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].dataset.index = i;
   }

   // Apply active class to first tab automatically
   tabs[0].classList.add('active-tab')
   tabContents[0].classList.add('active-slide')

   // Create indexable array from tabs and slides
   const alltabs = Array.from(tabs)
   const alltabContents = Array.from(tabContents)

   function toggleTab() {
      removeActive()
      // Get index of clicked tab
      activeTabIndex = parseInt(this.dataset.index);
      // Apply active class to selected tab
      $(this).addClass('active-tab')
      // Apply active class to slide with matching index
      $(alltabContents[activeTabIndex]).addClass('active-slide')
   }

   function removeActive() {
      // removes active class from every tab except the one clicked 
      alltabs.forEach(el => $(el).removeClass('active-tab'))
      // removes active class from every slide except the one clicked 
      alltabContents.forEach(el => $(el).removeClass('active-slide'))
   }


   // FOR BACK AND FORWARD BUTTONS. CAN REMOVE IF NOT APPLICABLE

   // if outerwrapper contains a next button, apply back/forward scripts
   if (document.querySelector(outerWrapper).querySelector('.next')) {

      numOfTabs = alltabs.length - 1; // Generate index numbers based on number of tabs
      activeTabIndex = 0; // Index of active tab

      // When clicking prev, decrease index by 1. If index goes below number of tabs, loop from the end
      document.querySelector(outerWrapper + ' .prev').addEventListener('click', function (e) {
         activeTabIndex = activeTabIndex - 1;
         if (+activeTabIndex < 0) {
            activeTabIndex = numOfTabs;
         }
         prevnextTab(activeTabIndex)
      });

      // When clicking next, increase index by 1. If index exceeds number of tabs, loop from the beginning
      document.querySelector(outerWrapper + ' .next').addEventListener('click', function (e) {
         activeTabIndex = activeTabIndex + 1;
         if (+activeTabIndex > numOfTabs) {
            activeTabIndex = 0;
         }
         prevnextTab(activeTabIndex)
      });

      function prevnextTab() {
         removeActive();
         $(alltabs[activeTabIndex]).addClass('active-tab')
         $(alltabContents[activeTabIndex]).addClass('active-slide')
      }
   }

   // END ADD-ON FOR BACK AND FORWARD BUTTONS

}
