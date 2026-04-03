# Simon Says: Wanderer's Chronicle

A guided incremental expedition game where Simon explores on his own and you shape the journey through a queue of suggestions, camp projects, route planning, and late-game phenomena.

## What changed
- The opening is now paced through chapters instead of dumping every mechanic up front
- Simon acts autonomously in a visual journey window; you guide rather than directly control
- New systems unlock gradually: supplies, camp projects, atlas travel, discoveries, coins, relic dust, phenomena, and commune
- Every region has its own activity flavor, visuals, and unique keepsakes with permanent bonuses
- Camp growth is slower and more legible, with staged project tiers instead of an all-at-once upgrade wall
- A debug lab and exported simulation hooks are built in for fast-forward pacing checks

## Debug tools
- In the UI, use the `Debug` button to open the pacing panel
- Use `Fast-forward 30s`, `Fast-forward 5m`, or `Autoplay 20m` to simulate progression
- In a JS runtime, `runDebugSimulation(seconds, seed)` and `createGameEngine()` are exported from [`game.js`](/home/deck/git/simon-says/game.js)

## Run locally
Serve the folder with any static server.

Example:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.
