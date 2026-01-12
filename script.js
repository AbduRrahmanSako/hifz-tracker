// 1. Databaza e Sureve dhe Faqeve
const juz27Data = {
    "Edh-Dharijat": { start: 520, end: 523 },
    "Et-Tur": { start: 523, end: 525 },
    "En-Nexhm": { start: 526, end: 528 },
    "El-Kamer": { start: 528, end: 531 },
    "Er-Rahman": { start: 531, end: 534 },
    "El-Waki'ah": { start: 534, end: 537 },
    "El-Hadid": { start: 537, end: 541 }
};

const surahs = {
    juz27: Object.keys(juz27Data),
    juz28: ["El-Muxhadeleh", "El-Hashr", "El-Mumtehineh", "Es-Saff", "El-Xhumuah", "El-Munafikun", "Et-Tegabun", "Et-Talak", "Et-Tahrim"],
    juz29: ["El-Mulk", "El-Kalem", "El-Hakkah", "El-Ma'arij", "Nuh", "El-Xhinn", "El-Muzzemmil", "El-Mudethir", "El-Kijameh", "El-Insan", "El-Murselat"],
    juz30: ["En-Nebe", "En-Naziat", "Abese", "Et-Tekwir", "El-Infitar", "El-Mutaffifin", "El-Inshikak", "El-Buruj", "Et-Tarik", "El-A'la", "El-Ghashiyah", "El-Fejr", "El-Beled", "Esh-Shems", "El-Lejl", "Ed-Duha", "Esh-Sherh", "Et-Tin", "El-Alak", "El-Kadr", "El-Bejjineh", "Ez-Zelzele", "El-Adijat", "El-Kari'ah", "Et-Tekathur", "El-Asr", "El-Humezeh", "El-Fil", "Kurejsh", "El-Ma'un", "El-Kewther", "El-Kafirun", "En-Nasr", "El-Mesed", "El-Ihlas", "El-Felek", "En-Nas"]
};

// 2. Ngarkimi i listës kryesore
function loadSurahs() {
    for (let juz in surahs) {
        const container = document.getElementById(juz);
        if (!container) continue;
        container.innerHTML = "";
        surahs[juz].forEach(s => {
            const savedCount = localStorage.getItem(`count-${s}`) || 0;
            const savedStatus = localStorage.getItem(`status-${s}`) === 'done';
            container.innerHTML += `
                <div class="surah-item ${savedStatus ? 'completed' : ''}" id="item-${s}">
                    <button class="tick-btn" onclick="event.stopPropagation(); toggleComplete('${s}')">✓</button>
                    <div class="surah-info" onclick="showDetails('${s}')"><div class="surah-name">${s}</div></div>
                    <div class="counter-section">
                        <button class="minus" onclick="event.stopPropagation(); updateCount('${s}', -1)">-</button>
                        <span class="count-display" id="count-${s}">${savedCount}</span>
                        <button class="plus" onclick="event.stopPropagation(); updateCount('${s}', 1)">+</button>
                    </div>
                </div>`;
        });
    }
}

// 3. Shfaqja e faqeve të sures
function showDetails(surahName) {
    const data = juz27Data[surahName];
    if (!data) { alert("Detajet janë gati vetëm për Xhuzin 27!"); return; }
    
    document.getElementById('main-view').style.display = 'none';
    document.getElementById('main-header').style.display = 'none';
    const detailView = document.getElementById('surah-detail-view');
    detailView.style.display = 'block';
    
    document.getElementById('detail-surah-name').innerText = surahName;
    const container = document.getElementById('pages-container');
    container.innerHTML = '';
    
    for (let i = data.start; i <= data.end; i++) {
        const key = `page-${surahName}-${i}`;
        const count = localStorage.getItem(key) || 0;
        container.innerHTML += `
            <div class="page-card">
                <span class="page-link" onclick="openMushaf(${i})">📖 Faqja ${i}</span>
                <div class="counter-section">
                    <button class="minus" onclick="updatePageCount('${key}', -1)">-</button>
                    <span class="count-display" id="display-${key}">${count}</span>
                    <button class="plus" onclick="updatePageCount('${key}', 1)">+</button>
                </div>
            </div>`;
    }
    window.scrollTo(0,0);
}

// 4. Integrimi i Kur'anit - FIX për requests
function openMushaf(page) {
    const modal = document.getElementById('mushaf-modal');
    const frame = document.getElementById('mushaf-frame');
    
    // Përdorim pamjen e faqes nga Quran.com e cila është shumë e besueshme
    // Kjo ngarkon saktësisht faqen e Mus'hafit të Medines
    frame.src = `https://quran.com/page/${page}`;
    
    modal.style.display = 'flex';
}

function closeMushaf() {
    const modal = document.getElementById('mushaf-modal');
    const frame = document.getElementById('mushaf-frame');
    
    modal.style.display = 'none';
    frame.src = ""; // Pastrojmë burimin për të ndaluar kërkesat në sfond
}

// 5. Funksionet Ndihmëse
function updatePageCount(key, change) {
    let count = parseInt(localStorage.getItem(key) || 0);
    count = Math.max(0, count + change);
    localStorage.setItem(key, count);
    document.getElementById(`display-${key}`).innerText = count;
}

function goBack() {
    document.getElementById('surah-detail-view').style.display = 'none';
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('main-header').style.display = 'block';
    loadSurahs();
}

function updateCount(surah, ch) {
    let c = parseInt(localStorage.getItem(`count-${surah}`) || 0);
    c = Math.max(0, c + ch);
    localStorage.setItem(`count-${surah}`, c);
    document.getElementById(`count-${surah}`).innerText = c;
}

function toggleComplete(s) {
    const item = document.getElementById(`item-${s}`);
    const isDone = item.classList.toggle('completed');
    localStorage.setItem(`status-${s}`, isDone ? 'done' : 'pending');
}

function toggleJuz(id) {
    const el = document.getElementById(id);
    el.style.display = el.style.display === "block" ? "none" : "block";
}

window.onclick = function(e) { if (e.target == document.getElementById('mushaf-modal')) closeMushaf(); }
window.onload = loadSurahs;
