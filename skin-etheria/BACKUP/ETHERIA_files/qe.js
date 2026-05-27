var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
/*  
 * Quick edit add-on for InvisionFree-powered forums
 * ==MODIFIED FOR REGULAR INVISION POWER BOARD 1.3.X FORUMS==
 * Version 3.1.0-ipb1.3.x-1.0
 * Copyright sk89q <http://sk89q.therisenrealm.com>
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License.
*/

/*by sk89q & under GPL, href.match fix by fizzyelf */
var SKIFS={util:{getBaseUrl:function(){return location.href.match(/(https?:\/\/.*?\/)/)[1]},getSessionId:function(){var sess=location.href.match(/s=([a-f0-9]{32})/);if(!sess)return'';return sess[1]},getAjax:function(){if(window.XMLHttpRequest){return new XMLHttpRequest()}else if(window.ActiveXObject){try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){return false}}}return false},utf8Decode:function(d){var nd='';for(var i=0;i<d.length;i++){var cc=d.charCodeAt(i);if(cc>127)nd+='&#'+cc+';';else nd+=d.charAt(i)}return encodeURIComponent?encodeURIComponent(nd):escape(nd)}}};

var emoji_redirect = 0;

SKIFS.quickEdit =
{
    // script configuration
    config:
    {
        // the quick edit button
        button: '',
        // some other scripts modify which TD cell we need
        postCellCount: 1,
        // should it append the edit note
        editHistoryEnabled: false,
        // add a quick edit button
        addQuickEditButton: true,
        // hide original edit buttons
        hideEditButtons: false,
        // allow invoking quick edit by double clicking
        // the post area; could get annoying
        enableDoubleClick: false
    },
    
    // when a post is chosen to be edited, the original HTML
    // in the TD is stored here so that we may restore it
    originalPostHtml: {},
    // stored icons
    postIcons: {},
    // auth key we need to do anything
    authKey: '',
    
    // call first
    construct: function(useCustomStyles)
    {
        // check if we can support quick edit in the browser
        if(!SKIFS.util.getAjax() ||
           !document.getElementById ||
           !document.body.innerHTML) return;
           
        if(!useCustomStyles)
        {
            document.write('<style type="text/css">'+
                           '.quick-edit { border: 0px solid #000000; padding: 4px }'+
                           //'.quick-edit textarea { width: 99%;  padding: 5px; color: #000000; background: #FFFFFF; font-family: Verdana, sans-serif; font-size: 11px }'+
						   '.quick-edit textarea { width: 99%; padding: 5px; }'+
                           '.quick-edit .editor { margin-bottom: 3px; }'+
                           '.quick-edit .right-buttons input { width: 30px }'+
                           '.quick-edit .save { font-weight: bold }'+
                           '.quick-edit .full { margin-left: 20px }'+
                           '</style>');
        }
        
    },
    // returns the TD element for the post we need
    // from a provided post ID
    getPostElement: function(pid)
    {
        
		if(document.getElementById('pid_'+pid) !== null) {
			return document.getElementById('pid_'+pid);
		}
		
    },
    // called when a post needs to be edited
    edit: function(fid, tid, pid)
    {
        // we are already ending this post; return
        if(this.originalPostHtml[pid]) return;
        
        var postE = this.getPostElement(pid);

        // store original HTML for later use
        this.originalPostHtml[pid] = postE.innerHTML;
        
		// this is the pagination offset
        var st = window.location.href.match(/st=([0-9]+)/);
        st = st ? st[1] : 0;

		//if the post contains emoji, then it cannot be quick edited
		if(emoji_redirect == 1) {
			var emojiRegexp = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;	
			if (postE.innerHTML.match(emojiRegexp)) {
				window.location.href = 'index.php?act=Post&CODE=08&f='+fid+'&t='+tid+'&p='+pid+'&st='+st;
				console.log("emoji found");
			}
		}
		
        postE.innerHTML = '<form method="post" action="#" id="qe-form-'+pid+'">'+
                          '<div class="quick-edit"><div id="qe-editor-'+pid+'" class="editor"><textarea class="textinput" rows="10" cols="60" disabled="disabled" name="Post" style="height: 200px">Please wait as the post loads...</textarea></div>'+
                          '<div style="float:left" class="buttons"><input name="save" class="forminput" type="button" value="Save Changes" disabled="disabled" onclick="SKIFS.quickEdit.save('+fid+','+tid+','+pid+')" /> '+
                          '<input name="cancel" class="forminput" type="button" disabled="disabled" value="Cancel" onclick="if(confirm(\'Are you sure you wish to discard your changes?\'))SKIFS.quickEdit.discard('+pid+')" /> '+
                          '<a href="index.php?act=Post&CODE=08&f='+fid+'&t='+tid+'&p='+pid+'&st='+st+'">Full Edit</a></div>'+
                          '<div style="text-align:right" class="right-buttons"><input type="button" value="+" onclick="if(this.form.Post)this.form.Post.style.height=parseInt(this.form.Post.style.height)+100+\'px\'" /><input type="button" value="-" onclick="if(this.form.Post)this.form.Post.style.height=parseInt(this.form.Post.style.height)-100+\'px\'" /></div>'+
                          '</div></form>';

        // send a request to get the original code for the post
        var req = SKIFS.util.getAjax();
        req.open('GET', SKIFS.util.getBaseUrl()+'index.php?quickedit=1&act=Post&CODE=08&f='+fid+'&t='+tid+'&p='+pid+'&s='+SKIFS.util.getSessionId(), true);
        req.onreadystatechange = function()
        {
            if(req.readyState == 4) {
                SKIFS.quickEdit.update(fid, tid, pid, req.responseText);
			}
        };
        req.send(null);
    },
    // called when the original post was deleted
    // from SKIFS.quickEdit.edit
    update: function(fid, tid, pid, response)
    {        
        var editorE = document.getElementById('qe-editor-'+pid);
        var formE = document.getElementById('qe-form-'+pid);
        
        // we need this to do updates
        // it is a key to prevent off-site attempts at doing things
        this.authKey = response.match(/auth_key' value='(.{32})'/)[1]; //'
        
        // to avoid HTML escaping issues, we just replace the form with the content
        var content = response.match(/<textarea cols='80' rows='20' name='Post' tabindex='3' class='textinput'>((.|\n)*)<\/textarea>/)[1];
        if(!content) content = response.match(/<textarea cols='80' rows='20' name='Post' tabindex='3' class='textinput'>(.*)<\/textarea>/)[1];
        editorE.innerHTML = '<textarea class="textinput" rows="10" cols="60" name="Post" style="height: 200px">'+content+'</textarea>';
        
        // store the post icon so we don't lose it when
        // we save
        this.postIcons[pid] = response.match(/name=('|")iconid('|") value=('|")([0-9]+)('|") checked/)[4]; //'
        
        with(formE)
        {
            Post.focus();
            save.disabled = false;
            cancel.disabled = false;
            //full.disabled= false;
            action = window.location.href.replace(/index\..*$/,'')+'index.php?act=Post&quickedit=1&CODE=08&f='+fid+'&t='+tid+'&p='+pid+'&editupload=keep&add_edit='+(this.config.editHistoryEnabled ? '1' : '0')+'&iconid='+this.postIcons[pid]+'&enableemo=yes&enablesig=yes&preview=1';
        }
    },
    // canceling a quick edit
    discard: function(pid)
    {
        var postE = document.getElementById('pid_'+pid);
        postE.innerHTML = this.originalPostHtml[pid];
        this.originalPostHtml[pid] = null;
        this.postIcons[pid] = null;
    },
    // saves the edited post
    save: function(fid, tid, pid)
    {
        var formE = document.getElementById('qe-form-'+pid);
        
        if(formE.Post.value == '')
        {
            alert('You must enter a message to post!');
            return;
        }
        
        formE.Post.disabled = true;
        formE.cancel.disabled = true;
        formE.save.value = "Saving... please wait";
        
        // this is the pagination offset
        var st = window.location.href.match(/st=([0-9]+)/);
        st = st ? st[1] : 0;
        
        // save the post
        var req = SKIFS.util.getAjax();
        req.open('POST', SKIFS.util.getBaseUrl()+'index.php?act=Post&quickedit=1&CODE=09&f='+fid+'&t='+tid+'&p='+pid+'&st='+st+'&auth_key='+this.authKey+'&s='+SKIFS.util.getSessionId(), true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        req.onreadystatechange = function()
        {
            if(req.readyState == 4) { 
                SKIFS.quickEdit.finishInterim(pid, req.responseText);
			}
        };
        req.send('editupload=keep&add_edit='+(this.config.editHistoryEnabled ? '1' : '0')+'&iconid='+this.postIcons[pid]+'&enableemo=yes&enablesig=yes&Post='+SKIFS.util.utf8Decode(formE.Post.value));
    },
    // interim finish
    finishInterim: function(pid, response)
    {
        // interim
        var redirectUrl = new RegExp("href='(.*?)#entry.*?'>");
        redirectUrl = redirectUrl.exec(response);
        if(!redirectUrl)
        {
            alert("An error has occurred while saving your post.");
            formE.save.value = "Save";
            return;
        }
        redirectUrl = redirectUrl[1]+'&quickedit=1&__='+Math.random();

        // continue loading
        var req = SKIFS.util.getAjax();
        req.open('GET', redirectUrl);


        req.onreadystatechange = function()
        {
            if(req.readyState == 4)
                SKIFS.quickEdit.finish(pid, req.responseText);
        };
        req.send(null);
    },
    // finish up after a save
    finish: function(pid, response)
    {
        var formE = document.getElementById('qe-form-'+pid);
        
		
        // we look for the HTML of the new post in the response
        var newPost = new RegExp('<!\-\- THE POST '+pid+' \-\->((.|\n)*?)<!\-\- THE POST \-\->');
        newPost = newPost.exec(response);
				
if(!newPost)
        {
            alert("An error has occurred while saving your post.");
            formE.save.value = "Save";
            return;
        }
        newPost = newPost[1];
        
        // show the new version of the post
        var postE = document.getElementById('pid_'+pid);
        postE.innerHTML = newPost;
        
		// Dumsiden
		if(typeof imageResizerInit == 'function') { imageResizerInit(); }

        // clean up
        this.originalPostHtml[pid] = null;
        this.postIcons[pid] = null;
    }
}
}

/*
     FILE ARCHIVED ON 23:01:08 Jun 10, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:01:41 May 25, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 1.062
  load_resource: 365.047 (2)
  PetaboxLoader3.resolve: 230.334 (2)
  PetaboxLoader3.datanode: 62.561 (2)
*/