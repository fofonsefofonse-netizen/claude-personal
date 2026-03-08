# claude-personal

Personal Claude Code skills and hooks.

## Structure

```
skills/
  gumloop-automation/   → Gumloop visual pipeline automation skill
  session-relay/        → Auto-generates relais.md at end of each session

hooks/
  session-relay-start.js  → SessionStart: injects relais.md into context
  session-relay-stop.js   → Stop: asks Claude to generate relais.md
```

## Installation

Skills are linked into `~/.claude/skills/` via Windows directory junctions:

```cmd
mklink /J "%USERPROFILE%\.claude\skills\gumloop-automation" "%USERPROFILE%\claude-personal\skills\gumloop-automation"
mklink /J "%USERPROFILE%\.claude\skills\session-relay"      "%USERPROFILE%\claude-personal\skills\session-relay"
```

Hooks are referenced directly from this repo in `~/.claude/settings.json`.
