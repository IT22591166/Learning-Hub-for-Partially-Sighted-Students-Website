/*
  icons.js
  Lightweight inline SVG icon helper.
  Keeps the site fast (no icon font, no external dependencies).
*/

(function () {
  const sprite = `
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
    <symbol id="i-sun" viewBox="0 0 24 24">
      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-16h0Zm0 20h0Zm10-10h0ZM2 12h0Zm15.54-7.54h0ZM6.46 17.54h0Zm11.08 0h0ZM6.46 6.46h0"/>
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
    </symbol>

    <symbol id="i-moon" viewBox="0 0 24 24">
      <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </symbol>

    <symbol id="i-text" viewBox="0 0 24 24">
      <path d="M4 6V4h16v2M9 20h6M12 4v16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-menu" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-mic" viewBox="0 0 24 24">
      <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3Z" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M19 11a7 7 0 0 1-14 0M12 18v3M8 21h8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-book" viewBox="0 0 24 24">
      <path d="M6 4h11a2 2 0 0 1 2 2v13a1 1 0 0 0-1-1H6a2 2 0 0 0-2 2V6a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M6 4v14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-gap" viewBox="0 0 24 24">
      <path d="M4 7h7M13 17h7M11 7l2 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-target" viewBox="0 0 24 24">
      <path d="M12 22a10 10 0 1 1 10-10" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M12 18a6 6 0 1 1 6-6" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </symbol>

    <symbol id="i-method" viewBox="0 0 24 24">
      <path d="M4 5h16M4 12h10M4 19h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-tech" viewBox="0 0 24 24">
      <path d="M9 2v3M15 2v3M7 7h10M5 7h14v14H5V7Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M9 11h6M9 15h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-mail" viewBox="0 0 24 24">
      <path d="M4 6h16v12H4V6Z" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="i-phone" viewBox="0 0 24 24">
      <path d="M6 2h4l2 5-3 2a14 14 0 0 0 6 6l2-3 5 2v4c0 1-1 2-2 2-9.4 0-17-7.6-17-17 0-1 1-2 2-2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </symbol>

    <symbol id="i-eye-off" viewBox="0 0 24 24">
      <path d="M3 3l18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M9.9 5.25A10.9 10.9 0 0 1 12 5c6.2 0 9.75 7 9.75 7a18.3 18.3 0 0 1-3.25 4.25" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.55 6.55C3.3 8.95 2.25 12 2.25 12s3.55 7 9.75 7c2.15 0 3.95-.55 5.45-1.35" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9.2 12a2.8 2.8 0 0 1 3.95-3.95" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>
  </svg>`;

  document.addEventListener("DOMContentLoaded", () => {
    const wrap = document.createElement("div");
    wrap.innerHTML = sprite;
    document.body.prepend(wrap);
  });
})();
