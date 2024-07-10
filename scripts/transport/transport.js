// chrome.storage.sync.get(`transport`, (res) => {
//     console.log(res.transport);
//     res.transport.push({ `from`: `Краснодар`, `to`: `Абинск`, `dep`: `17:42`, `arr`: `19:22` });
//     res.transport.push({ `from`: `Краснодар`, `to`: `Абинск`, `dep`: `08:30`, `arr`: `10:15` });
//     res.transport.push({ `from`: `Абинск`, `to`: `Краснодар`, `dep`: `05:41`, `arr`: `07:20` });
//     res.transport.push({ `from`: `Абинск`, `to`: `Краснодар`, `dep`: `17:28`, `arr`: `19:22` });
//     chrome.storage.sync.set({ `transport`: res.transport });
// })

chrome.storage.sync.get(`transport`, res => {
    res.transport
})

MakeTransport();

function MakeTransport()
{
    document.getElementById(`t_main`).innerHTML = null;
    AddTitle();
    AddTimes();
}

function AddTitle() {
    var t1 = document.createElement(`p`);
    t1.innerHTML = `Откуда`;
    document.getElementById(`t_main`).appendChild(t1);

    var t2 = document.createElement(`p`);
    t2.innerHTML = `Куда`;
    document.getElementById(`t_main`).appendChild(t2);

    var t3 = document.createElement(`p`);
    t3.innerHTML = `Отпр.`;
    document.getElementById(`t_main`).appendChild(t3);

    var t4 = document.createElement(`p`);
    t4.innerHTML = `Приб.`;
    document.getElementById(`t_main`).appendChild(t4);
}

function AddTimes() {
    chrome.storage.sync.get(`transport`, res => {
        res.transport.forEach(el => {
            var t1 = document.createElement(`label`);
            t1.innerHTML = el.from;
            document.getElementById(`t_main`).appendChild(t1);

            var t2 = document.createElement(`label`);
            t2.innerHTML = el.to;
            document.getElementById(`t_main`).appendChild(t2);

            var t3 = document.createElement(`label`);
            t3.innerHTML = el.dep;
            document.getElementById(`t_main`).appendChild(t3);

            var t4 = document.createElement(`label`);
            t4.innerHTML = el.arr;
            document.getElementById(`t_main`).appendChild(t4);
        });
        AddButton();
    });
}

function AddButton() {
    var elem = document.createElement(`button`);
    elem.className = `text-neutral-300 h-8 content-centers tile2 rounded col-span-4 mr-3 outline-none`;
    elem.innerHTML = `  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                        </svg>`;
    document.getElementById(`t_main`).appendChild(elem);
}
