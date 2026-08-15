# How to publish & list the VoiceCallingAI n8n node

This node is built and compiles cleanly. To get it **listed as a verified community node** (discoverable and installable from inside n8n, including n8n Cloud), you publish it to npm via GitHub Actions and submit it to the n8n Creator Portal.

n8n's 2026 rules require publishing through **GitHub Actions with a provenance statement** — you cannot publish a verified node from your local machine.

---

## Before you start

You'll need:
- A **GitHub account** (you already have one: `harshahuja881`).
- An **npm account** (free — sign up at [npmjs.com](https://www.npmjs.com/signup)).
- The files in this package.

---

## Step 1 — Fill in your details

In `package.json`, replace `YOUR_GITHUB_USERNAME` in the repository URL with your actual GitHub username. Confirm the `author` and `homepage` are correct.

## Step 2 — Put the code on GitHub

1. Create a new **public** GitHub repo named `n8n-nodes-voicecallingai`.
2. Upload all files from this package **except** `node_modules/` and `dist/` (those are built automatically). The `.gitignore` already excludes them.

## Step 3 — Add the GitHub Actions publish workflow (with provenance)

n8n strongly recommends scaffolding with their CLI, which ships a ready-to-use `publish.yml`. The cleanest path:

1. On your machine (or in a GitHub Codespace), run:
   ```
   npm create @n8n/node@latest
   ```
   This scaffolds a node package **including a `.github/workflows/publish.yml`** already set up for provenance publishing. Copy that `publish.yml` into this repo's `.github/workflows/` folder.
2. Alternatively, copy an existing n8n community node's `publish.yml` from GitHub — it publishes to npm with `--provenance` on a version tag or release.

The workflow uses GitHub's OIDC to sign a provenance statement, proving the package was built from your repo. Set up npm access one of two ways:
- **Trusted Publisher (recommended):** on npmjs.com → your package settings → **Publish access > Trusted Publishers > Add a publisher**, and point it at your GitHub repo + `publish.yml`.
- **Token:** create a **Granular Access Token** on npmjs.com and store it as `NPM_TOKEN` in your repo's **Actions secrets**.

## Step 4 — Publish to npm

Trigger the workflow (usually by pushing a version tag or creating a GitHub Release). It will:
- run `npm run build` (compiles TypeScript → `dist`, copies icons),
- run the linter,
- publish `n8n-nodes-voicecallingai` to npm **with provenance**.

Confirm it appears at `https://www.npmjs.com/package/n8n-nodes-voicecallingai`.

## Step 5 — Submit for verification

1. Go to the **n8n Creator Portal**, sign up / log in.
2. Submit `n8n-nodes-voicecallingai` for verification.
3. n8n vets it against their technical + UX guidelines. Once approved, users can find and install it directly from the nodes panel in n8n (including on Cloud).

---

## Verification checklist (this package already meets these)

- ✅ **Zero runtime dependencies** — the node is declarative; nothing in `dependencies`.
- ✅ **One service per package** — VoiceCallingAI only.
- ✅ **README** included.
- ✅ **LICENSE** (MIT) included.
- ✅ **Not a Logic/Flow-control node** — it's an action node.
- ✅ Compiles cleanly and points `n8n.nodes` / `n8n.credentials` at the `dist` files.
- ⬜ **Published via GitHub Actions + provenance** — this is the step you do (Steps 3–4).
- ⬜ Consider running n8n's linter (`eslint-plugin-n8n-nodes-base`) and the `n8n-node` CLI checks before submitting.

---

## Test it locally first (optional but recommended)

Before publishing, you can try the node in a local n8n:
1. In this folder: `npm install` then `npm run build`.
2. `npm link`
3. In your n8n custom-nodes folder (`~/.n8n/custom`): `npm link n8n-nodes-voicecallingai`
4. Restart n8n. The VoiceCallingAI node should appear. Add your API key credential and test "Place a Call".

---

## Notes

- **No hosted backend needed** — unlike the GoHighLevel app, n8n runs the node itself and calls the VoiceCallingAI API directly with the user's key. Nothing to host or maintain.
- **Auth** is a Bearer API key; the credential's Test button hits `GET /wallet` (read-only).
- Bump the `version` in `package.json` for each new release.
