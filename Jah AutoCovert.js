// ==UserScript==
// @name         Eye of Jah - Auto-Default Covert
// @namespace    eyeofjah
// @version      1.5
// @description  Defaults isCovert to checked on specific Military Orders pages without global observing.
// @author       Eye of Jah
// @match        https://elgea.illyriad.co.uk/*
// @exclude      http://forum.illyriad.co.uk/*
// @exclude      https://map.illyriad.co.uk/*
// @exclude      https://elgea.illyriad.co.uk/Account/*
// @license      MIT
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/572566/Eye%20of%20Jah%20-%20Auto-Default%20Covert.user.js
// @updateURL https://update.greasyfork.org/scripts/572566/Eye%20of%20Jah%20-%20Auto-Default%20Covert.meta.js
// ==/UserScript==

(function() {
    'use strict';

    const handledElements = new WeakSet();
    let observer = null;
    let observing = false;
    let debounceTimer = null;

    function isOnOrdersSubPage() {
        return /^#\/Military\/Orders\/[^/]+\/[^/]+/.test(window.location.hash);
    }

    function applyDefaultCovert() {
        if (!isOnOrdersSubPage()) return;

        const covertBoxes = document.querySelectorAll('input[type="checkbox"][name="isCovert"]');

        covertBoxes.forEach(cb => {
            if (!handledElements.has(cb)) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change', { bubbles: true }));
                handledElements.add(cb);
            }
        });
    }

    function debouncedApply() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(applyDefaultCovert, 50);
    }

    function startObserving() {
        if (observing) return;

        observer = new MutationObserver(() => {
            debouncedApply();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        observing = true;
    }

    function stopObserving() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        clearTimeout(debounceTimer);
        observing = false;
    }

    function handlePageChange() {
        if (isOnOrdersSubPage()) {
            applyDefaultCovert();
            startObserving();
        } else {
            stopObserving();
        }
    }

    handlePageChange();

    window.addEventListener('hashchange', handlePageChange);

})();