/*File: preferences.js
 * Methods to display and change the user controlled preferences
 */
dtprefs = function(){
	dt.preferences = {
		displayCurrent: function(){
				var factionchk = document.querySelector("#factionScan");
		if (dt[PlayerId].settings.factionScanState === true) {
			factionchk.checked = true;
		} else {
			factionchk.checked = false;
		}
		var sel = document.getElementById('prodCheckFreq');
		var opts = sel.getElementsByTagName('option');
		for (var i = 0; i < opts.length; i++) {
			if (parseInt(opts[i].value) == dt[PlayerId].settings.chkFreq) {
				opts[i].setAttribute('selected', true);
				break;
			}
		}
		$(function () {
				$("#prefsHtml").dialog();
			});
		},
		/* Function: toggleFactionScanState
	* Toggle scanning and reporting of Faction troops on the world map.
	*/
	toggleFactionScanState: function () {
		var factionchk = document.querySelector("#factionscan");
		if (dt[PlayerId].settings.factionScanState === true) {
			dt[PlayerId].settings.factionScanState = false;
		} else {
			dt[PlayerId].settings.factionScanState = true;
		}
		var key = PlayerId + ':settings';
		locStorage.setItem(key, JSON.stringify(dt[PlayerId].settings));
	},
	/* Method: prodCheckFreq
	* Store the frequency to check the production queues and set up the regular 
	* running of the check.
	*/
		prodCheckFreq: function () {
			var chkfreq = document.querySelector("#prodCheckFreq");
			dt[PlayerId].settings.chkFreq = parseInt(chkfreq.options[chkfreq.selectedIndex].value);
			window.clearInterval(dt.prodCheckTimer);
			dt.prodCheckTimer = window.setInterval(dt.production.updateQueues, dt[PlayerId].settings.chkFreq);
			var key = PlayerId + ':settings';
			locStorage.setItem(key, JSON.stringify(dt[PlayerId].settings));
		},
	};
}