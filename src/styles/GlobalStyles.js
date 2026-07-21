import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --bg: #0a0f1e;
  --surface: #111827;
  --surface2: #1a2235;
  --border: rgba(255, 255, 255, 0.07);
  --accent: #4f6ef7;
  --accent2: #7c3aed;
  --accent-glow: rgba(79, 110, 247, 0.25);
  --text: #f0f4ff;
  --text-muted: #6b7a99;
  --open: #2dbcfa;
  --assigned: #a78bfa;
  --progress: #fb923c;
  --resolved: #34d399;
  --closed: #6b7a99;
  --reopened: #f472b6;
  --danger: #f43f5e;
  --low: #1bd08e;
  --medium: #fbbf24;
  --high: #f43f5e;

  --color-grey-0: #111827;
  --color-grey-50: #141b2d;
  --color-grey-100: #1a2235;
  --color-grey-200: #2b3147;
  --color-grey-300: #3c4560;
  --color-grey-400: #4e5a78;
  --color-grey-500: #6b7a99;
  --color-grey-600: #8a9bbb;
  --color-grey-700: #aabbd6;
  --color-grey-800: #c8d4f0;
  --color-grey-900: #e8efff;

  --color-brand-50: #eff4ff;
  --color-brand-100: #dbe7ff;
  --color-brand-200: #b8d1ff;
  --color-brand-500: #4f6ef7;
  --color-brand-600: #4f6ef7;
  --color-brand-700: #404ce7;
  --color-brand-800: #343fcd;
  --color-brand-900: #2b37a8;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef3c7;
  --color-yellow-700: #d97706;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  --image-grayscale: 0;
  --image-opacity: 100%;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
}

body.light-mode {
  --bg: #f0f4ff;
  --surface: #ffffff;
  --surface2: #e8edf8;
  --border: rgba(0, 0, 0, 0.09);
  --text: #0f172a;
  --text-muted: #64748b;
  --accent-glow: rgba(79, 110, 247, 0.15);

  --color-grey-0: #ffffff;
  --color-grey-50: #f8fafc;
  --color-grey-100: #f1f5f9;
  --color-grey-200: #e2e8f0;
  --color-grey-300: #cbd5e1;
  --color-grey-400: #94a3b8;
  --color-grey-500: #64748b;
  --color-grey-600: #475569;
  --color-grey-700: #334155;
  --color-grey-800: #1e293b;
  --color-grey-900: #0f172a;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background-color 0.3s, border 0.3s, color 0.3s;
}

html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}

html::-webkit-scrollbar {
  width: 4px;
}

html::-webkit-scrollbar-track {
  background: var(--surface);
}

html::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 4px;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--text);
  background: var(--bg);
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
  transition: color 0.3s, background-color 0.3s;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--accent);
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
`;

export default GlobalStyles;

/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
