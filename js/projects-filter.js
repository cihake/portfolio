/* Projects page: filtering by tool. This file is loaded after the project
	list and the sort script, so the saved filter is applied before the page
	first paints. Picking several tools shows only projects that use ALL of
	them ("uses both"); picking none shows everything. The choice is saved in
	localStorage. The chips are built from the tools listed on each card, so
	the cards stay the single source of truth. The chips sit in a collapsible
	section (closed by default on narrow screens, open on wide ones; the last
	choice is remembered). Without JavaScript the filter row stays empty and
	hidden, and every project is shown. */
(function () {
	var KEY = 'projects-filter';
	var OPEN_KEY = 'projects-filter-open';
	var grid = document.querySelector('.project-grid');
	var chipBox = document.getElementById('filter-chips');
	var clearButton = document.getElementById('filter-clear');
	var details = document.getElementById('filter-details');
	var badge = document.getElementById('filter-badge');
	var count = document.getElementById('projects-count');
	var empty = document.getElementById('projects-empty');
	var status = document.getElementById('projects-status');
	if (!grid || !chipBox) return;

	var cards = grid.querySelectorAll('.project-card');
	var names = {};     // tool id -> display name, e.g. nodejs -> Node.js
	var selected = {};  // tool id -> true, for each chip that is on

	function toolsOf(card) {
		var value = card.getAttribute('data-tools') || '';
		return value.split(/\s+/).filter(function (tool) { return tool; });
	}

	// Learn every tool and its display name from the cards' own tag lists.
	for (var i = 0; i < cards.length; i++) {
		var tools = toolsOf(cards[i]);
		var labels = cards[i].querySelectorAll('.tag-list li');
		for (var j = 0; j < tools.length; j++) {
			if (!names[tools[j]]) names[tools[j]] = labels[j] ? labels[j].textContent.trim() : tools[j];
		}
	}

	var ids = Object.keys(names).sort(function (a, b) {
		return names[a].localeCompare(names[b], undefined, { sensitivity: 'base' });
	});
	if (!ids.length) return;

	for (var k = 0; k < ids.length; k++) {
		var chip = document.createElement('button');
		chip.type = 'button';
		chip.setAttribute('data-tool', ids[k]);
		chip.setAttribute('aria-pressed', 'false');
		chip.textContent = names[ids[k]];
		chipBox.appendChild(chip);
	}

	function load() {
		selected = {};
		try {
			var value = localStorage.getItem(KEY) || '';
			var saved = value.split(/\s+/);
			for (var n = 0; n < saved.length; n++) {
				if (names.hasOwnProperty(saved[n])) selected[saved[n]] = true;
			}
		} catch (e) {
			/* storage blocked: start with no filters */
		}
	}

	function save() {
		try {
			localStorage.setItem(KEY, Object.keys(selected).join(' '));
		} catch (e) {
			/* choice applies to this visit only */
		}
	}

	function chosen() {
		return ids.filter(function (id) { return selected[id]; });
	}

	// Show or hide each card, and bring the chips, count and clear button up to date.
	function apply() {
		var picks = chosen();
		var shown = 0;
		for (var a = 0; a < cards.length; a++) {
			var visible = true;
			var tools = toolsOf(cards[a]);
			for (var b = 0; b < picks.length && visible; b++) {
				if (tools.indexOf(picks[b]) === -1) visible = false;
			}
			cards[a].hidden = !visible;
			if (visible) shown++;
		}
		var chips = chipBox.querySelectorAll('button');
		for (var c = 0; c < chips.length; c++) {
			chips[c].setAttribute('aria-pressed', String(!!selected[chips[c].getAttribute('data-tool')]));
		}
		if (clearButton) clearButton.hidden = !picks.length;
		if (badge) {
			badge.hidden = !picks.length;
			badge.textContent = picks.length + ' selected';
		}
		if (empty) empty.hidden = shown > 0;
		if (count) {
			count.textContent = picks.length
				? 'Showing ' + shown + ' of ' + cards.length + ' projects'
				: cards.length + (cards.length === 1 ? ' project' : ' projects');
		}
		return { picks: picks, shown: shown };
	}

	// Tell screen reader users what changed (only after a deliberate change).
	function announce(result) {
		if (!status) return;
		if (!result.picks.length) {
			status.textContent = 'Filters cleared. Showing all ' + cards.length + ' projects.';
			return;
		}
		var list = result.picks.map(function (id) { return names[id]; }).join(' and ');
		if (!result.shown) {
			status.textContent = 'No projects use ' + list + ' together. Remove a filter to see more.';
			return;
		}
		status.textContent = 'Showing ' + result.shown + ' of ' + cards.length + ' projects that use ' + list + '.';
	}

	// Open or closed: the visitor's last choice, otherwise open only on wide screens.
	function startOpen() {
		try {
			var value = localStorage.getItem(OPEN_KEY);
			if (value === '1') return true;
			if (value === '0') return false;
		} catch (e) {
			/* storage blocked: use the screen-size default */
		}
		return !!(window.matchMedia && window.matchMedia('(min-width: 700px)').matches);
	}

	load();
	apply();

	if (details) {
		details.open = startOpen();
		details.querySelector('summary').addEventListener('click', function () {
			// The open state changes after this click is handled, so read it a moment later.
			setTimeout(function () {
				try {
					localStorage.setItem(OPEN_KEY, details.open ? '1' : '0');
				} catch (e) {
					/* choice applies to this visit only */
				}
			}, 0);
		});
	}

	chipBox.addEventListener('click', function (event) {
		var chip = event.target.closest ? event.target.closest('button[data-tool]') : null;
		if (!chip) return;
		var id = chip.getAttribute('data-tool');
		if (selected[id]) delete selected[id];
		else selected[id] = true;
		save();
		announce(apply());
	});

	if (clearButton) {
		clearButton.addEventListener('click', function () {
			selected = {};
			save();
			announce(apply());
			// The button hides itself, so move focus somewhere sensible: the
			// first chip, or the section's heading if the chips are folded away.
			var target = details && !details.open ? details.querySelector('summary') : chipBox.querySelector('button');
			if (target) target.focus();
		});
	}

	// Stay consistent when another tab changes the filter, or when the
	// back/forward button restores a page from the browser's cache.
	function resync() { load(); apply(); }
	window.addEventListener('storage', function (event) { if (event.key === KEY) resync(); });
	window.addEventListener('pageshow', resync);
})();
