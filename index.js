const noteForm = document.querySelector("#note-form")
const notesText = document.querySelector("#notes-text")
const notesBtn = document.querySelector("#notes-btn")
const notesList = document.querySelector("#notes-list")
const tasksCount = document.querySelector("#tasks-count")
const completeCount = document.querySelector("#complete-count")
const noteViewBox = document.querySelector("#note-view-box")
const viewTitle = document.querySelector("#view-title")
const viewContent = document.querySelector("#view-content")
const noteHeading = document.querySelector("#notes-heading")
const cancelBtn = document.querySelector("#cancel-btn")

let notes = [
    {
        id: Date.now() + 1,
        heading: "HTML",
        content: "HTML ka full form.... HyperText Markup Language h. HTML ka use web pages ka structure banane ke liye kiya jata h.HTML tags webpage ke elements ko define krte hain . jaise h1 heading our p paragraph ke liye use hota hai.",
        isCompleted: false
    },

    {
        id: Date.now() + 2,
        heading: "CSS",
        content: "CSS ka full form.....Cascading Style Sheet hai. CSS ka use webpage ko design or style krne ke liye hota h ",
        isCompleted: true
    },

    {
        id: Date.now() + 3,
        heading: "JavaScript",
        content: "JavaScript ek programming language h. Iska use webpage ko intractive or dynamic banane ke liye hota h ....",
        isCompleted: false
    }
]

let editNotesId = null

function randorNotes() {

    notesList.innerHTML = ""

    notes.forEach((note) => {
        const li = document.createElement("li")
        // const a = document.createElement("a")

        li.className = "flex gap-2 border border-slate-400 p-4 rounded-xl bg-pink-200   "
        li.dataset.id = note.id
        // <a href="#"  class="flex-1">${note.heading}</a>

        li.innerHTML = `<input type="checkbox" data-action = "toggle" ${note.isCompleted ? "checked" : ""}>
                         <p class="flex-1 cursor-pointer note-text">${note.heading}</p>
                <div class="flex gap-2">
                    <button data-action = "edit" class="px-2.5 py-1 text-xs font-medium text-pink-700 bg-purple-300 hover:bg-amber-100 rounded transition-colors cursor-pointer sm:text-base ">Edit</button>
                    <button data-action = "delete" class="px-2.5 py-1 text-xs font-medium text-rose-600 bg-pink-300 hover:bg-rose-100 rounded transition-colors cursor-pointer " >Delete</button>
                </div>`
        notesList.append(li)

    })

    tasksCount.textContent = `TASKS (${notes.length})`
    completeCount.textContent = `COMPLETED: ${notes.filter((note) => note.isCompleted).length}`

}
randorNotes()

noteForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const notesValue = notesText.value.trim()
    const headingValue = noteHeading.value.trim()

    if (!notesValue) {
        return
    }

    console.log(editNotesId, notesValue);

    if (editNotesId) {
        notes = notes.map((note) => {
            if (note.id === Number(editNotesId)) {
                return {
                    ...note,
                    heading: headingValue,
                    content: notesValue
                }
            }
            return note
        })
        viewTitle.innerHTML = headingValue;
        viewContent.innerHTML = notesValue;
        noteViewBox.classList.remove("hidden")
        noteViewBox.classList.add("block");

        editNotesId = null;
        notesBtn.textContent = "Add Note"
        notesBtn.className = " bg-blue-700 py-2 px-7 rounded-lg text-white hover:bg-blue-500 transition-colors cursor-pointer"
    } else {
        let newNotes = {
            id: Date.now() + Math.random(),
            heading: headingValue,
            content: notesValue,
            isCompleted: false
        }

        notes.push(newNotes)

    }
    cancelEdit()
    // notesBtn.textContent = "Add Note"
    noteHeading.value = ""
    notesText.value = ""
    randorNotes()

    viewTitle.innerHTML = headingValue
    viewContent.innerHTML = notesValue
    //noteViewBox.classList.replace("block" , "hidden")
})

notesList.addEventListener("click", (e) => {
    e.stopPropagation()

    const li = e.target.closest("li")
    const id = li.dataset.id

    let action = e.target.dataset.action

    if (action === "delete") {
        deleteNote(Number(id))
        return;
    }

    if (action === "edit") {
        startEdit(Number(id))
        return;
    }

    if (action === "toggle") {
        notes = notes.map((note) => {
            if (note.id === Number(id)) {
                return {
                    ...note,
                    isCompleted: !note.isCompleted
                }
            }
            return note
        })
        randorNotes()
        return;
    }

    if (e.target.classList.contains("note-text")) {
        const currentNote = notes.find(note => note.id === Number(id));
        if (currentNote) {
            viewTitle.innerHTML = currentNote.heading
            viewContent.innerHTML = currentNote.content

            noteViewBox.classList.remove("hidden");
            noteViewBox.classList.add("block")
        }

    }
})


function deleteNote(id) {
    notes = notes.filter((note) => {
        if (note.id !== Number(id)) {
            return note
        }
    })
    viewTitle.innerHTML = "";
    viewContent.innerHTML = ""
    noteViewBox.classList.remove("block")
    noteViewBox.classList.add("hidden")
    randorNotes()
}

function startEdit(id) {

    editNotesId = id;
    let currentNote = notes.find((note) => {
        if (note.id === Number(id)) {
            return note
        }
    })
    noteHeading.value = currentNote.heading;
    notesText.value = currentNote.content
    notesBtn.textContent = "Update"
    notesBtn.className = "px-5 py-2 bg-purple-500 hover:bg-purple-800 text-white font-medium rounded-lg transition-colors cursor-pointer";

    cancelBtn.classList.remove("hidden");
}


function cancelEdit() {
    editNotesId = null;

    notesText.value = "";
    noteHeading.value = ""

     notesBtn.textContent = "Add Note";


    notesBtn.className =
        "px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors cursor-pointer";

    cancelBtn.classList.add("hidden");
}


cancelBtn.addEventListener("click", () => {
    cancelEdit();
});