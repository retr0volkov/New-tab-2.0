var tab_p = document.getElementById(`tabs`);

//#region making elements
function Add_AddElement() {
    var add = document.createElement(`button`);
    add.classList = `tab-item tile2`;
    add.innerHTML = `   <div class="h-8 w-full">
                        </div>
                        <div class="imgh">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="">
                                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                            </svg>                              
                        </div>
                        <label>Добавить</label>`;
    add.addEventListener(`click`, AddTab_Click);

    tab_p.appendChild(add);
}

function Add_LinkElement(title, link, index) {
    var add = document.createElement(`a`);
    add.classList = `tab-item tile2 group`;
    add.href = link;

    var b_holder = document.createElement(`div`);
    b_holder.classList = `h-8 w-full invisible group-hover:visible`;

    var edit = document.createElement(`button`);
    edit.classList = `float-left`;
    edit.innerHTML = `  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="">
                            <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                        </svg>`;
    edit.id = index;
    edit.addEventListener(`click`, EditTab_Click);
    b_holder.appendChild(edit);

    var del = document.createElement(`button`);
    del.classList = `float-right`;
    del.innerHTML = `   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="m-[-4px]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>`;
    del.id = index;
    del.addEventListener(`click`, RemoveElement);
    b_holder.appendChild(del);

    add.appendChild(b_holder);

    var imgh = document.createElement(`div`);
    imgh.classList = `imgh`;
    imgh.innerHTML = `<img id="img${index}" src="${faviconURL(link, 48)}" alt="${title}">`;
    add.appendChild(imgh);

    var lbl = document.createElement(`label`);
    lbl.innerHTML = title;
    add.appendChild(lbl);

    tab_p.appendChild(add);
}

function faviconURL(u, s) {
    const url = new URL(chrome.runtime.getURL(`/_favicon/`));
    url.searchParams.set(`pageUrl`, u);
    url.searchParams.set(`size`, s);
    return url.toString();
}

function RemoveElement(event) {
    event.preventDefault();
    var id = this.id;
    chrome.storage.sync.get(`tabs`, function (tabs_l) {
        tabs_l.tabs.list.splice(id, 1);
        tabs_l.tabs.total--;
        chrome.storage.sync.set({ tabs: tabs_l.tabs });
        chrome.storage.sync.get(`tabs`, MakeTabs);
    });
}

function MakeTabs(result) {
    tab_p.innerHTML = ``;

    for (let i = 0; i < result.tabs.list.length; i++) {
        Add_LinkElement(result.tabs.list[i].name, result.tabs.list[i].link, i);
    }

    if (result.tabs.list.length < 10) Add_AddElement();
}
//#endregion
chrome.storage.sync.get(`tabs`, MakeTabs);

//#region dialog
var edit_dialog = document.getElementById(`edit-dialog`);
var temp_edit_id = 0;

function AddTab_Click() {
    Show_EditInterface();
}

function Show_EditInterface(name = ``, link = ``, is_edit = false, id) {
    edit_dialog.classList.remove(`invisible`);
    document.getElementById(`name-text`).value = name;
    document.getElementById(`link-text`).value = link;
    if (is_edit)
        document.getElementById(`save-edit`).addEventListener(`click`, Save_Click);
    else
        document.getElementById(`save-edit`).addEventListener(`click`, NewTab_Click);
}

function Close_EditInterface() {
    edit_dialog.classList.add(`invisible`);
}

function EditTab_Click(event) {
    event.preventDefault();
    var id = this.id;
    chrome.storage.sync.get(`tabs`, function (result) {
        Show_EditInterface(result.tabs.list[id].name, result.tabs.list[id].link, true, id);
        temp_edit_id = id;
    });
}

function Save_Click() {
    Save_Tab(temp_edit_id, document.getElementById(`name-text`).value, document.getElementById(`link-text`).value);
}

function Save_Tab(id, name, link) {
    chrome.storage.sync.get(`tabs`, function (tabs_l) {
        tabs_l.tabs.list[id].name = name;
        tabs_l.tabs.list[id].link = link;
        chrome.storage.sync.set({ tabs: tabs_l.tabs });
        chrome.storage.sync.get(`tabs`, MakeTabs);
        Close_EditInterface();
        document.getElementById(`save-edit`).removeEventListener(`click`, Save_Click);
    });
}

function NewTab_Click() {
    AddNew_Tab(document.getElementById(`name-text`).value, document.getElementById(`link-text`).value);
}

function AddNew_Tab(name, link) {
    chrome.storage.sync.get(`tabs`, function (tabs_l) {
        tabs_l.tabs.list.push({ 'link': link, 'name': name });
        tabs_l.tabs.total++;
        chrome.storage.sync.set({ tabs: tabs_l.tabs });
        chrome.storage.sync.get(`tabs`, MakeTabs);
        Close_EditInterface();
        document.getElementById(`save-edit`).removeEventListener(`click`, NewTab_Click);
    })
}
//#endregion

document.getElementById(`close-edit`).addEventListener(`click`, Close_EditInterface);