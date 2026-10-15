dttracker = function(){
$(document).ajaxSuccess(function (event, xhr, settings) {
		var furl = settings.url;
		var url = settings.url.split("?")[0];
		var bits = url.split("/");
		var paramArray = settings.url.split("?");
		if (paramArray.length > 1) {
			var paramstring = settings.url.split("?")[1];
			var params = paramstring.split("&");
		}
		switch (bits[1]) {
			case "World":
				switch (bits[2]) {
				case "MapData":
				case "MapRefresh":
				case "MapCanvas":
					if(unitTracker.enabled){
						unitTracker.update();
					}
				break;
			}
			break;
		}
	});
	unitTracker = {
		toggle: function(){
			if(unitTracker.enabled === true){
				unitTracker.clear();
				unitTracker.enabled = false;
			}else{
				unitTracker.enabled = true;
	//			unitTracker.init();
				dt.showTool("#trackerInp2");
			}
		},
		update: function(){
			// Get the coords of the unit to track
			var inps = document.querySelectorAll("#trackerInp input[type='text']");
			var x2 = inps[0].value;
			var y2 = inps[1].value;
			// Get the coords of the town to track from
			var x1 =  dt[PlayerId].towns[CurrentTown].x;
			var y1 =  dt[PlayerId].towns[CurrentTown].y;
			tcs = [x1,y1,x2,y2]
			// Clear the tracker canvas
			this.clear();
			// Draw the tracker
			this.tracker(x1,y1,x2,y2);
			
		},
		setup: function(){
			// Get the coords of the unit to track
			var inps = event.target.parentElement.querySelectorAll("input[type='text']");
			var x2 = inps[2].value;
			var y2 = inps[3].value;
			// Get the coords of the town to track from
			var x1 =  inps[0].value;
			var y1 =  inps[1].value;
			tcs = [x1,y1,x2,y2]
			// Clear the tracker canvas
			this.clear();
			// Draw the tracker
			this.tracker(x1,y1,x2,y2);
		},
		clear:function(){
			let canvas = document.getElementById("tracker");
			if(canvas){
				let ctx = canvas.getContext('2d');
				ctx.clearRect(0, 0, 500, 500);
			}
		},
		tracker: function(x1,y1,x2,y2){
			console.log("unitTracker.tracker: ",x1,y1,x2,y2);
			var canvas = document.getElementById("tracker");
			if(!canvas){
				this.addTracker();
				canvas = document.getElementById("tracker");
			}
			var ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, 500, 500);
			var dx = x2-x1;
			var dy = y1-y2;
			var ang = this.calcAngleDegrees(dx, dy);
			var sFactor = 500 / ((mapData.zoom * 2) + 1);
			var cString = y1 + "|" + x1;
			this.addArc(cString,1000,ang);
		},
		// Create the canvas element for the tracker
		addTracker: function(){
			console.log("unitTracker.addTracker called...");
			var p = document.querySelector("#mapDiv");
			canvas = document.createElement("canvas");
			canvas.setAttribute("id","tracker");
			canvas.setAttribute("width","500");
			canvas.setAttribute("height","500");
			canvas.setAttribute("style","position:absolute;top:11px;left:15px;");
			canvas.setAttribute("unselectable","on");
			canvas.setAttribute("class","see");
			p.appendChild(canvas);
		},
		calcAngleDegrees: function(x, y) {
			console.log("unitTracker.calcAngleDegrees called...");
		return (Math.atan2(y, x) * 180 / Math.PI);
		},
		addArc: function(cList, rad, ang) {
			console.log("unitTracker.addArc: ",cList,rad, ang);
			var sFactor = 500 / ((mapData.zoom * 2) + 1);
			var cx = mapData.x;
			var cy = mapData.y;
			thisLoc = cList.split("|");
			x = thisLoc[1];
			y = thisLoc[0];
			xCol = mapData.zoom + (x - cx);
			yCol = mapData.zoom - (y - cy);
			var t = document.querySelector("#tracker");
			var ctx = t.getContext('2d');
			this.drawArc(ctx, xCol, yCol,rad, this.toRads(ang-2), this.toRads(ang+2), sFactor, "green");
			this.drawArc(ctx, xCol, yCol,rad, this.toRads(ang), this.toRads(ang), sFactor, "red")
		},
		toRads: function(deg){
			return deg * (Math.PI/180);
		},
		drawArc: function(ctx, x, y, rad, sAngle, eAngle, sFactor, col) {
			console.log("drawArc: ","x: ",x,"y: ",y,"rad: ",rad,"sAngle: ",sAngle,"eAngle: ",eAngle,"sFactor: ",sFactor,"col: ",col);
			ctx.strokeStyle = col;
			ctx.fillStyle = col;//'rgba(255, 51, 0, 1)';
			ctx.lineWidth = sFactor * 0.1;
			ctx.globalAlpha = 0.25;
			ctx.save();
			ctx.beginPath();
			ctx.translate((x + 0.5) * sFactor + 1, (y + 0.5) * sFactor + 1);
			console.log("drawArc - rad: ",rad," sFactor: ",sFactor,"sAngle: ,",sAngle,"eAngle: ",eAngle);
			ctx.moveTo(0,0);
			ctx.arc(0, 0, rad * sFactor, sAngle, eAngle);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
			ctx.restore();
		}
		
	}
}