function ShowWidgets() {
    document.getElementById("widgets_open").checked = true;
    chrome.storage.local.set({ widgets_open: true });
}

function HideWidgets() {
    document.getElementById("widgets_open").checked = false;
    chrome.storage.local.set({ widgets_open: false });
}

document.getElementById("show-widgets-button").addEventListener("click", ShowWidgets);
document.getElementById("hide-widgets-button").addEventListener("click", HideWidgets);

chrome.storage.local.get(['widgets_open'], (res) => res.widgets_open ? ShowWidgets() : HideWidgets());