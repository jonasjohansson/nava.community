var links = document.querySelectorAll('a');
for (let link of links){
	const url = link.href;
	let iframe = document.createElement('iframe');
	var id = false;
	if (url.includes('youtu')){
		id = youtube_parser(url);
		iframe.src = `https://www.youtube.com/embed/${id}`;
	} else if (url.includes('vimeo')){
		id = vimeo_parser(url);
		iframe.src = `https://player.vimeo.com/video/${id}`;
	}
	if (id){
		link.parentNode.appendChild(iframe);
		link.parentNode.removeChild(link);
	}
}
function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
function vimeo_parser(url){
	var regExp = /http(s)?:\/\/(www\.)?vimeo.com\/(\d+)(\/)?(#.*)?/
	var match = url.match(regExp)
	if (match)
	    return match[3]
}