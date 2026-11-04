/* Theme: light by default, dark if the browser prefers it, with a manual
	toggle. The choice is saved in localStorage so every page matches.
	This file is loaded from <head> so the theme is set before first paint
	(no flash of the wrong theme). Without JavaScript, the stylesheet still
	follows the browser's preference on its own. */
(function () {
	var KEY = 'theme';
	var root = document.documentElement;
	var query = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

	function stored() {
		try {
			var value = localStorage.getItem(KEY);
			return value === 'light' || value === 'dark' ? value : null;
		} catch (e) {
			return null; // storage blocked: fall back to the browser preference
		}
	}

	function preferred() {
		return stored() || (query && query.matches ? 'dark' : 'light');
	}

	function apply() {
		root.setAttribute('data-theme', preferred());
		sync();
	}

	// Keep the toggle's label in step with the current theme.
	function sync() {
		var button = document.getElementById('theme-toggle');
		if (!button) return;
		var label = root.getAttribute('data-theme') === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
		button.setAttribute('aria-label', label);
		button.setAttribute('title', label);
	}

	apply();

	document.addEventListener('DOMContentLoaded', function () {
		var button = document.getElementById('theme-toggle');
		if (!button) return;
		button.hidden = false;
		sync();

		button.addEventListener('click', function () {
			var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
			root.setAttribute('data-theme', next);
			try {
				localStorage.setItem(KEY, next);
			} catch (e) {
				/* choice applies to this page only */
			}
			sync();
		});
	});

	// Follow the browser setting live, until the visitor makes their own choice.
	if (query) {
		var onChange = function () { if (!stored()) apply(); };
		if (query.addEventListener) query.addEventListener('change', onChange);
		else if (query.addListener) query.addListener(onChange);
	}

	// Stay consistent when another tab changes the theme, or when the
	// back/forward button restores a page from the browser's cache.
	window.addEventListener('storage', function (event) { if (event.key === KEY) apply(); });
	window.addEventListener('pageshow', apply);
})();
