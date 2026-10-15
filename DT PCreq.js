dtpcreq = function(){
  dt.pcReq = {
      init: function(){
  /*
          Notification.requestPermission().then(function(result) {
            if (result === 'denied') {
              console.log('Permission wasn\'t granted. Allow a retry.');
              return;
            }
            if (result === 'default') {
              console.log('The permission request was dismissed.');
              return;
            }
            // Do something with the granted permission.
          });
  */
        var key = PlayerId + ':pcr';
          dt.whispers = JSON.parse(locStorage.getItem(key));
          if(dt.whispers === null){
              dt.whispers = [];
          }
          dt.pcReq.updateFlag();

      var wObserver = new MutationObserver(function(mutations) {
        // For the sake of...observation...let's output the mutation to console to see how this all works
        mutations.forEach(function(mutation) {
          if(mutation.addedNodes.length > 0){
            var n = mutation.addedNodes[0];
            console.log(mutation);
            console.log(n);
            var r = n.querySelector("span").textContent;
            console.log("PC request from " + r);
            var ts = Date.now();
            dt.whispers.push([ts,r]);
            console.log(dt.whispers);
            dt.pcReq.createNotification(r);
            dt.pcReq.updateFlag();
          }
        });
        var key = PlayerId + ':pcr';
          locStorage.setItem(key, JSON.stringify(dt.whispers));

      });
  
      // Notify me of everything!
      var observerConfig = {
        childList: true
      };
  
      var targetNode = document.querySelector("#chat.smallBorder");
      wObserver.observe(targetNode, observerConfig);

      },
      updateFlag: function () {
          var unseen = 0;
          if(document.getElementById("pcrflag") === null) return;
          document.getElementById("pcrflag").textContent = dt.whispers.length;
          document.getElementById("pcrflag").setAttribute("title", dt.whispers.length + " PC requests");
      },

      showPCrequests: function(){
          var pcAlertPopUp = document.getElementById("pcAlertsHtml");
          var tBody = pcAlertPopUp.getElementsByTagName("tbody")[0];
          while (tBody.rows.length > 0) {
              tBody.deleteRow(0);
          }
          var numAlerts = dt.whispers.length;
          for (i = 0; i < numAlerts; i++) {
              var item = dt.whispers[i];
              console.log(i,item);
              var row = tBody.insertRow(-1);
              row.classList.add(item.area);
              var cell = row.insertCell(0);
              // <input type="checkbox" id="cbox2" value="second_checkbox" checked="checked">
              var cBox = dt.addElement2(cell, "input", ["type", "value"], ["checkbox", i]);
              cBox.setAttribute("onchange", 'dt.pcReq.alertDelHandler(' + i + ')');
              cell = row.insertCell(1);
              var d = new Date(item[0]);
              console.log(d);
              var dString = d.toUTCString();
  //            var dString = Date(d).replace(" GMT+0000 (Greenwich Mean Time)","");
              cell.textContent = dString;
              dString = null;
              cell = row.insertCell(2);
              cell.textContent = item[1];
              
          }
          dt.showTool("#pcAlertsHtml", "PC Requests");
      },
      alertDelHandler: function (index) {
          var arr = dt.whispers;
  //        var index = event.target.value;
          if (index > -1) {
              arr.splice(index, 1);
          }
          this.showPCrequests();
          var key = PlayerId + ':pcr';
          locStorage.setItem(key, JSON.stringify(dt.whispers));
          dt.pcReq.updateFlag();
      },

  // function for creating the notification
    createNotification: function (title) {

      // Let's check if the browser supports notifications
      if (!"Notification" in window) {
        console.log("This browser does not support notifications.");
      }

      // Let's check if the user is okay to get some notification
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification

        var img = 'https://www.illyriad.co.uk/favicon.ico';
        var text = 'PC request from "' + title + '" recieved.';
        var notification = new Notification('Illyriad', { body: text, icon: img });
        try{
          window.navigator.vibrate(500);
        }
        catch{}
      }

      // Otherwise, we need to ask the user for permission
      // Note, Chrome does not implement the permission static property
      // So we have to check for NOT 'denied' instead of 'default'
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {

          // Whatever the user answers, we make sure Chrome stores the information
          if(!('permission' in Notification)) {
            Notification.permission = permission;
          }

          // If the user is okay, let's create a notification
          if (permission === "granted") {
            var img = 'https://www.illyriad.co.uk/favicon.ico';
            var text = 'PC request from "' + title + '" recieved.';
            var notification = new Notification('Illyriad', { body: text, icon: img });

            window.navigator.vibrate(500);
          }
        });
      }
    }    
  };
}