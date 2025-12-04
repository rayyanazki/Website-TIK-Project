const yearData = {
    2020: { productivity: '6.40', rainfall: '57.84' },
    2021: { productivity: '6.80', rainfall: '54.55' },
    2022: { productivity: '6.70', rainfall: '63.35' },
    2023: { productivity: '5.99', rainfall: '61.15' },
    2024: { productivity: '6.40', rainfall: '65.12' }
};

// Data detail author (disimpan di JS agar mudah diakses Modal)
const authorDetails = {
    1: {
        nama: 'Naufal Auliya',
        status: 'Penabuh',
        umur: '20',
        hobby: 'Basket'
    },
    2: {
        nama: 'M Azkiya Arrayyan',
        status: 'Belum menikah',
        umur: '19',
        hobby: 'Basket'
    },
    3: {
        nama: 'Fawwaz Naufal R',
        status: 'Jendral 1',
        umur: '20',
        hobby: 'Bameran dan THH'
    }
};

let currentActiveAuthor = null;

// =======================================================
// A. NAVBAR & SCROLL LOGIC
// =======================================================

function handleScroll() {
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        scrollIndicator.classList.add('hidden');
    } else {
        navbar.classList.remove('scrolled');
        scrollIndicator.classList.remove('hidden');
    }

    // Active navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for navigation
function setupNavSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

// =======================================================
// B. ACCORDION LOGIC
// =======================================================

function toggleAccordion(index) {
    const content = document.getElementById('content-' + index);
    const arrow = document.getElementById('arrow-' + index);

    // Close all other accordions
    for (let i = 0; i < 3; i++) {
        if (i !== index) {
            document.getElementById('content-' + i).classList.remove('active');
            document.getElementById('arrow-' + i).classList.remove('active');
        }
    }

    // Toggle selected accordion
    content.classList.toggle('active');
    arrow.classList.toggle('active');
}

// =======================================================
// C. EXPLORATION LOGIC
// =======================================================

function searchYear() {
    const year = document.getElementById('yearInput').value;
    const resultContainer = document.querySelector('#eksplorasi .container');
    
    // Clear previous results except the title and form
    const oldResults = document.getElementById('yearResultContainer');
    if (oldResults) oldResults.remove();

    if (year >= 2020 && year <= 2024 && yearData[year]) {
        const data = yearData[year];
        const resultHTML = `
            <div id="yearResultContainer" class="kpi-grid" style="margin-top: 50px;">
                <div class="kpi-card">
                    <h3>${year}</h3>
                    <p>Tahun Analisis</p>
                </div>
                <div class="kpi-card">
                    <h3>${data.rainfall}</h3>
                    <p>Hari Hujan Kritis (>10mm)</p>
                </div>
                <div class="kpi-card horizontal">
                    <h3>${data.productivity}</h3>
                    <p>Produktivitas Rata-Rata Tahunan (Kg/Ha)</p>
                </div>
    
                </div>
            </div>
        `;
        resultContainer.insertAdjacentHTML('beforeend', resultHTML);
    } else {
        const errorHTML = `
            <div id="yearResultContainer" style="margin-top: 50px; text-align: center;">
                <p style="color: var(--accent-red); font-weight: 600;">Data untuk tahun ${year} tidak ditemukan atau input salah. Masukkan tahun antara 2020-2024.</p>
            </div>
        `;
        resultContainer.insertAdjacentHTML('beforeend', errorHTML);
    }
}

function showYearDetails(year) {
    // Fungsi ini bisa menampilkan modal dengan detail tambahan tentang tahun tersebut
    alert(`Menampilkan detail dampak dan rekomendasi untuk tahun ${year}.`);
}

// =======================================================
// D. AUTHOR MODAL LOGIC
// =======================================================

function openAuthorModal(authorName, id) {
    const modal = document.getElementById('authorModal');
    const title = document.getElementById('authorModalTitle');
    const body = document.getElementById('authorModalBody');
    const detail = authorDetails[id];

    if (!detail) return;

    title.textContent = `Detail ${authorName}`;
    body.innerHTML = `
        <div class="author-info">
            <div class="author-info-item">
                <strong>Nama:</strong>
                <span>${detail.nama}</span>
            </div>
            <div class="author-info-item">
                <strong>Status:</strong>
                <span>${detail.status}</span>
            </div>
            <div class="author-info-item">
                <strong>Umur:</strong>
                <span>${detail.umur}</span>
            </div>
            <div class="author-info-item">
                <strong>Hobby:</strong>
                <span>${detail.hobby}</span>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeAuthorModal() {
    document.getElementById('authorModal').style.display = 'none';
}

// =======================================================
// E. INITIALIZATION
// =======================================================

// Add event listeners when the content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Scroll Listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 2. Setup Nav Smooth Scroll
    setupNavSmoothScroll();

    // 3. Setup Modal Close on outside click
    document.getElementById('authorModal').addEventListener('click', (e) => {
        if (e.target.id === 'authorModal') {
            closeAuthorModal();
        }
    });
});