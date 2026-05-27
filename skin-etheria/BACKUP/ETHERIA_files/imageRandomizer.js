var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
/* ~ * ~ * ~ *
/	Jcink Hover Randomizer
/	Made by Noire
/	Installation guide at: https://pixel-perfect.boards.net/thread/4849/jcink-scripted-hover-randomizer
 * ~ * ~ * ~ */

try{
	let randomize = $("[randomset]");
	if( document.currentScript.getAttribute('randomAll').toUpperCase() === "TRUE" ){
		randomize.each( function() {
			if( this.nodeName.toUpperCase() === "IMG" ){
				this.src = getRandom( (this.getAttribute("randomset")).replace(/<br \/>/g, '' ).split(/,?\s/),
									   this.getAttribute("user") );
			}
			else {
				this.setAttribute("style",
					(this.getAttribute("style") ?? "")
					+ "background-image: url('"
					+ getRandom( (this.getAttribute("randomset")).replace(/<br \/>/g, '' ).split(/,?\s/),
								  this.getAttribute("user") )
					+ "');" );
			}
		});
	}else{
		randomize.each( function() {
			let userID = this.getAttribute("user"),
				random = getRandom( (this.getAttribute("randomset")).replace(/<br \/>/g, '' ).split(/,?\s/), userID ),
				matching = $(randomize).filter( "[user=\"" + userID + "\"]" );

			matching.each( function() {
				if( this.nodeName.toUpperCase() === "IMG" ){
					this.src = random;
				}
				else {
					this.setAttribute("style",
						(this.getAttribute("style") ?? "")
						+ "background-image: url('"
						+ random
						+ "');" );
				}
			});
				
			randomize = randomize.not( matching );
		});
	}
}catch(e){ console.error("Ran into the following error randomizing images:\n" + e); }

function getRandom( set, user ){
	if( user === "0" || set == "" || set[0] == "<i>No" ){
			let fallback = "";
			try {
				fallback = document.currentScript.getAttribute('defaultImage');
			}catch(e){ console.error("Ran into an error parsing default image:\n" + e); }

				return fallback;
	}
	
	return set[Math.floor(Math.random() * set.length)];
}
}

/*
     FILE ARCHIVED ON 02:53:48 Jun 11, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:01:41 May 25, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 3.226
  load_resource: 114.319
  PetaboxLoader3.resolve: 47.566
  PetaboxLoader3.datanode: 15.991
*/