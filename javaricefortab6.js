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

  terminal.insertAdjacentHTML("beforeend", `<span class="cursor">█</span>`);
  tab6State.finished = true;
}
