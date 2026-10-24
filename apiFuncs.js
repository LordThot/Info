/* Structure of the data in a monitor is:
*	{pid:"",name:"", k: "",lid:0,mails:{},newM:0,unreadM:0,tags:[]};
*	pid - the id of the player this monitor is associated with. It is also the id for the monitor.
*	name - string to help identify this monitor.
*	k - the api key for this monitor.
*	lid - the id of the last notification recieved.
*	mails - object holding the raw mails that matched when recieved.
*	newM - the number of matching mails found since they were last viewed.
*	unreadM - the number of mails flagged as unread. Not currently used.
*	tags - array of the tags that have been assigned to any message in this monitor. not currently used.
*/


/* checkValid
*	Check if a newly supplied api key is valid. If it is then store the new monitor otherwise just return.
*	Sets the id of the monitor.
*	Set the Player ID this monitor is associated with.
*	Set the key to just the api key value (not including the the web address part or last notification parameter.
*/
function checkValid(key){
//	console.log("Validating: ",key);
	// This is a newly supplied key so check if it has the web address at the start or not
	if(key.startsWith("elgea-IMAIL")){
		var url = "https://elgea.illyriad.co.uk/external/mailapi/" + key;
	}else{
		if(key.includes("elgea-IMAIL")){
			let t = key.indexOf("elgea-IMAIL")-1;
			var url = "https://elgea.illyriad.co.uk/external/mailapi/" + key.substring(t);
		}
	}
	// if(!key.startsWith("http://elgea.illyriad.co.uk/external/mailapi/")){
		// var url = "http://elgea.illyriad.co.uk/external/mailapi/" + key;
	// }else{
		// var url = key;
	// }
	if(url !== undefined){
// =======================================================================================
	var loader = document.querySelector("#loader");
	var loaderMessage = "Validating key...";
	loader.querySelectorAll("p")[0].textContent = loaderMessage;
	loader.className = 'see';

// =======================================================================================	
	
	$.ajax({
	    type: "GET",
		crossDomain: true,
	    url: url,
	    dataType: "text",
		success: function(xml, textStatus,jqXHR ){
			xmlDoc = $.parseXML(xml);
			// Check if the first child node is notificationsapi. If it is then this is a valid key.
//			console.log(xmlDoc.firstChild.tagName);
			if(xmlDoc.firstChild.tagName == "mailapi"){
// ============================================================================				
				// Check if this key relates to an existing monitor
				pid = $(xmlDoc).find('player').attr('id');
				chrome.storage.local.get(pid,function(results){
//					console.log("Checking if monitor exists: ",results);
					if(!results[pid]){
						// New account to monitor
//						console.log("New account so create a new monitor.");
						// Create a blank monitor
						let m = {pid:"",name:"", k: "",lid:0,mails:{},newM:0,unreadM:0};
						// Get the player id and api key
						pid = $(xmlDoc).find('player').attr('id');
						k = $(xmlDoc).find('playerapikey').attr('id');
						m.pid = pid;
						m.k = k;
						// Store the newly created monitor and then display the monitors.
						loader.className = 'nosee';
						chrome.storage.local.set({[m.pid]:m},
							alert("New monitor created."));
					}else{
						// Existing account so just update the key and store the monitor.
//						console.log("Existing account - update existing monitor and store",key);
//						console.log("results: ",results, "pid: ",pid);
//						console.log("monitor:", results[pid]);
						m = results[pid];
//						console.log("Old monitor: ",m);
						m.k = key;
//						console.log("New monitor: ",m);
						loader.className = 'nosee';
						chrome.storage.local.set({[m.pid]:m},
						alert("Key exists. Monitor updated."));
					}
				});
// ===============================================================================
			}else{
				alert("Key invalid. Monitor not created/updated.");
			}
		}
	});
	}else{
		alert("Key invalid. Monitor not created/updated.");
	}
}
// ===============================================================================
/* getMailList
*	Fetch any new mails via the in-game api for the supplied monitor.
*	
*	Sets the lid value of this monitor to the last notification fetched.
*	Count the number of new notifications found that match those wanted and add it to the newNotifs field in the monitor..
*/
function getMailList(monitor){
	// Build the full url by adding the web address and last message id if needed
	url = "https://elgea.illyriad.co.uk/external/mailapi/"  + monitor.k;
//	Check if there is a valid lid value or not
	if(monitor.lid > 0){
		url = url + "?LastMsgID=" + monitor.lid;
	}
// =======================================================================================
try{
	// display the loader icon and message while waiting on the response from the api.
	var loader = document.querySelector("#loader");
	var loaderMessage = "Querying api...";
	loader.querySelectorAll("p")[0].textContent = loaderMessage;
	loader.className = 'see';
}
catch (e){
}
// =======================================================================================	
	// Run the actual call to the in-game api.
	$.ajax({
	    type: "GET",
		crossDomain: true,
	    url: url,
	    dataType: "xml",
		success: function(xml, textStatus,jqXHR ){
			// check if the key is still valid.
			if(xml.childNodes[0].tagName !== "errormsg"){
				// Got a response with mails so process them.
				let newMails = {};
				$(xml).find('mails > mail').each(function(){
					/* Fields in a mail:
					*	msg id - the unique id of this message
					*	msgcategory id - which identifies which inbox category it is in along with a textual description (eg "Player", "Military", "Diplomacy"), an int and a varchar(255) respectively.
					*	msgdirection - which will either be "Sent" or "Received"
					*	sentbyplayer id - an int which identifies who the mail is from
					*	receivedbyplayer id - an int which identifies who the mail went to
					*	noreplyYN - a bit field either 0 or 1 which indicates whether the recipient can reply to the mail or not.  System mails, for example, have this sent to 1, meaning you cannot reply to the mail
					*	readYN - a bit field either 0 or 1 which indicates whether the recipient has opened the mail or not
					*	alliancemessageYN - a bit field either 0 or 1 which indicates whether the mail was sent Alliance-wide
					*	maildatetime - which is the sent timestamp on the mail itself, in the format yyyy-mm-ddThh:mm:ss.SSS
					*	msgsubject - which is a varchar(255) and is the subject line of the mail
					*/
					var thisMail = {id:"",catId:"",catName:"",dir:"",sId:"",sName:"",rId:"",rName:"",noReply:"",read:"",aWide:"",dtg:"",subj:"",tags:[]};
					thisMail.id = Number($(this).find('msg').attr('id'));
					monitor.lid = thisMail.id; // Update the last mail id in the monitor with this one.
					thisMail.catId = $(this).find('msgcategory').attr('id');
					thisMail.catName = $(this).find('msgcategory').text();
					thisMail.dir = $(this).find('msgdirection').text();
					thisMail.sId = $(this).find('sentbyplayer').attr('id');
					thisMail.sName = $(this).find('sentbyplayer').text();
					thisMail.rId = $(this).find('receivedbyplayer').attr('id');
					thisMail.rName = $(this).find('receivedbyplayer').text();
					thisMail.noReply = $(this).find('noreplyYN').attr('id');
					thisMail.read = $(this).find('readYN').attr('id');
					thisMail.aWide = $(this).find('alliancemsgYN').attr('id');
					thisMail.dtg = $(this).find('maildatetime').text();
					thisMail.subj = $(this).find('msgsubject').text();
					
					newMails[thisMail.id] = thisMail;
				});
				// Reduce the newKeys to only those that are not in oldKeys
				let oldKeys = Object.keys(monitor.mails);
				let newKeys = Object.keys(newMails);
				var diff = $(newKeys).not(oldKeys).get();
				// Transfer any objects in diffs from newMails to monitor.mails
				for(i=0;i<diff.length;i++){
					monitor.mails[diff[i]] = newMails[diff[i]];
				}
				monitor.newM = monitor.newM + diff.length;
				// Restrict the monitor to a maximum of 200 mails.
				let k = Object.keys(monitor.mails);
				k.sort(compareNumbers);
// This has been temporarily disabled for testing/development.				
				// let newK = k.slice(-200);
				// let newN = {};
				// for (var id of newK){
					// newN[id] = monitor.notifs[id];
				// }
				// monitor.notifs = newN;
//				console.log("Storing: ",monitor);
				// Store the updated monitor.
				chrome.storage.local.set({[monitor.pid]:monitor});
				try{
					// Hide the loader icon & message
					if(document.querySelector("#loader")){
						var loader = document.querySelector("#loader");
						loader.className = 'nosee';
					}
				}
				catch (e){
				}
 			}
		}
	})	
}

/* readMail
*	Reads a single message
*/
function readMail(id,key){
	// Build the full url by adding the web address and last message id if needed
	url = "https://elgea.illyriad.co.uk/external/messageapi/"  + key;
//	Check if there is a valid lid value or not
	if(Number(id) > 0){
		url = url + "?MsgID=" + id;
	}else{
		return;
	}
// =======================================================================================
	var loader = document.querySelector("#loader");
	var loaderMessage = "Fetching message...";
	loader.querySelectorAll("p")[0].textContent = loaderMessage;
	loader.className = 'see';
// =======================================================================================	
	// Run the actual call to the in-game api.
	$.ajax({
	    type: "GET",
		crossDomain: true,
	    url: url,
	    dataType: "xml",
		success: function(xml, textStatus,jqXHR ){
			// check if the key is still valid.
			if(xml.childNodes[0].tagName !== "errormsg"){
				// Got a valid response so process it.
				$(xml).find('mails > mail').each(function(){				
					var thisMail = {id:"",catId:"",catName:"",dir:"",sId:"",sName:"",rId:"",rName:"",noReply:"",read:"",aWide:"",dtg:"",subj:""};
					thisMail.id = Number($(this).find('msg').attr('id'));
					thisMail.catId = $(this).find('msgcategory').attr('id');
					thisMail.catName = $(this).find('msgcategory').text();
					thisMail.dir = $(this).find('msgdirection').text();
					thisMail.sId = $(this).find('sentbyplayer').attr('id');
					thisMail.sName = $(this).find('sentbyplayer').text();
					thisMail.rId = $(this).find('receivedbyplayer').attr('id');
					thisMail.rName = $(this).find('receivedbyplayer').text();
					thisMail.noReply = $(this).find('noreplyYN').attr('id');
					thisMail.read = $(this).find('readYN').attr('id');
					thisMail.aWide = $(this).find('alliancemsgYN').attr('id');
					thisMail.dtg = $(this).find('maildatetime').text();
					thisMail.subj = $(this).find('msgsubject').text();
					thisMail.body = $(this).find('msgbody').text();
//					console.log("Single message: ",thisMail);
					loader.className = 'nosee';
					showMessage(thisMail);
//					return thisMail;
				})
			}else{
				loader.className = 'nosee';
				noMessage({"id":id,"errormsg":"This message may or may not exist. Either way it is not yours to read."});
			}
		}
	})
}

function compareNumbers(a, b) {
  return a - b;
}
