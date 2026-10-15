dthod = function(){
	dt.hod = {
		hoddata:{prevloc:"",corrupted:{},melders:{}},

		checkurl:function(){
			hoddata=this.hoddata;
			if(document.location.hash !="#/World/Map/-990/-824/10"){
				this.hoddata.prevloc = document.location.href;
				document.location.replace("https://elgea.illyriad.co.uk/#/World/Map/-990/-824/10");
			}
			setTimeout(function () {
			dt.hod.grabData(hoddata);
			}, 2.0 * 1000);
		},

		grabData: function(){
	//		hoddata=this.hoddata;
			console.log("grabdata called");
			const images = ["map/factions/hoc-166-1","map/factions/hoc-166-2","map/factions/hoc-166-3"];
			let raw = mapData.m;
			this.hoddata.corrupted = {};
			this.hoddata.melders = {};
			for (const tile in raw) {
				// console.log("tile: ",raw[tile]);

			/* 				if(raw[tile].n !== "Ancient Temple"){
					this.hoddata.corrupted[tile] = raw[tile];
				}
			*/
				if(images.includes(raw[tile].img)){
					this.hoddata.corrupted[tile] = raw[tile];
				}
			}
			for (const tile in mapData.mu){
				if(mapData.mu[tile].d === "Melders"){
					this.hoddata.melders[tile] = mapData.mu[tile];
				}
			}
			console.log(this.hoddata.corrupted,this.hoddata.melders);
			if(this.hoddata.prevloc !==""){
				document.location.assign(this.hoddata.prevloc);
			}
			//dt.showTool("#hodRep");
			console.log("HOD Data:<br>",dt.hod.hoddata.corrupted,dt.hod.hoddata.melders);
			alertString = "# Corrupted tiles: "+Object.keys(dt.hod.hoddata.corrupted).length + "\n# Melder Units: "+Object.keys(dt.hod.hoddata.melders).length;
			window.alert(alertString);
		}

	};
}