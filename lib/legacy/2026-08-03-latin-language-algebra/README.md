# latin-language-algebra

`@emsenn/latin-language-algebra` is Latin's language-fiber data (lexicon,
morphology, reference, attachment, segmentation) presented live as a
discoverable, directly contractable micro-enterprise — a "die" — of
`linguistics-services-section`.

It records free word order, no articles, Latin closed classes,
representative case-bearing noun endings, and verb endings. The
`roleBy: "case"` bundle flag is not merely documentation: the shared engine's
attachment rules (`../../lib/language-engine/relating.mjs`) actually branch on
it, resolving nsubj/dobj from `case:nom` / `case:acc` features rather than
word adjacency — see "what's real" below.

## What's real

- `src/bundle.mjs` — the actual Latin lexicon/morphology/reference data,
  transcribed unchanged from the recovered `src/bundle.mts`.
- `../../lib/language-engine/` (linguistics-services-section's own shared
  library, imported here by relative path — never a workspace package
  specifier) — the real settlement pipeline, mechanically ported
  (TypeScript types stripped, logic unchanged) from the recovered
  `@emsenn/language-topology`, `@emsenn/language-algebra`, and
  `@emsenn/language-analysis` packages at
  `content/assets/legacy/github-language-packages/`. Originally ported
  directly into this die's own `src/engine/`; factored out to the shared
  location once `lakota-language-algebra` needed the identical,
  language-agnostic pipeline — see that die's README for what stayed
  identical and what (nothing, for Lakota) needed additional porting.
  - `charge.mjs` — the four-valued grammatical bilattice (absurd/potential/active/stable)
    and its knowledge/truth lattice operations (`language-algebra/charge.mts`).
  - `compile.mjs` — `load()`, the fiber compiler that turns `rawBundle` into
    the `CompiledBundle` lookup functions the rest of the engine runs over
    (`language-algebra/compile.mts`).
  - `articulating.mjs` — `articulate()`/`tokenize()`, offset-true segmentation
    into document→block→sentence→clause→word spans (`language-topology/articulating.mts`).
  - `tagging.mjs` / `featuring.mjs` — per-word POS tag and morphological
    feature extraction, including the `case:nom`/`case:acc`/`case:abl`/`case:gen-dat`
    derivation `roleBy === "case"` triggers (`tagging.mts` / `featuring.mts`).
  - `relating.mjs` — the seven attachment rules (det, amod, advmod, nsubj,
    dobj, prep, pobj); for Latin, nsubj/dobj resolve from case features, not
    position (`relating.mts`).
  - `charging.mjs` / `descending.mjs` — lift tagged words + arc proposals into
    bilattice kernel entries and settle them to a fixed point along
    specialization edges (`charging.mts` / `descending.mts`).
  - `folding.mjs` — head-of-head path composition / the fold tower
    (`folding.mts`).
  - `construing.mjs` / `parsing.mjs` — orchestrate tag→feature→relate→charge
    and construe→descend→fold into the full `ParseResult` (`construing.mts` / `parsing.mts`).
  - `cohomology.mjs` — reads H⁰/H¹ obstruction classes off a settled parse's
    conflicts/voids (`cohomology.mts`).
  - `roles.mjs` — syntax-derived thematic role frames (agent/patient/instrument/
    recipient/location) from nsubj/dobj/prep+pobj arcs
    (`language-analysis/src/semantics/roles.mts`) — the exact function the
    original recovered `src/parity.test.mts` imported and asserted against.
- `src/tag.mjs` — now wires the real pipeline above into the die's
  `invoke-service` operation: `tagText(text)` articulates, parses every
  sentence, and extracts real semantic role frames — a real, deterministic
  function of `(text, rawBundle)`, byte-identical in ⇄ out, computed by
  actually running the settlement engine (not a flat per-word suffix lookup).
- `content/contracts/tagging-latin-text.rml` — a real RMN law, compiled by
  `@emsenn/rmn-semantic-conformance/law`'s `compileRmlLaw` to a real
  content-addressed `ni:///sha-256;...` contract id.
- `content/evm/accounts/eip155-31337.json` — a real (if freshly minted, not
  chain-deployed) `org.emsenn.evm.sovereign-enterprise-account.v3` binding
  that `loadSettlementAccount` from `@lenticule-science/witness-journal-rdf-projection-service/client`
  actually accepts.
- `src/latin-die.mjs` — the live bin script `run-leader-movement.js`'s
  `invokeOperation` spawns as a subprocess, implementing the real
  `--operation solicit-service` / `--operation invoke-service` CLI contract
  over stdin/stdout JSON; `invoke-service` now runs the real pipeline above.

## What's still stubbed or out of scope

- `data/evm/keystores/eip155-31337.json` exists for file-shape parity with
  working sibling providers, but its key material is all zeros — it is not
  a usable signing key. `loadSettlementAccount` never reads it, so nothing
  in the discovery/admission path depends on it.
- `src/bundle.mts`, `src/index.mts`, `src/parity.test.mts`, and the
  `tsconfig*.json` files are kept from the original recovered TypeScript
  package for provenance only; they are not built or executed. `src/bundle.mjs`
  and `../../lib/language-engine/*.mjs` are plain-JS hand-transcriptions
  (types stripped, logic unchanged) of the corresponding `.mts` sources, not
  compiler output.
- `@emsenn/language-algebra/src/morphology.mts` (`conjugate`/`pluralize`/
  `indefiniteArticle`/`lemma` — generative inflection, the inverse direction)
  was **not** ported: the recovered `src/parity.test.mts` this die's
  original pipeline usage is drawn from never calls it, and neither does
  `roles()`. Nothing in `invoke-service` needs it. If a future customer needs
  Latin generation (surface realization from a semantic frame), that is a
  distinct, larger, unbuilt capability, not a gap in this parsing die.
- `@emsenn/language-analysis`'s other semantic layers (`polarity`, `scope`,
  `temporal`, `presuppositions`, `logicalForm`) and its discourse layer
  (`linking`/`referring`) were **not** ported — the recovered
  `src/parity.test.mts` only ever imported `roles` from that package.
  `@emsenn/language-geometry` (similarity) and `@emsenn/language-logic`
  (grammaticality) were never imported by the Latin package at all.
- The Latin `rawBundle`'s own `morphology.suffixRules` has **no rule that
  ever produces an `"adj"` tag** — so the shared engine's `amod` rule can
  never fire for Latin (there is no recovered adjective-ending data to
  drive it).
  This is a real gap in the recovered Latin *data*, not in the ported
  *engine* — the same `amod` rule genuinely fires for English's suffix
  rules in the sibling `english-language-algebra` bundle.
- `prep()`'s PP-attachment is exactly as ambiguous as the recovered algorithm
  makes it: for "Servus cum domino ambulat.", `cum` attaches to the nearest
  preceding noun-or-verb head scanning leftward (`Servus`), not to the verb
  `ambulat` a human reader would prefer — this is the real, unresolved
  PP-attachment behavior of the recovered `relating.mts`, not a new defect
  introduced by this port.

## Verify

```sh
npm run check   # node --check on every real .mjs source file, including the shared ../../lib/language-engine/
npm test        # node --test test/  (test/latin-die.test.mjs + test/engine.test.mjs)
```

`../../lib/language-engine/` is shared with `lakota-language-algebra` (and
any future language die under this section); its own correctness is
exercised from both dies' `test/engine.test.mjs`, not by a test suite of
its own.

Discovery and admission are exercised for real by
`run-leader-movement.js`'s own `discoverAdvertisements`, `providerAdvertisement`,
and `invokeOperation` — see this die's seating record at
`content/micro-enterprises/latin-language-algebra.json`, validated against
the live `emsenn/schema/micro-enterprise` schema.
