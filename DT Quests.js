/* File: quests.js
 */
dtquests = function(){
	dt.allembine = {
		/* Method: checkState
		* Check if the site has been visited or not.
		*/
		checkState: function (i) {
			if (dt[PlayerId].towns[CurrentTown].allembine[i + 1].a === 'true') {
				return true;
			}
			return false;
		},
		/* Method: show
		* Build and show the Allembine tool
		*/
		show: function () {
			dt.showTool("#allembineHtml");
			var tbl = document.querySelector("#allembineTbl tbody");
			dt.removeRows(document.getElementById("allembineTbl"));
			var siteKeys = Object.keys(dt.allembineSites);
			var numSites = siteKeys.length;
			var scoords = [];
			var tcoords = [];
			var dist = 0;
			scoords[0] = dt[PlayerId].towns[CurrentTown].x;
			scoords[1] = dt[PlayerId].towns[CurrentTown].y;
			for (i = 0; i < numSites; i++) {
				var url = '';
				row = tbl.insertRow(-1);
				if (dt[PlayerId].towns[CurrentTown].allembine[i + 1].a === 'true') {
					back = 'green';
				} else {
					back = '';
				}
				var cell = row.insertCell(0);
				cell.innerHTML = siteKeys[i];
				cell.setAttribute('class', back);
				cell = row.insertCell(1);
				tcoords = dt.allembineSites[siteKeys[i]].a.coords;
				cell.innerHTML = tcoords[0];
				cell.setAttribute('class', back);
				cell = row.insertCell(2);
				cell.innerHTML = tcoords[1];
				dist = parseInt(dt.hypot(scoords, tcoords));
				cell.setAttribute('class', back);
				cell = row.insertCell(3);
				cell.innerHTML = dist;
				cell.setAttribute('class', back);
				cell = row.insertCell(4);
				url = '#/Diplomatic/Orders/' + tcoords[0] + '/' + tcoords[1];
				cell.innerHTML = '<a href="#/Diplomatic/Orders/" title="Send">Send</a>';
				sendBtn = cell.firstElementChild;
				sendBtn.setAttribute('href', url);
				cell.setAttribute('class', back);
				cell = row.insertCell(5);
				btnclick = 'dt.allembine.done(' + siteKeys[i] + ')';
				cell.innerHTML = '<input type="button" value="Done" name="done" />';
				btn = cell.firstElementChild;
				btn.setAttribute('onclick', btnclick);
				cell.setAttribute('class', back);
				if (dt[PlayerId].towns[CurrentTown].allembine[i + 1].a === 'true') {
					if (dt.allembineSites[siteKeys[i]].b) {
						row = tbl.insertRow(-1);
						if (dt[PlayerId].towns[CurrentTown].allembine[i + 1].b === 'true') {
							back = 'green';
						} else {
							back = '';
						}
						cell = row.insertCell(0);
						cell.innerHTML = siteKeys[i] + 'b';
						cell.setAttribute('class', back);
						cell = row.insertCell(1);
						tcoords = dt.allembineSites[siteKeys[i]].b.coords;
						cell.innerHTML = tcoords[0];
						cell.setAttribute('class', back);
						cell = row.insertCell(2);
						cell.innerHTML = tcoords[1];
						dist = parseInt(dt.hypot(scoords, tcoords));
						cell.setAttribute('class', back);
						cell = row.insertCell(3);
						cell.innerHTML = dist;
						cell.setAttribute('class', back);
						cell = row.insertCell(4);
						url = '#/Diplomatic/Orders/' + tcoords[0] + '/' + tcoords[1];
						cell.innerHTML = '<a href="#/Diplomatic/Orders/" title="Send">Send</a>';
						sendBtn = cell.firstElementChild;
						sendBtn.setAttribute('href', url);
						cell.setAttribute('class', back);
						cell = row.insertCell(5);
						btnclick = 'dt.allembine.done("' + siteKeys[i] + 'b")';
						cell.innerHTML = '<input type="button" value="Done" name="done" />';
						btn = cell.firstElementChild;
						btn.setAttribute('onclick', btnclick);
						cell.setAttribute('class', back);
					}
				}
			}
	//		dt.adjustTool("#allembineHtml");
		},
		make: function () {
			if (dt[PlayerId].towns[CurrentTown].allembine == undefined) {
				dt[PlayerId].towns[CurrentTown].allembine = {};
				var keys = Object.keys(dt.allembineSites);
				for (var i = 1; i < 21; i++) {
					dt[PlayerId].towns[CurrentTown].allembine[i] = {};
					if (dt.allembineSites[i].b) {
						dt[PlayerId].towns[CurrentTown].allembine[i] = {a: 'false', b: 'false'};
					} else {
						dt[PlayerId].towns[CurrentTown].allembine[i] = {a: 'false'};
					}
				}
			}
		},
	/* Method: done
	* Toggle the state of an allembine site
	* 
	* Parameter:
	* loc - string. The id of the site to toggle.
	*/
		done: function (loc) {
			if (loc !== parseInt(loc)) {
				loc = loc.replace('b', '');
				switch (dt[PlayerId].towns[CurrentTown].allembine[loc].b) {
					case 'true':
						dt[PlayerId].towns[CurrentTown].allembine[loc].b = 'false';
						break;
					default:
						dt[PlayerId].towns[CurrentTown].allembine[loc].b = 'true';
						break;
				}
			} else {
				switch (dt[PlayerId].towns[CurrentTown].allembine[loc].a) {
					case 'true':
						dt[PlayerId].towns[CurrentTown].allembine[loc].a = 'false';
						break;
					default:
						dt[PlayerId].towns[CurrentTown].allembine[loc].a = 'true';
						break;
				}
			}
			var key = CurrentTown + ':allem';
			locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[CurrentTown].allembine));
			dt.allembine.show();
		},
	};

	dt.ft = {
		show: function (data) {
			dt.showTool("#ftHtml");
			dt.removeRows(document.querySelector("#fortuneTellerTable"));
		$.ajax({
			// ftp://dewt@ftp.dewt.co.uk/public_html/durctools2dev/php/craftingdb.php
			url: "https://www.illystuff.uk/illydata/php/gypsySend.php",
			data: data,
			type: "POST",
			dataType: "json",
			cache: false,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success: function (data) {
	//			dt_output.innerHTML = '<h3>Fortune Teller Locations</h3><p>The Fortune Teller moves every 24hrs. These coords are updated at 00:35 (Illy time) each day. The distances are from the town you had selected when you clicked the button. For more details about this quest check the <a href="http://arcanum-illyria.com/wiki/Fortune_Teller" target="_blank">wiki</a>.</p><table border="1" id = "fortuneTellerTable"><tr><th>X</th><th>Y</th><th>Dist</th><th>Map</th><th>Send</th></tr></table>';
	//			dt_output.setAttribute('class', 'see');
				var fortuneTellerTable = document.querySelector('#fortuneTellerTable');
				var currentCoords = [dt[PlayerId].towns[CurrentTown].x, dt[PlayerId].towns[CurrentTown].y];
				var tbdy = document.querySelector("#fortuneTellerTable tbody");
				for (var i = 0; i < 8; i++) {
					var coords = data[i];
					var href = 'href="#/World/Map/' + coords[0] + '/' + coords[1] + '"';
					var row = tbdy.insertRow(-1);
					row.insertCell(0).innerHTML = coords[0];
					row.insertCell(1).innerHTML = coords[1];
					var dist = parseInt(dt.hypot(currentCoords, coords));
					row.insertCell(2).innerHTML = dist;
					// newElem = dt.addElement(newCell, 'a', ['onclick'], [href]);
					var newCell = row.insertCell(3);
					newElem = dt.addElement2(newCell, 'a', ['onclick', 'class'], [href, 'blue']);
					newElem.innerHTML = 'Map';
					var newCell = row.insertCell(4);
					// <a title="Send" href="#/Diplomatic/Orders/-312/717">Send</a>
					href = 'href="#/Diplomatic/Orders/' + coords[0] + '/' + coords[1] + '"';
					newElem = dt.addElement2(newCell, 'a', ['onclick', 'class'], [href, 'blue']);
					newElem.innerHTML = 'Send';
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert("You can not send Cross Domain AJAX requests: " + errorThrown);
			}
		})
	},
	};
}