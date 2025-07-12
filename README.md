# 🚀 Astron - Discord Application Suite

**Astron** is a modular and extensible ecosystem designed to enhance and manage Discord communities. With a core bot and multiple plugin-based apps (such as Logger, Protect, Music, etc.), Astron provides powerful features for server administrators and moderators — accessible through a modern web dashboard.

## 🌟 Features

- 🌐 **Modern Web Dashboard**  
  Manage your server with an intuitive and secure interface.

- 🧩 **Plugin-Based Architecture**  
  Extend functionality with installable apps like `Logger`, `Protect`, `Music`, and more.

- 🔐 **Discord OAuth2 Authentication**  
  Log in with your Discord account. Optional support for external 2FA.

- ⚙️ **Server-Specific Configurations**  
  Each guild can customize its setup and plugin preferences.

- 📡 **API Intermediary**  
  Astron includes a robust central API to handle communications between bots and dashboard clients.

## 📥 Getting Started

### 1. Requirements

- Node.js 18+
- Discord bot token & app setup
- MongoDB instance (local or Atlas)
- [Optional] Redis, Prometheus & Grafana for monitoring

### 2. Installation

```bash
git clone https://github.com/astron-collection/astron
cd astron
pnpm install
cp .env.example .env
````

Configure your `.env` file with required variables (see [Environment](#environment)).

### 3. Running the App

Start the API server:

```bash
pnpm --filter api dev
```

Start the UI (dashboard):

```bash
pnpm --filter ui dev
```

## 🛠️ Project Structure

```
astron/
├── api/               # Express-based backend API
├── ui/                # React + Vite dashboard
├── docs/              # Developer documentation (soon)
├── plugins/           # Plugin-based architecture for commands
```

## 🔑 Authentication & Sessions

* Uses Discord OAuth2 (via `/api/auth/discord`)
* Session tokens for dashboard access
* Optional session-based 2FA layer (TOTP-based or email/QR validation)

## 🌐 API Usage

Astron provides internal endpoints for use by:

* The Discord bot (command handling, state updates)
* The web dashboard (fetching data, user actions)
* Developer integrations (via API keys)

Example:

```http
GET /api/v1/servers/:id/plugins
Authorization: Bearer <token>
```

## 📄 Environment

Example `.env.example` values:

```env
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_BOT_TOKEN=
API_BASE_URL=http://localhost:3001
FRONTEND_URL=http://localhost:5173
MONGODB_URI=
SESSION_SECRET=
```

## 📦 Available Plugins

| Name    | Description                           |
| ------- | ------------------------------------- |
| Logger  | Logs member joins/leaves, bans, edits |
| Protect | Anti-raid & spam system               |
| Music   | Stream music from YouTube & Spotify   |

More coming soon. Plugin installation is available via `/plugins` command or dashboard UI.

## 🧑‍💻 Developer Resources

Visit: [Astron Developer Portal](https://developers.astron-collection.com)

* API documentation
* SDKs and tools
* Create your own Astron plugins
* Get an API key and publish your app

## 📚 Wiki

For user guides, tutorials and FAQ: [Astron Wiki Platform](https://wiki.astron-collection.com)

## 💬 Support

If you need help, visit our [Discord Support Server](https://discord.gg/astroncollection)

## 📘 License

Astron is released under the [AGPLv3](./LICENSE).

---

© 2025 Astron Collection - Made with ❤️ for communities
