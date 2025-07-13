# 🌌 Astron — The Modular Discord Ecosystem

**Astron** is an open-source, modular ecosystem for Discord bots, combining a flexible API, real-time server data sync, and a powerful web dashboard.

Designed for server administrators and developers, Astron enables seamless management of Discord communities through both in-Discord commands and a rich browser interface.

---

## 🚀 Overview

Astron is composed of:

- 🧠 **Astron Core API** — A TypeScript/Express API layer that bridges the bots, dashboard, and plugin ecosystem.
- 🎛️ **Web Dashboard** — Built with React, TailwindCSS, and Vite. Supports Discord OAuth2 login, 2FA, and real-time server sync.
- 🤖 **Bot Modules** — Applications such as Moderation, Logging, Music, and more — installable and manageable from the dashboard or Discord itself.
- 🔌 **Plugin System** — Extend functionality with a dynamic plugin manager (install/uninstall from both dashboard and Discord).
- 🛠️ **Developer Platform** — Build plugins with SDKs for both Node.js and Python.
- 🔒 **Security & Performance** — Hardened API using Helmet, Rate Limiting, XSS filtering, and MongoDB sanitization.

---

## 🌐 Features

- ✅ Discord OAuth2 Login with optional 2FA
- 🔄 Real-time synchronization of server data (members, boosts, presence, roles, etc.)
- 📦 Plugin management via both UI and Discord commands
- 💬 Remote execution of commands from the dashboard
- 📊 Dashboard with dynamic UI: shows only installed apps per server
- 🔐 Role-based access control & multi-admin server support
- 📈 Prometheus & Grafana integration for metrics and supervision
- 🔑 Centralized API key management with developer portal
- 🌍 Integration with "Guild Center", a community-driven server listing platform

---

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| API | Node.js, Express, TypeScript |
| Dashboard | React, TailwindCSS, Vite |
| Auth | Discord OAuth2, JWT, optional 2FA |
| Bot Framework | discord.js, plugin-based architecture |
| Database | MongoDB |
| Metrics | Prometheus, Grafana |
| Dev Tools | SDKs for Node.js & Python |

---

## 🧩 Plugin Development

Astron supports a plugin-based architecture. You can build and publish your own apps that integrate directly with Discord servers and the web dashboard.

SDKs are available in:
- **Node.js** (`astrium.js`)
- **Python** (`astrium.py`)

Plugins can define:
- Slash Commands
- Event Listeners
- Dashboard Widgets
- REST Routes (via API hooks)
- Configuration schemas

---

## 🛡️ Security First

Astron applies best practices for a secure and scalable ecosystem:

- Helmet + Rate limiting
- `xss-clean` and `mongo-sanitize`
- Scoped API access
- Guild-specific permissions and plugin sandboxing

---

## 📚 Documentation

Comprehensive documentation (coming soon) will be available at:

👉 [Wiki Project](https://wiki.astron-collection.com)

---

## 🧪 Contribute

We welcome contributions from the community!

- 🔧 Build plugins
- 🐛 Fix issues
- 📝 Improve documentation
- 🎨 Suggest UX/UI improvements

Join our [Discord Community](https://discord.gg/WfC7EFahMf) to get involved!

---

## 📜 License

Astron is open-source and released under the MIT License.

---

## 🌠 Project by [Astron Collection](https://astron-collection.com)
