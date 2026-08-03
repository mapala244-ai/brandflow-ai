<div align="center">

# 🚀 BrandFlow AI

### Convierte productos en campañas de marketing con Inteligencia Artificial

**Plataforma SaaS para automatizar el marketing de empresas de comercio electrónico mediante Inteligencia Artificial.**

![Status](https://img.shields.io/badge/Status-MVP-success)
![Version](https://img.shields.io/badge/Version-1.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Express](https://img.shields.io/badge/Express.js-5-lightgrey)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Claude AI](https://img.shields.io/badge/Claude-AI-orange)
![SQLite](https://img.shields.io/badge/SQLite-Database-blue)
![License](https://img.shields.io/badge/License-MIT-success)

### 🏆 SmartRanks AI Challenge 2026

### Cliente Piloto: **Tiendas Barón**

*"Cada producto merece una gran campaña."*

</div>

---

# 📖 Descripción

BrandFlow AI es una plataforma de automatización de marketing impulsada por Inteligencia Artificial que transforma la información de un producto en campañas listas para publicar.

Su objetivo es ayudar a pequeñas y medianas empresas a reducir el tiempo necesario para crear contenido de marketing, automatizando tareas repetitivas mediante IA.

El proyecto nace como una solución desarrollada para **Tiendas Barón**, donde la creación de contenido para nuevos productos representaba un proceso manual que consumía varias horas de trabajo.

La visión del proyecto es evolucionar este MVP hacia una plataforma SaaS para empresas de comercio electrónico en Latinoamérica.

---

# 🎯 El problema

Cada vez que una empresa publica un nuevo producto debe crear contenido para múltiples canales:

- Instagram
- Facebook
- WhatsApp
- Email Marketing
- SEO
- Blogs
- Campañas comerciales

Este proceso consume tiempo, requiere conocimientos especializados y dificulta mantener una presencia digital constante.

Como consecuencia, muchas empresas publican menos contenido del necesario y desaprovechan oportunidades de venta.

---

# 💡 Nuestra solución

BrandFlow AI automatiza este proceso utilizando Inteligencia Artificial.

A partir de la información de un producto, la plataforma genera automáticamente contenido optimizado para diferentes canales digitales.

Con un solo clic es posible obtener:

- ✅ Publicaciones para Instagram
- ✅ Publicaciones para Facebook
- ✅ Mensajes para WhatsApp
- ✅ Email Marketing
- ✅ Descripciones SEO
- ✅ Hashtags
- ✅ Prompts para generación de imágenes con IA
- ✅ Prompts para generación de videos con IA

Nuestro objetivo no es reemplazar al equipo de marketing.

Nuestro objetivo es potenciar su productividad.

---

# 🏢 Caso de uso

BrandFlow AI nace dentro de **Tiendas Barón**.

Durante la operación diaria identificamos un problema recurrente: cada nuevo producto requería varias horas de trabajo para producir contenido para distintos canales digitales.

El proyecto busca reducir ese proceso de horas a segundos mediante Inteligencia Artificial.

La validación inicial se realizará dentro de Tiendas Barón y posteriormente evolucionará hacia una plataforma SaaS para otras empresas.

---

# 🏗 Arquitectura

```text
                        Shopify
                           │
                           ▼
                  BrandFlow AI Backend
                           │
                   Claude AI API
                           │
────────────────────────────────────────────────

        Motor Inteligente de Marketing

────────────────────────────────────────────────

Instagram

Facebook

WhatsApp

Email Marketing

SEO

Hashtags

Prompts para Imagen IA

Prompts para Video IA
```

---

# 📂 Arquitectura del proyecto

```
BrandFlowAI/

├── frontend/          # React + Vite
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── database/
│   └── server.js
│
├── shared/
│
├── docs/
│
├── README.md
│
└── LICENSE
```

---

# 🚀 Tecnologías

## Backend

- Node.js
- Express.js

## Frontend

- React
- Vite

## Inteligencia Artificial

- Claude AI API

## Base de datos

- SQLite

## Integraciones

- Shopify (En desarrollo)

## Herramientas

- Git
- GitHub
- REST API

---

# ⚙ Instalación

## Clonar el proyecto

```bash
git clone https://github.com/usuario/brandflow-ai.git
```

```bash
cd brandflow-ai
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

Servidor:

```
http://localhost:4000
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación:

```
http://localhost:5173
```

---

# 🔐 Variables de entorno

Crear los archivos `.env` correspondientes utilizando como referencia los archivos `.env.example`.

Variables principales:

```env
CLAUDE_API_KEY=
PORT=4000
DATABASE_URL=
```

---

# 📡 API

## Estado

```
GET /api/ai/status
```

---

## Chat

```
POST /api/ai/chat
```

---

## Empresas

```
GET /api/company

POST /api/company

PUT /api/company/:id

DELETE /api/company/:id
```

---

## Próximamente

```
GET /api/shopify/products

POST /api/marketing/generate
```

---

# 📈 Estado del proyecto

## ✅ Completado

- Estructura del proyecto
- Backend Express
- Base de datos SQLite
- CRUD Empresas
- Integración Claude AI
- Endpoints REST

## 🚧 En desarrollo

- Frontend React
- Dashboard
- Integración Shopify

## 🔜 Próximamente

- ManyChat
- Meta API
- WhatsApp Business
- WooCommerce
- Google Ads
- TikTok

---

# 🗺 Roadmap

## Fase 1 — MVP

- Backend
- Claude AI
- API REST
- CRUD Empresas

## Fase 2

- Dashboard React
- Shopify
- Catálogo de productos

## Fase 3

- Generación automática de campañas

## Fase 4

- ManyChat
- Meta API
- WhatsApp Business

## Fase 5

- Plataforma SaaS
- Multiempresa
- Analítica
- Automatización completa

---

# 🎯 Visión

Construir la plataforma de automatización de marketing impulsada por Inteligencia Artificial más importante para empresas de comercio electrónico en Latinoamérica.

---

# ❤️ Misión

Ayudar a las pequeñas y medianas empresas a competir con grandes marcas mediante soluciones de Inteligencia Artificial que automaticen el marketing y aumenten las ventas.

---

# 🌎 Público objetivo

- Empresas de comercio electrónico
- Tiendas Shopify
- WooCommerce
- Emprendedores
- Agencias de marketing
- Community Managers
- Equipos comerciales

---

# 💼 Modelo de negocio

BrandFlow AI está concebido para evolucionar hacia una plataforma SaaS con planes de suscripción para empresas.

La validación inicial se realizará con Tiendas Barón como cliente piloto antes de su comercialización.

---

# 📌 Futuro del proyecto

Las próximas versiones incluirán:

- Integración con Shopify
- WooCommerce
- ManyChat
- Meta API
- WhatsApp Business
- TikTok
- Generación de imágenes con IA
- Generación de videos con IA
- Dashboard empresarial
- Analítica de campañas
- Automatización completa del marketing

---

# 👨‍💻 Equipo

Proyecto desarrollado para el **SmartRanks AI Challenge 2026**.

BrandFlow AI representa el primer producto del ecosistema de soluciones de Inteligencia Artificial que será desarrollado por la futura empresa especializada en automatización de marketing digital.

---

# 📄 Licencia

MIT License

---

<div align="center">

## 🚀 BrandFlow AI

### Convierte productos en campañas de marketing con Inteligencia Artificial.

**Cada producto merece una gran campaña.**

</div>