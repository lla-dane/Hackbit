[ ] 
[ ] 
[ ] 
[ ] figure out what happens with `makepkg -si` command
[ ] figure out what is the deal with certificates in security 
[ ] learn about different kinds of encoding techniques
[ ] connection between DNS (records), domains and public IP
[ ] difference between le and be encoding of integers, for packet transfer payload
[ ] learn to convert traits -> types, then pass them in structs, to keep modular support
[ ] learn how to work with traits in runtime
[ ] explore the use-cases of different derive traits
[ ] figure out application of Send, Sync, Sized etc.

## Core / Common

- **feat** — Add a new feature or user-visible behavior
- **fix** — Fix a bug or incorrect behavior
- **docs** — Documentation-only changes
- **test** — Add or update tests without changing production logic
- **refactor** — Code restructuring with no behavior change
- **perf** — Performance improvements without semantic changes
- **style** — Formatting-only changes (whitespace, lint, imports)
- **chore** — Maintenance tasks (deps, tooling, scripts)

## Infrastructure / Tooling

- **build** — Build system or dependency changes
- **ci** — CI/CD configuration changes

## Special-purpose

- **revert** — Revert a previous commit
- **security** — Security-related fixes (sometimes used, not official)

## Optional Enhancements

- **scope** — Context in parentheses  
  - Example: `fix(quic): handle malformed packet`

- **breaking change indicator** — `!` after type or scope  
  - Example: `feat!: change peer ID derivation`
  - Example: `feat(peerstore)!: remove legacy cache`
