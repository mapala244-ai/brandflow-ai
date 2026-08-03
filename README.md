<div align="center">

# BrandFlow AI

### Convierte productos en campañas de marketing con Inteligencia Artificial

**Cada producto merece una gran campaña.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite&logoColor=white)](https://sqlite.org)
[![Claude API](https://img.shields.io/badge/Claude-API-D97757?style=flat-square)](https://docs.claude.com)
[![License](https://img.shields.io/badge/License-MIT-2563EB?style=flat-square)](#licencia)

*Proyecto desarrollado para el reto **Musa** — SmartRanks AI Challenge 2026*

</div>

---

## El problema

Las pymes saben que deben estar en redes sociales, pero producir contenido con constancia las supera.

En un negocio pequeño, una sola persona —normalmente la dueña— es quien responde mensajes, gestiona inventario, atiende clientes y, además, debe escribir el contenido de marketing. El resultado es predecible: se publican piezas «cuando hay tiempo», cada una con un tono distinto, y la marca pierde coherencia.

Publicar un producto nuevo en la tienda toma minutos. Promocionarlo bien es otra historia:

| Canal | Qué exige | Tiempo aproximado |
|---|---|---|
| Instagram | Caption con gancho, tono cercano, hashtags | 30–45 min |
| Facebook | Copy más descriptivo, orientado a conversión | 20–30 min |
| WhatsApp | Mensaje breve para difusión, sin sonar a spam | 15 min |
| Email | Asunto que se abra + cuerpo persuasivo | 30–40 min |
| SEO | Título y meta descripción optimizados | 20 min |

**Entre 2 y 4 horas de trabajo manual por cada producto.** Para un catálogo que crece cada semana, el marketing deja de ser una ventaja y se convierte en el cuello de botella del negocio.

---

## La solución

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
   └─────────────┘      └──────────────────┘      │  Prompts imagen/vid │
                                                   └─────────────────────┘
```

No se trata de generar el mismo texto y copiarlo en todos lados. Cada canal recibe contenido **adaptado a su formato y a su público**: Instagram pide gancho visual y cercanía; el email pide un asunto que se abra; el SEO pide precisión y palabras clave.

**El principio de diseño:** la IA redacta, la persona decide. Todo el contenido se genera como borrador editable y revisable antes de publicar. La voz de la marca no la inventa el modelo — la define el negocio y el sistema la aplica de forma consistente.

---

## Estado del proyecto

Este es un MVP en desarrollo activo. Documentamos con precisión qué funciona hoy y qué está en construcción.

### Implementado y verificado

- [x] **Arquitectura base del backend** — Express 5, ESM, separación en capas Routes → Controllers → Models
- [x] **Base de datos SQLite** con runner de migraciones propio y control de versiones del esquema
- [x] **CRUD completo de Empresas** — cinco endpoints probados manualmente contra servidor real
- [x] **Integración con la API de Claude** — `claudeService.js`, wrapper directo sobre la Messages API sin dependencias externas
- [x] **Manejo de errores tipificado** — códigos de error propios mapeados a respuestas HTTP correctas
- [x] **Health check** operativo
- [x] **Documentación del proyecto** — `CLAUDE.md` con arquitectura para futuras sesiones de desarrollo asistido

### En construcción

- [ ] **Generación de campañas multicanal** — endpoint que produce los ocho entregables de contenido
- [ ] **Sistema de voz de marca configurable** por empresa
- [ ] **Calendario de contenidos** sostenible
- [ ] **Dashboard web** (React + Vite) — scaffold creado, interfaz pendiente
- [ ] **Integración con plataformas de e-commerce** para importar catálogo

---

## Arquitectura

```
Tiendas Baron Flow AI/
│
├── backend/                       API REST (Node.js + Express)
│   ├── src/
│   │   ├── server.js              Punto de entrada: carga env, corre migraciones, arranca
│   │   ├── app.js                 Middleware (CORS, JSON) y montaje de routers
│   │   ├── config/
│   │   │   └── db.js              Conexión SQLite única + helpers dbAll/dbGet/dbRun
│   │   ├── database/
│   │   │   ├── migrate.js         Runner de migraciones con tabla de control
│   │   │   └── migrations/        Migraciones SQL numeradas
│   │   ├── routes/                Definición de endpoints
│   │   ├── controllers/           Validación de entrada y forma de la respuesta HTTP
│   │   ├── models/                Acceso a datos
│   │   └── services/
│   │       └── claudeService.js   Wrapper de la API de Claude
│   └── database/                  Archivo .db (ignorado por Git)
│
├── frontend/                      Dashboard (React 18 + Vite)
│   └── src/
│       ├── services/api.js        Helper de peticiones al backend
│       ├── components/            (pendiente)
│       └── pages/                 (pendiente)
│
├── shared/                        Código compartido (previsto)
├── CLAUDE.md                      Guía de arquitectura del repositorio
└── README.md
```

### Decisiones técnicas

**SQLite en lugar de PostgreSQL.** Para un MVP que debe correr en cualquier máquina sin instalación previa, SQLite elimina fricción por completo. El acceso a datos está aislado en la capa de modelos, así que migrar a PostgreSQL más adelante no toca controladores ni rutas.

**Runner de migraciones propio en vez de un ORM.** Unas 60 líneas de código frente a una dependencia pesada. Aplica en orden los `.sql` numerados y registra los aplicados en una tabla de control. Mantiene el esquema versionado y reproducible sin abstracciones innecesarias.

**`fetch` nativo en lugar del SDK de Anthropic.** El servicio llama directamente a la Messages API. Menos dependencias, control total sobre el manejo de errores y sobre el formato de los prompts.

**Errores tipificados.** `claudeService` lanza errores con códigos propios (`MISSING_API_KEY`, `CLAUDE_API_ERROR`) que el controlador traduce a códigos HTTP correctos (503 cuando falta configuración, no un 500 genérico). Un cliente puede distinguir «el servicio no está configurado» de «el servicio falló».

**Separación estricta en capas.** Las rutas solo declaran endpoints; los controladores validan y responden; los modelos acceden a datos. Cada archivo tiene una responsabilidad, y añadir un módulo nuevo es replicar un patrón conocido.

---

## Instalación

### Requisitos

- Node.js 18 o superior
- npm
- Una clave de API de Claude ([console.anthropic.com](https://console.anthropic.com))

### Backend

```bash
cd backend
npm install
cp .env.example .env      # en Windows: Copy-Item .env.example .env
```

Edita `backend/.env` y añade tu clave:

```env
PORT=4000
DATABASE_PATH=./database/brandflow.db
CLAUDE_API_KEY=tu_clave_aqui
CLAUDE_MODEL=claude-sonnet-4-6
CORS_ORIGIN=http://localhost:5173
```

Arranca el servidor (las migraciones se aplican solas):

```bash
npm run dev
```

Verifica que responde:

```bash
curl http://localhost:4000/health
# {"status":"ok"}

curl http://localhost:4000/api/ai/status
# {"configured":true}
```

> **Seguridad:** el archivo `.env` está en `.gitignore` y nunca debe subirse al repositorio. Si tu clave queda expuesta, revócala de inmediato desde la consola de Anthropic.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## API

Base URL: `http://localhost:4000`

### Estado

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/health` | Estado del servidor |
| `GET` | `/api/ai/status` | Indica si la clave de Claude está configurada |

### Empresas

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/companies` | Crea una empresa |
| `GET` | `/api/companies` | Lista todas las empresas |
| `GET` | `/api/companies/:id` | Obtiene una empresa |
| `PUT` | `/api/companies/:id` | Actualiza una empresa |
| `DELETE` | `/api/companies/:id` | Elimina una empresa |

**Ejemplo — crear empresa**

```bash
curl -X POST http://localhost:4000/api/companies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Calzado Aurora",
    "industry": "Calzado en cuero",
    "description": "Marca de calzado femenino artesanal"
  }'
```

```json
{
  "id": 1,
  "name": "Calzado Aurora",
  "industry": "Calzado en cuero",
  "description": "Marca de calzado femenino artesanal",
  "created_at": "2026-08-01T14:32:11.000Z"
}
```

### Inteligencia Artificial

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/ai/chat` | Envía un prompt a Claude y devuelve la respuesta |

**Ejemplo**

```bash
curl -X POST http://localhost:4000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Escribe un caption de Instagram para unas sandalias de cuero"}'
```

**Códigos de respuesta**

| Código | Significado |
|---|---|
| `200` | Operación exitosa |
| `201` | Recurso creado |
| `400` | Datos de entrada inválidos o faltantes |
| `404` | Recurso no encontrado |
| `503` | Servicio de IA no configurado (falta `CLAUDE_API_KEY`) |

---

## Datos de demostración

El proyecto trabaja sobre un **caso realista y genérico**: *Calzado Aurora*, una marca ficticia de calzado femenino en cuero. Todos los productos, precios y descripciones incluidos son de demostración.

No se utilizan datos privados, catálogos ni credenciales de ninguna empresa real.

---

## Roadmap

**Fase actual — MVP funcional**
Motor de generación de campañas multicanal y dashboard de uso.

**Siguiente — Integraciones**
Importación de catálogo desde plataformas de e-commerce y automatización de publicación.

**Después — Plataforma SaaS**
Multi-empresa, autoservicio, analítica de campañas y planes por suscripción para pymes de Latinoamérica.

---

## Visión

> **Democratizar el marketing impulsado por Inteligencia Artificial para las empresas de Latinoamérica.**

En la región, la mayoría de las pymes no puede pagar una agencia ni sostener un equipo de marketing. BrandFlow AI busca darles el mismo nivel de contenido que una gran marca, por el precio de una suscripción — sin que pierdan lo único que ninguna competencia puede copiar: su propia voz.

---

## Licencia

MIT

---

<div align="center">

**BrandFlow AI**

*Cada producto merece una gran campaña.*

</div>
