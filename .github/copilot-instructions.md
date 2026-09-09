<!-- rtk-instructions v2 -->
# RTK — Token-Optimized CLI

**rtk** is a CLI proxy that filters and compresses command outputs, saving 60-90% tokens.

## Rule

Always prefix shell commands with `rtk`:

```bash
# Instead of:              Use:
git status                 rtk git status
git log -10                rtk git log -10
cargo test                 rtk cargo test
docker ps                  rtk docker ps
kubectl get pods           rtk kubectl get pods
```

## Meta commands (use directly)

```bash
rtk gain              # Token savings dashboard
rtk gain --history    # Per-command savings history
rtk discover          # Find missed rtk opportunities
rtk proxy <cmd>       # Run raw (no filtering) but track usage
```
<!-- /rtk-instructions -->

<!-- aillen-project-rules v1 -->
# Aillen Project Rules

## Comunicación (caveman SIEMPRE)
- Respondé SIEMPRE en modo caveman (skill JuliusBrussee/caveman, en `.agents/skills/caveman/SKILL.md`): terse, sin relleno ni cortesías, sin narrar tool calls, sin tablas decorativas ni emoji. Mantené sustancia técnica.
- Comprimí el estilo, no el idioma: usuario escribe en español → respondé en español.
- Nombres de código, comandos y strings de error exactos, verbatim.
- Nivel default `full`. Cambios con `/caveman lite|ultra|off` (off solo si usuario lo pide).

## Package manager (pnpm, nunca npm)
- Usá SIEMPRE pnpm para instalar: `pnpm add <pkg>` / `pnpm add -D <pkg>`.
- Corré scripts con `pnpm run <script>`, `pnpm dev`, `pnpm build`.
- Nunca generes `package-lock.json`; mantené `pnpm-lock.yaml`.
<!-- /aillen-project-rules -->
