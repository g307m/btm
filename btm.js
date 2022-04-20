var dir = "/btm/"

function setVideo(path) {
	var player = document.getElementById("player-video");
    player.pause();
	player.src = dir + path.toString();
	player.load();
	player.style.visibility = "visible";
	var player = document.getElementById("player-video");
}

function addMediaListing(type, file) {
	var row = document.getElementById("browser-table").insertRow(-1);
    var t = row.insertCell(0);
    var f = row.insertCell(1);

    t.innerHTML = type.toString();
    f.innerHTML = file.toString();
	row.classList.add('listing');
	row.onclick = (e) => {
			e = e || window.event;
			var target = e.target;
			while (!target.nodeName.toLowerCase().startsWith("tr")) {
				target = target.parentElement;
			}
			if (target.children[0].innerText.toLowerCase() == "video") {
				setVideo(target.children[1].innerText);
			} else {
				dir = dir + target.children[1].innerText;
				reloadListing();
			}
		};
}

function reloadListing() {
	var table = document.getElementById("browser-table");
	var req = new XMLHttpRequest();
    req.open( "GET", dir + "listing.txt", false );
	req.send(null);
	if (req.status != 200) return;
	text = req.responseText;
	table.innerText = "";
	for (let line of text.split("\n")) {
		var i = line.split(" ");
		addMediaListing(i[0], i[1]);
	}
}
