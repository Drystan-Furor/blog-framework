# Deploy naar Codeberg Pages

De broncode staat op `master`. Een push naar `master` start Woodpecker CI; die
bepaalt de statische output en publiceert uitsluitend die output naar `pages`.
Push daarom **nooit** de broncode rechtstreeks naar `pages` en merge `master`
normaal gesproken niet handmatig naar die branch.

## Standaarddeploy

Voer vanuit de projectmap uit:

```sh
git switch master
git pull --ff-only origin master
npm ci
npm run ci
git push origin master
```

De push start de pipeline uit `.woodpecker.yml`. Open daarna de
Woodpecker-pipeline voor `blog-framework` op Codeberg en wacht totdat zowel
`checks` als `deploy-codeberg-pages` groen zijn.

## Controle vanuit de terminal

Na een succesvolle pipeline moet `pages` een nieuwere commit hebben:

```sh
git fetch origin pages
git log -1 --oneline origin/master
git log -1 --oneline origin/pages
git ls-remote origin refs/heads/pages
```

## Eenmalige uitzondering: histories samenvoegen

`pages` was oorspronkelijk een onafhankelijke, gegenereerde branch. Als een
historische merge van `master` naar `pages` expliciet nodig is, is dit het
commando:

```sh
git switch pages
git merge master --allow-unrelated-histories
```

Push deze uitzondering niet als deploymechanisme: de volgende succesvolle
pipeline op `master` overschrijft `pages` weer met de gebouwde website.
