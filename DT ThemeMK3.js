dttheme = function () {
  dt.themeDefaults = {
    text: { value: "#000000", opacity: "1" },
    time: { value: "#606060", opacity: "1" },

    name: { value: "#704406", opacity: "1" },
    nameYou: { value: "#000000", opacity: "1" },
    nameGM: { value: "#0000ff", opacity: "1" },
    nameMod: { value: "#008000", opacity: "1" },
    nameSystem: { value: "#ff0000", opacity: "1" },
    nameFriend: { value: "#513f67", opacity: "1" },

    trivia: { value: "#ffff00", opacity: "0.5" },
    bkg: { value: "#ece9ce", opacity: "0.5" },
    mentions: { value: "#831518", opacity: "0.5" },

    diploAlliance: { value: "#0000ff", opacity: "1" },
    diploWar: { value: "#ff0000", opacity: "1" },
    diploConfed: { value: "#00ff00", opacity: "1" },
    diploNap: { value: "#ffff00", opacity: "1" },
  };
  dt.themeCurrents = {
    text: { value: "#000000", opacity: "1" },
    time: { value: "#606060", opacity: "1" },

    name: { value: "#704406", opacity: "1" },
    nameYou: { value: "#000000", opacity: "1" },
    nameGM: { value: "#0000ff", opacity: "1" },
    nameMod: { value: "#008000", opacity: "1" },
    nameSystem: { value: "#ff0000", opacity: "1" },
    nameFriend: { value: "#513f67", opacity: "1" },

    trivia: { value: "#ffff00", opacity: "0.3" },
    bkg: { value: "#ece9ce", opacity: "0.3" },
    mentions: { value: "#831518", opacity: "0.3" },

    diploAlliance: { value: "#0000ff", opacity: "1" },
    diploWar: { value: "#ff0000", opacity: "1" },
    diploConfed: { value: "#00ff00", opacity: "1" },
    diploNap: { value: "#ffff00", opacity: "1" },
  };
  dt.themeTest = {
    text: { value: "#000000", opacity: "1" },
    time: { value: "#606060", opacity: "1" },

    name: { value: "#704406", opacity: "1" },
    nameYou: { value: "#000000", opacity: "1" },
    nameGM: { value: "#0000ff", opacity: "1" },
    nameMod: { value: "#008000", opacity: "1" },
    nameSystem: { value: "#ff0000", opacity: "1" },
    nameFriend: { value: "#513f67", opacity: "1" },

    trivia: { value: "#ffff00", opacity: "0.3" },
    bkg: { value: "#ece9ce", opacity: "0.3" },
    mentions: { value: "#831518", opacity: "0.3" },

    diploAlliance: { value: "#0000ff", opacity: "1" },
    diploWar: { value: "#ff0000", opacity: "1" },
    diploConfed: { value: "#00ff00", opacity: "1" },
    diploNap: { value: "#ffff00", opacity: "1" },
  };
  dt.themeEnabled = JSON.parse(localStorage.getItem(PlayerId + ":themeStatus"));
  if (dt.themeEnabled === null) {
    dt.themeEnabled = false;
    localStorage.setItem(PlayerId + ":themeStatus", false);
  }
  // const pid = "418074";
  dt.theme = {
    show: function () {
      $("#chatTheme").tabs();
      $("#colorSettings").tabs();
      document.getElementById("togBtn").checked = dt.themeEnabled;
      dt.showTool("#chatTheme");
    },
    loadTheme: function (PlayerId) {
      //console.log("this: ",this);
      let theme = JSON.parse(localStorage.getItem(PlayerId + ":theme"));
      if (theme === null) {
        theme = dt.themeDefaults;
      }
      // if dt.themeEnabled then apply the theme to dt.themeCurrents & dt.themeDefaults and to the CSS variables otherwise apply the defaults
      const r = document.documentElement;
      if (dt.themeEnabled === true) {
        for (const [key, props] of Object.entries(theme)) {
          // Set the themeCurr object
          dt.themeCurrents[key] = theme[key];
          dt.themeTest[key] = theme[key];
          // Apply the settings to the CSS variables
          r.style.setProperty(
            "--" + key + "_curr",
            dt.theme.to9Char(theme[key].value, theme[key].opacity)
          );
          r.style.setProperty(
            "--" + key + "_test",
            dt.theme.to9Char(theme[key].value, theme[key].opacity)
          );
        }
      } else {
        const styleSheets = document.styleSheets;
        for (let i = 0; i < styleSheets.length; i++) {
          if (styleSheets[i].title === "chatTheme") {
            document.styleSheets[i].disabled = true;
          }
          // styleSheet.push(styleSheets[i]);
        }
        console.log(document.styleSheets);
      }

      dt.theme.initializeProperties2(theme);
      dt.theme.initializeListeners();
      // lines below here need to be movd to the function called by the main menu when the tool is opened.
      // end of lines to move
    },
    initializeProperties2: function (theme) {
      for (const [key, props] of Object.entries(theme)) {
        // Apply to the inputs
        let t = document.querySelector("fieldset." + key + "_test");
        if (t) {
          // console.log(key,t,props);
          let inps = t.querySelectorAll("INPUT");
          inps[0].value = props.value;
          inps[1].value = props.opacity;
          inps[0].style.opacity = props.opacity;
        }
        // Apply to the CSS properties in root
      }
    },
    initializeListeners: function () {
      const colorInputs = document.querySelectorAll(
        "#colors .role input[type=color"
      );
      const opacityInputs = document.querySelectorAll(
        "#colors .role input[type=range"
      );
      const btns = document.querySelectorAll("#colors > div > button");
      const toggle = document.getElementById("togBtn");

      toggle.addEventListener("change", (e) => {
        dt.theme.statusChange(e);
      });
      colorInputs.forEach((color) => {
        color.addEventListener("change", (e) => {
          t = e.target;
          v = t.value;
          r = t.parentElement.parentElement.querySelector("input[type=range");
          p = t.dataset.property;
          // Update the opacity for the color input
          t.setAttribute("opacity", r.value);
          // Update the relevant CSS variable
          h = dt.theme.to9Char(v, r.value);
          document.documentElement.style.setProperty("--" + p, h);
          dt.themeTest[p.split("_")[0]].value = v;
          dt.themeTest[p.split("_")[0]].opacity = r.value;
        });
      });
      opacityInputs.forEach((op) => {
        op.addEventListener("change", (e) => {
          t = e.target;
          v = t.value;
          r =
            e.target.parentElement.parentElement.querySelector(
              "input[type=color]"
            );
          p = r.dataset.property;
          // Update the opacity dataset in the related color input
          r.dataset.opacity = v;
          // Update the opacity for the related color input
          r.setAttribute("opacity", v);
          // Update the relevant CSS variable
          h = dt.theme.to9Char(r.value, v);
          document.documentElement.style.setProperty("--" + p, h);
        });
      });
      btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          console.log(e.target.name);
          let n = e.target.name;
          if (n === "cancelTheme") {
            cancelTheme();
          }
          if (n === "setDefTheme") {
            dt.theme.setDefTheme();
          }
          if (n === "applyTheme") {
            dt.theme.applyTheme();
          }
        });
      });
    },
    statusChange: function (e) {
      console.log("toggle changed ", e);
      // Set dt.themeEnabled and update the stored value.
      dt.themeEnabled = e.target.checked;
      localStorage.setItem(PlayerId + ":themeStatus", dt.themeEnabled);
      // enabled/disable the theme stylesheet as required
      const styleSheets = document.styleSheets;
      for (let i = 0; i < styleSheets.length; i++) {
        if (styleSheets[i].title === "chatTheme") {
          document.styleSheets[i].disabled = !dt.themeEnabled;
        }
      }
    },
    updateColorAlpha: function (alpha) {
      console.log(alpha);
      parent = alpha.parentElement.parentElement;
      console.log(parent);
      let opacity = parent.querySelector("input[type=range]").value;
      parent.querySelector("input[type=color]").style.opacity = opacity;
      parent
        .querySelector("input[type=color]")
        .setAttribute("data-opacity", opacity);
      //document.getElementById('color').style.opacity = alpha;
    },
    applyHexToCSS: function (e, v, h) {
      // e = the element holding the CSS variable
      // v = the name of the variable including the -- at the start
      // h = the hex code to set the variable to
      e.style.setProperty(v, h);
    },
    setDefTheme: function (e) {
      console.log(e);
      const r = document.documentElement;
      for (const [key, props] of Object.entries(dt.themeTest)) {
        dt.themeTest[key] = dt.themeDefaults[key];
        // Apply the settings to themeTest
        r.style.setProperty(
          "--" + key + "_test",
          dt.theme.to9Char(dt.themeTest[key].value, dt.themeTest[key].opacity)
        );
        // Set the data attributes and properties on the related color input
        const c = document.querySelector(
          "input[type=color][data-property=" + key + "_test]"
        );
        c.value = dt.themeDefaults[key].value;
        c.opacity = dt.themeDefaults[key].opacity;
        // Set the value on the related range input
        const o = c.parentElement.parentElement.querySelector(
          'input[type="range"]'
        );
        o.value = dt.themeDefaults[key].value;
      }
    },
    applyTheme: function (e) {
      const r = document.documentElement;
      for (const [key, props] of Object.entries(dt.themeTest)) {
        // Set the themeCurr object
        dt.themeCurrents[key] = dt.themeTest[key];
        // Apply the settings to the CSS variables
        r.style.setProperty(
          "--" + key + "_curr",
          dt.theme.to9Char(dt.themeTest[key].value, dt.themeTest[key].opacity)
        );
      }
      // Store the theme
      localStorage.setItem(
        PlayerId + ":theme",
        JSON.stringify(dt.themeCurrents)
      );
    },
    to9Char: function (c, o) {
      // returns a 9char hex string
      // c is the 7 char hex color code
      // o is the opacity in the range 0 to 1
      let a = parseInt(o * 255).toString(16);
      if (a.length === 1) {
        a = "0" + a;
      }
      return c + a;
    },
    from9Char: function (c) {
      // returns a 7char hex string and a number between 0 and 1
      // c is the 9 char hex color code
      //const o =
      let o = parseInt(c.slice(-2), 16) / 255;
      return [c.substring(0, c.length - 2), o];
    },
  };
  dt.theme.loadTheme(PlayerId);
};