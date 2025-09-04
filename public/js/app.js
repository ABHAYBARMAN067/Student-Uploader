// frontend JS for posting form-data and listing students
const API_BASE = "http://localhost:5000/api/students";

const form = document.getElementById("studentForm");
const photoInput = document.getElementById("photo");
const preview = document.getElementById("preview");
const messageEl = document.getElementById("message");
const studentsList = document.getElementById("studentsList");
const submitBtn = document.getElementById("submitBtn");

// show image preview
photoInput.addEventListener("change", (e) => {
  preview.innerHTML = "";
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.onload = () => URL.revokeObjectURL(img.src);
  preview.appendChild(img);
});

// fetch and render students
async function fetchStudents() {
  studentsList.innerHTML = "<div class='empty'>Loading...</div>";
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Failed to fetch students");
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      studentsList.innerHTML = "<div class='empty'>No students yet.</div>";
      return;
    }
    studentsList.innerHTML = "";
    data.forEach(s => {
      const el = document.createElement("div");
      el.className = "student";
      el.innerHTML = `
        <img src="${s.photo || ''}" alt="${escapeHtml(s.name)}" />
        <div class="meta">
          <div class="name">${escapeHtml(s.name)}</div>
          <div class="roll">Roll: ${escapeHtml(String(s.rollNumber))}</div>
        </div>
      `;
      studentsList.appendChild(el);
    });
  } catch (err) {
    studentsList.innerHTML = `<div class='empty'>Error loading students</div>`;
    console.error(err);
  }
}

// helper to escape HTML (basic)
function escapeHtml(txt) {
  return txt.replace(/[&<>"']/g, (m) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
}

// handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  messageEl.textContent = "";
  submitBtn.disabled = true;
  submitBtn.textContent = "Uploading...";

  const formData = new FormData();
  const name = document.getElementById("name").value.trim();
  const rollNumber = document.getElementById("rollNumber").value.trim(); // fixed
  const file = photoInput.files[0];

  if (!name || !rollNumber || !file) {
    messageEl.textContent = "Please fill all fields and choose a photo.";
    submitBtn.disabled = false;
    submitBtn.textContent = "Upload Student";
    return;
  }

  formData.append("name", name);
  formData.append("rollNumber", rollNumber); // backend expects this
  formData.append("photo", file);

  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const err = await res.json().catch(()=>({message:"Server error"}));
      throw new Error(err.message || "Upload failed");
    }

    const result = await res.json();
    messageEl.textContent = "✅ Student uploaded successfully!";
    form.reset();
    preview.innerHTML = "";
    await fetchStudents();
  } catch (err) {
    console.error(err);
    messageEl.textContent = "Upload failed: " + (err.message || "unknown");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Upload Student";
  }
});

// initial load
fetchStudents();
