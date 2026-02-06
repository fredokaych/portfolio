const noteText = document.getElementById("noteText");
const saveBtn = document.getElementById("saveNote");
const notesList = document.getElementById("notesList");
const statusEl = document.getElementById("status");
const queueCountEl = document.getElementById("queueCount");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let syncQueue = JSON.parse(localStorage.getItem("syncQueue")) || [];

registerServiceWorker();
render();
updateNetworkStatus();

/* -------------------------
   EVENT LISTENERS
-------------------------- */

saveBtn.addEventListener("click", () => {
    const text = noteText.value.trim();
    if (!text) return;

    const note = {
        id: Date.now(),
        text,
        synced: navigator.onLine
    };

    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));

    if (!navigator.onLine) {
        syncQueue.push(note);
        localStorage.setItem("syncQueue", JSON.stringify(syncQueue));
    }

    noteText.value = "";
    render();
});

window.addEventListener("online", () => {
    updateNetworkStatus();
    simulateSync();
});

window.addEventListener("offline", updateNetworkStatus);

/* -------------------------
   FUNCTIONS
-------------------------- */

function render() {
    notesList.innerHTML = "";
    notes.forEach(n => {
        const li = document.createElement("li");
        li.textContent = n.text + (n.synced ? "" : " (pending sync)");
        notesList.appendChild(li);
    });

    queueCountEl.textContent = syncQueue.length;
}

function updateNetworkStatus() {
    statusEl.textContent = navigator.onLine
        ? "🟢 Online"
        : "🔴 Offline";
}

function simulateSync() {
    if (!syncQueue.length) return;

    console.log("Syncing to server...");

    setTimeout(() => {
        syncQueue = [];
        notes = notes.map(n => ({ ...n, synced: true }));

        localStorage.setItem("syncQueue", JSON.stringify(syncQueue));
        localStorage.setItem("notes", JSON.stringify(notes));

        render();
        console.log("Sync complete");
    }, 1500);
}

function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js");
    }
}
