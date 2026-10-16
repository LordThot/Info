// ==UserScript==
// @name         [BZNCODE] Illyriad Food Sov Profit Display
// @namespace    http://bazoon.town
// @version      1.1
// @description  Adds a toggleable display for food sov profit on the world map in Illyriad
// @author       Bazoon
// @match        https://elgea.illyriad.co.uk/*
// ==/UserScript==

let zoomLevelOld = 0;
let centerCoordXOld;
let centerCoordYOld;
let urlOld;

(function () {
    'use strict';
    let createdTextBoxes = {};
    let toggleState = localStorage.getItem('FSP_textbox_toggle') || 'on';

    function toggleTextBoxes() {
        if (toggleState === 'on') {
            toggleState = 'off';
            localStorage.setItem('FSP_textbox_toggle', 'off');
        } else {
            toggleState = 'on';
            localStorage.setItem('FSP_textbox_toggle', 'on');
        }
        removeTextboxes();
        extractMapData();
    }

    function createTextBox(textValue, posX, posY, buildingIndex, zoomLevel, mode, sov, isTopRatio) {
        let red;
        let backgroundColor;
        if (mode == 0) {
            if (textValue <= 3) {
                red = 0;
            } else if (textValue >= 8) {
                red = 1;
            } else {
                red = textValue / 10;
            }
            backgroundColor = colorMixer([255,0,0],[0,255,0],1-red);
        } else if (mode == 1) {
            if (textValue <= 0) {
                red = 0;
            } else if (textValue >= (5000 * sov/5)) {
                red = 1;
            } else {
                red = textValue / (4000 * sov/5);
            }
            backgroundColor = colorMixer([255,0,0],[0,255,0],1-red);
        } else if (mode == 2) {
            if (textValue >= (300 * sov/5)) {
                red = 0;
            } else if (textValue <= (75 * sov/5)) {
                red = 1;
            } else {
                red = 1 - textValue / (300 * sov/5);
            }
            backgroundColor = colorMixer([255,0,0],[0,255,0],1-red);
        } else if (mode == 3) {
            backgroundColor = 'rgba(0, 255, 0, 0.8)';
        } else if (mode == 5) {
            const num = parseFloat(textValue);
            if (num <= 55) {
                red = 0;
            } else if (num >= 80) {
                red = 1;
            } else {
                red = (num - 55) / 30;
            }
            backgroundColor = colorMixer([255,0,0],[0,255,0],1-red);
        } else {
            if (textValue <= 3) {
                red = 0;
            } else if (textValue >= 6) {
                red = 1;
            } else {
                red = textValue / 6;
            }
            backgroundColor = colorMixer([255,0,0],[0,255,0],1-red);
        }
        const textBox = document.createElement('div');
        textBox.style.position = 'absolute';
        textBox.style.backgroundColor = backgroundColor;
        textBox.style.borderColor = isTopRatio ? 'rgba(0, 255, 0, 1.0)' : 'rgba(255, 255, 255, 1.0)';
        textBox.style.borderStyle = 'solid';
        textBox.style.borderWidth = isTopRatio ? '2px' : '1px';
        textBox.style.pointerEvents = 'none';
        textBox.style.color = 'black';
        textBox.style.fontSize = `${23 - zoomLevel}px`;
        if (mode == 3) textBox.style.fontSize = `${21 - zoomLevel}px`;
        textBox.style.fontWeight = 'bold';
        textBox.style.textAlign = 'center';
        textBox.innerText = textValue;
        let textWidth = textValue.length * (23 - zoomLevel);
        if (mode == 3) textWidth = textValue.length * (21 - zoomLevel);
        const textHeight = 23 - zoomLevel;
        let left = posX - textWidth / 4 - 2;
        left = left + textWidth / 8;
        const top = posY - textHeight / 3 + 3;
        textBox.style.left = `${left}px`;
        textBox.style.top = `${top}px`;
        document.body.appendChild(textBox);
        createdTextBoxes[buildingIndex] = textBox;
    }

    function colorChannelMixer(colorChannelA, colorChannelB, amountToMix){
        var channelA = colorChannelA*amountToMix;
        var channelB = colorChannelB*(1-amountToMix);
        return parseInt(channelA+channelB);
    }

    function colorMixer(rgbA, rgbB, amountToMix){
        var r = colorChannelMixer(rgbA[0],rgbB[0],amountToMix);
        var g = colorChannelMixer(rgbA[1],rgbB[1],amountToMix);
        var b = colorChannelMixer(rgbA[2],rgbB[2],amountToMix);
        return "rgb("+r+","+g+","+b+")";
    }

    function removeTextboxes() {
        for (const mapLocIndex in createdTextBoxes) {
            if (createdTextBoxes.hasOwnProperty(mapLocIndex)) {
                const textBox = createdTextBoxes[mapLocIndex];
                if (textBox && textBox.parentNode) {
                    textBox.parentNode.removeChild(textBox);
                }
            }
        }
        createdTextBoxes = {};
    }

    function updateRatioSumDisplay(text1, text2) {
        const display20 = document.querySelector('div[FSP_data-ratio-sum="true"]');
        if (display20) {
            const newText = text1 || '';
            if (display20.innerText !== newText) {
                display20.innerText = newText;
            }
        }
        const display11 = document.querySelector('div[FSP_data-ratio-sum-11="true"]');
        if (display11) {
            const newText = text2 || '';
            if (display11.innerText !== newText) {
                display11.innerText = newText;
            }
        }
    }

    function extractMapData() {
        const cb = getCheckedCheckbox();
        if (cb == null) {
            updateRatioSumDisplay(null, null);
            return;
        }
        const mapDataData = mapData.data;
        if (!mapDataData) {
            return;
        }
        const zoomLevel = mapData.zoom;
        const centerCoordY = mapData.y;
        const centerCoordX = mapData.x;
        if (zoomLevel != zoomLevelOld || centerCoordX != centerCoordXOld || centerCoordY != centerCoordYOld) {
            removeTextboxes();
            zoomLevelOld = zoomLevel;
            centerCoordXOld = centerCoordX;
            centerCoordYOld = centerCoordY;
        }
        const centerCoordKey = centerCoordY + '|' + centerCoordX;
        const centerFoodValue = mapDataData[centerCoordKey].rs.split('|')[4];
        const minX = centerCoordX - zoomLevel;
        const maxX = centerCoordX + zoomLevel;
        const minY = centerCoordY - zoomLevel;
        const maxY = centerCoordY + zoomLevel;
        const width = maxX - minX + 1;
        const height = maxY - minY + 1;
        const foodData = Array.from({ length: height }, () => Array.from({ length: width }));
        const sovData = Array.from({ length: height }, () => Array.from({ length: width }));
        const terrainList = terrain;
        for (const key in mapDataData) {
            const [y, x] = key.split('|').map(Number);
            if (x < minX || x > maxX || y < minY || y > maxY) continue;
            const adjustedX = x - minX;
            const adjustedY = y - minY;
            const { rs } = mapDataData[key];
            const { i } = mapDataData[key];
            const foodValue = rs.split('|')[4];
            foodData[adjustedY][adjustedX] = foodValue;
            sovData[adjustedY][adjustedX] = terrainList[i].type;
        }

        // Pre-pass for ratio mode: find top 20 tiles by ratio.
        // Keyed by "y,x" coordinates rather than mapSpotIndex, because the
        // render loop's mapSpotIndex doesn't increment on early returns and
        // would drift out of alignment with any index computed here.
        let topRatioCoords = new Set();
        let ratioPlusValues = new Map();
        if (cb == 4) {
            const ratioList = [];
            foodData.forEach((row, y) => {
                row.forEach((value, x) => {
                    const distance = calculateDistance(zoomLevel, x, y);
                    if (distance > 0 && value !== undefined) {
                        const ratio = value / distance;
                        if (!isNaN(ratio) && isFinite(ratio)) {
                            ratioList.push({ y, x, ratio });
                        }
                    }
                });
            });
            ratioList.sort((a, b) => b.ratio - a.ratio);
            const top20 = ratioList.slice(0, 20);
            let sum20 = 0;
            top20.forEach(item => {
                topRatioCoords.add(`${item.y},${item.x}`);
                sum20 += item.ratio;
            });
            const top11 = ratioList.slice(0, 11);
            let sum11 = 0;
            top11.forEach(item => {
                sum11 += item.ratio;
            });
            updateRatioSumDisplay(`Top 20: ${sum20.toFixed(1)}`, `Top 11: ${sum11.toFixed(1)}`);
        } else if (cb == 5) {
            // Hypothetical center mode: for every visible tile, score it as if a city were placed there.
            // Score = 0.75 * sum(top 11 ratios) + 0.25 * sum(top 20 ratios), weighting closer tiles more.
            // Optimizations:
            //   - Flat Float32Array of numeric food values (avoids repeated string parsing & 2D indexing)
            //   - Precomputed 1/distance lookup for every (dx, dy) offset (shared across all candidates)
            //   - Bounded top-K selection via a fixed 20-slot sorted insertion buffer (no full sort)
            //   - Water/ocean tiles skipped as candidates (but still contribute as neighbors)
            const K = 20;
            const K2 = 11;
            // Flatten food into Float32Array; invalid tiles become NaN sentinels.
            const foodFlat = new Float32Array(height * width);
            for (let yy = 0; yy < height; yy++) {
                const row = foodData[yy];
                const base = yy * width;
                for (let xx = 0; xx < width; xx++) {
                    const v = row[xx];
                    foodFlat[base + xx] = (v === undefined) ? NaN : +v;
                }
            }
            // Precompute 1/sqrt(dx^2+dy^2) for every (dx,dy) in the window.
            // Offsets range from -(W-1)..W-1 and -(H-1)..H-1, so we index by (dy+H-1)*(2W-1)+(dx+W-1).
            const invW = 2 * width - 1;
            const invH = 2 * height - 1;
            const invDist = new Float32Array(invW * invH);
            for (let dy = -(height - 1); dy <= height - 1; dy++) {
                for (let dx = -(width - 1); dx <= width - 1; dx++) {
                    const idx = (dy + height - 1) * invW + (dx + width - 1);
                    if (dx === 0 && dy === 0) {
                        invDist[idx] = 0; // sentinel for self
                    } else {
                        invDist[idx] = 1 / Math.sqrt(dx * dx + dy * dy);
                    }
                }
            }
            // Reusable top-K buffer: sorted descending, length <= K.
            const topBuf = new Float64Array(K);
            let bestValue = -Infinity;
            let bestKey = null;
            for (let ty = 0; ty < height; ty++) {
                const terrainRow = sovData[ty];
                for (let tx = 0; tx < width; tx++) {
                    if (isNaN(foodFlat[ty * width + tx])) continue;
                    const terrainName = terrainRow[tx];
                    if (terrainName) {
                        const lower = terrainName.toLowerCase();
                        if (lower === 'ocean' || lower.includes('water')) continue;
                    }
                    // Fill top-K buffer by scanning all tiles once.
                    let count = 0;
                    let minInTop = -Infinity; // smallest value currently retained
                    for (let y = 0; y < height; y++) {
                        const foodBase = y * width;
                        const dyOff = (y - ty + height - 1) * invW + (width - 1 - tx);
                        for (let x = 0; x < width; x++) {
                            const food = foodFlat[foodBase + x];
                            if (food !== food) continue; // NaN check (fastest)
                            const inv = invDist[dyOff + x];
                            if (inv === 0) continue; // self
                            const ratio = food * inv;
                            if (count < K) {
                                // Insertion into sorted-descending buffer
                                let i = count;
                                while (i > 0 && topBuf[i - 1] < ratio) {
                                    topBuf[i] = topBuf[i - 1];
                                    i--;
                                }
                                topBuf[i] = ratio;
                                count++;
                                if (count === K) minInTop = topBuf[K - 1];
                            } else if (ratio > minInTop) {
                                // Insert, drop smallest
                                let i = K - 1;
                                while (i > 0 && topBuf[i - 1] < ratio) {
                                    topBuf[i] = topBuf[i - 1];
                                    i--;
                                }
                                topBuf[i] = ratio;
                                minInTop = topBuf[K - 1];
                            }
                        }
                    }
                    // Sums from the buffer: top 11 and top 20
                    let sum11 = 0, sum20 = 0;
                    const limit = Math.min(count, K);
                    for (let i = 0; i < limit; i++) {
                        const v = topBuf[i];
                        sum20 += v;
                        if (i < K2) sum11 += v;
                    }
                    const sum = 0.75 * sum11 + 0.25 * sum20;
                    ratioPlusValues.set(`${ty},${tx}`, sum);
                    if (sum > bestValue) {
                        bestValue = sum;
                        bestKey = `${ty},${tx}`;
                    }
                }
            }
            if (bestKey) topRatioCoords.add(bestKey);
            if (bestValue > -Infinity) {
                updateRatioSumDisplay(`Best: ${bestValue.toFixed(1)}`, null);
            } else {
                updateRatioSumDisplay(null, null);
            }
        } else {
            updateRatioSumDisplay(null, null);
        }

        let mapSpotIndex = 0;
        foodData.forEach((row, y) => {
            const reversedY = height - y - 1;
            row.forEach((value, x) => {
                const posX = 270 + (x - zoomLevel) * (500 / (zoomLevel * 2 + 1));
                const posY = 492 + (reversedY - zoomLevel) * (500 / (zoomLevel * 2 + 1));
                if (!createdTextBoxes[mapSpotIndex]) {
                    const foodValue = value;
                    let textValue = 0;
                    let mode = 0;
                    let tax = 0;
                    let sov = 0;
                    const distance = calculateDistance(zoomLevel, x, y);
                    const profitMax = (value * 20.14 * centerFoodValue * 100/25) - (100 * 5 * distance);
                    if (cb == 0) {
                        textValue = "\u00A0" + foodValue + "\u00A0";
                        mode = 0;
                    } else if (cb == 1) {
                        if (distance == 0) return;
                        tax = getTaxValue();
                        sov = getSovValue();
                        if (tax == null || sov == null) {
                            return;
                        }
                        const profit = (value*(sov/5) * 20.14 * centerFoodValue * tax/25) - (100 * sov * distance) + getChanceryDiscount(distance);
                        textValue = profit.toFixed(0);
                        mode = 1;
                    } else if (cb == 2) {
                        if (distance == 0) return;
                        tax = getTaxValue();
                        sov = getSovValue();
                        if (tax == null || sov == null) {
                            return;
                        }
                        const research = 10 * sov * distance
                        textValue = research.toFixed(0);
                        mode = 2;
                    } else if (cb == 3) {
                        const sovBonus = getSovBonus(sovData[y][x]);
                        if (sovBonus) {
                            textValue = sovBonus.item.substring(0,3) + "\n" + sovBonus.change + "%";
                            mode = 3;
                        } else {
                            return;
                        }
                        mode = 3;
                    } else if (cb == 4) {
                        if (distance == 0) return;
                        textValue = foodValue/distance;
                        textValue = textValue.toFixed(2);
                        mode = 4;
                    } else if (cb == 5) {
                        const key = `${y},${x}`;
                        if (!ratioPlusValues.has(key)) return;
                        textValue = ratioPlusValues.get(key).toFixed(1);
                        mode = 5;
                    } else {
                        return;
                    }
                    const isTopRatio = (cb == 4 || cb == 5) && topRatioCoords.has(`${y},${x}`);
                    createTextBox(textValue, posX, posY, mapSpotIndex, zoomLevel, mode, sov, isTopRatio);
                }
                mapSpotIndex++;
            });
        });
    }

    function calculateDistance(zoomLevel, x, y) {
        const center = Math.floor((zoomLevel * 2 + 1) / 2);
        const deltaX = Math.abs(x - center);
        const deltaY = Math.abs(y - center);
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    function drawToggleButton() {
        const existingToggleContainer = document.querySelector('div[FSP_data-toggle-container="true"]');
        if (!existingToggleContainer) {
            const toggleContainer = document.createElement('div');
            toggleContainer.style.position = 'absolute';
            toggleContainer.style.top = '270px';
            toggleContainer.style.left = '675px';
            toggleContainer.setAttribute('FSP_data-toggle-container', 'true');
            const checkboxes = ['Food', 'Gold', 'Rsch', 'Bonus', 'Ratio', 'Ratio+'];
            checkboxes.forEach(option => {
                const checkboxContainer = document.createElement('div');
                checkboxContainer.style.display = 'block';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = option;
                checkbox.name = 'FSP_toggleCheckbox';
                checkbox.style.pointerEvents = 'auto';
                const label = document.createElement('label');
                label.innerHTML = option;
                label.style.pointerEvents = 'none';
                checkboxContainer.appendChild(checkbox);
                checkboxContainer.appendChild(label);
                toggleContainer.appendChild(checkboxContainer);
                checkbox.onclick = () => {
                    const clickedCheckbox = document.querySelector(`input[value="${option}"]`);
                    if (clickedCheckbox.checked) {
                        checkboxes.forEach(cb => {
                            const currentCheckbox = document.querySelector(`input[value="${cb}"]`);
                            currentCheckbox.disabled = cb !== option;
                        });
                    } else {
                        checkboxes.forEach(cb => {
                            const currentCheckbox = document.querySelector(`input[value="${cb}"]`);
                            currentCheckbox.disabled = false;
                        });
                    }
                    removeTextboxes();
                    extractMapData();
                };
            });
            const textInputContainer = document.createElement('div');
            textInputContainer.style.display = 'block';
            toggleContainer.appendChild(textInputContainer);
            const sovInput = document.createElement('input');
            sovInput.type = 'number';
            sovInput.min = 1;
            sovInput.max = 5;
            sovInput.name = 'FSP_SOVInput';
            sovInput.placeholder = 'SOV';
            sovInput.style.fontSize = '10px';
            sovInput.style.display = 'block';
            textInputContainer.appendChild(sovInput);
            sovInput.addEventListener('input', () => {
                if (sovInput.value < 0) sovInput.value = 0;
                if (sovInput.value > 5) sovInput.value = 5;
                removeTextboxes();
                extractMapData();
            });
            const taxInput = document.createElement('input');
            taxInput.type = 'number';
            taxInput.min = 0;
            taxInput.max = 100;
            taxInput.name = 'FSP_TAXInput';
            taxInput.placeholder = 'TAX';
            taxInput.style.fontSize = '10px';
            taxInput.style.display = 'block';
            textInputContainer.appendChild(taxInput);
            taxInput.addEventListener('input', () => {
                if (taxInput.value < 0) taxInput.value = 0;
                if (taxInput.value > 100) taxInput.value = 100;
                removeTextboxes();
                extractMapData();
            });
            const cha1Input = document.createElement('input');
            cha1Input.type = 'number';
            cha1Input.min = 0;
            cha1Input.max = 20;
            cha1Input.name = 'FSP_Cha1Input';
            cha1Input.placeholder = 'CHAN1';
            cha1Input.style.fontSize = '10px';
            cha1Input.style.display = 'block';
            textInputContainer.appendChild(cha1Input);
            cha1Input.addEventListener('input', () => {
                if (cha1Input.value < 0) cha1Input.value = 0;
                if (cha1Input.value > 20) cha1Input.value = 20;
                removeTextboxes();
                extractMapData();
            });
            const cha2Input = document.createElement('input');
            cha2Input.type = 'number';
            cha2Input.min = 0;
            cha2Input.max = 20;
            cha2Input.name = 'FSP_Cha2Input';
            cha2Input.placeholder = 'CHAN2';
            cha2Input.style.fontSize = '10px';
            cha2Input.style.display = 'block';
            textInputContainer.appendChild(cha2Input);
            cha2Input.addEventListener('input', () => {
                if (cha2Input.value < 0) cha2Input.value = 0;
                if (cha2Input.value > 20) cha2Input.value = 20;
                removeTextboxes();
                extractMapData();
            });
            const ratioSumDisplay = document.createElement('div');
            ratioSumDisplay.setAttribute('FSP_data-ratio-sum', 'true');
            ratioSumDisplay.style.fontSize = '10px';
            ratioSumDisplay.style.display = 'block';
            ratioSumDisplay.innerText = '';
            textInputContainer.appendChild(ratioSumDisplay);
            const ratioSumDisplay11 = document.createElement('div');
            ratioSumDisplay11.setAttribute('FSP_data-ratio-sum-11', 'true');
            ratioSumDisplay11.style.fontSize = '10px';
            ratioSumDisplay11.style.display = 'block';
            ratioSumDisplay11.innerText = '';
            textInputContainer.appendChild(ratioSumDisplay11);
            document.body.appendChild(toggleContainer);
        }
    }

    function getCheckedCheckbox() {
        const checkboxes = document.querySelectorAll('input[name="FSP_toggleCheckbox"]');
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                return i;
            }
        }
        return null;
    }

    function getSovValue() {
        const sovInput = document.querySelector('input[name="FSP_SOVInput"]');
        if (sovInput) {
            return sovInput.value;
        }
        return null;
    }

    function getTaxValue() {
        const taxInput = document.querySelector('input[name="FSP_TAXInput"]');
        if (taxInput) {
            return taxInput.value;
        }
        return null;
    }

    function getChanceryDiscount(distance) {
        const cha1 = document.querySelector('input[name="FSP_Cha1Input"]');
        const cha2 = document.querySelector('input[name="FSP_Cha2Input"]');
        let chanceryDiscount = 0;
        if (cha1) {
            chanceryDiscount += (0.02 * cha1.value) * (100 * distance)
        }
        if (cha2) {
            chanceryDiscount += (0.01 * cha2.value) * (100 * distance);
        }
        return chanceryDiscount;
    }

    function removeToggleButton() {
        const toggleContainer = document.querySelector('div[FSP_data-toggle-container="true"]');
        if (toggleContainer) {
            toggleContainer.remove();
        }
    }

    function getSovBonus(name) {
        const sovBonuses = {
            "Barren Wastes": {
                "bldg": "Training Ground",
                "item": "SpM",
                "change": "3"
            },
            "Rocky Outcrop": {
                "bldg": "Farrier",
                "item": "Hor",
                "change": "3"
            },
            "Fertile Ground": {
                "bldg": "Farrier",
                "item": "Hor",
                "change": "1"
            },
            "Bountiful Land": {
                "bldg": "Cattle Rancher",
                "item": "Cow",
                "change": "3"
            },
            "Alluvial Plain": {
                "bldg": "Cattle Rancher",
                "item": "Cow",
                "change": "1"
            },
            "Abundant Crops": {
                "bldg": "Brewer's Yard",
                "item": "Bee",
                "change": "3"
            },
            "Treacherous Mountains": {
                "bldg": "Brewer's Yard",
                "item": "Bee",
                "change": "2"
            },
            "Fertile Orchard": {
                "bldg": "Brewer's Yard",
                "item": "Bee",
                "change": "1"
            },
            "Rich Clay Seam": {
                "bldg": "Papermill",
                "item": "Boo",
                "change": "3"
            },
            "Abundant Clay": {
                "bldg": "Papermill",
                "item": "Boo",
                "change": "2"
            },
            "Wooded Land": {
                "bldg": "Poleturner",
                "item": "Spe",
                "change": "3"
            },
            "Light Woods": {
                "bldg": "Poleturner",
                "item": "Spe",
                "change": "1"
            },
            "Sharp Crags": {
                "bldg": "Bladesmith",
                "item": "Swd",
                "change": "3"
            },
            "Mountains": {
                "bldg": "Bladesmith",
                "item": "Swd",
                "change": "1"
            },
            "Thick Forest": {
                "bldg": "Bowyer",
                "item": "Bow",
                "change": "3"
            },
            "Forested Hilltop": {
                "bldg": "Bowyer",
                "item": "Bow",
                "change": "1"
            },
            "Turned Clay": {
                "bldg": "Bridlemaker",
                "item": "Sad",
                "change": "2"
            },
            "Heavy Clay Seam": {
                "bldg": "Bridlemaker",
                "item": "Sad",
                "change": "1"
            },
            "Clay Seam": {
                "bldg": "Renderer",
                "item": "LeA",
                "change": "3"
            },
            "Exposed Clay": {
                "bldg": "Renderer",
                "item": "LeA",
                "change": "1"
            },
            "Craggy Peaks": {
                "bldg": "Armourer",
                "item": "ChM",
                "change": "3"
            },
            "Stony Ground": {
                "bldg": "Armourer",
                "item": "ChM",
                "change": "1"
            },
            "Abundant Quarry": {
                "bldg": "Plate Forger",
                "item": "PlA",
                "change": "3"
            },
            "Lonely Peaks": {
                "bldg": "Plate Forger",
                "item": "PlA",
                "change": "1"
            },
            "Bleak Mountains": {
                "bldg": "Finishing School",
                "item": "Dip",
                "change": "2"
            },
            "Scrubland": {
                "bldg": "Finishing School",
                "item": "Dip",
                "change": "1"
            },
            "Wooded Glade": {
                "bldg": "Training Ground",
                "item": "SpM",
                "change": "2"
            },
            "Tundra": {
                "bldg": "Training Ground",
                "item": "SpM",
                "change": "1"
            },
            "Dense Forest": {
                "bldg": "Target Range",
                "item": "Arc",
                "change": "2"
            },
            "Clearing": {
                "bldg": "Target Range",
                "item": "Arc",
                "change": "1"
            },
            "Moor": {
                "bldg": "Military Academy",
                "item": "SwM",
                "change": "1"
            },
            "Rich Quarry": {
                "bldg": "Military Academy",
                "item": "SwM",
                "change": "2"
            },
            "Fertile Pasture": {
                "bldg": "Jousting Yard",
                "item": "Cav",
                "change": "2"
            },
            "Open Plains": {
                "bldg": "Jousting Yard",
                "item": "Cav",
                "change": "1"
            },
            "Landslip": {
                "bldg": "Assembly Yard",
                "item": "Sie",
                "change": "2"
            },
            "Wooded Quarry": {
                "bldg": "Assembly Yard",
                "item": "Sie",
                "change": "1"
            },
            "Marsh": {
                "bldg": "Poleturner",
                "item": "Spe",
                "change": "3"
            },
            "Swamp": {
                "bldg": "Bowyer",
                "item": "Bow",
                "change": "2"
            },
            "Scoured Bedrock": {
                "bldg": "Military Academy",
                "item": "SwM",
                "change": "2"
            },
        };
        if (sovBonuses.hasOwnProperty(name)) {
            return {
                item: sovBonuses[name].item,
                change: sovBonuses[name].change
            };
        } else {
            return null;
        }
    }

    const urlObserver = new MutationObserver(() => {
        const mapRegex = /^https:\/\/elgea\.illyriad\.co\.uk\/#\/World\/Map(?:\/.*)?$/;
        if (mapRegex.test(window.location.href)) {
            extractMapData();
            drawToggleButton();
        } else {
            removeTextboxes();
            removeToggleButton();
        }
        if (window.location.href != urlOld) {
            urlOld = window.location.href;
            removeTextboxes();
            extractMapData();
        }
    });

    if (toggleState === 'off') {
        removeTextboxes();
    }

    urlObserver.observe(document.documentElement, { childList: true, subtree: true });
})();