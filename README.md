Based on https://github.com/balajmarius/svg2jsx/tree/master/packages/transform

- `Transform SVG into valid JSX with typescript and tailwind syntax`
- `Perfect when you have 100s of icons in figma with no react package/support`

---

Convert:

```svg
<!-- file: vertical-dot.svg -->
<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path fill="currentColor" d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523"/>
</svg>
```

To:

```jsx
const VerticalDot: FC<{ className: string }> = ({ className }) => (
  <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523" />
  </svg>
);
```

## Usage:

> node ./index.js

> src path (absolute): `example: /Users/me/Downloads/icon-pack/svgs`

> output file (absolute): `example: /Users/me/Desktop/icon-pack.tsx`

---

```
caveats:
- file names must able to be converted into JS function names (a-Z, cant start with numbers, etc)
- the className attributes are hardcoded (but very easy to change in the source)
- the syntax is for .tsx with a tailwind className props enforced with ts... thats also hardcoded 0_o
```
