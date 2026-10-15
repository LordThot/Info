dtexport = function(){
	dt.export_csv_hubs_inv = function(id,objData){
		// Get the keys from objData
		let keys = Object.keys(objData);
		console.log("hubs: ",keys);
		// Step through the hubs
		for(hi=0;hi<objData.list.length-1;hi++){
			var thisHub = objData[objData.list[hi]].inv;
	//		console.log(objData.hubs[objData.list[hi]], thisHub);
			// Build the top section of the csv
			let csv = "Hub ID,Name" + '\n';
			csv += objData.hubs[objData.list[hi]].id + ',' + objData.hubs[objData.list[hi]].name + '\n';
			csv += "Sect,Item,Item ID,Classes,Held,Rate" + '\n';
			sects = ["res","mounts","weapons","armour","anatomies","minerals","herbs","exotic"];
			// loop through the sects
			for(s = 0;s<sects.length;s++){
				sectData = thisHub[sects[s]];
				sectKeys = Object.keys(sectData);
				for(i=0;i<sectKeys.length;i++){
					item = sectData[sectKeys[i]];
					csv += sects[s] + ',' + sectKeys[i]  + ',' + item.id + ',' + item.classes + ',' + item.held + ',' + item.rate + '\n';
				}
				
			}
			console.log(csv);
			csvData = new Blob([csv], { type: 'text/csv' });  
			csvUrl = URL.createObjectURL(csvData);

			hiddenElement = document.createElement('a');
			hiddenElement.href = csvUrl;
			hiddenElement.target = '_blank';
			hiddenElement.download = objData.hubs[objData.list[hi]].name + '_inv.csv';
			hiddenElement.click();

		}
		
	}

	dt.export_csv_inv = function(id,objData) {
		// Get the keys from objData
		let keys = Object.keys(objData);
		// Build the top section of the csv
		let csv = "Town ID,Name,Max Storage" + '\n';
		csv += id + ',' + dt[PlayerId].towns[id].name + ',' + objData.maxStore + '\n';
		csv += "Sect,Item,Item ID,Classes,Held,Rate" + '\n';
	//	let hkeys = Object.keys(dt[279547].towns[340727].inv);
		// let header = hk.join(delimiter) + '\n';
		for(s=1;s<keys.length;s++){
			let sect = objData[keys[s]];
			let sectKeys = Object.keys(sect);
			for(i=0;i<sectKeys.length;i++){
				item = sect[sectKeys[i]];
				csv += keys[s] + ',' + sectKeys[i]  + ',' + item.id + ',' + item.classes + ',' + item.held + ',' + item.rate + '\n';
			}
		}
		console.log(csv);
		let csvData = new Blob([csv], { type: 'text/csv' });  
		let csvUrl = URL.createObjectURL(csvData);

		let hiddenElement = document.createElement('a');
		hiddenElement.href = csvUrl;
		hiddenElement.target = '_blank';
		hiddenElement.download = dt[PlayerId].towns[id].name + '_inv.csv';
		hiddenElement.click();
	}

	dt.export_csv_mil2 = function(){
		// Export all the players towns in a single file
		// Get the ids of all the players towns
		let tids = dt[PlayerId].towns.list;
		// Create the header for the file
		let csv = "Player,Town,Coords,t1 Spear Pool,Build,Armies,t2 Spear Pool,Build,Armies,t1 Inf Pool,Build,Armies,t2 Inf Pool,Build,Armies,t1 Ranged Pool,Build,Armies,t2 Ranged Pool,Build,Armies,t1 Cav Pool,Build,Armies,t2 Cav Pool,Build,Armies,t1 Siege Pool,Build,Armies,t2 Siege Pool,Build,Armies,Tournament Pool,Build,Armies,Attack,Spear Def,Inf Def,Ranged Def,Cav Def" + '\n';
		// Loop through the towns adding the data to the csv.
		for(t = 0;t < tids.length;t++){
			thisT = dt[PlayerId].towns[tids[t]];
			thisL = CurPlayerName + ',' + thisT.name + ',' + thisT.x + '|' + thisT.y + ',';
			thisL += thisT.mil.units.spear.t1.pool + ',' + thisT.mil.units.spear.t1.build + ',' + thisT.mil.units.spear.t1.armies + ',';
			thisL += thisT.mil.units.spear.t2.pool + ',' + thisT.mil.units.spear.t2.build + ',' + thisT.mil.units.spear.t2.armies + ',';
			thisL += thisT.mil.units.inf.t1.pool + ',' + thisT.mil.units.inf.t1.build + ',' + thisT.mil.units.inf.t1.armies + ',';
			thisL += thisT.mil.units.inf.t2.pool + ',' + thisT.mil.units.inf.t2.build + ',' + thisT.mil.units.inf.t2.armies + ',';
			thisL += thisT.mil.units.range.t1.pool + ',' + thisT.mil.units.range.t1.build + ',' + thisT.mil.units.range.t1.armies + ',';
			thisL += thisT.mil.units.range.t2.pool + ',' + thisT.mil.units.range.t2.build + ',' + thisT.mil.units.range.t2.armies + ',';
			thisL += thisT.mil.units.cav.t1.pool + ',' + thisT.mil.units.cav.t1.build + ',' + thisT.mil.units.cav.t1.armies + ',';
			thisL += thisT.mil.units.cav.t2.pool + ',' + thisT.mil.units.cav.t2.build + ',' + thisT.mil.units.cav.t2.armies + ',';
			thisL += thisT.mil.units.siege.t1.pool + ',' + thisT.mil.units.siege.t1.build + ',' + thisT.mil.units.siege.t1.armies + ',';
			thisL += thisT.mil.units.siege.t2.pool + ',' + thisT.mil.units.siege.t2.build + ',' + thisT.mil.units.siege.t2.armies + ',';
			thisL += thisT.mil.units.tournament.pool + ',' + thisT.mil.units.tournament.build + ',' + thisT.mil.units.tournament.armies + ',';
			thisL += thisT.mil.summary.atk + ',' + thisT.mil.summary.spearDef + ',' + thisT.mil.summary.infDef + ',' + thisT.mil.summary.bowDef + ',' + thisT.mil.summary.cavDef + '\n';
			csv += thisL;
		}
		console.log("Town Mil data:",csv);
	}

	dt.export_csv_mil = function(id,objData) {
		// Get the keys from objData.units (spear, inf etc)
		let tkeys = Object.keys(objData.units);
		// Build the top section of the csv
		let csv = "Player,Town" + '\n';
		csv += dt[PlayerId].name + ',' + dt[PlayerId].towns[id].name + '\n';
		csv += "Unit Types,t1,,,t2,," + '\n';
		csv += ",Pool,Build,Army,Pool,Build,Army" + '\n';
		// Loop through the tkeys
		for(s=1;s<tkeys.length-1;s++){
			thisU = objData.units[tkeys[s]];
			thisType = tkeys[s] + ",";
			thisType += thisU.t1.pool + ',' + thisU.t1.build + ',' + thisU.t1.armies + ',' + thisU.t2.pool + ',' + thisU.t2.build + ',' + thisU.t2.armies + '\n';
			csv += thisType;
		}
		thisU = objData.units.tournament;
		csv += "Tournament,";
		csv += thisU.pool + ',' + thisU.build + ',' + thisU.armies;
		// Add the summary
		csv += "Summary\n";
		csv += "Attack,Spear Def,Inf Def,Ranged Def,Cav Def\n";
		csv += objData.summary.atk + ',' + objData.summary.spearDef + ',' + objData.summary.infDef + ',' + objData.summary.bowDef + ',' + objData.summary.cavDef + '\n';
		console.log(csv);
		let csvData = new Blob([csv], { type: 'text/csv' });  
		let csvUrl = URL.createObjectURL(csvData);

		let hiddenElement = document.createElement('a');
		hiddenElement.href = csvUrl;
		hiddenElement.target = '_blank';
		hiddenElement.download = dt[PlayerId].towns[id].name + '_mil.csv';
		hiddenElement.click();
	}

	dt.get_export_data = function(){
		let tgt = document.querySelector(".dda > legend:nth-child(1)").textContent;
	//	console.log (tgt);
	//	let id = tgt.split(":");
		return tgt;
	}

	dt.do_export = function(){
		let src = dt.get_export_data();
		let tgt = src.split(":");
		if(tgt[1] === "inv"){
			let d = dt[PlayerId].towns[tgt[0]].inv;
			dt.export_csv_inv(tgt[0],d);
		}
		if(tgt[1] === "hubs"){
			let d = dt[PlayerId].hubs;
			dt.export_csv_hubs_inv(tgt[0],d);
		}
		if(tgt[1] === "mil"){
			let d = dt[PlayerId].towns[tgt[0]].mil;
			dt.export_csv_mil(tgt[0],d);
		}

	}

	/*
	Export some/all of the gathered data to a file
	*/

	dt.asyncDataBackup = async function(){
		// Build the player data object
	//	let mainData = dt[PlayerId];
		// Now build the actual data object
		let backupObj = {pid:PlayerId, pn:dt[PlayerId].name, aid:dt[PlayerId].alliance, type:'dt', tlist:dt[PlayerId].towns.list, numTowns:dt[PlayerId].towns.numTowns, factions:dt[PlayerId].factions, gmBeep:dt[PlayerId].gmBeep, mapDisplay:dt[PlayerId].mapDisplay, smileys:dt[PlayerId].smileys, towns:dt.getTownData(), hubs:dt[PlayerId].hubs};

		console.log("Backup Obj: ",backupObj);
		const dataBlob = new Blob([JSON.stringify(backupObj, null, 4)], {type: "application/json", });
		//const dataBlob = new Blob([JSON.stringify({[PlayerId]:dt[PlayerId].towns}, null, 4)], {
		//		type: "application/json",
		//	  });
		let n = dt[PlayerId].name + "_data.json";
		// create a new handle
		const newHandle = await window.showSaveFilePicker({suggestedName:n});
		
		// create a FileSystemWritableFileStream to write to
		const writableStream = await newHandle.createWritable();
		
		// write our file
		await writableStream.write(dataBlob);
		
		// close the file and write the contents to disk.
		await writableStream.close();
	}
	dt.getBackupData = function(){
		let backupObj = {pid:PlayerId, pn:dt[PlayerId].name, type:'dt', tlist:dt[PlayerId].towns.list, numTowns:dt[PlayerId].towns.numTowns, factions:dt[PlayerId].factions, gmBeep:dt[PlayerId].gmBeep, mapDisplay:dt[PlayerId].mapDisplay, smileys:dt[PlayerId].smileys, towns:dt.getTownData, hubs:dt[PlayerId].hubs};
		console.log(backupObj);
	}
	dt.getTownData = function(){
		let townData = {};
		const td = dt[PlayerId].towns;
		td.list.forEach((tid) => townData[tid]={x:td[tid].x, y:td[tid].y, allembine:td[tid].allembine, diplo:td[tid].diplo, inv:td[tid].inv, mil:td[tid].mil, plots:td[tid].plots, prod: td[tid].prod2, research:td[tid].research, sov:td[tid].sov, trades:td[tid].trades});
		return townData;
	}
	dt.oldDataBackup = function(){
		let backupObj = {pid:PlayerId, pn:dt[PlayerId].name, alliance:dt[PlayerId].alliance, type:'dt', tlist:dt[PlayerId].towns.list, numTowns:dt[PlayerId].towns.numTowns, factions:dt[PlayerId].factions, gmBeep:dt[PlayerId].gmBeep, mapDisplay:dt[PlayerId].mapDisplay, smileys:dt[PlayerId].smileys, towns:dt.getTownData(), hubs:dt[PlayerId].hubs};
		// Build the player data object
	//	let mainData = dt[PlayerId];
		// Now build the actual data object
	//	let backupObj = {pid:PlayerId,pn:dt[PlayerId].name,type:"dt",data:mainData};
		console.log("Backup Obj: ",backupObj);
		let filename = dt[PlayerId].name + "_data.json";
		let content = JSON.stringify(backupObj, null, 4);
	//	console.log("File content: ",content);
		var blob = new Blob([content], {type: 'text/json'}),
				e = document.createEvent('MouseEvents'),
				a = document.createElement('a')

		a.download = filename
		a.href = window.URL.createObjectURL(blob)
		a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
		e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
		a.dispatchEvent(e)
	}
	dt.dataBackup = function(){
		if (typeof window.showSaveFilePicker === "function"){
			dt.asyncDataBackup();
		}else{
			dt.oldDataBackup();
		}
	}

	/*
	Import data from a previously exported data file.
	*/
	dt.asyncDataRestore = async function(){
		// Open file picker and destructure the result the first handle
		const [fileHandle] = await window.showOpenFilePicker();
		
		// get file contents
		const fileData = await fileHandle.getFile();
		const reader = new FileReader();
		reader.addEventListener(
			"load",
			() => {
				// this will then display a text file
				dt.tmpData = JSON.parse(reader.result);
				console.log(dt.tmpData);
			},
			false,
		);
		
		if (fileData) {
		reader.readAsText(fileData);
		}
	}
	dt.oldDataRestore = function(){
		dt.showTool("#dataBackupRestoreHtml");
		
		document.querySelector('input[type=file]').value = "";

	}
	function loadDataFile() {
		var file = document.getElementById('dataRestore').files[0];
		var reader = new FileReader();
		reader.onload = function (e) {
			var importVal = reader.result;
			importVal = importVal.trim();
			var importObjs = JSON.parse(importVal);
			if(importObjs.pid !== PlayerId){
				importObj = importVal = null;
				window.alert("This datafile does not belong to you. Data has not been restored");
				return;
			}
			$("#dataBackupRestoreHtml").closest('.ui-dialog-content').dialog('close');
			console.log("Imported data: ",importObjs);
			dt.checkDataType(importObjs)
		}
		reader.readAsText(file);
	}
	dt.oldParse = function(d){
		console.log("Old Parse and Store called");
		// {pid:PlayerId, pn:dt[PlayerId].name, alliance:dt[PlayerId].alliance, type:'dt', tlist:dt[PlayerId].towns.list, numTowns:dt[PlayerId].towns.numTowns, factions:dt[PlayerId].factions, gmBeep:dt[PlayerId].gmBeep, mapDisplay:dt[PlayerId].mapDisplay, smileys:dt[PlayerId].smileys, towns:dt.getTownData(), hubs:dt[PlayerId].hubs};
		// townData[tid]=townData[tid]={x:td[tid].x, y:td[tid].y, allembine:td[tid].allembine, diplo:td[tid].diplo, inv:td[tid].inv, mil:td[tid].mil, plots:td[tid].plots, research:td[tid].research, sov:td[tid].sov, trades:td[tid].trades});
		let k = Object.keys(d);
		console.log("keys: ",k);
	//	tmpPlayer = {};
		// forEach((tid) => townData[tid]={x:td[tid].x,
		//k.forEach((key) => {
		let p = dt[d.pid];
		for(i=0;i<k.length;i++){
			switch(k[i]){
				case 'alliance':
					p[k[i]] = d[k[i]];
				break;
				case 'factions':
					p[k[i]] = d[k[i]];
	//				locStorage.setItem(d.pid + ':factions', JSON.stringify( d[k[i]]));
					console.log("setItem: ",d.pid + ':factions', JSON.stringify( d[k[i]]));
				break;
				case 'gmBeep':
					p[k[i]] = d[k[i]];
	//				locStorage.setItem(d.pid + ':GMBeep', JSON.stringify( d[k[i]]));
					console.log("setItem: ",d.pid + ':GMBeep', JSON.stringify( d[k[i]]));
				case 'mapDisplay':
					p[k[i]] = d[k[i]];
	//				locStorage.setItem(d.pid + ':mapDisplay', JSON.stringify( d[k[i]]));
					console.log("setItem: ",d.pid + ':mapDisplay', JSON.stringify( d[k[i]]));

				case 'smileys':
					p[k[i]] = d[k[i]];
	//				locStorage.setItem(d.pid + ':smileys', JSON.stringify( d[k[i]]));
					console.log("setItem: ",d.pid + ':smileys', JSON.stringify( d[k[i]]));
				case 'hubs':
					// dt[d.pid][key] = d.key;
					p[k[i]] = d[k[i]];
				break;
				case 'towns':
	//				dt[d.pid].towns = d.towns;
					p.towns = d.towns;
	//				dt[d.pid].towns.list = d.tlist;
					p.towns.list = d.tlist;
	//				dt[d.pid].towns.numTowns = d.numTowns;
					p.towns.numTowns = d.numTowns;
					for(j=0;j<d.numTowns;j++){
	//				locStorage.setItem(d.pid + ':smileys', JSON.stringify( d[k[i]]));
	//				console.log("setItem: ",d.pid + ':smileys', JSON.stringify( d[k[i]]));
						console.log(d.towns[d.tlist[j]]);
						console.log("setItem: ",d.tlist[j] + ':diplo', JSON.stringify( d.towns[d.tlist[j]].diplo));
						console.log("setItem: ",d.tlist[j] + ':inv', JSON.stringify( d.towns[d.tlist[j]].inv));
						console.log("setItem: ",d.tlist[j] + ':mil', JSON.stringify( d.towns[d.tlist[j]].mil));
						console.log("setItem: ",d.tlist[j] + ':plots', JSON.stringify( d.towns[d.tlist[j]].plots));
						console.log("setItem: ",d.tlist[j] + ':prod', JSON.stringify( d.towns[d.tlist[j]].prod));
						console.log("setItem: ",d.tlist[j] + ':research', JSON.stringify( d.towns[d.tlist[j]].research));
						console.log("setItem: ",d.tlist[j] + ':sov', JSON.stringify( d.towns[d.tlist[j]].sov));
						console.log("setItem: ",d.tlist[j] + ':trades', JSON.stringify( d.towns[d.tlist[j]].trades));
					}
				break;
				default:
					console.log(k[i]);
			}
		}
	//	console.log("tmp player: ",tmpPlayer);
	}
	dt.checkDataType = function(d){
		if(d.type === 'dt'){
			dt.oldParse(d);
		}else{
			dt.newParse(d);
		}
	}
		
	dt.dataRestore = function(){
	//	if (typeof window.showOpenFilePicker === "function"){
	//		dt.asyncDataRestore();
	//	}else{
			dt.oldDataRestore();
	//	}

	}
}