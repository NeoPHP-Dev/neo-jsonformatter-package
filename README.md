# JsonFormatter Package

A dev-only JSON formatter for NeoPHP. Paste raw JSON, format it,
minify it, or get a precise validation error — entirely client-side,
with live validation as you type.

---

## Structure

```
jsonformatter-package/
├── composer.json
├── README.md
└── src/
    ├── NeoJsonFormatterPackage.php
    ├── Middleware/
    │   └── DevOnlyMiddleware.php
    ├── Controller/
    │   └── JsonFormatterController.php
    ├── Assets/
    │   ├── css/jsonformatter.css
    │   └── js/jsonformatter.js
    └── Templates/
        ├── components/
        │   └── JsonFormatter.macro.html.twig
        └── pages/
            └── formatter.html.twig
```

---

## Dev-only, by design

The standalone page's route is protected by `DevOnlyMiddleware`,
checking `Config/app.config.php`'s `environment` key. Outside
`environment: dev`, it returns a blocked response.

The `JsonFormatter` macro makes no server calls, so it has no such
restriction built in — guard any page you embed it in yourself if it
should stay dev-only in your project.

---

## Installation

```bash
php bin/neo package:require neophp/jsonformatter-package --project=MyProject
```

Register it in the project's `Config/app.config.php`:

```php
return [
    // ...
    'packages' => [
        \Vendor\NeoPHP\JsonFormatterPackage\NeoJsonFormatterPackage::class,
    ],
];
```

No configuration file, no migration.

---

## Usage

### Standalone page

Visit `/_jsonformatter/` (only reachable in `dev`). Paste JSON, click
**Format** or **Minify**. The text is validated as you type — an
invalid JSON string shows an error with the approximate line/column
where parsing failed.

### Embedding in your own page

```twig
{% import '@JsonFormatter/components/JsonFormatter.macro.html.twig' as JsonFormatter %}
<link rel="stylesheet" href="/packages-assets/JsonFormatter/css/jsonformatter.css">

{{ JsonFormatter.render() }}

<script src="/packages-assets/JsonFormatter/js/jsonformatter.js"></script>
```

`JsonFormatter.render(instanceId = 'jf')` accepts an optional
`instanceId` to avoid collisions if rendered more than once on the same
page.

---

## What it provides

- **Format** — re-indents JSON with 4-space indentation
- **Minify** — collapses JSON to a single line, no whitespace
- **Live validation** — as you type, invalid JSON is flagged
  immediately with an error message, including an approximate
  line/column when the browser's JSON parser exposes one
- **Byte size** — shows the current text's size in bytes, useful to see
  how much minifying actually saves

---

## Theming

Every visual value is a CSS custom property scoped to `.jf-layout`:

```css
.jf-layout {
    --jf-accent: #6366f1;
    --jf-bg: #161923;
    --jf-bg-alt: #1b2030;
    --jf-border: #2d3342;
    --jf-text: #e5e7eb;
    --jf-text-muted: #9ca3af;
}
```

---

## License

MIT