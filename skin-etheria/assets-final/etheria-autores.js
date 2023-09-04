
/*Automatic Face Reserves List with Automatic Date Updater Script
   *By Essi
   *https://sourced.jcink.net
   */

$(document).ready(function () {


   //single quotations only inside of the double quotations. year and time can be wrapped in a display: none if you don't want them to show.

   //reserve expiry days
   var days = 4;

   //wrap entire reserve info
   var wstart = "<div class='res-row'>"
   var wclose = "</div>"


   //wrap face/main information info
   var fstart = "<span class='res-item'>";
   var fclose = "</span> ";


   //wrap date info
   var dstart = "<span class='res-deadline'>";
   var dclose = "</span>";

   //divider between month/day
   var div = "/"

   //wrap date - time 00:00 and divider
   var tStart = "<span class='res-time'>";
   var tClose = "</span>";
   var tDiv = " at ";

   //wrap date - year 2021
   var yStart = "<span style='display:none'>";
   var yClose = "</span>";

   //wrap title info
   var titleStart = "<div class='res-header' style='display: none'>";
   var titleClose = "</div>";



   //don't touch past here
   const fArray = [];
   const tArray = [];
   const counts = [];
   var reshold = $("#outer-reserve");

   var forum = $("input[name=f]").val();
   var topic = $("input[name=t]").val();
   var pageurl = "/index.php?act=Print&client=printer&f=" + forum + "&t=" + topic;

   $.get(pageurl, function (data) {
      $(".reserve", data).each(function () {
         var dData = $(this).parents('table').find('tr:first font').find('b').remove();
         var dData1 = $(this).parents('table').find('tr:first font').html();

         ///month
         var mon = dData1.substring(0, 5);
         var Jan = 01; var Feb = 02; var Mar = 03; var Apr = 04; var May = 05; var Jun = 06; var July = 07; var Aug = 08; var Sep = 09; var Oct = 10; var Nov = 11; var Dec = 12;
         var month = eval(mon);

         ///day 
         const arr = dData1;
         var dArray = arr.split(" ");
         var day = (parseInt(dArray[3])).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
         var year = parseInt(dArray[4]);
         console.log(day);

         /// dates

         var date = new Date(month + '/' + day + '/' + year);
         date.setDate(date.getDate() + days);

         var dd = date.getDate();
         var mm = date.getMonth() + 1;
         var y = date.getFullYear();

         var fDate = mm + div + dd + yStart + y + yClose;

         mm + div + dd + yStart + y + yClose;

         fArray.push({ "face": $(this).html(), "date": fDate, "time": tDiv + tStart + dArray[5] + " " + dArray[6] + tClose, "title": 0 });
      });

      //adding dated titles
      //find matching dates and push those dates to array

      const counts = fArray.reduce((acc, cur) => {
         if (acc.some(x => x.date === cur.date)) {
            acc.map(x => {
               if (x.date === cur.date) {
               }
               return x.date;
            });
         } else {
            acc.push(cur);
         }
         return acc;
      }, [])


      //remove face and time for the titles
      const Titles = counts.map(item => {
         return { face: "", date: titleStart + item.date + titleClose, time: "" };
      });

      //run through dates and check for matches in array. return item number placement.
      for (var i = 0; i < counts.length; i++) {
         tArray.push(fArray.findIndex((element) => element == counts[i]));
      }

      //push titles into array at those number placements
      for (var i = tArray.length - 1; i >= 0; i--)
         fArray.splice(tArray[i], 0, Titles[i]);

      //trigger mapping
      $(reshold).trigger("launch");
   });

   $(reshold).on('launch', function () {

      const comb = [];
      $.each(fArray, function (index, value) {
         var face = (this.face);
         var date = (this.date);
         var time = (this.time);
         comb.push(wstart + fstart + face + fclose + dstart + date + time + dclose + wclose);
      });

      $(this).append(comb.join(""));

   });
   $.get(location.href);

});