dtresearch = function(){
    dt.research = {
        checkResearch: function () {
            // Get the research area and the relevant part of the research data for this town
            var bits = window.location.hash.split("/");
            if (bits[1] == "Research" && bits[2] == "Tree") {
                var area = bits[3];
                if( area === undefined){
                    area = "2";
                }
                var thisR = dt[PlayerId].towns[CurrentTown].research[area];
                var timeDiv = dt.research.addTimeDiv();
                var outstanding = [];
                var remainingtime = [];
                var resTreeItems = document.querySelectorAll("#researchList li:not(.complete) img.restree-img");
    //            var resTreeItems = document.querySelectorAll("#researchList li:not(.complete) img, #researchListli:not(.in-progress)");
                if(resTreeItems.length > 0){

                    for (var i = 0; i < resTreeItems.length; i++) {
                        var thisItem = resTreeItems[i];
                        var d = thisItem.dataset;
        //                console.log(d.name);
                        outstanding.push(d.name);
                        if(!thisItem.parentElement.classList.contains("in-progress")){
                            spanCount = thisItem.parentElement.querySelectorAll("span").length;
                            if(spanCount==4){
                                remainingtime.push(thisItem.parentElement.querySelectorAll("span")[3].textContent.trim());
                            }
                            if(spanCount==3){
                                remainingtime.push(thisItem.parentElement.querySelector("span:nth-child(2)").textContent.trim());
                            }
                            if(spanCount == 2){
                                remainingtime.push(thisItem.parentElement.querySelector("span:nth-child(2)").textContent.trim());
                            }
                            if((spanCount<2) && (spanCount>3)){
                                console.log("Error with finding the time for: ",thisItem)  
                            }
                            
                        }
        //            console.log(thisItem.classList);
                    }
                    console.log("Time to complete: "+remainingtime);
    //                if(PlayerId==418074){
                        totalSecs = stringsToSecs(remainingtime);
    //                }
                    
                }else{
                    outstanding.push("All Complete");
                    totalSecs = 0;
                }
                dt[PlayerId].towns[CurrentTown].research[area] = outstanding;
                var key = CurrentTown + ':research';
                locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[CurrentTown].research));
    //            if(PlayerId==418074){
    //                document.querySelector("#researchTreeSectHtml").textContent = "Time to complete this part of the research tree:\n"+SecToText(totalSecs);
                    timeDiv.textContent = "Time to complete this part of the research tree:\n"+SecToText(totalSecs);
    //                dt.showTool("#researchTreeSectHtml");
    //            }
    //            alert("Time to complete this part of the research tree:\n"+SecToText(totalSecs));
            }
        },
        addTimeDiv: function(){
            let refElem = document.querySelector("div.subLinks");
            const timeDiv = document.createElement('div');
            if (refElem) {
                tmp = refElem.insertAdjacentElement('afterend', timeDiv);
                console.log(tmp);
                var rubbish = "";
                return tmp;
            }
        }

    };
}