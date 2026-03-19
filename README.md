# UniBridge — workspace root

Use these root scripts to install dependencies and run both services together.

Recommended workflow from repository root:

- Install root helper and/or subproject deps:

```
npm install
npm run install-all
```

- Start both services concurrently:

```
npm run dev
```

- Or start individually:

```
npm run dev:backend
npm run dev:frontend
```

Notes:
- `install-all` runs `npm install` in `Backend` and `Frontend`.
- The `dev` script uses `concurrently` to run both `dev` scripts.
