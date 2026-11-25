# Drift og salgsklargøring af JODAER CRM

JODAER CRM er en tilpasset udgave af Twenty med JODAER-branding i webappen og i kontomails. JODAER-ændringerne blev lavet 25. november 2026.

## Licens og produktudbud

- Den åbne CRM-kerne kan bruges kommercielt under AGPLv3. Behold licens- og copyrightmeddelelserne. Kunder, der bruger en ændret version over nettet, skal have gratis adgang til den tilsvarende kildekode. Brug linket **Source code** til at tilbyde kildekoden for præcis den version, du kører, med de relevante bygge- og installationsfiler. [Repoets licens](./LICENSE) · [AGPLv3, afsnit 13](https://www.gnu.org/licenses/agpl-3.0.html#section13)
- Gennemgå Enterprise-markerede filer og afhængigheder i den konkrete produktionsbuild. Aftal rettigheder med Twenty til de funktioner og former for kundeadgang eller distribution, dit tilbud kræver. Docker-overlejringen slår Twentys fakturering fra. Enterprise-kode i buildet er fortsat omfattet af de kommercielle licensvilkår. [Repoets licens](./LICENSE) · [Twentys vilkår for selvhosting](https://twenty.com/terms)
- JODAER kan tage betaling for eksempelvis opsætning, migrering, drift og support omkring den åbne kerne. Brug JODAER som produktbrand og kreditér Twenty som det projekt, CRM'et bygger på. [Twentys varemærkepolitik](./.github/TRADEMARK.md)

## Byg og start en staginginstallation

Brug en vært med Docker og Docker Compose 2.24.4 eller nyere. Kør fra repoets rod på den commit, du vil afprøve, og sørg for, at brugere kan åbne kilde-URL'en. Sæt shell-variablerne `JODAER_TERMS_URL` og `JODAER_PRIVACY_URL` til JODAERs offentlige HTTPS-sider før en produktionsbuild. De to links vises, når adresserne er angivet.

```sh
JODAER_REVISION="$(git rev-parse HEAD)"
JODAER_IMAGE="jodaer-crm:${JODAER_REVISION}"
docker build --target twenty \
  --file packages/twenty-docker/twenty/Dockerfile \
  --build-arg APP_VERSION=2.64.0 \
  --build-arg "REACT_APP_JODAER_SOURCE_URL=https://github.com/Eliasdlasti/twenty/tree/${JODAER_REVISION}" \
  --build-arg "REACT_APP_JODAER_TERMS_URL=${JODAER_TERMS_URL:-}" \
  --build-arg "REACT_APP_JODAER_PRIVACY_URL=${JODAER_PRIVACY_URL:-}" \
  --tag "${JODAER_IMAGE}" .
```

Opdatér `APP_VERSION` ved opgradering til den versionsværdi, der står i [Twenty-serverens versionskonstant](./packages/twenty-server/src/engine/core-modules/upgrade/constants/twenty-current-version.constant.ts). Byg fra en ren checkout, så kildekoden i linket svarer til imaget.

Brug [Docker-eksemplet](./packages/twenty-docker/.env.example) til at oprette en lokal `packages/twenty-docker/.env`. Sæt `JODAER_IMAGE` til tagget fra buildet, `SERVER_URL` til den offentlige HTTPS-adresse og `STORAGE_TYPE` til den valgte lagertype. Generér `PG_DATABASE_PASSWORD` med `openssl rand -hex 32` og `ENCRYPTION_KEY` med `openssl rand -base64 32`. Opbevar miljøfilen og krypteringsnøglen sikkert uden for versionsstyringen. Angiv `EMAIL_DRIVER=smtp`, `EMAIL_FROM_ADDRESS` og SMTP-indstillinger til test med rigtig maillevering. `logger` bruges som standard til lokal afprøvning.

```sh
docker compose --env-file packages/twenty-docker/.env \
  -f packages/twenty-docker/docker-compose.yml \
  -f packages/twenty-docker/docker-compose.jodaer.yml \
  up -d --wait
```

Opsæt en HTTPS-reverse proxy på samme vært, som sender trafik til `127.0.0.1:3000`. Brug hvert sit Compose-projektnavn, egne hemmeligheder og egne volumes, hvis du leverer dedikerede installationer til flere kunder. Disse installationer skal hver have en separat lokal port angivet med `JODAER_HTTP_PORT`.

## Godkend før den første kunde

- Bekræft licensomfanget for den build og leveringsmodel, kunden får. Åbn kildekodelinket uden GitHub-login og sammenhold committen med den kørende installation.
- Gennemfør oprettelse, login, invitation, nulstilling af adgangskode og de CRM-arbejdsgange, kunden køber. Kontrollér mails med JODAER-afsender, korrekt linkdomæne og logo samt vilkår og privatlivspolitik på loginsiden.
- Aftal priser, fakturering, support, opsigelse og kundens adgang til at eksportere sine data. Afklar hosting, underdatabehandlere, sletning og databehandleraftale for den faktiske leverance.
- Kontrollér HTTPS og adgangsroller, og kør en gendannelsestest for database, filer og krypteringsnøgle, inden der lægges kundedata ind.
