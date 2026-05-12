# Ícones

Esta pasta deve conter os ícones do app antes de gerar builds de produção.

Para gerar todos os tamanhos automaticamente a partir de um PNG 1024×1024:

```bash
npx @tauri-apps/cli icon ./caminho/para/icon.png
```

Tamanhos esperados:
- `32x32.png`
- `128x128.png`
- `128x128@2x.png`
- `icon.icns` (macOS)
- `icon.ico` (Windows)
