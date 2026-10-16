# Website-UTS
Website UTS

## Production database

Production uses Neon PostgreSQL. Vercel's Neon integration supplies
`DATABASE_URL` for pooled connections and `DATABASE_URL_UNPOOLED` for direct
connections. Keep both values private.

For a local data migration, put the two Neon URLs in an ignored
`.env.neon.local` file (do not commit it):

```powershell
DATABASE_URL=<Neon pooled connection string>
DATABASE_URL_UNPOOLED=<Neon direct connection string>
NEON_DATABASE_URL=<same Neon pooled connection string>
```

Load those three values into the local process environment before running
`npm run db:migrate:deploy` and `npm run db:migrate:sqlite-to-neon`.

The migration reads `db/custom.db` in read-only mode, transfers all six tables,
and refuses to run if the Neon database already contains records. It reports
row counts only. Back up the SQLite file before migrating.
