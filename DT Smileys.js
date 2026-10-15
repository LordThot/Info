dtsmileys = function(){
  var sm = {};
  sm.ac = document.querySelector(".allianceChat");
  sm.gc = document.querySelector(".globalChat");

  sm.gcObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // This DOM change was new nodes being added. Run our substitution
        // algorithm on each newly added node.
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const newNode = mutation.addedNodes[i];
          if(newNode.nodeName === 'DIV'){
              sm.checkDiv2(newNode);
          }
        }
      }
    });
  });
  sm.gcObserver.observe(sm.gc, {
    childList: true,
    subtree: true
  });
  sm.acObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // This DOM change was new nodes being added. Run our substitution
        // algorithm on each newly added node.
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const newNode = mutation.addedNodes[i];
          if(newNode.nodeName === 'DIV'){
              sm.checkDiv2(newNode);
          }
        }
      }
    });
  });
  sm.acObserver.observe(sm.ac, {
    childList: true,
    subtree: true
  });
  sm.init = function(){
      let d = this.ac.querySelectorAll("div");
      for(let i=0;i<d.length;i++){
          sm.checkDiv2(d[i]);
      }
      d = this.gc.querySelectorAll("div");
      for(let i=0;i<d.length;i++){
          sm.checkDiv2(d[i]);
      }
      
  }
  sm.checkDiv2 = function (node){
      if(dt[PlayerId].smileys === true){
          let iHtml = node.innerHTML;
          for (let [key, value] of sm.emap) {
              iHtml = sm.processMap(key,value,iHtml);
          }
          node.innerHTML = iHtml;
      }
  }
  sm.processMap = function(key, value, iHtml) {
      if(iHtml.includes(key)){
          let a = iHtml.split(key);
          let nHtml = "<img src='" + value[0] + "' title='" + value[1] + ", " + key + "' alt='' class='smiley'>";
  //        console.log(nHtml);
          b = a.join(nHtml);
  //        console.log(b);
          return b;
      }
      return iHtml;
  }
  function checkDiv (node){
      var newHTML = [];
      var cname = false;
      var children = node.childNodes;
      // step through the children
      for (let child of children) {
          if(child.className === 'name'){ cname = true}
              if(child.nodeName === "#text"){
                  if (cname === false){
                      newHTML.push(child.textContent);
                  }else{
                      checkElem(child);
                  }
              }else{
                  newHTML.push(child.innerHTML);
              }
              console.log(child);

      }
      console.log(newHTML);
      console.log("==============================================================");
  }

  sm.emap = new Map();
  sm.emap.set(':angel:',['https://illystuff.uk/images/smileys/emotion_angel.png','Angel']);
  sm.emap.set(':ax:',['https://illystuff.uk/images/smileys/ax.png','Axe']);
  sm.emap.set(':cig:',['https://illystuff.uk/images/smileys/cigarette.png','Cigarette']);
  sm.emap.set(':tea:',['https://illystuff.uk/images/smileys/tea_cup.png','Tea']);
  sm.emap.set(':popcorn:',['https://illystuff.uk/images/smileys/popcorn.png','Popcorn']);
  sm.emap.set(':pizza:',['https://illystuff.uk/images/smileys/pizza.png','Pizza']);
  sm.emap.set(':heart:',['https://illystuff.uk/images/smileys/heart.png','Heart']);
  sm.emap.set(':wine:',['https://illystuff.uk/images/smileys/glass_of_wine_full.png','Wine']);
  sm.emap.set(':etomato:',['https://illystuff.uk/images/smileys/emotion_tomato.png','Tomato']);
  sm.emap.set(':skull:',['https://illystuff.uk/images/smileys/emotion_skull.png','Skull']);
  sm.emap.set(':sick:',['https://illystuff.uk/images/smileys/emotion_sick.png','Sick']);
  sm.emap.set(':silenced:',['https://illystuff.uk/images/smileys/emotion_silent.png','Silenced']);
  sm.emap.set(':nomnom:',['https://illystuff.uk/images/smileys/emotion_nom_nom.png','nom nom']);
  sm.emap.set(':love:',['https://illystuff.uk/images/smileys/emotion_love.png','Love']);
  sm.emap.set(':lol:',['https://illystuff.uk/images/smileys/emotion_lol.png','LOL']);
  sm.emap.set(':giveflower:',['https://illystuff.uk/images/smileys/emotion_hand_flower.png','Give flower']);
  sm.emap.set(':baby:',['https://illystuff.uk/images/smileys/emotion_baby.png','Baby']);
  sm.emap.set(':donut:',['https://illystuff.uk/images/smileys/donut.png','Donut']);
  sm.emap.set(':coffee:',['https://illystuff.uk/images/smileys/coffee.png','Coffee']);
  sm.emap.set(':chefhat:',['https://illystuff.uk/images/smileys/chefs_hat.png','Chef']);

  sm.emap.set(':sad:',['https://illystuff.uk/images/smileys/emotion_sad.png','Sad']);
  sm.emap.set(':what:',['https://illystuff.uk/images/smileys/emotion_what.png','What?']);
  sm.emap.set(':shame:',['https://illystuff.uk/images/smileys/emotion_shame.png','Shame']);
  sm.emap.set(':whew:',['https://illystuff.uk/images/smileys/emotion_whew.png','Whew']);
  sm.emap.set(':confused:',['https://illystuff.uk/images/smileys/emotion_confuse.png','Confused']);

  sm.init();
}