/* Projects page: sorting. This file is loaded right after the project list,
	so the saved order is applied before the page first paints (no flash of
	the wrong order). The choice is saved in localStorage. Without JavaScript
	the cards simply stay in the order they appear in projects.html, which is
	newest first. */
(function () {
	var KEY = 'projects-sort';
	var DEFAULT = 'newest';
	var LABELS = {
		newest: 'newest first',
		oldest: 'oldest first',
		az: 'title A to Z',
		za: 'title Z to A'
	};

	var grid = document.querySelector('.project-grid');
	var select = document.getElementById('sort-select');
	var status = document.getElementById('projects-status');
	if (!grid) return;

	function stored() {
		try {
			var value = localStorage.getItem(KEY);
			return LABELS.hasOwnProperty(value) ? value : null;
		} catch (e) {
			return null; // storage blocked: use the default order
		}
	}

	function title(card) {
		var heading = card.querySelector('h2');
		return heading ? heading.textContent.trim() : '';
	}

	function start(card) {
		return card.getAttribute('data-start') || '';
	}

	function byTitle(a, b) {
		return title(a).localeCompare(title(b), undefined, { sensitivity: 'base', numeric: true });
	}

	function compare(order) {
		return function (a, b) {
			var result = 0;
			if (order === 'newest' || order === 'oldest') {
				// data-start is year-month (2025-09), so plain text comparison is date order
				if (start(a) < start(b)) result = -1;
				else if (start(a) > start(b)) result = 1;
				if (order === 'newest') result = -result;
			} else {
				result = byTitle(a, b);
				if (order === 'za') result = -result;
			}
			return result || byTitle(a, b); // tie: fall back to title
		};
	}

	function apply(order) {
		var cards = [];
		for (var i = 0; i < grid.children.length; i++) {
			if (grid.children[i].className.indexOf('project-card') !== -1) cards.push(grid.children[i]);
		}
		cards.sort(compare(order));
		var fragment = document.createDocumentFragment();
		for (var j = 0; j < cards.length; j++) fragment.appendChild(cards[j]);
		grid.appendChild(fragment);
		if (select) select.value = order;
	}

	var current = stored() || DEFAULT;
	apply(current);

	if (select) {
		select.addEventListener('change', function () {
			if (!LABELS.hasOwnProperty(select.value)) return;
			current = select.value;
			apply(current);
			try {
				localStorage.setItem(KEY, current);
			} catch (e) {
				/* choice applies to this visit only */
			}
			// Tell screen reader users the list changed (only after a deliberate change)
			if (status) status.textContent = 'Projects sorted by ' + LABELS[current] + '.';
		});
	}

	// Stay consistent when another tab changes the order, or when the
	// back/forward button restores a page from the browser's cache.
	window.addEventListener('storage', function (event) { if (event.key === KEY) apply(stored() || DEFAULT); });
	window.addEventListener('pageshow', function () { apply(stored() || DEFAULT); });
})();
