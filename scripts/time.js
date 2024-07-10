UpdateTime();
setInterval(UpdateTime, 500);

function UpdateTime() {
    const lol = new Date();
    document.getElementById("clock").innerHTML = `${lol.getHours() > 9 ? lol.getHours() : "0" + lol.getHours()}:${lol.getMinutes() > 9 ? lol.getMinutes() : "0" + lol.getMinutes()}:${lol.getSeconds() > 9 ? lol.getSeconds() : "0" + lol.getSeconds()}`;
}