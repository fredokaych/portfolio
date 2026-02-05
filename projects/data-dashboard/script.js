const state = {
    rawData: [],
    filteredData: [],
    currentPage: 1,
    pageSize: 10
};

const tableBody = document.getElementById("tableBody");
const countyFilter = document.getElementById("countyFilter");
const levelFilter = document.getElementById("levelFilter");
const searchInput = document.getElementById("searchInput");

const totalSchoolsEl = document.getElementById("totalSchools");
const avgScoreEl = document.getElementById("avgScore");
const totalEnrollmentEl = document.getElementById("totalEnrollment");

const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const pageInfoEl = document.getElementById("pageInfo");

const canvas = document.getElementById("chartCanvas");
const ctx = canvas.getContext("2d");

fetch("data/education_data.json")
    .then(res => res.json())
    .then(data => {
        state.rawData = data;
        populateCountyFilter(data);
        applyFilters();
    });

function populateCountyFilter(data) {
    const counties = [...new Set(data.map(d => d.county))];
    counties.forEach(c => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        countyFilter.appendChild(option);
    });
}

function applyFilters() {
    const county = countyFilter.value;
    const level = levelFilter.value;
    const search = searchInput.value.toLowerCase();

    state.filteredData = state.rawData.filter(d => {
        return (
            (county === "all" || d.county === county) &&
            (level === "all" || d.level === level) &&
            d.school.toLowerCase().includes(search)
        );
    });

    state.currentPage = 1;

    renderTable();
    renderMetrics();
    renderChart();
}

function renderTable() {
    tableBody.innerHTML = "";

    const start = (state.currentPage - 1) * state.pageSize;
    const end = start + state.pageSize;
    const pageData = state.filteredData.slice(start, end);

    pageData.forEach(d => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${d.school}</td>
            <td>${d.county}</td>
            <td>${d.level}</td>
            <td>${d.enrollment}</td>
            <td>${d.mean_score}</td>
        `;
        tableBody.appendChild(row);
    });

    renderPaginationControls();
}

function renderPaginationControls() {
    const totalPages =
        Math.ceil(state.filteredData.length / state.pageSize) || 1;

    pageInfoEl.textContent = `Page ${state.currentPage} of ${totalPages}`;

    prevPageBtn.disabled = state.currentPage === 1;
    nextPageBtn.disabled = state.currentPage === totalPages;
}

function renderMetrics() {
    totalSchoolsEl.textContent = state.filteredData.length;

    const avg =
        state.filteredData.reduce((s, d) => s + d.mean_score, 0) /
        (state.filteredData.length || 1);

    const enrollment =
        state.filteredData.reduce((s, d) => s + d.enrollment, 0);

    avgScoreEl.textContent = avg.toFixed(2);
    totalEnrollmentEl.textContent = enrollment;
}

function renderChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const grouped = {};
    state.filteredData.forEach(d => {
        if (!grouped[d.county]) grouped[d.county] = [];
        grouped[d.county].push(d.mean_score);
    });

    const counties = Object.keys(grouped);
    const values = counties.map(
        c => grouped[c].reduce((a, b) => a + b, 0) / grouped[c].length
    );

    const barWidth = 60;
    const gap = 30;
    const maxVal = Math.max(...values, 10);

    counties.forEach((c, i) => {
        const height = (values[i] / maxVal) * 200;
        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(
            80 + i * (barWidth + gap),
            250 - height,
            barWidth,
            height
        );
        ctx.fillStyle = "#f8fafc";
        ctx.fillText(c, 80 + i * (barWidth + gap), 270);
    });
}

prevPageBtn.addEventListener("click", () => {
    if (state.currentPage > 1) {
        state.currentPage--;
        renderTable();
    }
});

nextPageBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(
        state.filteredData.length / state.pageSize
    );
    if (state.currentPage < totalPages) {
        state.currentPage++;
        renderTable();
    }
});

[countyFilter, levelFilter, searchInput].forEach(el =>
    el.addEventListener("input", applyFilters)
);
