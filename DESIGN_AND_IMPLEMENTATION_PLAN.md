# Tic Tac Toe — Design & Implementation Plan

A phased plan to refactor the current app, add features and UX polish, then deploy on AWS with persistent leaderboards.

---

## Phase 1: Refactoring (Start Here)

### 1.1 Fix Existing Bugs & Conventions

| Item | Current | Action |
|------|---------|--------|
| **Navbar** | Uses `<a href>` (full page reload) | Use React Router `<Link>` and fix import (`link` → `Link`) |
| **HTML title** | "Document" | Set to "Tic Tac Toe" (or your app name) in `public/index.html` |
| **package.json name** | "react.dev" | Rename to e.g. `"tic-tac-toe"` or `"react-tic-tac-toe"` |

### 1.2 Extract Game Logic & Components

**Current:** `GamePage.js` contains Header, Square, Board, `calculateWinner`, and all game state (~165 lines).

**Target structure:**

```
src/
├── components/
│   ├── game/
│   │   ├── Board.js          # Renders 3x3 grid, receives squares + callbacks
│   │   ├── Square.js         # Single cell, value + onClick + highlight
│   │   ├── GameHeader.js     # Optional; or keep minimal header in GamePage
│   │   └── MoveHistory.js    # List of "Go to move #n" / "Restart"
│   ├── layout/
│   │   ├── Layout.js         # (move from src/) Navbar + Outlet
│   │   └── Navbar.js         # (move from src/)
│   └── ui/                   # Optional: Button, Card, etc. for reuse
├── game/
│   ├── gameLogic.js          # calculateWinner(squares) — pure function, easy to test
│   └── constants.js          # WINNING_LINES, PLAYERS (X, O), etc.
├── pages/
│   ├── HomePage.js
│   ├── GamePage.js           # Compose Board + MoveHistory, hold history state
│   └── RankPage.js
├── hooks/                    # Optional for later
│   └── useGameState.js       # Encapsulate history + currentMove + handlePlay + jumpTo
├── App.js
├── index.js
└── styles/
    ├── index.css             # Global resets, body, typography
    ├── layout.css            # Navbar, Layout
    └── game.css              # Board, Square, status, move list
```

**Benefits:**

- Smaller, testable files (e.g. unit test `calculateWinner` and `gameLogic`).
- Clear separation: UI vs. game rules vs. pages.
- Easier to add features (AI, modes, leaderboard) without touching everything.

### 1.3 Style & CSS Cleanup

- Remove duplicate/comment blocks in `styles.css`.
- Split into `styles/index.css`, `styles/layout.css`, `styles/game.css` (or keep one file but organized with comments/sections).
- Use Tailwind consistently if you want (it’s in devDependencies); otherwise stick to plain CSS and delete Tailwind to avoid mixed approaches.
- Ensure one source of truth for `.square` dimensions and colors (no conflicting rules).

### 1.4 Optional: Centralize Routes

- Keep routes in `App.js` or move to `src/routes.js` (or `src/config/routes.js`) and import in `App.js` for clarity as routes grow.

---

## Phase 2: Features & Interactivity

### 2.1 Game Modes

- **Local 2-player** (current behavior).
- **vs AI** (easy/medium/hard):
  - Easy: random empty square.
  - Medium: block wins, take wins, else random.
  - Hard: minimax (optimal play).
- **Online 2-player** (Phase 4): matchmaking + real-time moves.

### 2.2 Game Lifecycle & UX

- **New game:** Clear button that resets board and move history.
- **End state:** Clear message (Winner: X/O or Draw) and optional short celebration (e.g. confetti or highlight animation already present).
- **Score tracking (in-session):** Wins for X vs O (or Player 1 vs Player 2) during current session, shown on Game page or in a small sidebar.
- **Player names:** Optional labels "Player 1 (X)" / "Player 2 (O)" or custom names (stored in component state or later in backend).

### 2.3 Interactivity & Polish

- **Hover:** Indicate playable squares (e.g. cursor, subtle background).
- **Animations:** Place mark (fade-in or scale), winning line (already highlighted; optional draw line animation).
- **Sound (optional):** Place mark, win, draw.
- **Responsive layout:** Board and move list stack on small screens; touch-friendly tap targets.
- **Accessibility:** `aria-label` on squares, focus management after move, keyboard support (e.g. tab through squares, Enter to play).

### 2.4 Leaderboard Preparation (Client-Side)

- Define a **game result** shape: e.g. `{ winner, loser, draw, player1Name, player2Name, moves, timestamp }`.
- When a game ends, call a **submitResult** helper that will later send to API (for now can `console.log` or store in `localStorage` for testing).
- **RankPage:** Design UI (table or cards) for "Top wins", "Recent games", etc., using mock data or `localStorage` until backend exists.

---

## Phase 3: Backend & Database (Leaderboards)

### 3.1 Data Model (Example)

- **Players:** `id`, `name`, `createdAt` (optional: auth later).
- **Games:** `id`, `playerXId`, `playerOId`, `winner` (X | O | null for draw), `moves` (JSON or array), `finishedAt`.
- **Leaderboard:** Derived (e.g. count wins per player, or materialized table).

### 3.2 AWS Options

| Option | Use case | Complexity |
|--------|----------|------------|
| **API + DB on same service** | Lambda + DynamoDB | Good for serverless, minimal ops |
| **API + RDS** | Lambda/ECS + RDS (Postgres/MySQL) | More familiar SQL, migrations |
| **Amplify** | Auth, API, DB, hosting in one | Fastest to get auth + API + React app |

**Suggested for leaderboard-only first:**  
- **API:** AWS API Gateway + Lambda (Node.js).  
- **Database:** DynamoDB (single table: Players, Games) or RDS if you prefer SQL.  
- **Endpoints (examples):**  
  - `POST /games` — submit finished game.  
  - `GET /leaderboard` — top N by wins (and optionally recent games).  
  - `GET /players` or `POST /players` — create/get player by name or id.

### 3.3 Frontend Integration

- Add a small **API client** in `src/api/` (e.g. `submitGame`, `fetchLeaderboard`).
- Use environment variables for API base URL (`REACT_APP_API_URL`).
- After each finished game, call `submitGame(result)`; Rank page calls `fetchLeaderboard()` and displays results.

---

## Phase 4: Hosting on AWS

### 4.1 Frontend

- **S3 + CloudFront:** Build with `npm run build`, upload `build/` to S3, optionally put CloudFront in front for HTTPS and caching.
- **Amplify Hosting:** Connect repo; auto build and deploy on push.

### 4.2 Backend

- Lambda + API Gateway (and DynamoDB or RDS) as in Phase 3.
- Ensure CORS is enabled for your frontend origin (S3/CloudFront or Amplify URL).

### 4.3 Environment & Secrets

- Frontend: `REACT_APP_API_URL` in build environment (Amplify env vars or CI).
- Backend: DB credentials in Lambda env vars or Secrets Manager; never in frontend.

---

## Phase 5: Future Ideas (Backlog)

- **User accounts:** Cognito or similar; link games to logged-in users.
- **Online 2-player:** WebSockets (API Gateway WebSocket APIs or separate socket server) for real-time games.
- **Themes:** Light/dark/custom colors (CSS variables or context).
- **Tournaments / brackets:** Multiple games, bracket tree, winner advances.
- **Replay:** Store move list and "replay" by stepping through moves on Rank or a dedicated Replay page.

---

## Suggested Order of Work

1. **This week (refactor):**  
   - Fix Navbar (Link + import).  
   - Extract `gameLogic.js`, `Board.js`, `Square.js`, `MoveHistory.js`.  
   - Slim down `GamePage.js` to composition + state.  
   - Clean CSS and `index.html` / `package.json`.

2. **Next:**  
   - Add "New game" and in-session score.  
   - Improve UX (hover, responsive, a11y).  
   - Define result shape and mock submit; build RankPage UI with mock data.

3. **Then:**  
   - Implement API (Lambda + DynamoDB or RDS) and wire frontend to real endpoints.  
   - Deploy frontend to S3/CloudFront or Amplify.

4. **Later:**  
   - AI difficulty levels, optional sound, online play, auth.

---

## Quick Reference: Files to Touch in Phase 1

| File | Action |
|------|--------|
| `src/Navbar.js` | Use `Link` from `react-router-dom`, fix import |
| `public/index.html` | Set `<title>Tic Tac Toe</title>` |
| `package.json` | Set `"name": "tic-tac-toe"` (or similar) |
| `src/pages/GamePage.js` | Split into Board, Square, MoveHistory, gameLogic, constants |
| `src/styles.css` | Dedupe, remove dead code; optionally split into multiple files |
| New: `src/game/gameLogic.js` | `calculateWinner`, WINNING_LINES |
| New: `src/game/constants.js` | PLAYERS, etc. |
| New: `src/components/game/Board.js` | Board + status |
| New: `src/components/game/Square.js` | Single square |
| New: `src/components/game/MoveHistory.js` | List of moves |

If you want, the next step can be implementing Phase 1.1 (Navbar + title + package name) and then extracting the game components and `gameLogic` step by step in your repo.
