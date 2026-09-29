# Catálogo WhatsApp

Catálogo de productos en Next.js (App Router, TypeScript, Tailwind) con carrito y checkout por WhatsApp. Los datos viven en un esquema multi-tenant en Supabase; el mismo código se despliega una vez por cliente, diferenciado solo por variables de entorno.

## Variables de entorno

Ninguna credencial va hardcodeada en el código. Configurá siempre vía entorno:

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon / publishable key de Supabase |
| `NEXT_PUBLIC_SITE_SLUG` | Slug del negocio (fila en `sites`) |

Plantillas vacías: `.env.example` y `.env.local.example`.

Para desarrollo local, copiá la plantilla:

```bash
cp .env.local.example .env.local
```

Completá los valores reales solo en `.env.local` (está en `.gitignore`).

## Cómo correr localmente

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

Build de producción local:

```bash
npm run build
npm start
```

## Esquema multi-tenant

Un solo proyecto Supabase sirve a varios negocios:

- **`sites`**: un registro por cliente (`slug`, `business_name`, `whatsapp_number`, colores, `logo_url`, `template_key`, etc.).
- **`products`**: productos con `site_id` apuntando al sitio dueño. Solo se muestran los `is_active = true`, ordenados por `position`.
- **`site_sections`**: bloques de contenido ordenados por `position`. La plantilla define look & feel; las secciones definen qué aparece y en qué orden.
- **Storage `product-images`**: bucket público para fotos. En `products.image_url` guardá el **path relativo** (ej. `mi-negocio/producto.jpg`); el helper `lib/storage.ts` arma la URL pública.

### Secciones (`site_sections`)

Cada fila activa se renderiza en orden. `section_type` conocidos:

| `section_type` | `config` (jsonb) |
| --- | --- |
| `hero` | `{ "title", "subtitle", "background_image" }` |
| `product_grid` | `{ "title?", "subtitle?" }` — usa los productos del sitio |
| `custom_html` | `{ "html": "<p>...</p>" }` — se sanitiza antes de renderizar |

Ejemplo mínimo para un catálogo clásico: una sección `product_grid` con `is_active = true`.

Cada deploy de Next.js recibe un `NEXT_PUBLIC_SITE_SLUG`. Al cargar, el server busca ese slug en `sites` y después sus productos. Así el mismo repo sirve N clientes sin forks de lógica.

```text
Deploy A  NEXT_PUBLIC_SITE_SLUG=panaderia-lucia  →  sites.slug = panaderia-lucia
Deploy B  NEXT_PUBLIC_SITE_SLUG=ferreteria-norte →  sites.slug = ferreteria-norte
```

Ambos apuntan al mismo `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Imágenes de producto (Storage)

1. Dashboard Supabase → **Storage** → bucket **`product-images`**.
2. Creá o abrí una carpeta por sitio (ej. `panaderia-lucia/`).
3. Subí la imagen.
4. En `products.image_url` pegá solo el path relativo, **sin** el nombre del bucket:

```text
panaderia-lucia/pan-campesino.jpg
```

También se acepta una URL absoluta completa (compatibilidad). Si `image_url` está vacío, el catálogo muestra un placeholder.

## Lanzar un cliente nuevo

Pasos exactos:

### 1. Insertar el sitio en Supabase

En **Table Editor** → `sites`, insertá una fila. Campos mínimos:

- `slug` — único, en kebab-case (ej. `panaderia-lucia`). Será el valor de `NEXT_PUBLIC_SITE_SLUG`.
- `business_name` — nombre visible en el header.
- `whatsapp_number` — con código de país, solo dígitos o con `+` (ej. `5491112345678`). Se usa en el checkout `wa.me`.
- `primary_color` / `secondary_color` — hex (ej. `#1f6f5b`, `#7a92a8`).
- `logo_url` — opcional (URL absoluta o path si lo resolvés vos).
- `template_key` — plantilla visual: `cosmetics` | `incense` | `food` (fallback: `cosmetics`).

Anotá el `id` (UUID) generado.

### 2. Insertar productos

En **Table Editor** → `products`, una fila por producto:

- `site_id` — el UUID del sitio.
- `name`, `description`, `price`
- `image_url` — path relativo en `product-images` (ver sección anterior)
- `category` — opcional
- `position` — orden en el grid (entero)
- `is_active` — `true` para que se muestre

Subí las fotos al bucket antes o después; el path en `image_url` debe coincidir con el objeto en Storage.

### 3. Deploy en Vercel (un proyecto por cliente)

1. En [Vercel](https://vercel.com) → **Add New Project** e importá este repositorio (o conectá el mismo repo otra vez para un segundo proyecto).
2. En **Environment Variables** configurá:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | la misma URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | la misma anon key |
| `NEXT_PUBLIC_SITE_SLUG` | el slug del cliente nuevo (ej. `panaderia-lucia`) |

3. Deploy. El sitio solo mostrará los datos de ese slug.
4. (Opcional) Asigná un dominio custom a ese proyecto de Vercel.

Para el siguiente cliente: repetí los pasos 1–2 en Supabase y el paso 3 con un **proyecto Vercel nuevo** (o un nuevo Environment) y otro `NEXT_PUBLIC_SITE_SLUG`.

### Checklist rápido

- [ ] Fila en `sites` con `slug` único
- [ ] Productos con ese `site_id` e `is_active = true`
- [ ] Imágenes en `product-images` y paths en `image_url`
- [ ] Proyecto Vercel con las 3 env vars
- [ ] `NEXT_PUBLIC_SITE_SLUG` = exactamente el `slug` de `sites`
