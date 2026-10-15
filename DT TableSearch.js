// document.querySelectorAll(".info > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(2) > table:nth-child(1) tr:has(td)")
tablesearch = function () {
  dt.tablesearch = {
    // Functions to modify certain built in tables in illy to allow searching and actually carry out the search.
    init: function (tbls) {
      // tbls is a Nodelist of the tables to enable searching on
      // For development I'll manually set it to point to the factions and hubs tables

      //        tbls = document.querySelectorAll(".info  table table");
      // Just select the hubs tbl for now
      tbls.forEach((thisTbl) => {
        let hdrRows = thisTbl.querySelectorAll("tr:has(th)");
        if (hdrRows.length == 1) {
          colHdr = hdrRows[0];
        } else {
          colHdr = hdrRows[hdrRows.length - 1];
        }
        const hdrs = colHdr.querySelectorAll("th");
        // Create the input elements and add the event listeners
        let offset = 0;
        hdrs.forEach((hdr) => {
          if (hdr.colSpan > 1) {
            offset += 1;
          }
          hdr.setAttribute("data-offset", offset);
          newHdr = document.createElement("input");
          //                newHdr.setAttribute("data-offset",offset);
          newHdr.setAttribute("type", "text"); //"<input type='text' class='search-input' placeholder=hdr.textContent>";
          newHdr.classList.add("search-input");
          newHdr.setAttribute("placeHolder", hdr.textContent);
          newHdr.style = "border: none;outline: none;font-weight: 700;";
          hdr.textContent = null;
          ne = hdr.appendChild(newHdr);
        });
      });
      this.setupSearch();
    },
    init2: function (tbls) {
      // tbls is a Nodelist of the tables to enable searching on
      // For development I'll manually set it to point to the factions and hubs tables

      tbls = document.querySelectorAll(".info  table table");
      // Just select the hubs tbl for now
      tbls.forEach((thisTbl) => {
        let hdrRows = thisTbl.querySelectorAll("tr:has(th)");
        if (hdrRows.length == 1) {
          colHdr = hdrRows[0];
        } else {
          colHdr = hdrRows[hdrRows.length - 1];
        }
        const hdrs = colHdr.querySelectorAll("th");
        // Create the input elements and add the event listeners
        hdrs.forEach((hdr) => {
          newHdr = document.createElement("input");
          newHdr.setAttribute("type", "text"); //"<input type='text' class='search-input' placeholder=hdr.textContent>";
          newHdr.classList.add("search-input");
          newHdr.setAttribute("placeHolder", hdr.textContent);
          newHdr.style = "border: none;outline: none;font-weight: 700;";
          hdr.textContent = null;
          ne = hdr.appendChild(newHdr);
        });
      });
    },

    setupSearch: function () {
      //   const hubsTbl = document.querySelectorAll(".info  table table")[1];

      document.querySelectorAll(".search-input").forEach((inputField) => {
        const tableRows = inputField
          .closest("table")
          .querySelectorAll("tbody > tr:has(td)");
        const headerCell = inputField.closest("th");
        const offset = Number(headerCell.dataset.offset);
        const otherHeaderCells = headerCell.closest("tr").children;
        const columnIndex =
          Array.from(otherHeaderCells).indexOf(headerCell) + offset;
        const searchableCells = Array.from(tableRows).map(
          (row) => row.querySelectorAll("td")[columnIndex]
        );

        inputField.addEventListener("input", () => {
          const searchQuery = inputField.value.toLowerCase();

          for (const tableCell of searchableCells) {
            const row = tableCell.closest("tr");
            const value = tableCell.textContent.toLowerCase().replace(",", "");

            row.style.visibility = null;

            if (value.search(searchQuery) === -1) {
              row.style.visibility = "collapse";
            }
          }
        });
      });
    },
  };
};