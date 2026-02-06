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

    // Check if editing an existing note
    if (noteText.dataset.editId) {
        const editId = parseInt(noteText.dataset.editId);
        notes = notes.map(n => n.id === editId ? { ...n, text, synced: navigator.onLine } : n);
        if (!navigator.onLine) {
            const note = notes.find(n => n.id === editId);
            syncQueue.push(note);
        }
        delete noteText.dataset.editId;
    } else {
        const note = {
            id: Date.now(),
            text,
            synced: navigator.onLine
        };
        notes.push(note);

        if (!navigator.onLine) {
            syncQueue.push(note);
        }
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("syncQueue", JSON.stringify(syncQueue));

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

        li.innerHTML = `
            <span>${n.text} ${n.synced ? "" : "(pending sync)"}</span>
            <div class="note-actions">
                <button class="edit-btn" data-id="${n.id}">Edit</button>
                <button class="delete-btn" data-id="${n.id}">Delete</button>
            </div>
        `;

        notesList.appendChild(li);
    });

    queueCountEl.textContent = syncQueue.length;

    // Add event listeners for new buttons
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            const note = notes.find(n => n.id === id);
            noteText.value = note.text;
            noteText.dataset.editId = id;
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            notes = notes.filter(n => n.id !== id);
            syncQueue = syncQueue.filter(n => n.id !== id);
            localStorage.setItem("notes", JSON.stringify(notes));
            localStorage.setItem("syncQueue", JSON.stringify(syncQueue));
            render();
        });
    });
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
