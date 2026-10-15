dtchat=function(){
dt.chat = {
    initialize: function(){
        console.log("dt.chat.initialize called...");
        // dt[PlayerId].chatcolours = {poster:"",post:""};
        dt[PlayerId].chatdemocolours = {enabled:false,poster:"",post:""};
        if(dt[PlayerId].chatcolours.enabled){
            dt[PlayerId].chatdemocolours.poster = dt[PlayerId].chatcolours.poster;
            dt[PlayerId].chatdemocolours.post = dt[PlayerId].chatcolours.post;
            dt[PlayerId].chatdemocolours.enabled = true;
        }
        var demo = document.querySelector(".bordered");
        let d=window.getComputedStyle(demo);
        let pname = demo.querySelector(".name");
        let p=window.getComputedStyle(pname);
        let c=p.getPropertyValue("color");
    
        let t = d.getPropertyValue("color");
        let poster = document.querySelector("#poster");
        poster.addEventListener("change", dt.chat.modifyDemo, false);
        let post = document.querySelector("#post");
        post.addEventListener("change", dt.chat.modifyDemo, false);
        dt.showTool("#chatcolours");
        if(dt[PlayerId].chatcolours.enabled){
            document.getElementById("dtchattoggle").value = "Disable";
            document.getElementById("dtchatapply").removeAttribute("disabled");

        }else{
            document.getElementById("dtchattoggle").value = "Enable";
            document.getElementById("dtchatapply").setAttribute('disabled', 'disabled');
        }
    },
    toggle:function(){
        if(dt[PlayerId].chatcolours.enabled){
            document.getElementById("dtchattoggle").value = "Ensable";
            dt[PlayerId].chatcolours.enabled = false;
            document.getElementById("dtchatapply").setAttribute('disabled', 'disabled');
        }else{
            document.getElementById("dtchattoggle").value = "Disable";
            dt[PlayerId].chatcolours.enabled = true;
            document.getElementById("dtchatapply").removeAttribute("disabled");
        }
    },
    modifyDemo: function(e){
        console.log("modify demo called...",e);
        let demo = document.querySelector(".bordered");
        if(e.target.id == "poster"){
            dt[PlayerId].chatdemocolours.poster = e.target.value;
            demo.querySelectorAll(".name").forEach((name) => {
                name.style.color = e.target.value;
            });
        }
        if(e.target.id == "post"){
            dt[PlayerId].chatdemocolours.post = e.target.value;
            demo.querySelectorAll("div").forEach((div) => {
                div.style.color = e.target.value;
            });
        }
        console.log("Demo colours: ",dt[PlayerId].chatdemocolours);
    },
    apply: function(){
        // Firstly store the settings in local storage.
        console.log ("dt.chat.apply called...");
        dt[PlayerId].chatcolours.poster = dt[PlayerId].chatdemocolours.poster;
        dt[PlayerId].chatcolours.post = dt[PlayerId].chatdemocolours.post;
        var key = PlayerId + ':cc';
        locStorage.setItem(key, JSON.stringify(dt[PlayerId].chatcolours));
        root.style.setProperty('--poster', dt[PlayerId].chatcolours.poster);
        root.style.setProperty('--post', dt[PlayerId].chatcolours.post);

        // Apply the colours to GC.
        let thisChat = document.querySelector(".globalChat");
        thisChat.querySelectorAll("div").forEach((div) => {
            //div.style.color = dt[PlayerId].chatcolours.post;
            div.classList.add("dt_chatcolours_post");
        });
        thisChat.querySelectorAll(".name").forEach((name) => {
            //name.style.color = dt[PlayerId].chatcolours.poster;
            div.classList.add("dt_chatcolours_poster");
        });
        // Apply to AC if present
        thisChat = document.querySelector(".allianceChat");
        thisChat.querySelectorAll("div").forEach((div) => {
            div.style.color = dt[PlayerId].chatcolours.post;
        });
        thisChat.querySelectorAll(".name").forEach((name) => {
            name.style.color = dt[PlayerId].chatcolours.poster;
        });


    }
};
};
//dt.chat.initialize();

console.log("rainbowchat.js loaded...");