window.addEventListener('load', () => {
	document.body.classList.remove('loading');
});

document.addEventListener('DOMContentLoaded', () => {
	const anchors = document.querySelectorAll('a');
	anchors.forEach((a) => {
		if (isExternalURL(a.href)) {
			a.setAttribute('target', '_blank');
			a.setAttribute('rel', 'noreferrer');
		}
	});
});
function isExternalURL(url) {
	return new URL(url).origin !== location.origin;
}
