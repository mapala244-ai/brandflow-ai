# BrandFlow AI
## Documento técnico ejecutivo

**Reto Musa — SmartRanks AI Challenge 2026**
Repositorio: https://github.com/mapala244-ai/brandflow-ai

---

## 1. El problema

Las pymes saben que deben estar presentes en redes sociales, pero producir contenido con constancia las supera. En un negocio pequeño, una sola persona atiende clientes, gestiona inventario, responde mensajes y, además, debe escribir el contenido de marketing.

El resultado es un patrón que se repite en miles de negocios: se publica «cuando hay tiempo», cada pieza tiene un tono distinto y la marca pierde coherencia. Cuando cada publicación parece venir de un negocio diferente, el cliente no construye una imagen clara de la marca.

El costo real, medido por canal para un solo producto:

| Canal | Qué exige | Tiempo |
|---|---|---|
| Instagram | Caption con gancho, tono cercano, hashtags | 30–45 min |
| Facebook | Copy descriptivo, orientado a conversión | 20–30 min |
| WhatsApp | Mensaje breve para difusión, sin sonar a spam | 15 min |
| Email | Asunto que se abra + cuerpo persuasivo | 30–40 min |
| SEO | Título y meta descripción optimizados | 20 min |

**Entre 2 y 4 horas por producto.** En un catálogo que crece cada semana, el marketing deja de ser una ventaja competitiva y se convierte en el cuello de botella del negocio.

---

## 2. La solución

BrandFlow AI toma la información que la tienda **ya tiene** sobre un producto y la convierte en una campaña multicanal completa, coherente con la voz de la marca.

```
   ┌─────────────┐      ┌──────────────────┐      ┌─────────────────────┐
   │  Producto   │ ──▶  │   BrandFlow AI   │ ──▶  │  Campaña completa   │
   │             │      │                  │      │                     │
   │ nombre      │      │  Voz de marca    │      │  Instagram          │
   │ descripción │      │        +         │      │  Facebook           │
   │ precio      │      │    Claude API    │      │  WhatsApp           │
   │ categoría   │      │        +         │      │  Email              │
   │ materiales  │      │  Reglas por      │      │  SEO                │
   │             │      │     canal        │      │  Hashtags           │
   └─────────────┘      └──────────────────┘      │  Prompts img/video  │
                                                   └─────────────────────┘
```

El principio de diseño es explícito: **la IA redacta, la persona decide.**

No se trata de generar un texto y copiarlo en todos los canales. Cada canal recibe contenido adaptado a su formato y a su público: Instagram pide gancho visual y cercanía; el email necesita un asunto que se abra; el SEO exige precisión y palabras clave. Y todo el contenido se produce como borrador editable, nunca como publicación automática.

La voz de marca no la inventa el modelo: la define el negocio y el sistema la aplica de forma consistente en cada pieza. Esa es precisamente la diferencia entre «usar IA» y «sonar a IA».

---

## 3. Arquitectura

### Visión general

```
Backend (Node.js + Express)
│
├── Routes ──────▶ Controllers ──────▶ Models ──────▶ SQLite
│   (endpoints)    (validación y        (acceso a
│                   respuesta HTTP)      datos)
│
└── Services
    └── claudeService.js ──────▶ Claude Messages API
```

### Estructura del repositorio

```
backend/
├── src/
│   ├── server.js              Entrypoint: env → migraciones → arranque
│   ├── app.js                 Middleware y montaje de routers
│   ├── config/db.js           Conexión SQLite + helpers dbAll/dbGet/dbRun
│   ├── database/
│   │   ├── migrate.js         Runner de migraciones con tabla de control
│   │   └── migrations/        001_companies.sql, 002_campaigns.sql
│   ├── routes/                companyRoutes, aiRoutes, campaignRoutes
│   ├── controllers/           Validación de entrada, forma de respuesta
│   ├── models/                Acceso a datos
│   └── services/
│       └── claudeService.js   Wrapper de la API de Claude
frontend/                      React 18 + Vite
shared/                        Código compartido
```

### Modelo de datos

**companies** — la marca y su contexto
`id`, `name`, `industry`, `description`, `created_at`

**campaigns** — cada campaña generada, con trazabilidad
`id`, `company_id` (FK), `product_name`, `content` (JSON), `created_at`

Guardar el contenido como JSON permite que la estructura de la campaña evolucione (añadir TikTok, LinkedIn, nuevos formatos) sin migraciones de esquema, y mantiene el historial completo de lo generado para cada producto.

### Decisiones técnicas

**SQLite en lugar de PostgreSQL.** Para un MVP que debe correr en cualquier máquina sin instalación previa, SQLite elimina fricción por completo. El acceso a datos está aislado en la capa de modelos, así que migrar a PostgreSQL no requiere tocar controladores ni rutas.

**Runner de migraciones propio en vez de un ORM.** Unas 60 líneas frente a una dependencia pesada. Aplica en orden los `.sql` numerados y registra los aplicados en una tabla de control. Esquema versionado y reproducible, sin abstracciones innecesarias.

**`fetch` nativo en lugar del SDK de Anthropic.** Llamada directa a la Messages API: menos dependencias, control total sobre el manejo de errores y sobre el formato de los prompts.

**Errores tipificados.** `claudeService` lanza errores con códigos propios (`MISSING_API_KEY`, `CLAUDE_API_ERROR`) que el controlador traduce a códigos HTTP correctos — un 503 cuando falta configuración, no un 500 genérico. El cliente puede distinguir «el servicio no está configurado» de «el servicio falló».

**Reintento ante JSON malformado.** Los modelos de lenguaje ocasionalmente devuelven JSON con errores de formato. El servicio detecta el fallo de parseo y reintenta una vez antes de devolver error, lo que eleva significativamente la tasa de éxito sin costo perceptible.

**Separación estricta en capas.** Rutas declaran endpoints, controladores validan y responden, modelos acceden a datos. Añadir un módulo nuevo es replicar un patrón conocido — así se construyó el módulo de campañas sobre el patrón ya probado de empresas.

---

## 4. API

Base URL: `http://localhost:4000`

| Método | Endpoint | Función |
|---|---|---|
| `GET` | `/health` | Estado del servidor |
| `GET` | `/api/ai/status` | Verifica configuración de la clave de IA |
| `POST` | `/api/ai/chat` | Prompt directo a Claude |
| `POST` | `/api/companies` | Crea una empresa |
| `GET` | `/api/companies` | Lista empresas |
| `GET` | `/api/companies/:id` | Obtiene una empresa |
| `PUT` | `/api/companies/:id` | Actualiza una empresa |
| `DELETE` | `/api/companies/:id` | Elimina una empresa |
| `POST` | `/api/campaigns` | **Genera una campaña multicanal completa** |
| `GET` | `/api/campaigns` | Lista campañas generadas |
| `GET` | `/api/campaigns/:id` | Obtiene una campaña |

### Entregables que produce una campaña

Una sola llamada devuelve ocho piezas de contenido:

1. **Instagram** — caption con gancho y llamado a la acción
2. **Facebook** — post orientado a conversión
3. **WhatsApp** — mensaje para difusión
4. **SEO** — título y meta descripción
5. **Email** — asunto y cuerpo
6. **Hashtags** — veinte etiquetas del nicho
7. **Prompt de imagen** — listo para herramientas de IA generativa
8. **Prompt de video** — listo para herramientas de IA generativa

### Códigos de respuesta

| Código | Significado |
|---|---|
| `200` / `201` | Operación exitosa / recurso creado |
| `400` | Datos de entrada inválidos o faltantes |
| `404` | Recurso no encontrado |
| `503` | Servicio de IA no configurado |

Cada código fue verificado con pruebas contra el servidor en ejecución.

---

## 5. Verificación

El módulo de campañas se probó contra el servidor real, no con mocks:

| Caso | Resultado esperado | Resultado |
|---|---|---|
| Listar campañas (vacío) | `200` con arreglo vacío | ✅ |
| Crear campaña sin datos requeridos | `400` con mensaje claro | ✅ |
| Consultar campaña inexistente | `404` | ✅ |
| Crear campaña con empresa inexistente | `404` | ✅ |
| Generar sin clave configurada | `503` | ✅ |
| CRUD completo de empresas | `200` / `201` / `204` | ✅ |

---

## 6. Uso responsable y protección de datos

**Caso de uso genérico.** El proyecto trabaja sobre una marca ficticia de calzado femenino en cuero. Todos los productos, precios y descripciones son de demostración. No se utilizan datos privados, catálogos ni credenciales de ninguna empresa real.

**Credenciales protegidas.** El archivo `.env` está excluido del control de versiones. El repositorio solo incluye `.env.example` con los nombres de las variables, nunca sus valores.

**Revisión humana obligatoria.** El sistema produce borradores. Ninguna pieza se publica automáticamente: la aprobación de una persona es parte del diseño, no un añadido.

**Sin invención de hechos.** El sistema genera contenido a partir de la información real del producto. No fabrica testimonios, reseñas, cifras de ventas ni afirmaciones que el negocio no pueda sostener.

**Riesgos considerados.** El contenido generado por IA puede sonar genérico si no se ancla a una voz de marca; puede contener afirmaciones no verificadas; y su uso sin criterio puede erosionar la autenticidad que sostiene la relación con el cliente. El diseño responde a los tres: voz de marca configurable, revisión humana previa a publicar, y contenido humano irreemplazable (fotos reales, historias, atención personal) que el sistema no intenta sustituir.

---

## 7. Cómo ejecutarlo

```bash
# Backend
cd backend
npm install
cp .env.example .env        # añadir CLAUDE_API_KEY
npm run dev

# Verificación
curl http://localhost:4000/health
curl http://localhost:4000/api/ai/status
```

Las migraciones se aplican automáticamente al arrancar. No se requiere instalar ni configurar una base de datos.

---

## 8. Estado y roadmap

**Implementado y verificado**
Arquitectura backend en capas · Base de datos con migraciones versionadas · CRUD de empresas · Integración con la API de Claude · Generación de campañas multicanal · Manejo de errores tipificado · Documentación técnica

**En construcción**
Dashboard web · Voz de marca configurable por empresa desde la interfaz · Calendario de contenidos

**Siguiente**
Importación de catálogo desde plataformas de e-commerce · Automatización de publicación · Analítica de campañas

**Visión**
Plataforma SaaS multi-empresa de autoservicio para pymes de Latinoamérica.

---

## 9. Por qué importa

En Latinoamérica, la mayoría de las pymes no puede pagar una agencia ni sostener un equipo de marketing. Lo que hoy las separa de una marca grande no es la calidad de su producto: es la capacidad de comunicarlo con constancia.

BrandFlow AI busca cerrar esa brecha — dar a un negocio pequeño el mismo nivel de contenido que una marca grande, por el precio de una suscripción, sin que pierda lo único que ninguna competencia puede copiar: su propia voz.

> **Cada producto merece una gran campaña.**
