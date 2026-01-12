const juz27Data = { "Edh-Dharijat": {start:520, end:523}, "Et-Tur": {start:523, end:525}, "En-Nexhm": {start:526, end:528}, "El-Kamer": {start:528, end:531}, "Er-Rahman": {start:531, end:534}, "El-Waki'ah": {start:534, end:537}, "El-Hadid": {start:537, end:541} };
const surahs = { juz27: Object.keys(juz27Data), juz28: ["El-Muxhadeleh"], juz29: ["El-Mulk"], juz30: ["En-Nebe"] };

function loadSurahs() {
    for (let juz in surahs) {
        const container = document.getElementById(juz);
        if (!container) continue;
        container.innerHTML = "";
        surahs[juz].forEach(s => {
            container.innerHTML += `<div class="surah-item"><div class="surah-name" onclick="showDetails('${s}')">${s}</div></div>`;
        });
    }
}

function showDetails(surahName) {
    const data = juz27Data[surahName];
    if (!data) return alert("Vetëm Xhuzi 27 është aktiv!");
    document.getElementById('main-view').style.display = 'none';
    document.getElementById('surah-detail-view').style.display = 'block';
    document.getElementById('detail-surah-name').innerText = surahName;
    const container = document.getElementById('pages-container');
    container.innerHTML = '';
    for (let i = data.start; i <= data.end; i++) {
        container.innerHTML += `<div style="padding:10px; border-bottom:1px solid #333;"><span style="color:gold; cursor:pointer;" onclick="openMushaf(${i})">📖 Faqja ${i}</span></div>`;
    }
}

function openMushaf(page) {
    const modal = document.getElementById('mushaf-modal');
    const frame = document.getElementById('mushaf-frame');
    frame.src = `https://quran.com/page/${page}`; // Metoda iframe e sigurt
    modal.style.display = 'flex';
}

function closeMushaf() {
    document.getElementById('mushaf-modal').style.display = 'none';
    document.getElementById('mushaf-frame').src = "";
}

function goBack() {
    document.getElementById('surah-detail-view').style.display = 'none';
    document.getElementById('main-view').style.display = 'block';
}

function toggleJuz(id) {
    const el = document.getElementById(id);
    el.style.display = (el.style.display === "block") ? "none" : "block";
}

window.onload = loadSurahs;
