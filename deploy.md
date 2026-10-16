# Deploy naar GitHub Pages

De broncode en artikelen staan op `master`. Een push naar `master` start de
workflow in `.github/workflows/pages.yml`. GitHub Actions controleert de code,
bouwt de statische site en publiceert het buildartifact naar GitHub Pages.
Gegenereerde bestanden hoeven niet in een aparte branch te worden beheerd.

## Eenmalige configuratie

Open op GitHub `Settings`, daarna `Pages`, en kies `GitHub Actions` als bron.
De workflow gebruikt alleen de ingebouwde `GITHUB_TOKEN`; extra secrets of
externe CI-toegang zijn niet nodig.

## Standaarddeploy

```sh
git switch master
git pull --ff-only origin master
npm ci
npm run ci
git push origin master
```

De workflow voert drie jobs op volgorde uit:

1. `quality` controleert opmaak, lint, Astro, unit tests, build en generieke E2E-tests.
2. `build` bouwt `dist/` met de repositorybasis `/blog-framework/`.
3. `deploy` publiceert het artifact naar GitHub Pages.

Pull requests voeren alleen `quality` uit. Alleen een push naar `master` of een
handmatige workflowstart kan publiceren.

## Controle

Controleer de workflow in de GitHub Actions-tab. Na een groene `deploy` job is
de site beschikbaar op:

```text
https://drystan-furor.github.io/blog-framework/
```

## Herstel

Als een publicatie fout is, draai de foutieve commit terug en push de revert
naar `master`. Dezelfde workflow bouwt en publiceert dan de vorige goede staat.
