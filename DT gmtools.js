dtgm = function(){
	var gm = {};
	gm.gc = document.querySelector(".globalChat");

	gm.gcObserver = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (mutation.addedNodes && mutation.addedNodes.length > 0) {
		// This DOM change was new nodes being added. Run our substitution
		// algorithm on each newly added node.
		for (let i = 0; i < mutation.addedNodes.length; i++) {
			const newNode = mutation.addedNodes[i];
			if(newNode.nodeName === 'DIV'){
				gm.checkDiv2(newNode);
			}
		}
		}
	});
	});
	gm.gcObserver.observe(gm.gc, {
	childList: true,
	subtree: true
	});

	gm.checkDiv2 = function (node){
		let cn = node.childNodes;
		if(cn.length !== 11){
			if(cn[2].textContent !=='System'){
				let d = cn[3].getAttribute('data').split("p=")[1].split("|");
				console.log(d);
		//		if(d[3] === "803"){
				if(d[3] === "18"){
					if(GMbeep === true){	
						dt.beep();
					}
				}
				// If the trivia filter is active...
				if(dt[PlayerId].trivia === true){
					// If the post is by House Fenring...
					if(d[1] === "403129"){
//					if(d[1] === "428929"){
				
						node.classList.add("trivia");
					}
//					if(d[1] === "418074"){
				
//						node.classList.add("trivia");
//					}
				}
				// if(dt[PlayerId].chatcolours.enabled === true){
				// 	//node.color = dt[PlayerId].chatcolours.post;
				// 	node.classList.add("dt_chatcolours_post");
				// 	//node.querySelector(".name").color = dt[PlayerId].chatcolours.poster;
				// 	node.querySelector(".name").classList.add("dt_chatcolours_poster");
				// }
			}
		}
	}
}