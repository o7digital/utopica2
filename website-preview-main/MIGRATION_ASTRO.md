# Migration Next.js vers Astro

## 📊 Résumé de la migration (15 nov 2025)

### ✅ Ce qui a été fait

#### 1. Configuration Astro (100% ✅)
- ✅ `astro.config.mjs` créé avec intégrations React, Tailwind, Sitemap
- ✅ `tsconfig.json` mis à jour pour Astro (verbatimModuleSyntax)
- ✅ `tailwind.config.ts` adapté pour Astro
- ✅ Scripts npm configurés (`dev`, `build`, `preview`)
- ✅ Build de production fonctionnel
- ✅ TypeScript configuré avec corrections des imports de types

#### 2. Structure du projet (100% ✅)
```
src/
├── pages/
│   └── index.astro          ✅ Page d'accueil de base
├── layouts/
│   └── Layout.astro         ✅ Layout principal avec nav/footer temporaires
├── components/              ✅ Tous les composants React copiés
│   ├── homepage/           ✅ 13 composants homepage
│   ├── ui/                 ✅ 24 composants UI
│   ├── navigation.tsx      ✅ Navigation (nécessite adaptation Next.js)
│   └── footer.tsx          ✅ Footer (nécessite adaptation Next.js)
├── lib/                    ✅ Toutes les utilitaires copiés
├── hooks/                  ✅ Hooks React copiés
└── styles/
    └── globals.css         ✅ Styles globaux Tailwind
```

#### 3. Serveur et Build (100% ✅)
- ✅ Serveur dev Astro: `http://localhost:4321/`
- ✅ Build de production réussi
- ✅ Sitemap XML généré
- ✅ Erreurs TypeScript corrigées (imports de types)

#### 4. Git & Documentation (100% ✅)
- ✅ Branche `astro` créée et synchronisée
- ✅ Commit initial poussé sur GitHub
- ✅ Documentation de migration créée

---

### 🚧 Ce qui reste à faire

#### Phase 1: Adapter les composants React (Priorité HAUTE)
- [ ] **Navigation.tsx** - Remplacer `next/link` et `next/navigation` par équivalents Astro
  - Utiliser `<a>` tags pour navigation simple
  - Adapter le state management (useState, usePathname)
- [ ] **Footer.tsx** - Remplacer `next/link` par `<a>`
- [ ] **Hero Section** - Adapter les imports Next.js
  - Remplacer `next/link` par équivalents
  - Vérifier framer-motion (compatible React)
- [ ] **Homepage components** - Vérifier et adapter les 13 composants
  - StakesSectionStatic ✅ (mais erreur d'import à corriger)
  - ClarityPathSectionStatic ✅ (mais erreur d'import à corriger)
  - CommercialInjusticeSection (nécessite adaptation)
  - NextStepsSectionStatic (nécessite adaptation)

#### Phase 2: Migrer les pages (Priorité HAUTE)
- [ ] `/sprint-claridad-comercial` - Page Sprint principale
- [ ] `/equipo` - Page équipe
- [ ] `/_blog` - Système de blog avec routes dynamiques
- [ ] Pages secondaires (si nécessaire)

#### Phase 3: API Routes & Intégrations (Priorité MOYENNE)
- [ ] Convertir `/app/api/*` en Astro endpoints (`/src/pages/api/*.ts`)
  - Revalidation API
  - Workshop API
  - Analytics API (si server-side)
- [ ] Configurer Supabase pour Astro
- [ ] Configurer Stripe (webhooks et client)
- [ ] Configurer Resend (emails)
- [ ] Migrer Analytics (client-side devrait fonctionner)

#### Phase 4: Assets & Optimisation (Priorité BASSE)
- [ ] Configurer `astro:assets` pour optimisation d'images
- [ ] Adapter les OG images (actuellement Next.js)
- [ ] Performance audit avec Astro
- [ ] SEO vérification

#### Phase 5: Déploiement (Priorité FINALE)
- [ ] Adapter `netlify.toml` pour Astro
- [ ] Tester le déploiement sur preview
- [ ] Configurer les variables d'environnement
- [ ] Migration progressive ou switch complet

---

### 🔧 Problèmes techniques identifiés

1. **Composants React avec dépendances Next.js**
   - Erreur: "Element type is invalid... got: object"
   - Cause: Imports Next.js (`next/link`, `next/image`, `next/navigation`)
   - Solution: Remplacer par équivalents Astro ou créer wrappers

2. **Navigation state management**
   - `usePathname()` de Next.js non disponible
   - Solution: Utiliser `Astro.url.pathname` dans composants Astro

3. **Images optimisées**
   - `next/image` non disponible
   - Solution: Utiliser `astro:assets` ou `<img>` standard

---

### 💡 Notes importantes

---

### 💡 Notes importantes

#### Directives client:* pour les composants React
- `client:load` - Hydratation immédiate au chargement
- `client:idle` - Hydratation après que le navigateur soit idle
- `client:visible` - Hydratation quand visible dans le viewport
- `client:only="react"` - Render uniquement côté client (pas de SSR)

#### Commandes utiles

```bash
# Développement Astro
npm run dev              # Serveur sur http://localhost:4321

# Build
npm run build           # Build Astro avec check TypeScript
npm run preview         # Preview du build

# Développement Next.js (legacy)
npm run dev:next        # Serveur Next.js (si besoin de référence)
npm run build:next      # Build Next.js
```

#### Structure des imports
```typescript
// ❌ Ne fonctionne plus (Next.js)
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// ✅ Utiliser dans Astro
<a href="/page">Link</a>
<img src="/image.jpg" alt="..." />
// Dans composants Astro: Astro.url.pathname
```

---

### 📈 Progression globale

| Phase | Statut | Progression |
|-------|--------|-------------|
| Configuration Astro | ✅ Complété | 100% |
| Structure & Setup | ✅ Complété | 100% |
| Page d'accueil de base | ✅ Complété | 100% |
| Adaptation composants React | 🚧 En cours | 15% |
| Migration autres pages | ⏳ À faire | 0% |
| API Routes | ⏳ À faire | 0% |
| Intégrations tierces | ⏳ À faire | 0% |
| Déploiement | ⏳ À faire | 0% |
| **TOTAL** | 🚧 **En cours** | **30%** |

---

### 🎯 Prochaines étapes recommandées

1. **Créer un wrapper pour Link** (1-2h)
   ```tsx
   // src/components/ui/Link.tsx
   export const Link = ({ href, children, ...props }) => (
     <a href={href} {...props}>{children}</a>
   )
   ```

2. **Adapter Navigation.tsx** (2-3h)
   - Remplacer imports Next.js
   - Tester navigation
   - Vérifier responsive

3. **Tester les composants homepage** (2-3h)
   - Corriger imports manquants
   - Tester avec `client:load`
   - Vérifier rendu

4. **Migrer page Sprint** (4-6h)
   - Créer `/src/pages/sprint-claridad-comercial.astro`
   - Adapter composants Sprint
   - Tester fonctionnalité

---

### 📚 Ressources utiles

- [Astro Docs](https://docs.astro.build)
- [Astro + React](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Migration Guide](https://docs.astro.build/en/guides/migrate-to-astro/)
- [Client Directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)

---

**Dernière mise à jour:** 15 novembre 2025  
**Commit:** `41a041b` - feat: Migration initiale vers Astro
