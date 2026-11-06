/* Projects page: grid/list view toggle. The choice is saved in localStorage
	and applied from <head> (as data-view on <html>) so the page never flashes
	the wrong layout. Without JavaScript the toolbar stays hidden and the
	page simply shows the grid. */
(function () {
	var KEY = 'projects-view';
	var root = document.documentElement;

	function stored() {
		try {
			var value = localStorage.getItem(KEY);
			return value === 'grid' || value === 'list' ? value : null;
		} catch (e) {
			return null; // storage blocked: default to the grid
		}
	}

	function apply(view) {
		root.setAttribute('data-view', view);
		sync();
	}

	// Keep the buttons' pressed state in step with the current view.
	function sync() {
		var group = document.getElementById('view-toggle');
		if (!group) return;
		var view = root.getAttribute('data-view');
		var buttons = group.querySelectorAll('button');
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-view') === view));
		}
	}

	apply(stored() || 'grid');

	document.addEventListener('DOMContentLoaded', function () {
		var toolbar = document.getElementById('projects-toolbar');
		var group = document.getElementById('view-toggle');
		if (!toolbar || !group) return;
		toolbar.hidden = false;
		sync();

		group.addEventListener('click', function (event) {
			var button = event.target.closest ? event.target.closest('button[data-view]') : null;
			if (!button) return;
			var view = button.getAttribute('data-view');
			apply(view);
			try {
				localStorage.setItem(KEY, view);
			} catch (e) {
				/* choice applies to this visit only */
			}
		});
	});

	// Stay consistent when another tab changes the view, or when the
	// back/forward button restores a page from the browser's cache.
	window.addEventListener('storage', function (event) { if (event.key === KEY) apply(stored() || 'grid'); });
	window.addEventListener('pageshow', function () { apply(stored() || 'grid'); });
})();
