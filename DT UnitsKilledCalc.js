dtunitskilled = function(){
	dt.unitsKilledEstimator = {
		init: function(){
			let el = document.querySelector("#family");
			let keys = Object.keys(dt.npcFamilies);
			let opt = "";
			keys.forEach(function(key){
				opt = document.createElement('option');
				opt.value = key;
				opt.innerHTML = key;
				el.appendChild(opt);
			});
			
			dt.showTool("#killedEstimator");
		},
		main:function(xpEarned,npcFam,unitsStart){
			console.log(xpEarned,npcFam,unitsStart);
			let uids = dt.npcFamilies[npcFam];
			var uObjs = this.getUnits(npcFam);
			var numIds = uids.length;
			let pc = 0;
			do {
				pc = pc + 1;
				calcXP = this.calcPercentXP(pc/100,unitsStart,uids,uObjs);
			} while (calcXP < xpEarned);
			let resultHtml = "<p>Between " + (Number(pc)-1) + "% and " + pc + "% of each unit type present is estimated to have been killed.</p>";
			let ranges = this.getRange(unitsStart,uids,pc);
			let rString = "";
			for(let i=0;i<uids.length;i++){
				rString = Items[5][uids[i]][1] + " from " + ranges[uids[i]].low.toFixed(0) + " to " + ranges[uids[i]].high.toFixed(0) + " killed";
				resultHtml = resultHtml + "<br>" + rString;
			}
	//		document.querySelector("#estResults").textContent = "Between " + (Number(pc)-1) + "% and " + pc + "% of each unit type present is estimated to have been killed.";
			document.querySelector("#estResults").innerHTML = resultHtml;
	//		console.log("Between " + (Number(pc)-1) + "% and " + pc + "% of each unit type present is estimated to have been killed.");
		},
		getRange:function(unitsStart,uids,pc){
			let range = {};
			for(let i=0;i<uids.length;i++){
				range[uids[i]] = {"low":unitsStart[uids[i]]*((pc-1)/100),"high":unitsStart[uids[i]]*(pc/100)};
			}
	//		console.log("Range: ",range);
			return range;
		},
		doCalc:function(){
			let xpEarned = document.querySelector("#xpe").value;
			let el = document.querySelector("#family");
			let fam = el.options[el.selectedIndex].value;
			let unitNums = document.querySelectorAll("#unitStarts input");
			let units = {};
			for(let i = 0; i<unitNums.length; i++){
				units[unitNums[i].dataset.uid] = unitNums[i].value;
			}
			this.main(Number(xpEarned),fam,units);
		},
		famChosen:function(e){
			let el = document.querySelector("#family");
			let fam = el.options[el.selectedIndex].value;
	//		console.log("fam: ",fam);
			this.setupUnits(fam);
		},
		setupUnits:function(fam){
			let el = document.querySelector("#unitStarts");
			let uids = dt.npcFamilies[fam];
			let thisEl = "";
	//		console.log("uids: ",uids);
			while (el.firstChild) {
				el.removeChild(el.firstChild);
			}
			uids.forEach(function(uid){
				let uName = Items[5][uid][1];
				thisEl = dt.addElement2(el,"span",[],[]);
				thisEl.innerHTML = "<label>" + uName + "<input type='text' class='char6' maxlength = 6 data-uid = '" + uid + "'  style='width: 6em;margin-left: 1em;'/>";
			});
			document.querySelector("#calcKilled").removeAttribute("disabled");
		},
		
		getUnits: function(fam){
			let uids = [];
			dt.npcFamilies[fam].forEach(function(uid){
				uids.push(Items[5][uid]);
			})
			return uids;
		},
		calcPercentXP: function(pc,units,uids,uObjs){
	//		console.log(pc,units,uids,uObjs);
			let totxp = 0;
			let uPC = 0;
			let uXP = 0;
			uids.forEach(function(uid){
				console.log(uid);
				uPC = units[uid] * pc;
				console.log("uPC: ",uPC);
		//		console.log(uid,uPC);
				uXP = uPC * Items[5][uid][7];
				console.log("uXP: ",uXP);
				console.log(units[uid]);
				totxp = totxp + (uPC * Items[5][uid][7]);
			});
	//		console.log("Percentage: ",pc*100,"totxp: ",totxp);
			return totxp;
		},
	}
}