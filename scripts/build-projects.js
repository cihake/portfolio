/* Builds the project cards on projects.html from the pages in projects/.

   Each project page (projects/*.html) is the single source of truth for its
   own card. Mark the facts in the page with data-project attributes:

     <h1 data-project="title">PokéBase</h1>
     <p data-project="description">One or two sentences.</p>
     <time data-project="start" datetime="2026-02">Feb 2026</time>
     <ul data-project="tools"><li>HTML</li><li>CSS</li></ul>
     <img data-project="thumbnail" src="../assets/projects/x/shot.png" alt="...">   (optional)

   This script reads every page, checks it, and rewrites the card grid between
   the two "projects:" comments in projects.html. Files whose names start with
   an underscore (like _template.html) are skipped.

   Usage:  node scripts/build-projects.js
   Vercel runs it on every deploy (see vercel.json). No packages needed. */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PROJECTS_DIR = path.join(ROOT, 'projects');
const PAGE = path.join(ROOT, 'projects.html');
const START_MARK = '<!-- projects:start';
const END_MARK = '<!-- projects:end -->';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const VOID_TAGS = { img: true, br: true, hr: true, input: true, meta: true, link: true };
const NAMED_ENTITIES = {
	amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
	ndash: '\u2013', mdash: '\u2014', hellip: '\u2026', middot: '\u00b7',
	lsquo: '\u2018', rsquo: '\u2019', ldquo: '\u201c', rdquo: '\u201d',
	eacute: '\u00e9', copy: '\u00a9'
};

// ---------- small HTML helpers (enough for plain, hand-written pages) ----------

function decode(text) {
	return text.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, function (match, entity) {
		if (entity.charAt(0) === '#') {
			var hex = entity.charAt(1).toLowerCase() === 'x';
			var code = parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
			return isFinite(code) ? String.fromCodePoint(code) : match;
		}
		return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, entity) ? NAMED_ENTITIES[entity] : match;
	});
}

function escapeHtml(text) {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function plainText(html) {
	return decode(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
}

function attribute(attrs, name) {
	var match = new RegExp('\\s' + name + '\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\')', 'i').exec(attrs);
	return match ? decode(match[1] !== undefined ? match[1] : match[2]) : null;
}

// Find the element carrying data-project="name": its tag, attributes and inner HTML.
function findField(html, name) {
	var open = new RegExp('<([a-z][a-z0-9]*)\\b([^>]*?\\sdata-project\\s*=\\s*"' + name + '"[^>]*)>', 'i').exec(html);
	if (!open) return null;
	var tag = open[1].toLowerCase();
	var field = { tag: tag, attrs: open[2], inner: null };
	if (!VOID_TAGS[tag]) {
		var rest = html.slice(open.index + open[0].length);
		var close = new RegExp('</' + tag + '\\s*>', 'i').exec(rest);
		if (!close) throw new Error('the <' + tag + ' data-project="' + name + '"> element is never closed');
		field.inner = rest.slice(0, close.index);
	}
	return field;
}

function slugify(name) {
	return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\+/g, 'plus').replace(/#/g, 'sharp').replace(/[^a-z0-9]+/g, '');
}

function monthLabel(iso) {
	var parts = iso.split('-');
	return MONTHS[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
}

// ---------- read one project page ----------

function readProject(file) {
	var errors = [];
	var source = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8');
	var html = source.replace(/<!--[\s\S]*?-->/g, ''); // ignore commented-out examples
	var project = { file: file };

	// _template.html is marked noindex so the blank template stays out of search results.
	// A real project page must not keep that tag.
	if (/<meta\b[^>]*name\s*=\s*["']robots["'][^>]*noindex/i.test(html)) {
		errors.push('remove <meta name="robots" content="noindex"> (it was copied from the template)');
	}

	function need(name, build) {
		var field;
		try {
			field = findField(html, name);
		} catch (e) {
			errors.push(e.message);
			return;
		}
		if (!field) {
			errors.push('missing data-project="' + name + '"');
			return;
		}
		var problem = build(field);
		if (problem) errors.push(problem);
	}

	need('title', function (field) {
		project.title = plainText(field.inner || '');
		if (!project.title) return 'data-project="title" is empty';
	});

	need('description', function (field) {
		project.description = plainText(field.inner || '');
		if (!project.description) return 'data-project="description" is empty';
	});

	need('start', function (field) {
		project.start = attribute(field.attrs, 'datetime') || '';
		var m = /^(\d{4})-(\d{2})(-\d{2})?$/.exec(project.start);
		if (!m || +m[2] < 1 || +m[2] > 12) {
			return 'data-project="start" needs a datetime like "2026-02" (year-month), but found "' + project.start + '"';
		}
	});

	need('tools', function (field) {
		var names = [];
		var re = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
		var m;
		while ((m = re.exec(field.inner || ''))) {
			var name = plainText(m[1]);
			if (name) names.push(name);
		}
		if (!names.length) return 'data-project="tools" needs at least one <li> tool';
		var seen = {};
		project.tools = [];
		for (var i = 0; i < names.length; i++) {
			var slug = slugify(names[i]);
			if (!slug) return 'tool "' + names[i] + '" has no letters or numbers';
			if (seen[slug]) return 'tool "' + names[i] + '" is listed twice (or clashes with "' + seen[slug] + '")';
			seen[slug] = names[i];
			project.tools.push({ name: names[i], slug: slug });
		}
	});

	// Optional card image
	try {
		var image = findField(html, 'thumbnail');
		if (image) {
			var src = attribute(image.attrs, 'src');
			if (!src) {
				errors.push('data-project="thumbnail" has no src');
			} else if (/^https?:\/\//i.test(src)) {
				project.thumbnail = src;
			} else {
				// src is written relative to the project page; make it relative to projects.html
				var resolved = src.charAt(0) === '/' ? src.slice(1) : path.posix.normalize(path.posix.join('projects', src));
				if (!fs.existsSync(path.join(ROOT, resolved))) {
					errors.push('thumbnail image not found: ' + src + ' (looked for ' + resolved + ')');
				} else {
					project.thumbnail = resolved;
				}
			}
		}
	} catch (e) {
		errors.push(e.message);
	}

	return { project: project, errors: errors };
}

// ---------- build the cards ----------

function cardHtml(p, eol) {
	var T = '\t';
	var pad = function (n) { return new Array(n + 1).join(T); };
	var lines = [
		pad(4) + '<li class="project-card" data-start="' + escapeHtml(p.start) + '" data-tools="' + p.tools.map(function (t) { return t.slug; }).join(' ') + '">',
		pad(5) + '<a href="projects/' + escapeHtml(p.file) + '">',
		p.thumbnail
			? pad(6) + '<div class="thumb"><img src="' + escapeHtml(p.thumbnail) + '" alt="" loading="lazy"></div>'
			: pad(6) + '<div class="thumb" aria-hidden="true"></div>',
		pad(6) + '<div class="card-body">',
		pad(7) + '<h2>' + escapeHtml(p.title) + '</h2>',
		pad(7) + '<p>' + escapeHtml(p.description) + '</p>',
		pad(7) + '<p class="card-meta">Started <time datetime="' + escapeHtml(p.start) + '">' + monthLabel(p.start) + '</time></p>',
		pad(7) + '<ul class="tag-list" aria-label="Tools used">'
	];
	p.tools.forEach(function (t) { lines.push(pad(8) + '<li>' + escapeHtml(t.name) + '</li>'); });
	lines.push(pad(7) + '</ul>', pad(6) + '</div>', pad(5) + '</a>', pad(4) + '</li>');
	return lines.join(eol);
}

function main() {
	var files = fs.existsSync(PROJECTS_DIR)
		? fs.readdirSync(PROJECTS_DIR).filter(function (f) {
			return /\.html$/i.test(f) && f.charAt(0) !== '_' && fs.statSync(path.join(PROJECTS_DIR, f)).isFile();
		}).sort()
		: [];

	var projects = [];
	var failed = false;
	files.forEach(function (file) {
		var result = readProject(file);
		if (result.errors.length) {
			failed = true;
			console.error('projects/' + file + ':');
			result.errors.forEach(function (e) { console.error('  - ' + e); });
		} else {
			projects.push(result.project);
		}
	});
	if (failed) {
		console.error('\nNo changes made. Fix the problems above and run the script again.');
		process.exit(1);
	}

	// Newest first; ties fall back to title
	projects.sort(function (a, b) {
		if (a.start !== b.start) return a.start < b.start ? 1 : -1;
		return a.title.localeCompare(b.title);
	});

	var page = fs.readFileSync(PAGE, 'utf8');
	var eol = page.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
	var startAt = page.indexOf(START_MARK);
	var endAt = page.indexOf(END_MARK);
	if (startAt === -1 || endAt === -1 || endAt < startAt) {
		console.error('projects.html needs both comments inside the project list:\n  ' + START_MARK + ' ... -->\n  ' + END_MARK);
		process.exit(1);
	}
	var startEnd = page.indexOf('-->', startAt) + 3;
	var lineStart = page.lastIndexOf('\n', endAt) + 1;
	var indent = page.slice(lineStart, endAt); // whitespace before the end comment

	var body = projects.map(function (p) { return cardHtml(p, eol); }).join(eol);
	var middle = body ? eol + body + eol + indent : eol + indent;
	var updated = page.slice(0, startEnd) + middle + page.slice(endAt);

	if (updated !== page) fs.writeFileSync(PAGE, updated, 'utf8');
	console.log('projects: ' + projects.length + ' page' + (projects.length === 1 ? '' : 's') + ' -> ' + projects.length + ' card' + (projects.length === 1 ? '' : 's') + ' in projects.html' + (updated === page ? ' (already up to date)' : ''));
	if (!projects.length) console.log('  (no project pages found in projects/ yet)');
}

main();
