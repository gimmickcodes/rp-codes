phones = document.querySelectorAll('.qphone');

for (i = 0; i < phones.length; ++i) {
   // Check if phone has new messages class, otherwise it stops iterating; will jump to it otherwise
   if (phones[i].querySelectorAll(".qphone-new").length > 0) {
      newest = phones[i].getElementsByClassName("qphone-new")
      offsetHeight = phones[i].offsetTop
      topPos = newest[0].offsetTop
      document.getElementsByClassName("qphone-body")[i].scrollTop = topPos - offsetHeight; // scroll to newest
   }

   // Add css for any new characters

   var classNames = $(phones[i]).attr('class');
   var newChar = '.' + classNames.replace('qphone ', '');
   // add new css stylesheet to head
   $("head").append('<style id="qphone-newchar" type="text/css"></style>');
   // reference new css stylesheet
   var sheet = $("#qphone-newchar").get(0).sheet;

   var styleFlip = newChar + ' ' + newChar + ' { align-self: flex-end;align-items: flex-end; }'; // styling for right alignment of sender's messages

   var styleTurnBubble = newChar + ' ' + newChar + '>.qphone-msgbubble { border-radius: 8px 8px 0 8px; border-color: var(--accent); background: var(--accent); color: white; font-weight: 400; letter-spacing: .2px; }'; // styling for color fill of sender's messages
   // Add styles to stylesheet
   sheet.insertRule(styleFlip, 0);
   sheet.insertRule(styleTurnBubble, 0);
}




// ORIG CREDIT TO ARCHE

// for (var newest = document.getElementsByClassName("qphone-new"), wrapperEle = document.getElementsByClassName("qphone"), topPos = 0, i = 0; i < newest.length; i++) offsetHeight = wrapperEle[i].offsetTop, topPos = newest[i].offsetTop, document.getElementsByClassName("qphone-body")[i].scrollTop = topPos - offsetHeight;



// WITHOUT IF/ELSE

// phones = document.querySelectorAll('.qphone');
// for (i = 0; i < phones.length; ++i) {
//    phone = document.getElementsByClassName("qphone")
//    newest = document.getElementsByClassName("qphone-new")
//    offsetHeight = phone[i].offsetTop
//    topPos = newest[i].offsetTop

//    document.getElementsByClassName("qphone-body")[i].scrollTop = topPos - offsetHeight;
// } 