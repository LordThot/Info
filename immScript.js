// ============================================================================================
/*
* Initialize everything
*/
function immInitialize(){
	mainButListeners();
	chrome.storage.onChanged.addListener(storageChanged);
}
// ============================================================================================
function mainButListeners(){
	document.querySelector("#addKey").addEventListener("click", (e) => {
		addKey(e);
	})
	document.querySelector("#viewML").addEventListener("click", (e) => {
		viewMailList(e);
	})
	document.querySelector("#vKeys").addEventListener("click", (e) => {
		viewKeys(e);
	})
}
// ============================================================================================
function storageChanged(changes, area) {
	if(document.querySelector("#monitorsDiv.see")){
		viewMonitors();
	}
}
// ============================================================================================
function monitorButtonClicks(event){
	let t = event.target;
	let mid = t.dataset.id;
	let action = t.name;
	switch (action) {
		case "updateT":
		updateMon(mid);
		break;
		case "delMon":
		// Delete this monitor
		deleteMonitor(mid);
		break;
	}
}
// ============================================================================================
function viewMailList(e){
	document.getElementById("monitorsDiv").classList.add("nosee");
	document.getElementById("notifsDiv").classList.remove("nosee");
	// Clear all rows from the notifsDiv table body
	$( "#detailsTbl tbody" ).empty();
	mailInitialize();
}
// ============================================================================================
function viewKeys(e){
	document.getElementById("notifsDiv").classList.add("nosee");
	document.getElementById("monitorsDiv").classList.remove("nosee");
	// Clear all children from the monitorsDiv element
	$( "#monitorsDiv" ).empty();
	// get all the monitors from storage
	chrome.storage.local.get(null,function(results){
 		let k = remove(Object.keys(results),"settings");
		let l = k.length;
		for(i=0;i<l;i++){
			let thisMon = results[k[i]];
			let ne = document.createElement("fieldset");
			ne.dataset.id = thisMon.pid;
			var blankMon = document.querySelector("#blankMonitor").cloneNode(true);
			blankMon.classList.remove("nosee");
			blankMon.setAttribute("id",thisMon.pid);
			ne.appendChild(blankMon);
			let ae = document.querySelector("#monitorsDiv").appendChild(ne);
			ae.querySelector("legend").textContent = "Monitor "+thisMon.pid;
			ae.querySelector("[name='pid']").textContent = thisMon.pid;
			ae.querySelector("[data-id='"+thisMon.pid+"'] input[type='text']").setAttribute("placeholder",thisMon.name);
			let b = ae.querySelectorAll(".updateb");
			for (var button of b) {
			  button.dataset.id = thisMon.pid;
			  button.addEventListener("click",monitorButtonClicks);
			}
		}
	});
}
// ============================================================================================
function addKey(e){
	var key = window.prompt("Enter the Mail API key");
	if(key !== null){
		checkValid(key);
	}
}
function deleteMonitor(mid){
	chrome.storage.local.remove(mid, viewKeys());
}
// ============================================================================================
function updateMon(mid){
	// First, get the current data for the monitor.
	chrome.storage.local.get(mid,function(results){
		let monitor = results[mid];
		// Get any checked checkboxes for this monitor
		let checked = document.querySelectorAll("[data-id='"+monitor.pid+"'] input[type='checkbox']:checked");
		monitor.types = [];
		for (var box of checked) {
		  monitor.types.push(box.dataset.id);
		}
		let mName = document.querySelector("[data-id='"+monitor.pid+"'] input[type='text']").value;
		monitor.name = mName;
		chrome.storage.local.set({[mid]:monitor}, function(){
			viewKeys();
			getMailList(monitor);
		});
	});
}
// ============================================================================================
immInitialize();