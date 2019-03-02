$.ajax({
	url: 'data.csv',
	dataType: 'text'
}).done(successFunction);

function successFunction(data) {
	const rows = data.split(/\r?\n|\r/);
	for (let row of rows) {
		var rowEl = document.createElement('div');
		rowEl.classList.add('row');
		const cells = row.split(',');

		for (let cell of cells) {
			var cellEl = document.createElement('div');
			cellEl.classList.add('cell');
			var iframe = document.createElement('iframe');

			if (cell.includes('youtu')) {
				id = youtube_parser(cell);
				iframe.src = `https://www.youtube.com/embed/${id}`;
			} else if (cell.includes('vimeo')) {
				id = vimeo_parser(cell);
				iframe.src = `https://player.vimeo.com/video/${id}`;
			}

			if (iframe.src) {
				cellEl.appendChild(iframe);
			} else {
				if (isValidURL(cell)) {
					var a = document.createElement('a');
					a.href = cell;
					a.target = '_blank';
					a.innerHTML = cell;
					cellEl.appendChild(a);
				} else {
					cellEl.innerHTML = cell;
				}
			}

			rowEl.appendChild(cellEl);
		}

		document.body.appendChild(rowEl);
	}
}

function isValidURL(str) {
	var a = document.createElement('a');
	a.href = str;
	return a.host && a.host != window.location.host;
}

function youtube_parser(url) {
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regExp);
	return match && match[7].length == 11 ? match[7] : false;
}
function vimeo_parser(url) {
	var regExp = /http(s)?:\/\/(www\.)?vimeo.com\/(\d+)(\/)?(#.*)?/;
	var match = url.match(regExp);
	if (match) return match[3];
}
