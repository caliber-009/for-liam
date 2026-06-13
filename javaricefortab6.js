const tab6State = {
  active: false,
  started: false,
  finished: false,
  loadingDone: false
};

const tab6Lines = [
  () => `${getTimestamp()} > loading complete.`,
  () => `${getTimestamp()} > user log detected: CALIBER`,
  () => ``,
  () => `${getTimestamp()} > is this thing recording?`,
  () => ``,
  () => ``,
  () => ``,
  () => `${getTimestamp()} >> affirmative.`,
  () => `${getTimestamp()} > oh wait fr?`,
  () => `${getTimestamp()} >> Yes. Commencing in...`,
  () => ``,
  () => ``,
  () => ``,
  () => `${getTimestamp()} >> 3...`,
  () => ``,
  () => `${getTimestamp()} >> 2...`,
  () => ``,
  () => `${getTimestamp()} >> 1...`,
  () => ``,
  () => ``,
  () => ``,
  () => ``,
  () => ``,
  () => ``,
  () => `${getTimestamp()} > hiiii!!!`,
  () => `${getTimestamp()} > ???`,
  () => `${getTimestamp()} > ???`,
  () => `${getTimestamp()} > ???`,
  () => `${getTimestamp()} > ???`,
  () => `${getTimestamp()} > ???`,
  () => `${getTimestamp()} > ifevpocpvdckpo dscdn kcx cdmjfdcvndckvcdpkcxasvccxlk jdfbpvdfnjviefnpjnfpnfdijnidjcljdoijdfnov`,
  () => `${getTimestamp()} > end of log.`,
  () => ``,
  () => `${getTimestamp()} >> well written, user-979934696. carry on, now.`
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitUntilTab6Active() {
  while (!tab6State.active) {
    await sleep(60);
  }
}

async function sleepResponsive(ms) {
  const step = 40;
  let elapsed = 0;

  while (elapsed < ms) {
    if (!tab6State.active) {
      await waitUntilTab6Active();
    }
    const chunk = Math.min(step, ms - elapsed);
    await sleep(chunk);
    elapsed += chunk;
  }
}

function getTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const mins = String(now.getMinutes()).padStart(2, "0");
  const secs = String(now.getSeconds()).padStart(2, "0");

  return `[${year}-${month}-${day} ${hours}:${mins}:${secs}]`;
}

async function fakeLoadingTab6(terminal) {
  let percent = 0;

  while (percent < 100) {
    if (!tab6State.active) {
      await waitUntilTab6Active();
    }

    percent += Math.floor(Math.random() * 12) + 1;
    if (percent > 100) percent = 100;

    terminal.innerHTML =
      `${getTimestamp()} > loading... ${percent}%<span class="cursor">█</span>`;

    terminal.parentElement.scrollTop = terminal.parentElement.scrollHeight;
    await sleepResponsive(Math.random() * 120 + 20);
  }

  await sleepResponsive(300);
  tab6State.loadingDone = true;
}

async function typeWriterTab6(terminal, text) {
  for (let i = 0; i < text.length; i++) {
    if (!tab6State.active) {
      await waitUntilTab6Active();
    }

    terminal.insertAdjacentText('beforeend', text.charAt(i));
    terminal.parentElement.scrollTop = terminal.parentElement.scrollHeight;
    await sleepResponsive(7);
  }

  terminal.insertAdjacentText('beforeend', "\n");
  terminal.parentElement.scrollTop = terminal.parentElement.scrollHeight;
}

async function runTab6() {
  if (tab6State.started) return;
  tab6State.started = true;

  const terminal = document.getElementById("terminal");
  if (!terminal) return;

  await fakeLoadingTab6(terminal);
  terminal.innerHTML = "";

  for (const line of tab6Lines) {
    await typeWriterTab6(terminal, line());
    await sleepResponsive(250);
  }

  terminal.insertAdjacentText("beforeend", "\n");
  terminal.insertAdjacentText("beforeend", "█");
  tab6LogHTML = terminal.innerHTML;
  tab6State.finished = true;
  syncTab6Button();
}

const tab6SwapBtn = document.getElementById('tab6SwapBtn');
let tab6ShowingPreload = false;
let tab6LogHTML = '';

const TAB6_PRELOAD_DOC = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>caliber_009</title>
  <style>

.preloader {
  position: fixed;
  inset: 0;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  opacity: 1;
  visibility: visible;
  transition: opacity 0.8s ease, visibility 0.8s ease;
}

.preloader.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}


    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Hoefler Text", "Times New Roman", serif;
      background-color: #1a1225;
      color: #2b2b2b;
      min-height: 100vh;
      line-height: 1.5;
    }
    a { color: inherit; text-decoration: none; }
    img { display: block; max-width: 100%; }
    ul { list-style: none; }

    /* ── page background ── */
    .page-bg {
      position: fixed;
      inset: 0;
      background-image: url('https://ella.janitorai.com/media-approved/rK-ktxsj0DjoRdX_j6fGU.webp');
      background-size: cover;
      background-position: center;
      z-index: -1;
    }

    /* ── top bar ── */
    .top-bar {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      background: rgba(0, 0, 0, 0.55);
      color: #ccc;
    }
    .top-bar-btn {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.9rem;
    }
    .top-bar-title {
      font-style: italic;
      font-weight: bold;
      color: #F786F4;
      font-size: 1rem;
    }

    /* ── page layout ── */
    .page-content {
      max-width: 900px;
      margin: 0 auto;
      padding: 1.5rem 1rem 3rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    /* ── profile card ── */
    .profile-card {
      background: linear-gradient(140deg, #fff 0%, #fff 20%, rgba(255,255,255,.9) 90%, #fff 100%);
      border-radius: 10px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .profile-info {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .profile-avatar {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 4px;
      flex-shrink: 0;
      box-shadow: rgba(0,0,0,.1) 0 0 0 1px, rgba(0,0,0,.2) 0 5px 10px, rgba(0,0,0,.4) 0 15px 40px;
    }
    @media (min-width: 48em) {
      .profile-avatar { width: 150px; height: 150px; }
    }

    .profile-meta {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .profile-username {
      font-size: 1.5rem;
      font-style: italic;
      font-weight: bold;
    }
    @media (min-width: 42rem) {
      .profile-username { font-size: 1.875rem; }
    }

    .profile-followers { font-weight: bold; }

    .profile-badges {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }
    .profile-badges img {
      width: 32px;
      height: 32px;
      object-fit: contain;
      transition: transform 0.5s ease;
    }
    .profile-badges img:hover { transform: scale(1.2); }

    .profile-title {
      font-style: italic;
      font-weight: bold;
      font-size: 0.875rem;
    }

    /* ── about-me ── */
    .profile-about {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .profile-about h1 { font-size: 1.4rem; }

    /* ── character grid ── */
    .char-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }
    @media (min-width: 42rem) {
      .char-grid { grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr)); }
    }

    /* ── character card ── */
    .char-card {
      border-radius: 8px;
      position: relative;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    /* gradient border via ::before */
    .char-card::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: 9px;
      background: linear-gradient(140deg, #000 0%, rgb(255,255,255) 40%, rgb(96,83,143) 90%, rgb(168,151,244) 100%);
      z-index: 0;
    }

    .char-inner {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #fff;
      border: 1px solid #000;
      border-radius: 8px;
      overflow: hidden;
    }

    .char-name {
      font-weight: bold;
      font-size: 13px;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0.5rem;
    }

    /* image + chat-count wrapper */
    .char-img-wrap {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      overflow: hidden;
    }
    .char-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
      border-radius: 5px;
      filter: grayscale(100%);
      transition: filter 0.5s ease;
    }
    .char-img:hover { filter: grayscale(0%); }

    .char-chats {
      position: absolute;
      top: 2.5rem;
      right: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(248,247,242,.92);
      color: #2b2b2b;
      font-size: 12px;
      font-weight: bold;
      font-variant: small-caps;
      border: 1px solid #d8d2c4;
      border-radius: 4px 0 0 4px;
      padding: 2px 6px;
    }

    .char-creator {
      display: block;
      padding: 0.25rem 0.5rem 0;
      font-variant: small-caps;
      font-weight: bold;
      font-size: 0.8em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .char-desc {
      padding: 0.15rem 0.5rem;
      font-size: 0.7rem;
      color: #555;
    }

    .char-divider {
      border: none;
      border-top: 10px solid #000;
      width: 90%;
      margin: 0.6rem auto;
    }

    .char-tags {
      padding: 0 0.5rem 0.4rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.2rem;
    }
    .tag {
      font-size: 10px;
      font-variant: small-caps;
      font-style: italic;
      color: #000;
      background: #FAF9F6;
      border: 1px solid #dddada;
      border-radius: 3px;
      padding: 1px 3px;
    }

    .char-kudos {
      padding: 0 0.5rem 0.5rem;
      font-variant: small-caps;
      font-weight: bold;
      font-size: 0.8em;
      margin-top: auto;
    }

    /* chat icon */
    .icon-chat {
      flex-shrink: 0;
    }
  </style>
</head>
<body>
<div class="preloader" id="preloader">
  <img src="https://offscriptstore.com/cdn/shop/files/preloaderapp.gif" alt="Loading">
</div>

<div class="page-bg"></div>

<main class="page-content">

  <!-- ── profile ── -->
  <div class="profile-card">
    <div class="profile-info">
      <img class="profile-avatar"
        src="https://ella.janitorai.com/avatars/2DnsU5WD2QkSlPuwLDCNS.webp?width=600"
        alt="Avatar"/>
      <div class="profile-meta">
        <div class="profile-username">@caliber_009</div>
        <div class="profile-followers">La Aventura Ha Terminado</div>
        <div class="profile-badges">
          <img src="https://static.wikia.nocookie.net/tdx/images/3/3f/Rank_150_%28Badge%29.png/revision/latest?cb=20240222091107" alt="Rank 150 Badge"/>
          <img src="https://limbuscompany.wiki.gg/images/thumb/The_Pinky_Logo.png/300px-The_Pinky_Logo.png?78df98" alt="App Mop badge"/>
        </div>
        <div class="profile-title">
          <u>Tiansu Star (Shén Xíng Tài Bǎo) of The Pinky</u>
        </div>
      </div>
    </div>

    <div class="profile-about">
      <h1><i>hi</i></h1>
      <p><i>hello</i></p>
      <p>hello</p>
      <p>juliet</p>
    </div>
  </div>



  <div class="char-grid">

    <div class="char-card">
      <div class="char-inner">
        <a href="/characters/25f38d7f-3b58-48fd-a39e-a87a654af356_character-jcc-trio-and-uzuki">
          <div class="char-name">yikes</div>
          <div class="char-img-wrap">
            <div class="char-chats">
              <svg class="icon-chat" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 14l-3-3h-7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10"/>
                <path d="M14 15v2a1 1 0 0 1-1 1H6l-3 3V11a1 1 0 0 1 1-1h2"/>
              </svg>
              ???
            </div>
            <img class="char-img"
              src="https://i.scdn.co/image/ab67616d0000b27324d30bc281ed8329c0476662"
              alt="Betrayal of Fear"/>
          </div>
        </a>
        <a class="char-creator" href="/profiles/543bba71-89e3-4bee-bacd-9827537b4c88_profile-of-nilouplanet">@me</a>
        <div class="char-desc">who is bro</div>
        <div class="char-divider"></div>
        <ul class="char-tags">
          <li><span class="tag">Limitless technique</span></li>
          <li><span class="tag">hi</span></li>
          <li><span class="tag">hello</span></li>
          <li><span class="tag">juliet</span></li>
          <li><span class="tag">jane juliet</span></li>
          <li><span class="tag">jane early</span></li>
          <li><span class="tag">#tuff</span></li>
          <li><span class="tag">#goodboy</span></li>
          <li><span class="tag">#death senties</span></li>
          <li><span class="tag">#sentry</span></li>
          <li><span class="tag">#prometheus</span></li>
        </ul>
        <div class="char-kudos">2.6k kudos</div>
      </div>
    </div>

    <div class="char-card">
      <div class="char-inner">
        <a href="/characters/8b58dfb0-a52b-493d-8a1d-28a40e2b5609_character-nagumo-yoichi">
          <div class="char-name">Hello hello juliet</div>
          <div class="char-img-wrap">
            <div class="char-chats">
              <svg class="icon-chat" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 14l-3-3h-7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10"/>
                <path d="M14 15v2a1 1 0 0 1-1 1H6l-3 3V11a1 1 0 0 1 1-1h2"/>
              </svg>
              2.8k
            </div>
            <img class="char-img"
              src="https://i.ytimg.com/vi/eXv0tqBtv3E/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AHeA4AC6AKKAgwIABABGE4gWChlMA8=&rs=AOn4CLATC8FcGVwGWCQIA40BXb0P6YGGJg"
              alt="Betrayal of Fate"/>
          </div>
        </a>
        <a class="char-creator" href="/profiles/543bba71-89e3-4bee-bacd-9827537b4c88_profile-of-nilouplanet">@67</a>
        <div class="char-desc">dyk prometheus</div>
        <div class="char-divider"></div>
        <ul class="char-tags">
          <li><span class="tag">Shrine technique</span></li>
          <li><span class="tag">wont</span></li>
          <li><span class="tag">you</span></li>
          <li><span class="tag">stop</span></li>
          <li><span class="tag">lmao</span></li>
          <li><span class="tag">sikd</span></li>
          <li><span class="tag">skid</span></li>
          <li><span class="tag">pump</span></li>
          <li><span class="tag">absolute mechamaru</span></li>
          <li><span class="tag">dead center</span></li>
        </ul>
        <div class="char-kudos">2.0k kudos</div>
      </div>
    </div>

    <div class="char-card">
      <div class="char-inner">
        <a href="/characters/ee56eb3f-e358-4ac6-b285-ed4c9f662f70_character-goro-akechi">
          <div class="char-name">Sparta</div>
          <div class="char-img-wrap">
            <div class="char-chats">
              <svg class="icon-chat" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 14l-3-3h-7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10"/>
                <path d="M14 15v2a1 1 0 0 1-1 1H6l-3 3V11a1 1 0 0 1 1-1h2"/>
              </svg>
              10.0k
            </div>
            <img class="char-img"
              src="https://i.ytimg.com/vi/OPBECnDBiRQ/maxresdefault.jpg"
              alt="Dead and Locked"/>
          </div>
        </a>
        <a class="char-creator" href="/profiles/543bba71-89e3-4bee-bacd-9827537b4c88_profile-of-nilouplanet">@11</a>
        <div class="char-desc">who is this</div>
        <div class="char-divider"></div>
        <ul class="char-tags">
          <li><span class="tag">Strongest of Tomorrow</span></li>
          <li><span class="tag">Strongest of Today</span></li>
          <li><span class="tag">Strongest in History</span></li>
          <li><span class="tag">Strongest of Outside</span></li>
          <li><span class="tag">im listening to fire rn</span></li>
          <li><span class="tag">what</span></li>
          <li><span class="tag">who</span></li>
          <li><span class="tag">#w</span></li>
          <li><span class="tag">#2</span></li>
          <li><span class="tag">#3</span></li>
          <li><span class="tag">#imperishable valour</span></li>
        </ul>
        <div class="char-kudos">3.1k kudons</div>
      </div>
    </div>

  </div>
</main>

<script>
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 1500);
});
${'</scr' + 'ipt>'}
