// Tabs
const shell = document.getElementById('shell');
const tabButtons = document.querySelectorAll('.browser-tab[data-tab]');
const panels = document.querySelectorAll('.tab-panel');
const closeButtons = document.querySelectorAll('.tab-close[data-close]');
const minBtn = document.getElementById('minBtn');
const maxBtn = document.getElementById('maxBtn');
const closeBtn = document.getElementById('closeBtn');
const toastStack = document.getElementById('toastStack');

const randomMessages = [
  // commmon
  
  { text: 'Window says: absolutely not.', rarity: 'common' },
  { text: 'Tab gremlin has been spotted.', rarity: 'common' },
  { text: 'This button is on vacation.', rarity: 'common' },
  { text: 'You clicked the shiny thing.', rarity: 'common' },
  { text: 'Chrome spirit approves this chaos.', rarity: 'common' },
  { text: 'The tabs are mildly concerned.', rarity: 'common' },
  { text: 'Popup avoided. Good reflexes.', rarity: 'common' },
  { text: 'Minimize achieved. Meaning: none.', rarity: 'common' },
  { text: 'Fullscreen mode: emotionally prepared.', rarity: 'common' },
  { text: 'Close button: still unionized.', rarity: 'common' },
  { text: 'A tiny beep echoes from the void.', rarity: 'common' },
  { text: 'Mouse cursor feels judged.', rarity: 'common' },
  { text: 'The browser tab blinks once.', rarity: 'common' },
  { text: 'A static poppet approves.', rarity: 'common' },
  { text: 'Nothing happened, which is something.', rarity: 'common' },
  { text: 'The page is wearing its serious face.', rarity: 'common' },
  { text: 'Chrome window consumed by thoughts.', rarity: 'common' },
  { text: 'The alert daemon yawns.', rarity: 'common' },
  { text: 'This is a legally distinct window.', rarity: 'common' },
  { text: 'Somewhere, a close icon giggles.', rarity: 'common' },

  //uncommon

  { text: 'Medium rarity event: button confidence up.', rarity: 'uncommon' },
  { text: 'The tab strip has entered its dramatic era.', rarity: 'uncommon' },
  { text: 'A notification almost happened.', rarity: 'uncommon' },
  { text: 'Your click summoned a polite void.', rarity: 'uncommon' },
  { text: 'Full screen would like a coffee break.', rarity: 'uncommon' },
  { text: 'A phantom page tried to load.', rarity: 'uncommon' },
  { text: 'The window frame says: trust issues.', rarity: 'uncommon' },
  { text: 'The browser goblin took attendance.', rarity: 'uncommon' },
  { text: 'A tab separator has feelings too.', rarity: 'uncommon' },
  { text: 'The alert smelled like pixels.', rarity: 'uncommon' },

  // rare

  { text: 'Rare event unlocked: tiny thunderclap.', rarity: 'rare' },
  { text: 'The maximize button achieved enlightenment.', rarity: 'rare' },
  { text: 'The close icon blinked in Morse code.', rarity: 'rare' },
  { text: 'You found a suspiciously fancy alert.', rarity: 'rare' },
  { text: 'The window briefly became aware.', rarity: 'rare' },
  { text: 'A rare tab myth was witnessed.', rarity: 'rare' },
  { text: 'The shell has spawned a rumor.', rarity: 'rare' },
  { text: 'Some pixels bowed respectfully.', rarity: 'rare' },
  { text: 'The browser moonwalked for one frame.', rarity: 'rare' },
  { text: 'A rare beep with ancestral energy.', rarity: 'rare' },

  // epic

  { text: 'Ultra rare: the window whispered “hi”.', rarity: 'epic' },
  { text: 'Legendary alert: no one expected this.', rarity: 'epic' },
  { text: 'Mythic response: the tab is watching.', rarity: 'epic' },
  { text: 'The chrome frame ascended.', rarity: 'epic' },
  { text: 'Ultra rare chaos event detected.', rarity: 'epic' },
  { text: 'The minimize button briefly learned flight.', rarity: 'epic' },
  { text: 'A perfect alert was forged somewhere.', rarity: 'epic' },
  { text: 'The browser gods are mildly amused.', rarity: 'epic' },
  { text: 'A clean, impossible click resonance.', rarity: 'epic' },
  { text: 'Window boss fight music starts, then stops.', rarity: 'epic' },

  //legendary

  { text: 'Chrome legend: the tab developed lore.', rarity: 'legendary' },
  { text: 'Obscure miracle: the shell sighed.', rarity: 'legendary' },
  { text: 'A once-in-a-blue-moon alert emerged.', rarity: 'legendary' },
  { text: 'The close button formed a prophecy.', rarity: 'legendary' },
  { text: 'The tab strip has transcended UI.', rarity: 'legendary' },
  { text: 'An ancient window rune activated.', rarity: 'legendary' },
  { text: 'Someone will screenshot this later.', rarity: 'legendary' },
  { text: 'The frame cracked with prestige.', rarity: 'legendary' },
  { text: 'You have discovered a rare browser relic.', rarity: 'legendary' },
  { text: 'A legendary ding from beyond the monitor.', rarity: 'legendary' },

  //mythic

  { text: 'Transcendent rarity: the tab smiled back.', rarity: 'mythic' },
  { text: 'Mythic alert: the window now has opinions.', rarity: 'mythic' },
  { text: 'A singularity of browser nonsense occurred.', rarity: 'mythic' },
  { text: 'The maximize button became a comet.', rarity: 'mythic' },
  { text: 'This alert may be older than the internet.', rarity: 'mythic' },
  { text: 'The shell gently folded space-time.', rarity: 'mythic' },
  { text: 'A mythic whisper came through the frame.', rarity: 'mythic' },
  { text: 'The tab strip opened a portal to more tabs.', rarity: 'mythic' },
  { text: 'The close icon achieved enlightenment and left.', rarity: 'mythic' },
  { text: 'An impossible click was recorded.', rarity: 'mythic' }
];

function weightedRarityPick() {
  const pools = {
    common: 58,
    uncommon: 24,
    rare: 9,
    epic: 5,
    legendary: 2,
    mythic: 1
  };

  const roll = Math.random() * 100;
  let acc = 0;

  const order = [
    ['common', pools.common],
    ['uncommon', pools.uncommon],
    ['rare', pools.rare],
    ['epic', pools.epic],
    ['legendary', pools.legendary],
    ['mythic', pools.mythic]
  ];

  for (const [rarity, weight] of order) {
    acc += weight;
    if (roll < acc) return rarity;
  }

  return 'common';
}

function randomAlertMessage() {
  const rarity = weightedRarityPick();
  const pool = randomMessages.filter(item => item.rarity === rarity);
  const picked = pool[Math.floor(Math.random() * pool.length)];
  alert(`${picked.text} [${picked.rarity.toUpperCase()}]`);
  unlockAchievementByAlert(rarity);
}

function openTab(id) {
  panels.forEach(panel => panel.classList.toggle('active', panel.id === id));
  tabButtons.forEach(btn => {
    const active = btn.dataset.tab === id;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  tab6State.active = (id === 'tab-6');

  if (id === 'tab-2') renderBoard();
  if (id === 'tab-3') renderAchievements();

  if (id === 'tab-6' && !tab6State.started) {
    runTab6().catch(console.error);
  }
}

tabButtons.forEach(btn => btn.addEventListener('click', () => openTab(btn.dataset.tab)));
closeButtons.forEach(btn =>
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    randomAlertMessage();
  })
);
minBtn.addEventListener('click', randomAlertMessage);
maxBtn.addEventListener('click', randomAlertMessage);
closeBtn.addEventListener('click', randomAlertMessage);

// Evil meter
setTimeout(() => {
  const fill = document.getElementById('evilFill');
  const text = document.getElementById('evilText');
  if (fill && text) {
    fill.style.width = '97%';
    text.innerText = 'EVIL LEVEL: EVILSTEVILEVIL EVER EVIL!! ASHES TO ASHES DUST TO DUST!!!';
  }
}, 800);

const evilAudio = new Audio('./ImagesAudiosandVideos/THISBEATISSOFIREEE.wav');
evilAudio.loop = true;

let isEvil = false;

function playEvil() {
  isEvil = !isEvil;

  if (isEvil) {
    evilAudio.play().catch(() => console.log('User interaction required first'));
    alert('your ears have been permanently damaged');
  } else {
    evilAudio.pause();
  }
}

// Tic Tac Toe
const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const modeSelect = document.getElementById('modeSelect');
const resetBtn = document.getElementById('resetBtn');
const xWinsEl = document.getElementById('xWins');
const oWinsEl = document.getElementById('oWins');
const drawsEl = document.getElementById('draws');
const tttPanel = document.getElementById('tttPanel');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;
let scores = { X: 0, O: 0, D: 0 };

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function clearTTTTheme() {
  shell.classList.remove('ttt-theme-x', 'ttt-theme-o');
}

function applyTTTTheme(result) {
  clearTTTTheme();
  if (result === 'X') shell.classList.add('ttt-theme-x');
  if (result === 'O') shell.classList.add('ttt-theme-o');
}

function renderBoard() {
  boardEl.innerHTML = '';
  board.forEach((value, i) => {
    const button = document.createElement('button');
    button.className = 'cell';
    button.textContent = value;
    button.setAttribute('aria-label', `cell ${i + 1}`);
    button.disabled = gameOver || !!value;
    button.addEventListener('click', () => handleMove(i));
    boardEl.appendChild(button);
  });
  updateStatus();
}

function updateStatus(message) {
  if (message) {
    statusEl.textContent = message;
    return;
  }
  if (gameOver) return;
  statusEl.textContent = `${currentPlayer}'s turn.`;
}

function checkWinner(state) {
  for (const [a, b, c] of wins) {
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      return state[a];
    }
  }
  return state.every(cell => cell) ? 'D' : null;
}

function endGame(result) {
  gameOver = true;

  if (result === 'D') {
    scores.D++;
    drawsEl.textContent = scores.D;
    clearTTTTheme();
    updateStatus('Draw. Nobody got the final aura move.');
  } else {
    scores[result]++;
    if (result === 'X') xWinsEl.textContent = scores.X;
    if (result === 'O') oWinsEl.textContent = scores.O;
    applyTTTTheme(result);
    updateStatus(`Winner: ${result}`);
  }

  renderBoard();
  statusEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function handleMove(index) {
  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  const result = checkWinner(board);
  renderBoard();

  if (result) {
    endGame(result);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();

  if (modeSelect.value === 'bot' && currentPlayer === 'O' && !gameOver) {
    setTimeout(botMove, 260);
  }
}

function botMove() {
  if (gameOver) return;

  const choices = board.map((v, i) => (v ? null : i)).filter(v => v !== null);
  if (!choices.length) return;

  const pick = choices[Math.floor(Math.random() * choices.length)];
  handleMove(pick);
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  clearTTTTheme();
  updateStatus('X starts.');
  renderBoard();
}

modeSelect.addEventListener('change', resetGame);
resetBtn.addEventListener('click', resetGame);

// Achievements
const achievementDefs = [
  {
    id: 'welcome',
    name: 'Welcome!',
    desc: 'Enter the website. How simple.',
    series: 'Main web series',
    seriesKey: 'main web series',
    rarity: 'common',
    icon: '🏠'
  },
  {
    id: 'luck-common',
    name: 'Common',
    desc: 'Get a common alert. Nothing more.',
    series: 'Luck series',
    seriesKey: 'luck series',
    rarity: 'common',
    icon: '⚪'
  },
  {
    id: 'luck-uncommon',
    name: 'Uncommon',
    desc: 'Get an uncommon alert. Nothing much.',
    series: 'Luck series',
    seriesKey: 'luck series',
    rarity: 'uncommon',
    icon: '🟢'
  },
  {
    id: 'luck-rare',
    name: 'Rare',
    desc: 'Get a rare alert. Getting pretty lucky eh?',
    series: 'Luck series',
    seriesKey: 'luck series',
    rarity: 'rare',
    icon: '🔵'
  },
  {
    id: 'luck-epic',
    name: 'Epic',
    desc: 'Get an epic alert. GAMBLEGAMBLEGAMBLEGAMBLE!!!!',
    series: 'Luck series',
    seriesKey: 'luck series',
    rarity: 'epic',
    icon: './ImagesAudiosandVideos/Epic.jpeg'
  },
  {
    id: 'luck-legendary',
    name: 'Legendary',
    desc: 'Get a legendary alert. WINNER!!!',
    series: 'Luck series',
    seriesKey: 'luck series',
    rarity: 'legendary',
    icon: './ImagesAudiosandVideos/Legendary.jpeg'
  },
  {
    id: 'luck-mythic',
    name: 'MYTHIC',
    desc: 'Somehow get the mythical alert. Congrats lucky guy!',
    series: 'Luck series',
    seriesKey: 'luck series',
    rarity: 'mythic',
    icon: './ImagesAudiosandVideos/Mythic.jpeg'
  },
  {
    id: 'secret-secret1',
    name: 'Barely a Secret',
    desc: 'Find a secret somewhere in the Exposal Tab.',
    series: 'Secret series',
    seriesKey: 'secret series',
    rarity: 'common',
    icon: '?'
  },
  {
    id: 'secret-secret2',
    name: 'Semi-Secret',
    desc: 'What is the elephant in the room? Or I mean, Where?',
    series: 'Secret series',
    seriesKey: 'secret series',
    rarity: 'uncommon',
    icon: '??'
  },
  {
    id: 'secret-secret3',
    name: 'Secret',
    desc: 'What if you "Inspect"?',
    series: 'Secret series',
    seriesKey: 'secret series',
    rarity: 'rare',
    icon: '???'
  },
  {
    id: 'gd',
    name: 'Our Geometry Dash',
    desc: 'Enter literally every vault of secrets code available in gd',
    series: 'Main web series',
    seriesKey: 'main web series',
    rarity: 'rare',
    icon: './ImagesAudiosandVideos/OurGeometryDash.jpeg'
  },
  {
    id: 'coin',
    name: 'Glubfub',
    desc: 'THIEF! THIEF!',
    series: 'Main web series',
    seriesKey: 'main web series',
    rarity: 'uncommon',
    icon: './ImagesAudiosandVideos/Glubfub.gif'
  }
];

function freeAchievement() {
  unlockAchievement('secret-secret1');
}

const seriesIcons = {
  'main web series': 'https://static.thenounproject.com/png/4815663-200.png',
  'luck series': 'https://static.wikia.nocookie.net/enfuturama/images/b/b2/Seven_leaf_clover.jpg/revision/latest?cb=20090716004755',
  'secret series': 'https://static.wikia.nocookie.net/findthechomiks-rbx/images/8/87/SecretSeriesIcon.png/revision/latest?cb=20260211223713'
};

const achievementSearch = document.getElementById('achievementSearch');
const seriesFilter = document.getElementById('seriesFilter');
const achievementGrid = document.getElementById('achievementGrid');
const ACHIEVEMENT_STORAGE_KEY = 'houseofkindness_achievements_v1';

const rarityLabels = {
  common: 'COMMON',
  uncommon: 'UNCOMMON',
  rare: 'RARE',
  epic: 'EPIC',
  legendary: 'LEGENDARY',
  mythic: 'MYTHIC'
};

const achievementMeta = {
  common: { label: 'common', colorClass: 'common' },
  uncommon: { label: 'uncommon', colorClass: 'uncommon' },
  rare: { label: 'rare', colorClass: 'rare' },
  epic: { label: 'epic', colorClass: 'epic' },
  legendary: { label: 'legendary', colorClass: 'legendary' },
  mythic: { label: 'mythic', colorClass: 'mythic' },
  mythical: { label: 'mythic', colorClass: 'mythic' }
};

let unlockedAchievements = new Set();
let achievementCards = new Map();

function loadAchievements() {
  try {
    const raw = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    unlockedAchievements = new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    unlockedAchievements = new Set();
  }
}

function saveAchievements() {
  localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify([...unlockedAchievements]));
}

function playUnlockSfx() {
  const sfx = new Audio('https://www.image2url.com/r2/default/audio/1777542077123-29e89b0c-2257-4b14-a012-70da1fff2860.mp3');
  sfx.volume = 0.9;
  sfx.play().catch(() => {});
}

function getRarityMeta(rarity) {
  return achievementMeta[rarity] || achievementMeta.common;
}

function isImageSrc(src) {
  return typeof src === 'string' && /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(src);
}

function showToast(ach) {
  const meta = getRarityMeta(ach.rarity);

  const toast = document.createElement('div');
  toast.className = `toast ${meta.colorClass}`;

  const iconWrap = document.createElement('div');
  iconWrap.className = 'toast-icon';

  if (isImageSrc(ach.icon)) {
    const img = document.createElement('img');
    img.src = ach.icon;
    img.alt = '';
    img.onerror = () => {
      iconWrap.textContent = '🏆';
    };
    iconWrap.appendChild(img);
  } else {
    iconWrap.textContent = ach.icon || '🏆';
  }

  const copy = document.createElement('div');
  copy.className = 'toast-copy';
  copy.innerHTML = `
    <div class="toast-title">Achievement Unlocked</div>
    <div class="toast-desc"></div>
  `;
  copy.querySelector('.toast-desc').textContent = ach.name;

  toast.appendChild(iconWrap);
  toast.appendChild(copy);
  toastStack.appendChild(toast);

  setTimeout(() => toast.remove(), 3900);
}

function unlockAchievement(id, silent = false) {
  const ach = achievementDefs.find(a => a.id === id);
  if (!ach || unlockedAchievements.has(id)) return false;

  unlockedAchievements.add(id);
  saveAchievements();
  renderAchievementCard(id);

  if (!silent) {
    playUnlockSfx();
    showToast(ach);
  }

  return true;
}

function unlockAchievementByAlert(rarity) {
  if (rarity === 'common') unlockAchievement('luck-common');
  if (rarity === 'uncommon') unlockAchievement('luck-uncommon');
  if (rarity === 'rare') unlockAchievement('luck-rare');
  if (rarity === 'epic') unlockAchievement('luck-epic');
  if (rarity === 'legendary') unlockAchievement('luck-legendary');
  if (rarity === 'mythic' || rarity === 'mythical') unlockAchievement('luck-mythic');
  renderAchievements();
}

function buildAchievementCard(ach) {
  const card = document.createElement('div');
  card.className = 'achievement-card';
  card.dataset.id = ach.id;
  card.innerHTML = `
    <div class="achievement-badge locked" data-badge></div>
    <div class="achievement-head">
      <div class="achievement-name" data-name></div>
      <img class="series-icon" data-series-icon alt="">
    </div>
    <div class="achievement-desc" data-desc></div>
    <div class="achievement-state" data-state>Locked</div>
  `;

  achievementCards.set(ach.id, card);
  achievementGrid.appendChild(card);
  renderAchievementCard(ach.id);
}

function renderAchievementCard(id) {
  const ach = achievementDefs.find(a => a.id === id);
  const card = achievementCards.get(id);
  if (!ach || !card) return;

  const unlocked = unlockedAchievements.has(id);
  const meta = getRarityMeta(ach.rarity);

  const badge = card.querySelector('[data-badge]');
  const seriesIconEl = card.querySelector('[data-series-icon]');

  card.classList.toggle('unlocked', unlocked);
  card.classList.toggle('locked', !unlocked);

  badge.className = `achievement-badge ${unlocked ? meta.colorClass : 'locked'}`;

  if (unlocked) {
    if (isImageSrc(ach.icon)) {
      badge.innerHTML = `<img src="${ach.icon}" alt="" onerror="this.replaceWith(document.createTextNode('🏆'))">`;
    } else {
      badge.textContent = ach.icon || '🏆';
    }
  } else {
    badge.textContent = '🔒';
  }

  card.querySelector('[data-name]').textContent = ach.name;
  card.querySelector('[data-desc]').textContent = `${ach.series} • ${ach.desc}`;
  card.querySelector('[data-state]').textContent = unlocked ? 'Unlocked' : 'Locked';

  const iconSrc = seriesIcons[ach.seriesKey] || '';
  seriesIconEl.src = iconSrc;
  seriesIconEl.alt = ach.series;
  seriesIconEl.style.display = iconSrc ? 'block' : 'none';
}

function renderAchievements() {
  const query = (achievementSearch?.value || '').trim().toLowerCase();
  const series = seriesFilter?.value || 'all';

  achievementDefs.forEach(ach => {
    if (!achievementCards.has(ach.id)) buildAchievementCard(ach);
    else renderAchievementCard(ach.id);

    const card = achievementCards.get(ach.id);
    const haystack = `${ach.name} ${ach.desc} ${ach.series} ${ach.rarity} ${ach.id}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesSeries = series === 'all' || ach.seriesKey === series;

    card.classList.toggle('hidden', !(matchesQuery && matchesSeries));
  });
}

achievementSearch?.addEventListener('input', renderAchievements);
seriesFilter?.addEventListener('change', renderAchievements);

loadAchievements();
renderAchievements();

if (unlockAchievement('welcome', true)) {
  const welcomeAch = achievementDefs.find(a => a.id === 'welcome');
  if (welcomeAch) showToast(welcomeAch);
}

// secret
const helpEl = document.getElementById('help');
let helpClicks = 0;

// Semi-secret achievement
helpEl?.addEventListener('click', () => {
  if (helpClicks >= 3) return;
  helpClicks++;

  if (helpClicks >= 3) {
    unlockAchievement('secret-secret2');
  }
});

const responses = [
  'I have heard about you',
  'You think you can fool me',
  'You are deeply mistaken',
  'Go away!',
  "You're not supposed to be in here...",
  "RubRub won't like this...",
  'zzzZZZZ...',
  "Don't touch that!",
  'Why you touch my stuff?',
  'You shall not pass!',
  "Don't push the button!",
  "You're gonna get me in trouble...",
  'Sneaky sneaky...',
  "It's my precious...",
  'Go collect some stars',
  'Maybe there are new levels?',
  'Just, stop bothering me',
  "I'm gonna stop talking",
  '...',
  '......',
  'GAH!',
  "You're hopeless...",
  'Really, still here?',
  'Fine, press the button'
];

const wrongResponses = [
  'WRONG',
  'Nope',
  'Swing and a miss!',
  'Door is still locked',
  'Try harder please',
  "Don't make me angry",
  'Failure',
  'May I suggest thinking?'
];

let responseIndex = 0;
const vaultText = document.getElementById('vaultText');
const input = document.getElementById('vaultInput');
const keymaster = document.getElementById('keymaster');
let keymasterCooldown = false;
input.value = '';

const vaultCodes = {
  'the challenge': {
    text: 'My level? You want to try it!?',
    id: 'gd'
  },
  octocube: {
    text: 'Ugh... Slippery',
    id: 'gd'
  },
  seven: {
    text: 'I should have been a doctor...',
    id: 'gd'
  },
  brainpower: {
    text: 'O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo!',
    id: 'gd'
  },
  thechickenisonfire: {
    text: 'Indeed it is... Or zZzZzZ..',
    id: 'gd'
  },
  gimmiethecolor: {
    text: 'How many colors do you need?',
    id: 'gd'
  },
  d4shg30me7ry: {
    text: 'Good times',
    id: 'gd'
  },
  thechickenisready: {
    text: 'You overcooked it again!',
    id: 'gd'
  },
  '7917281818277': {
    text: "You solved it? You're better than we expected... Here's a reward.",
    unlock: 'secret-secret3'
  },
  glubfub: {
    text: 'NOOOO!! THIEF! THIEF!',
    unlock: 'coin'
  }
};

const gdRequiredCodes = Object.keys(vaultCodes).filter(k => {
  const v = vaultCodes[k];
  return v.id === 'gd' || k === 'glubfub';
});

let gdProgress = new Set(JSON.parse(localStorage.getItem('gdProgress') || '[]'));
let usedVaultCodes = new Set();

function spawnCoin() {
  const coinSound = new Audio('./ImagesAudiosandVideos/coin-collect-geometry-dash.mp3');
  coinSound.play().catch(() => {});

  const coin = document.createElement('img');
  coin.src = './ImagesAudiosandVideos/Glubfub.gif';
  coin.alt = '';

  coin.style.position = 'fixed';
  coin.style.left = '50%';
  coin.style.top = '50%';
  coin.style.transform = 'translate(-50%, -50%)';
  coin.style.width = '100px';
  coin.style.zIndex = '9999';
  coin.style.pointerEvents = 'none';

  document.body.appendChild(coin);

  coin.animate(
    [
      { transform: 'translate(-50%, -50%)' },
      { transform: 'translate(-50%, -120%)' },
      { transform: 'translate(-50%, -50%)' }
    ],
    {
      duration: 300,
      easing: 'ease-out'
    }
  );

  setTimeout(() => {
    coin.animate(
      [
        { transform: 'translate(-50%, -50%)', opacity: 1 },
        { transform: 'translate(-50%, 200%)', opacity: 0 }
      ],
      {
        duration: 400,
        easing: 'ease-in',
        fill: 'forwards'
      }
    );
  }, 300);

  setTimeout(() => {
    coin.remove();
  }, 700);
}

function incrementGDProgress(code) {
  if (!gdRequiredCodes.includes(code)) return;

  gdProgress.add(code);
  localStorage.setItem('gdProgress', JSON.stringify([...gdProgress]));

  if (gdProgress.size === gdRequiredCodes.length) {
    unlockAchievement('gd');
  }
}

keymaster?.addEventListener('click', () => {
  if (keymasterCooldown) return;
  keymasterCooldown = true;

  try {
    const value = input.value.trim().toLowerCase();

    if (vaultCodes[value] && !usedVaultCodes.has(value)) {
      const code = vaultCodes[value];
      vaultText.textContent = code.text;
      usedVaultCodes.add(value);

      if (code.unlock) unlockAchievement(code.unlock);
      if (code.id === 'gd' || value === 'glubfub') incrementGDProgress(value);
      if (value === 'glubfub') spawnCoin();
    } else if (value === '') {
      vaultText.textContent = responses[responseIndex];
      responseIndex = (responseIndex + 1) % responses.length;
    } else {
      const rand = wrongResponses[Math.floor(Math.random() * wrongResponses.length)];
      vaultText.textContent = rand;
    }

    input.value = '';
  } finally {
    setTimeout(() => {
      keymasterCooldown = false;
    }, 400);
  }
});

const tab6SwapBtn = document.getElementById('tab6SwapBtn');
const tab6Terminal = document.getElementById('terminal');

const tab6State = {
  active: false,
  started: false,
  finished: false,
  loadingDone: false
};

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

    .page-bg {
      position: fixed;
      inset: 0;
      background-image: url('https://ella.janitorai.com/media-approved/rK-ktxsj0DjoRdX_j6fGU.webp');
      background-size: cover;
      background-position: center;
      z-index: -1;
    }

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

    .page-content {
      max-width: 900px;
      margin: 0 auto;
      padding: 1.5rem 1rem 3rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

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

    .profile-about {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .profile-about h1 { font-size: 1.4rem; }

    .char-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }
    @media (min-width: 42rem) {
      .char-grid { grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr)); }
    }

    .char-card {
      border-radius: 8px;
      position: relative;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

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
  </script>
</body>
</html>`;

function syncTab6Button() {
  if (!tab6SwapBtn) return;
  tab6SwapBtn.textContent = tab6ShowingPreload ? "Show log" : "Show preload";
}

function showTab6Log() {
  if (!tab6Terminal) return;
  tab6Terminal.innerHTML = tab6LogHTML || "";
  tab6ShowingPreload = false;
  syncTab6Button();
}

function showTab6Preload() {
  if (!tab6Terminal) return;

  const iframe = document.createElement('iframe');
  iframe.title = 'Tab 6 preview';
  iframe.srcdoc = TAB6_PRELOAD_DOC;
  iframe.style.width = '100%';
  iframe.style.height = '70vh';
  iframe.style.border = '0';
  iframe.style.borderRadius = '12px';
  iframe.style.display = 'block';
  iframe.style.background = '#fff';

  tab6Terminal.replaceChildren(iframe);
  tab6ShowingPreload = true;
  syncTab6Button();
}

tab6SwapBtn?.addEventListener('click', () => {
  if (!tab6State.finished) return;

  if (tab6ShowingPreload) showTab6Log();
  else showTab6Preload();
});

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

    terminal.innerHTML = `${getTimestamp()} > loading... ${percent}%<span class="cursor">█</span>`;
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
  showTab6Log();
}
