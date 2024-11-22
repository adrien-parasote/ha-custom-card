import { html } from "lit";

export function renderSvgIcon(path, cls = "icon") {
  return html`
    <svg class="${cls}" viewBox="0 0 24 24">
      <path d="${path}" />
    </svg>
  `;
}
