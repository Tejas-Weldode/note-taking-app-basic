
if (localStorage.getItem("itemjson") != null) update();

function addnote() {

    noteobject = {
        title: document.getElementById("titleID").value,
        note: document.getElementById("noteID").value
    }

    // creating and updating itemjsonarray

    if (localStorage.getItem("itemjson") == null) {
        itemjsonarray = [];
        itemjsonarray.push(noteobject);
        localStorage.setItem("itemjson", JSON.stringify(itemjsonarray));
    }
    else {
        itemjsonarray = JSON.parse(localStorage.getItem("itemjson"));
        itemjsonarray.push(noteobject);
        localStorage.setItem("itemjson", JSON.stringify(itemjsonarray));
    }

    index = itemjsonarray.length - 1;
    console.log("adding", index);
    // uodating the user interface

    document.getElementById("noteslistID").innerHTML = document.getElementById("noteslistID").innerHTML + `
        <div class="col note">
            <div class="card bg-warning">
                <div class="card-body">
                    <h5 class="card-title">${noteobject.title}</h5>
                    <p class="card-text">${noteobject.note}</p>
                </div>
                <div class="card-body">
                    <button class="btn btn-sm btn-danger mx-1 my-1" type="submit" onclick="Delete(${index})">Delete</button>
                    <button class="btn btn-sm btn-light mx-1 my-1" type="submit" onclick="Edit(${index})">Edit</button>
                </div>
            </div>
        </div>
    `

    document.getElementById("titleID").value = "";
    document.getElementById("noteID").value = "";
}

function update() {
    itemjsonarray = JSON.parse(localStorage.getItem("itemjson"));

    index = 0;
    itemjsonarray.forEach(() => {

        console.log("updating", index);

        Title = itemjsonarray[index].title;
        Note = itemjsonarray[index].note;

        document.getElementById("noteslistID").innerHTML = document.getElementById("noteslistID").innerHTML + `
        <div class="col note">
            <div class="card bg-warning">
                <div class="card-body">
                    <h5 class="card-title">${Title}</h5>
                    <p class="card-text">${Note}</p>
                </div>
                <div class="card-body">
                    <button class="btn btn-sm btn-danger mx-1 my-1" type="submit" onclick="Delete(${index})">Delete</button>
                    <button class="btn btn-sm btn-light mx-1 my-1" type="submit" onclick="Edit(${index})">Edit</button>
                </div>
            </div>
        </div>
        `
        index++;
    });
}

function Delete(indexnumber) {
    console.log("deleting", indexnumber);
    itemjsonarray = JSON.parse(localStorage.getItem("itemjson"));
    itemjsonarray.splice(indexnumber, 1);
    localStorage.setItem("itemjson", JSON.stringify(itemjsonarray));
    document.getElementById("noteslistID").innerHTML = ``;
    update();
}

function Edit(indexnumber) {
    console.log("editing", indexnumber);
    itemjsonarray = JSON.parse(localStorage.getItem("itemjson"));

    document.getElementById("userinputID").innerHTML = `
        <div class="form-floating mb-3 text-bg-light">
            <input type="email"
                class="form-control my-3 text-bg-light border-top-0 border-start-0 border-end-0"
                id="titleEditID" placeholder="Title" value="${itemjsonarray[indexnumber].title}">
            <label for="floatingInput">Title</label>
        </div>

        <div class="form-floating text-bg-light">
            <label for="floatingInputValue"></label>
            <textarea class="form-control my-3 text-bg-light border-top-0 border-start-0 border-end-0" id="noteEditID">${itemjsonarray[indexnumber].note}</textarea>
        </div>

        <button class="btn btn-primary btn-sm" type="submit" onclick="SaveEdit(${indexnumber})">Save</button>
        <button class="btn btn-outline-secondary btn-sm" type="submit" onclick="CancelEdit()">Cancel</button>
    `;
}

function CancelEdit(){
    document.getElementById("userinputID").innerHTML = `
        <div class="form-floating mb-3 text-bg-light">
            <input type="email"
                class="form-control my-3 text-bg-light border-top-0 border-start-0 border-end-0"
                id="titleID" placeholder="Title">
            <label for="floatingInput">Title</label>
        </div>

        <div class="form-floating text-bg-light">
            <textarea class="form-control my-3 text-bg-light border-top-0 border-start-0 border-end-0"
                placeholder="Leave a comment here" id="noteID"></textarea>
            <label for="floatingTextarea">Note</label>
        </div>

        <button class="btn btn-warning btn-sm" type="submit" onclick="addnote()">Add</button>
    `;
}

function SaveEdit(indexnumber) {
    console.log("saving", indexnumber);
    itemjsonarray = JSON.parse(localStorage.getItem("itemjson"));

    noteobject = {
        title: document.getElementById("titleEditID").value,
        note: document.getElementById("noteEditID").value
    }

    itemjsonarray.splice(indexnumber, 1, noteobject);
    localStorage.setItem("itemjson", JSON.stringify(itemjsonarray));

    document.getElementById("userinputID").innerHTML = `
        <div class="form-floating mb-3 text-bg-light">
            <input type="email"
                class="form-control my-3 text-bg-light border-top-0 border-start-0 border-end-0"
                id="titleID" placeholder="Title">
            <label for="floatingInput">Title</label>
        </div>

        <div class="form-floating text-bg-light">
            <textarea class="form-control my-3 text-bg-light border-top-0 border-start-0 border-end-0"
                placeholder="Leave a comment here" id="noteID"></textarea>
            <label for="floatingTextarea">Note</label>
        </div>

        <button class="btn btn-warning btn-sm" type="submit" onclick="addnote()">Add</button>
    `;
    document.getElementById("noteslistID").innerHTML = ``;
    update();
}