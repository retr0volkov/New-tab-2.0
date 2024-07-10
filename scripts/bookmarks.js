function ShowBookmarks() {
    document.getElementById(`bookmarks_open`).checked = true;
    chrome.storage.local.set({ bookmarks_open: true });
}

function HideBookmarks() {
    document.getElementById(`bookmarks_open`).checked = false;
    chrome.storage.local.set({ bookmarks_open: false });
}

document.getElementById(`show-bookmarks-button`).addEventListener(`click`, ShowBookmarks);
document.getElementById(`hide-bookmarks-button`).addEventListener(`click`, HideBookmarks);

chrome.storage.local.get(`bookmarks_open`, (res) => res.bookmarks_open ? ShowBookmarks() : HideBookmarks());

document.getElementById(`bk_0`).innerHTML = null;
chrome.bookmarks.getChildren(`0`, GetChildren);

function GetChildren(children) {
    children.forEach(child => {
        chrome.bookmarks.get(child.id, result => {
            result = result[0];
            if (result.url == undefined) {
                var newf = document.createElement(`div`);
                newf.innerHTML = `<div id="lbl"><label>${result.title}</label></div>`;
                newf.className = `folder`;
                newf.id = `bk_${result.id}`;
                document.getElementById(`bk_${result.parentId}`).appendChild(newf);
                
                chrome.bookmarks.getChildren(result.id, GetChildren)
            }
            else {
                var newb = document.createElement(`div`);
                newb.innerHTML = `  <div>
                                        <input id="im_${result.id}" type="checkbox" class="peer">
                                        <img class="peer-checked:block" src="${faviconURL(result.url, "64")}">
                                        <img class="peer-checked:hidden" src="./default.svg"> 
                                    </div>
                                    <div>
                                        <div>
                                            <label>${result.title}</label>
                                        </div>
                                        <div>
                                            <label id="l_bk_${result.id}">${result.url}</label>
                                        </div>
                                    </div>`;
                newb.className = `bookmark`;
                newb.id = `bk_${result.id}`;
                newb.addEventListener(`click`, OpenLink);
                document.getElementById(`bk_${result.parentId}`).appendChild(newb);
                document.getElementById(`im_${result.id}`).checked = true;
            }
        })
    });
}

function faviconURL(u, s) {
    const url = new URL(chrome.runtime.getURL(`/_favicon/`));
    url.searchParams.set(`pageUrl`, u);
    url.searchParams.set(`size`, s);
    return url.toString();
}

function OpenLink() {
    window.open(document.getElementById(`l_${this.id}`).innerHTML, `_self`);
}