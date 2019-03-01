var links = document.querySelectorAll('a');
for (let link of links){
	let href = link.href;
	if (href.includes('youtube')){
		let id = href.split('v=')[1];
		let iframe = document.createElement('iframe');
		iframe.src = `https://www.youtube.com/embed/${id}`;
		link.parentNode.appendChild(iframe);
		link.parentNode.removeChild(link);
	} else if (href.includes('vimeo')){
		let regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
		let match = href.match(regExp);
		if (match){
			let id = match[2];
			let iframe = document.createElement('iframe');
			iframe.src = `https://player.vimeo.com/video/${id}?color=ffffff&title=0&byline=0&portrait=0`;
			link.parentNode.appendChild(iframe);
			link.parentNode.removeChild(link);
		}
	}
}