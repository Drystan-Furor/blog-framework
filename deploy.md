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

## Handmatige deploy naar `pages`

Gebruik dit alleen wanneer de CI-deploy niet beschikbaar is. Deze procedure
bewaart geen broncode op `pages`: zij bouwt vanaf de actuele `master` en
vervangt `pages` volledig door de gegenereerde website.

Voer vanuit de projectmap uit. De Git-identiteit moet vooraf lokaal zijn
ingesteld, bijvoorbeeld met `git config --global user.name` en
`git config --global user.email`.

```sh
git switch master
git pull --ff-only origin master
npm ci
CODEBERG_PAGES=true npm run build

PAGES_DIR="$(mktemp -d)"
PAGES_REMOTE="$(git remote get-url origin)"
git clone --branch pages --depth 1 "$PAGES_REMOTE" "$PAGES_DIR"
git -C "$PAGES_DIR" checkout --orphan pages-build
find "$PAGES_DIR" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -a dist/. "$PAGES_DIR"/
git -C "$PAGES_DIR" add --all
git -C "$PAGES_DIR" commit -m "Deploy site from $(git rev-parse --short HEAD)"
git -C "$PAGES_DIR" push origin HEAD:pages --force
rm -rf "$PAGES_DIR"
```

`--force` is noodzakelijk: elke deploy vervangt de volledige, gegenereerde
inhoud van `pages`. Controleer vóór de push dat je op `master` staat en dat de
build succesvol is afgerond. De onderstaande terminalcontrole bevestigt daarna
dat de remote branch is bijgewerkt.

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
