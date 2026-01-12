// 1. Databaza e Sureve të ndara sipas Xhuzeve
const surahs = {
    juz30: ["En-Nebe", "En-Naziat", "Abese", "Et-Tekwir", "El-Infitar", "El-Mutaffifin", "El-Inshikak", "El-Buruj", "Et-Tarik", "El-Ala", "El-Ghashiyah", "El-Fejr", "El-Beled", "Esh-Shems", "El-Lejl", "Ed-Duha", "Esh-Sherh", "Et-Tin", "El-Alak", "El-Kadr", "El-Bejjineh", "Ez-Zelzele", "El-Adijat", "El-Kariah", "Et-Tekathur", "El-Asr", "El-Humezeh", "El-Fil", "Kurejsh", "El-Maun", "El-Kewther", "El-Kafirun", "En-Nasr", "El-Mesed", "El-Ihlas", "El-Felek", "En-Nas"],
    juz29: ["El-Mulk", "El-Kalem", "El-Hakkah", "El-Maarij", "Nuh", "El-Xhinn", "El-Muzzemmil", "El-Mudethir", "El-Kijameh", "El-Insan", "El-Murselat"],
    juz28: ["El-Muxhadeleh", "El-Hashr", "El-Mumtehineh", "Es-Saff", "El-Xhumuah", "El-Munafikun", "Et-Tegabun", "Et-Talak", "Et-Tahrim"],
    juz27: ["Edh-Dharijat", "Et-Tur", "En-Nexhm", "El-Kamer", "Er-Rahman", "El-Wakiah", "El-Hadid"]
};

// 2. Funksioni për hapjen/mbylljen e Xhuzeve (Accordion)
function toggleJuz(id) {
    const el = document.getElementById(id);
    const parent = el.parentElement;
    
    if (el.style.display === "block") {
        el.style.display = "none";
        parent.classList.remove("active");
    } else {
        el.style.display = "block";
        parent.classList.add("active");
    }
}

// 3. Funksioni për numëruesin e përsëritjeve (+/-)
function updateCount(surah, change) {
    let count = parseInt(localStorage.getItem(`count-${surah}`) || 0);
    count = Math.max(0, count + change); // Mos lejo numra negativë
    localStorage.setItem(`count-${surah}`, count);
    document.getElementById(`count-${surah}`).innerText = count;
}

// 4. Funksioni për "Tick" (Markimi si e përfunduar)
function toggleComplete(surah) {
    const item = document.getElementById(`item-${surah}`);
    const isCompleted = item.classList.toggle('completed');
    
    // Ruaj statusin në localStorage
    localStorage.setItem(`status-${surah}`, isCompleted ? 'done' : 'pending');
}

// 5. Funksioni kryesor që ndërton faqen kur hapet
function loadSurahs() {
    for (let juz in surahs) {
        const container = document.getElementById(juz);
        if (!container) continue;

        surahs[juz].forEach(s => {
            // Merr të dhënat e ruajtura nga memoria e telefonit
            const savedCount = localStorage.getItem(`count-${s}`) || 0;
            const savedStatus = localStorage.getItem(`status-${s}`) === 'done';
            
            // Krijo strukturën e çdo sureje
            container.innerHTML += `
                <div class="surah-item ${savedStatus ? 'completed' : ''}" id="item-${s}">
                    <button class="tick-btn" onclick="toggleComplete('${s}')" title="Marko si të përfunduar">✓</button>
                    
                    <div class="surah-info">
                        <div class="surah-name">${s}</div>
                    </div>

                    <div class="counter-section">
                        <small>Përsëritur:</small>
                        <button class="minus" onclick="updateCount('${s}', -1)">-</button>
                        <span class="count-display" id="count-${s}">${savedCount}</span>
                        <button onclick="updateCount('${s}', 1)">+</button>
                    </div>
                </div>
            `;
        });
    }
}

// Nis ngarkimin kur faqja është gati

window.onload = loadSurahs;
