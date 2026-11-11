/* Click-to-enlarge for screenshots on project pages.

   Every image inside a <figure> in .project becomes a button that opens the
   full image in a modal <dialog>. Nothing needs to be added to a page's
   markup. Without JavaScript the images simply stay as plain pictures.

   The dialog closes with the X button, a click on the dark background, or
   the Esc key (the browser handles Esc and returns focus to the image). */

(function () {
	'use strict';

	var images = document.querySelectorAll('.project figure img');
	if (!images.length || typeof HTMLDialogElement === 'undefined') return;

	var dialog = document.createElement('dialog');
	dialog.className = 'lightbox';
	dialog.setAttribute('aria-label', 'Enlarged image');
	dialog.innerHTML =
		'<button type="button" class="lightbox-close" aria-label="Close enlarged image">' +
		'<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">' +
		'<path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>' +
		'</svg></button>' +
		'<figure class="lightbox-figure"><img class="lightbox-img" alt="">' +
		'<figcaption class="lightbox-caption"></figcaption></figure>';
	document.body.appendChild(dialog);

	var bigImg = dialog.querySelector('.lightbox-img');
	var caption = dialog.querySelector('.lightbox-caption');
	var closeBtn = dialog.querySelector('.lightbox-close');

	function open(img) {
		bigImg.src = img.currentSrc || img.src;
		bigImg.alt = img.alt;
		var fig = img.closest('figure');
		var cap = fig && fig.querySelector('figcaption');
		caption.textContent = cap ? cap.textContent : '';
		caption.hidden = !cap;
		document.documentElement.classList.add('lightbox-open');
		dialog.showModal();
	}

	Array.prototype.forEach.call(images, function (img) {
		var button = document.createElement('button');
		button.type = 'button';
		button.className = 'zoom-button';
		button.setAttribute('aria-haspopup', 'dialog');
		img.parentNode.insertBefore(button, img);
		button.appendChild(img);
		var hint = document.createElement('span');
		hint.className = 'visually-hidden';
		hint.textContent = ' (opens a larger view)';
		button.appendChild(hint);
		button.addEventListener('click', function () { open(img); });
	});

	closeBtn.addEventListener('click', function () { dialog.close(); });

	// The dialog fills the screen, so a click that lands on the dialog itself
	// (not the image, caption or button) is a click on the dark background.
	dialog.addEventListener('click', function (event) {
		if (event.target === dialog) dialog.close();
	});

	dialog.addEventListener('close', function () {
		document.documentElement.classList.remove('lightbox-open');
		bigImg.removeAttribute('src');
	});
})();
