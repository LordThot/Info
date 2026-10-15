/* File: crafting.js
 * Methods for the crafting tools
 * 
 */
dtcrafting = function(){
	dt.crafting = {
		/* Method: craftingRecipes
		* Displays details of the items that can be crafted using items from this town.
		* 
		*/
		craftingRecipes: function () {
			dt.showTool("#craftHereHtml");
			var canMake = [];
			// Make the table of items we can craft and display it
	//	var craftTable = '<h3>Granny Willd\'s Crafting Recipes</h3><p>After looking at your inventory and checking her recipe book, Granny Willd reckons you have all the ingedients needed to make these items. Whether you have the needed skills and buildings is a different matter...</p><table id="craftTable" border="1" style="width: 100%"><tr><colgroup><col style="width: 48px"><col></colgroup></tr></table>';
	//	document.querySelector("#dt_output").innerHTML = craftTable;
			var craftTable = document.querySelector("#craftTable");
	//	document.querySelector("#dt_output").setAttribute('class', 'see');

			// Work through all the recipes
			for (var item in dt.cRecipes) {
				var thisRecipe = dt.cRecipes[item].recipe;
				var iRow = '';
				var hRow = '';
				var aRow = '';
				var matchFlags = 0;
				var thisMake = [];

				// Check each item on the recipe
				recipeItemsLoop:		for (var i = 0; i < thisRecipe.length; i++) {
					// Check if this town has enough of this item
					var subItem = thisRecipe[i];
					var sId = subItem[1];
					var sQty = parseInt(subItem[0]);
					// Build a td for this sub-item in case we want it
					if (sId.charAt(0) === 'i') {
						var iRow = iRow + '<td width="20%"><span class="' + dt.iClasses[sId][0] + '" data="' + sId + '" title="' + dt.iClasses[sId][1] + '"></span></td>';
					} else {
						tid = sId.replace('c=', '');
						var iRow = iRow + '<td width="20%"><span class="name ' + cp[tid].is + '" data="' + sId + '" title="' + cp[tid].n + '"></span></td>';
					}
					// Check the inventory of this town for this sub-item
					if (sId !== 'c=266') {
						var inv = dt[PlayerId].towns[CurrentTown].inv;
						var invAreas = Object.keys(inv);
						// Loop through each area of the inventory
						for (var area = 0; area < invAreas.length; area++) {
							if (invAreas[area] !== 'maxStore') {
								var thisSub = inv[invAreas[area]];
								var subKeys = Object.keys(thisSub);
								// Loop through each entry in this sub-inventory
								for (var subI = 0; subI < subKeys.length; subI++) {
									// Check if this item has the required id
									if (thisSub[subKeys[subI]].id === sId) {
										// Found the right item, so add the held qty to the hrow cell for this sub-item
										// Calc how many the qty held will make
										thisMake.push(parseInt(thisSub[subKeys[subI]].held / sQty, 10));
										// Found the right item, now check if the reqd qty is present
										if (parseInt(thisSub[subKeys[subI]].held) >= sQty) {
											// Found the right sub-item and there are enough of it to make at least one main item
											matchFlags = matchFlags + 1;
											continue recipeItemsLoop;
										}

									}
								}
							}
						}
					} else {
						thisMake.push(parseInt(dt[PlayerId].pres / sQty, 10));
						// Found the right item, now check if the reqd qty is present
						if (parseInt(dt[PlayerId].pres) >= sQty) {
							// Found the right sub-item and there are enough of it to make at least one main item
							matchFlags = matchFlags + 1;
							continue recipeItemsLoop;
						}

					}
				}
				var hereMake = dt.arrayMin(thisMake);
				var makeRow = '<span width="50%">From Here: ' + hereMake + '</span>';

				if (matchFlags == thisRecipe.length) {
					// We can make this item so add it to the table
	//			canMake.push(item);
					var row = craftTable.insertRow(-1);
					var picCell = row.insertCell(0);
					dt.addElement2(picCell, 'span', ['class', 'data', 'title'], [dt.cItems[item].classes + ' name', 'c=' + item, dt.cItems[item].name]);
					var recipeCell = row.insertCell(1);
					var tblCode = '<table class="ingredients" style="width: 100%"></table>';
					recipeCell.innerHTML = tblCode;
					var ingTbl = recipeCell.querySelector(".ingredients");
					// Add the icon row
					var row = ingTbl.insertRow(-1);
					row.innerHTML = iRow;
					// Add the here qty row
					var recipeT = recipeCell.innerHTML;
					recipeCell.innerHTML = recipeT + makeRow;
				}
			}
					dt.adjustTool("#craftHereHtml");
		},
		findEquip: function() {
			dt.showTool("#findEquipHtml");
		},
	getCheckboxValues: function() {
		var posvalues = [];
		var negvalues = [];
		var posmatches = [];
		var negmatches = [];
		var fullmatches = [];
		var posfilters = document.querySelectorAll("#posequipFilter input[name='filters[]']");
		var negfilters = document.querySelectorAll("#negequipFilter input[name='filters[]']");
		for (var i = 0, iLen = posfilters.length; i < iLen; i++) {
			if (posfilters[i].checked) {
				posvalues.push(posfilters[i].value);
			}
			if (negfilters[i].checked) {
				negvalues.push(negfilters[i].value);
			}
		}
		// Having collected the filter values we need to match them to equipment so step through the dt.cItems object.
		var cIkeys = Object.keys(dt.cItems);
		var numcIkeys = cIkeys.length;
		for (var i = 0; i < numcIkeys; i++) {
			if (dt.cItems[cIkeys[i]].hasOwnProperty('e')) {
				var eValues = dt.cItems[cIkeys[i]].e.split('|');
				// Try matching each of the posFilters and accept the item as soon as a match is found
				posCheck:		for (var j = 0; j < posvalues.length; j++) {
					if (eValues[posvalues[j]] > 0) {
						posmatches.push(cIkeys[i]);
						break posCheck;
					}
				}
			}
		}
		var cIkeys = Object.keys(dt.cItems);
		var numcIkeys = cIkeys.length;
		for (var i = 0; i < numcIkeys; i++) {
			if (dt.cItems[cIkeys[i]].hasOwnProperty('e')) {
				var eValues = dt.cItems[cIkeys[i]].e.split('|');
				// Try matching each of the posFilters and accept the item as soon as a match is found
				negCheck:		for (var j = 0; j < negvalues.length; j++) {
					if (eValues[negvalues[j]] < 0) {
						negmatches.push(cIkeys[i]);
						break negCheck;
					}
				}
			}
		}
	// Build an array that holds only values from posmatches that don't appear in negmatches
		for (i = 0; i < posmatches.length; i++) {
			if (negmatches.indexOf(posmatches[i]) < 0) {
				fullmatches.push(posmatches[i]);
			}
		}
		// Hide the input form
	//	dt_input.setAttribute('class', 'nosee');
		// Build a table to hold the results of the search
	//	dt_output.innerHTML = '<table id="matchTable" border="1" style="width: 100%"><tr><colgroup><col style="width: 48px"><col></colgroup></tr><tr><th>Item</th><th>Effects</th></tr></table>';
	//	var matchTbl = document.querySelector('#matchTable');
		dt.removeRows(document.querySelector('#matchTable'));
		var matchTbl = document.querySelector('#matchTable tbody');
	//	dt_output.setAttribute('class', 'see');
		for (var i = 0; i < fullmatches.length; i++) {
			var item = fullmatches[i];
			var row = matchTbl.insertRow(-1);
			var picCell = row.insertCell(0);
			dt.addElement2(picCell, 'span', ['class', 'data', 'title'], [dt.cItems[item].classes + ' name', 'c=' + item, dt.cItems[item].name]);
			var effectsCell = row.insertCell(1);
			var numEffects = dt.cEffects[item].effects.length;
			var eString = '';
			var eOut = [];
			for (var j = 0; j < numEffects; j++) {
				if(dt.cEffects[item].effects[j][0]<0){
					var c = 'red';
				}else{
					var c = 'greenT';
				}
				var eString = '<span class="'+c+'">'+dt.cEffects[item].effects[j][0] + ' ' + dt.cEffects[item].effects[j][1]+'</span>';
				eOut.push(eString);
			}
			effectsCell.innerHTML = eOut.join(', ');
		}
	},

	};
}