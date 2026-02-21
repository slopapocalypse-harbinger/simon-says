const state = {
  energy: 60,
  insight: 0,
  credits: 30,
  shards: 0,
  influence: 0,
  threat: 0,
  level: 1,
  xp: 0,
  xpNeed: 100,
  zone: "neon-district",
  tick: 0,
  challenge: null,
  quests: [],
  artifacts: [],
  achievements: {},
  upgrades: {
    drone: 0,
    reactor: 0,
    decoder: 0,
    broker: 0,
    chrono: 0
  },
  modifiers: {
    energyRegen: 1,
    insightGain: 1,
    creditsGain: 1,
    combatPower: 1,
    shardLuck: 1
  },
  eventLog: []
};

const zones = {
  "neon-district": { name: "Neon District", danger: 1, reward: 1, unlock: 1 },
  "fracture-archive": { name: "Fracture Archive", danger: 2, reward: 1.5, unlock: 4 },
  "abyssal-spindle": { name: "Abyssal Spindle", danger: 3.2, reward: 2.2, unlock: 7 },
  "paradox-citadel": { name: "Paradox Citadel", danger: 4.7, reward: 3.4, unlock: 11 }
};

const actions = [
  { id: "scout", name: "Scout", energy: 8, run: () => gainBasic(6, 8) },
  { id: "breach", name: "Breach Node", energy: 13, run: () => gainCombat(1) },
  { id: "expedition", name: "Deep Expedition", energy: 22, run: () => gainCombat(1.8) },
  { id: "market", name: "Black Market", energy: 10, run: () => marketAction() },
  { id: "synthesize", name: "Synthesize Artifact", energy: 18, run: () => synthesizeArtifact() },
  { id: "quest", name: "Roll New Quest", energy: 5, run: () => generateQuest() }
];

const upgrades = [
  { id: "drone", name: "Autonomous Drone", desc: "+1.2 passive insight/sec", base: 45, scale: 1.6, effect: (lvl) => lvl * 1.2 },
  { id: "reactor", name: "Fusion Reactor", desc: "+0.7 energy regen/sec", base: 70, scale: 1.7, effect: (lvl) => lvl * 0.7 },
  { id: "decoder", name: "Quantum Decoder", desc: "+15% action insight gain", base: 95, scale: 1.8, effect: (lvl) => lvl * 0.15 },
  { id: "broker", name: "Shadow Broker", desc: "+20% credits gain", base: 110, scale: 1.8, effect: (lvl) => lvl * 0.2 },
  { id: "chrono", name: "Chrono Anchor", desc: "-5% threat growth", base: 130, scale: 1.9, effect: (lvl) => lvl * 0.05 }
];

const achievements = [
  { id: "level5", text: "Reach Level 5", check: () => state.level >= 5 },
  { id: "first-artifact", text: "Forge your first artifact", check: () => state.artifacts.length >= 1 },
  { id: "mogul", text: "Stack 2,000 credits", check: () => state.credits >= 2000 },
  { id: "walker", text: "Unlock all zones", check: () => unlockedZones().length === Object.keys(zones).length },
  { id: "veteran", text: "Complete 12 quests", check: () => questCompleteCount >= 12 }
];

const artifactsPool = [
  { name: "Prismatic Lens", desc: "+18% insight gain", bonus: () => (state.modifiers.insightGain += 0.18) },
  { name: "Entropy Core", desc: "+22% combat power", bonus: () => (state.modifiers.combatPower += 0.22) },
  { name: "Mirage Contract", desc: "+20% credits gain", bonus: () => (state.modifiers.creditsGain += 0.2) },
  { name: "Harmonic Battery", desc: "+0.4 energy regen/sec", bonus: () => (state.modifiers.energyRegen += 0.4) },
  { name: "Oracle Fragment", desc: "+25% shard find luck", bonus: () => (state.modifiers.shardLuck += 0.25) }
];

let questCompleteCount = 0;
let lastRender = 0;

const resourceGrid = document.getElementById("resourceGrid");
const actionButtons = document.getElementById("actionButtons");
const zoneList = document.getElementById("zoneList");
const eventFeed = document.getElementById("eventFeed");
const upgradeList = document.getElementById("upgradeList");
const artifactList = document.getElementById("artifactList");
const achievementList = document.getElementById("achievementList");
const questBoard = document.getElementById("questBoard");
const challengeBox = document.getElementById("challengeBox");
const statusText = document.getElementById("statusText");

function num(v) {
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}

function pushEvent(text, good = true) {
  const stamp = new Date().toLocaleTimeString();
  state.eventLog.unshift({ stamp, text, good });
  if (state.eventLog.length > 130) state.eventLog.pop();
}

function zoneData() {
  return zones[state.zone];
}

function unlockedZones() {
  return Object.entries(zones).filter(([, z]) => state.level >= z.unlock);
}

function gainXP(base) {
  state.xp += base;
  while (state.xp >= state.xpNeed) {
    state.xp -= state.xpNeed;
    state.level += 1;
    state.xpNeed = Math.floor(state.xpNeed * 1.32);
    state.energy += 16;
    state.credits += 22 * state.level;
    pushEvent(`Level up! You are now level ${state.level}.`, true);
  }
}

function gainBasic(insightBase, creditsBase) {
  const z = zoneData();
  const insight = insightBase * z.reward * state.modifiers.insightGain * (1 + state.upgrades.decoder * 0.08);
  const credits = creditsBase * z.reward * state.modifiers.creditsGain * (1 + state.upgrades.broker * 0.1);
  state.insight += insight;
  state.credits += credits;
  state.threat += 0.7 * z.danger * (1 - state.upgrades.chrono * 0.05);
  gainXP(10 * z.danger);
  maybeDropShard(z.danger);
  maybeTriggerChallenge();
  pushEvent(`Scouted ${z.name}: +${num(insight)} insight, +${num(credits)} credits.`, true);
}

function gainCombat(scale) {
  const z = zoneData();
  const power = state.modifiers.combatPower * (1 + state.level * 0.04);
  const outcome = Math.random() * power * scale * 10 - z.danger * 7;
  if (outcome > 4) {
    const insight = (10 + outcome) * z.reward * state.modifiers.insightGain;
    const credits = (7 + outcome) * z.reward * state.modifiers.creditsGain;
    state.insight += insight;
    state.credits += credits;
    state.threat += 1.4 * z.danger * (1 - state.upgrades.chrono * 0.05);
    gainXP(18 * z.danger);
    maybeDropShard(z.danger * 1.2);
    pushEvent(`Breach success in ${z.name}. +${num(insight)} insight, +${num(credits)} credits.`, true);
  } else {
    const dmg = Math.max(6, 14 * z.danger - outcome);
    state.energy = Math.max(0, state.energy - dmg);
    state.threat += 2.5 * z.danger;
    gainXP(5 * z.danger);
    pushEvent(`Ambushed in ${z.name}. Lost ${num(dmg)} energy.`, false);
  }
  maybeTriggerChallenge();
}

function marketAction() {
  const buy = 40 + state.level * 8;
  if (state.credits >= buy) {
    state.credits -= buy;
    const gain = 1 + Math.floor(Math.random() * 3);
    state.shards += gain;
    pushEvent(`Black Market deal: traded ${buy} credits for ${gain} shard(s).`, true);
  } else {
    state.credits += 10 + state.level;
    pushEvent("Ran jobs at the market: minor credit gain.", true);
  }
  state.threat += 1;
}

function maybeDropShard(luckWeight) {
  const chance = 0.08 + state.modifiers.shardLuck * 0.03 + state.level * 0.003;
  if (Math.random() < chance) {
    const amount = 1 + (Math.random() < 0.22 + luckWeight * 0.04 ? 1 : 0);
    state.shards += amount;
    pushEvent(`Found ${amount} resonance shard(s)!`, true);
  }
}

function maybeTriggerChallenge() {
  if (state.challenge || Math.random() > 0.12) return;
  const target = 90 + state.level * 18;
  state.challenge = {
    name: ["Data Storm", "Hunter Swarm", "Paradox Trial"][Math.floor(Math.random() * 3)],
    progress: 0,
    target,
    reward: Math.floor(target * 0.9),
    timer: 55
  };
  pushEvent(`Challenge started: ${state.challenge.name}.`, false);
}

function tickChallenge() {
  if (!state.challenge) return;
  state.challenge.timer -= 1;
  state.challenge.progress += (state.insight / 400 + state.level * 0.7) * state.modifiers.combatPower;
  if (state.challenge.progress >= state.challenge.target) {
    const reward = state.challenge.reward;
    state.credits += reward;
    state.insight += reward * 0.8;
    state.shards += 2;
    pushEvent(`Challenge cleared: +${reward} credits, +2 shards.`, true);
    state.challenge = null;
  } else if (state.challenge.timer <= 0) {
    state.threat += 9;
    state.energy = Math.max(0, state.energy - 25);
    pushEvent("Challenge failed. Network pressure intensifies.", false);
    state.challenge = null;
  }
}

function generateQuest() {
  const templates = [
    { t: "Accumulate insight", field: "insight", base: 180, hint: "Gain insight from actions, passives, and rewards." },
    { t: "Earn credits", field: "credits", base: 220, hint: "Build credits through scouting, combat wins, and market work." },
    { t: "Collect shards", field: "shards", base: 4, hint: "Find shards from successful actions or trade for them at Black Market." },
    { t: "Gain XP", field: "xp", base: 120, hint: "Any action can add XP. Harder zones and risky runs grant more." }
  ];
  const q = templates[Math.floor(Math.random() * templates.length)];
  const scale = 1 + state.level * 0.4;
  const target = Math.floor(q.base * scale);
  const start = state[q.field];
  state.quests.push({
    id: crypto.randomUUID(),
    title: q.t,
    hint: q.hint,
    field: q.field,
    start,
    target,
    rewardC: Math.floor(85 * scale),
    rewardI: Math.floor(70 * scale),
    done: false
  });
  if (state.quests.length > 6) state.quests.shift();
  pushEvent(`New quest posted: ${q.t}.`, true);
}

function checkQuests() {
  state.quests.forEach((q) => {
    if (q.done) return;
    const prog = state[q.field] - q.start;
    if (prog >= q.target) {
      q.done = true;
      state.credits += q.rewardC;
      state.insight += q.rewardI;
      state.shards += 1;
      questCompleteCount += 1;
      pushEvent(`Quest complete: ${q.title}. Rewards claimed.`, true);
    }
  });
}

function synthesizeArtifact() {
  const cost = 3 + Math.floor(state.artifacts.length * 1.5);
  if (state.shards < cost) {
    pushEvent(`Need ${cost} shards to synthesize artifact.`, false);
    return;
  }
  state.shards -= cost;
  const options = artifactsPool.filter((a) => !state.artifacts.find((s) => s.name === a.name));
  const art = (options.length ? options : artifactsPool)[Math.floor(Math.random() * (options.length ? options.length : artifactsPool.length))];
  state.artifacts.push({ name: art.name, ts: Date.now() });
  art.bonus();
  gainXP(90);
  pushEvent(`Artifact forged: ${art.name}. Permanent bonus applied.`, true);
}

function buyUpgrade(id) {
  const u = upgrades.find((x) => x.id === id);
  const lvl = state.upgrades[id];
  const cost = Math.floor(u.base * Math.pow(u.scale, lvl));
  if (state.credits < cost) return;
  state.credits -= cost;
  state.upgrades[id] += 1;
  recomputeModifiers();
  pushEvent(`Upgraded ${u.name} to level ${state.upgrades[id]}.`, true);
}

function recomputeModifiers() {
  state.modifiers.energyRegen = 1 + upgrades.find((u) => u.id === "reactor").effect(state.upgrades.reactor);
  state.modifiers.insightGain = 1 + upgrades.find((u) => u.id === "decoder").effect(state.upgrades.decoder);
  state.modifiers.creditsGain = 1 + upgrades.find((u) => u.id === "broker").effect(state.upgrades.broker);
  state.modifiers.combatPower = 1 + state.upgrades.drone * 0.16;
  state.modifiers.shardLuck = 1 + state.artifacts.filter((a) => a.name === "Oracle Fragment").length * 0.25;
  state.modifiers.energyRegen += state.artifacts.filter((a) => a.name === "Harmonic Battery").length * 0.4;
  state.modifiers.insightGain += state.artifacts.filter((a) => a.name === "Prismatic Lens").length * 0.18;
  state.modifiers.creditsGain += state.artifacts.filter((a) => a.name === "Mirage Contract").length * 0.2;
  state.modifiers.combatPower += state.artifacts.filter((a) => a.name === "Entropy Core").length * 0.22;
}

function upgradeImpactText(id, lvl) {
  const nextLevel = lvl + 1;
  if (id === "drone") return `Passive insight: ${num(lvl * 1.2)} → ${num(nextLevel * 1.2)} / sec`;
  if (id === "reactor") return `Energy regen: +${num(lvl * 0.7)} → +${num(nextLevel * 0.7)} / sec`;
  if (id === "decoder") return `Action insight bonus: +${Math.round(lvl * 15)}% → +${Math.round(nextLevel * 15)}%`;
  if (id === "broker") return `Credit gain bonus: +${Math.round(lvl * 20)}% → +${Math.round(nextLevel * 20)}%`;
  if (id === "chrono") return `Threat growth reduction: -${Math.round(lvl * 5)}% → -${Math.round(nextLevel * 5)}%`;
  return "";
}

function runPassive() {
  const z = zoneData();
  const passiveInsight = state.upgrades.drone * 1.2 * z.reward * state.modifiers.insightGain;
  state.insight += passiveInsight;
  state.energy = Math.min(100 + state.level * 8, state.energy + state.modifiers.energyRegen);
  state.threat = Math.max(0, state.threat - 0.3 - state.level * 0.02);
  if (state.threat > 120) {
    const penalty = 18 + state.level * 1.2;
    state.energy = Math.max(0, state.energy - penalty);
    state.threat = 70;
    pushEvent("Threat overflow! Security strike drained your energy.", false);
  }
  gainXP(1.5 + z.danger * 0.4);
}

function checkAchievements() {
  achievements.forEach((a) => {
    if (state.achievements[a.id]) return;
    if (a.check()) {
      state.achievements[a.id] = true;
      state.credits += 180;
      state.insight += 140;
      pushEvent(`Achievement unlocked: ${a.text}.`, true);
    }
  });
}

function performAction(action) {
  if (state.energy < action.energy) {
    pushEvent("Not enough energy.", false);
    return;
  }
  state.energy -= action.energy;
  action.run();
  checkQuests();
}

function render() {
  resourceGrid.innerHTML = "";
  [
    ["Energy", num(state.energy)],
    ["Insight", num(state.insight)],
    ["Credits", num(state.credits)],
    ["Shards", num(state.shards)],
    ["Threat", num(state.threat)],
    [`Level ${state.level}`, `${num(state.xp)}/${state.xpNeed} XP`]
  ].forEach(([name, val]) => {
    const div = document.createElement("div");
    div.className = "resource-card";
    div.innerHTML = `<b>${name}</b><span>${val}</span>`;
    resourceGrid.appendChild(div);
  });

  actionButtons.innerHTML = "";
  actions.forEach((a) => {
    const b = document.createElement("button");
    b.textContent = `${a.name} (${a.energy}⚡)`;
    b.disabled = state.energy < a.energy;
    b.onclick = () => performAction(a);
    actionButtons.appendChild(b);
  });

  zoneList.innerHTML = "";
  Object.entries(zones).forEach(([id, z]) => {
    const unlocked = state.level >= z.unlock;
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<div class="title"><span>${z.name}</span><span>${unlocked ? '<span class="tag">Unlocked</span>' : `Lvl ${z.unlock}`}</span></div>
      <p>Danger ${z.danger} • Reward x${z.reward}. ${state.zone === id ? "<b>Current Zone</b>" : ""}</p>`;
    if (unlocked && state.zone !== id) {
      const btn = document.createElement("button");
      btn.textContent = "Travel";
      btn.onclick = () => {
        state.zone = id;
        pushEvent(`Moved operation to ${z.name}.`, true);
      };
      div.appendChild(btn);
    }
    zoneList.appendChild(div);
  });

  eventFeed.innerHTML = state.eventLog
    .map((e) => `<div class="feed-entry"><small>${e.stamp}</small>${e.good ? "✅" : "⚠️"} ${e.text}</div>`)
    .join("");

  upgradeList.innerHTML = "";
  upgrades.forEach((u) => {
    const lvl = state.upgrades[u.id];
    const cost = Math.floor(u.base * Math.pow(u.scale, lvl));
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<div class="title"><span>${u.name}</span><span>Lv ${lvl}</span></div><p>${u.desc}</p><p>${upgradeImpactText(u.id, lvl)}</p><p>Cost: ${cost} credits</p>`;
    const b = document.createElement("button");
    b.textContent = "Upgrade";
    b.disabled = state.credits < cost;
    b.onclick = () => buyUpgrade(u.id);
    div.appendChild(b);
    upgradeList.appendChild(div);
  });

  artifactList.innerHTML = state.artifacts.length
    ? state.artifacts.map((a) => {
      const details = artifactsPool.find((poolItem) => poolItem.name === a.name);
      return `<div class="card"><div class="title"><span>${a.name}</span><span>∞</span></div><p>${details?.desc || "Permanent bonus"}</p></div>`;
    }).join("")
    : '<div class="card"><p>No artifacts yet. Synthesize to unlock permanent powers.</p></div>';

  artifactList.innerHTML += `<div class="card"><div class="title"><span>Possible Synthesis Outcomes</span><span>Preview</span></div>${artifactsPool
    .map((a) => `<p><b>${a.name}:</b> ${a.desc}</p>`)
    .join("")}</div>`;

  achievementList.innerHTML = achievements
    .map((a) => `<div class="card"><div class="title"><span>${a.text}</span><span>${state.achievements[a.id] ? "🏆" : "..."}</span></div></div>`)
    .join("");

  questBoard.innerHTML = state.quests.length
    ? state.quests.map((q) => {
        const prog = Math.max(0, state[q.field] - q.start);
        return `<div class="card"><div class="title"><span>${q.title}</span><span>${q.done ? "✔" : `${num(prog)}/${q.target}`}</span></div>
        <p>${q.hint}</p>
        <p>Reward: ${q.rewardC} credits, ${q.rewardI} insight, 1 shard</p></div>`;
      }).join("")
    : '<div class="card"><p>No quests active. Roll one!</p></div>';

  if (state.challenge) {
    challengeBox.innerHTML = `<div class="title"><span>${state.challenge.name}</span><span>${state.challenge.timer}s</span></div>
    <p>Progress: ${num(state.challenge.progress)} / ${state.challenge.target}</p>
    <p>Reward: ${state.challenge.reward} credits + 2 shards</p>`;
  } else {
    challengeBox.textContent = "No active challenge. Keep pushing actions and one may appear.";
  }
}

function saveGame() {
  localStorage.setItem("mindbreaker-save", JSON.stringify({ state, questCompleteCount }));
  statusText.textContent = "Saved.";
}

function loadGame() {
  const raw = localStorage.getItem("mindbreaker-save");
  if (!raw) {
    statusText.textContent = "No save found.";
    return;
  }
  const parsed = JSON.parse(raw);
  Object.assign(state, parsed.state || {});
  questCompleteCount = parsed.questCompleteCount || 0;
  recomputeModifiers();
  statusText.textContent = "Loaded.";
  pushEvent("Loaded save data.", true);
}

function hardReset() {
  localStorage.removeItem("mindbreaker-save");
  location.reload();
}

function gameLoop(ts) {
  if (ts - lastRender >= 1000) {
    state.tick += 1;
    runPassive();
    tickChallenge();
    checkQuests();
    checkAchievements();
    render();
    lastRender = ts;
  }
  requestAnimationFrame(gameLoop);
}

document.getElementById("saveBtn").onclick = saveGame;
document.getElementById("loadBtn").onclick = loadGame;
document.getElementById("hardResetBtn").onclick = hardReset;

generateQuest();
generateQuest();
pushEvent("Welcome, Operator Simon. Build your empire.", true);
recomputeModifiers();
render();
requestAnimationFrame(gameLoop);
