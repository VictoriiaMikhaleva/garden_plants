# Источники фото растений

Все снимки подобраны автоматически с [Wikimedia Commons](https://commons.wikimedia.org/) (лицензии CC / Public Domain), нормализованы скриптом `npm run photos:commons`:

- холст **800×600** (4:3, как в UI каталога);
- **белый фон**, растение целиком по центру;
- формат **WebP**.

Полная атрибуция: `assets/plants/attribution.json` (автор, лицензия, ссылка на оригинал).

## Пересборка

```bash
npm run photos:commons              # все карточки без фото
npm run photos:commons -- --ids 1,2 # отдельные id
npm run photos:commons -- --force   # перезаписать существующие
```

Латинские названия для поиска: `scripts/garden-latin-map.js`.
