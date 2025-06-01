# Astron — The Core of the Astron Suite

**Astron** is the primary bot of the **Astron Collection** — a modular suite of advanced Discord applications developed by [Sky Genesis Enterprise](https://skygenesisenterprise.com).This bot acts as the central hub that connects users with powerful features, seamless server management, and integration with the Astron web platform.

---

## 🚀 Features

Astron includes core-level features out-of-the-box:

- 🔧 **Admin Controls** — Server configuration, welcome/goodbye messages, announcements, and more.
- 🛡 **Moderation Tools** — Kick, ban, mute, warn, and RBAC-based team delegation.
- 📊 **Dynamic Presence** — Displays live server and user stats.
- 🔌 **Integration Ready** — Works with optional Astron apps (Logger, Player, Modmail, Protect).
- 🌐 **Web Dashboard Support** — Full control via `dashboard.astron-collection.com`.

Astron is designed to be scalable, lightweight, and extensible through its companion bots.

---

## 📦 Folder Structure

```bash
.
├── commands/
│   ├── admin/
│   ├── moderator/
│   ├── logger/       # Used when Astron Logger is installed
│   ├── player/       # Used when Astron Player is installed
│   ├── protect/      # Used when Astron Protect is installed
│   └── modmail/      # Used when Modmail is enabled
├── events/
├── config/
├── utils/
└── server.js
````

---

## 🛠 Installation

> Requires Node.js v18+ and a Discord bot token.

### 1. Clone the repo

```bash
git clone https://github.com/Sky-Genesis-Enterprise/astron.git
cd astron
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup `.env`

Create a `.env` file at the root with the following:

```env
BOT_TOKEN=your-discord-bot-token
```

### 4. Run the bot

```bash
node server.js
```

---

## 🔌 Optional Apps (Add-Ons)

To enhance Astron, connect it with other apps from the Astron Collection:

* **Astron Logger** – Full logging of server activity.
* **Astron Player** – High-quality audio streaming.
* **Astron Protect** – Anti-raid, anti-spam, word filters, and more.
* **Modmail** – Seamless DM-based support system.

Each bot unlocks new features on the web platform when invited.

---

## 🌐 Web Platform Integration

Connect Astron to the official web platform:

* **Main website**: [astron-collection.com](https://astron-collection.com)
* **Dashboard**: [dashboard.astron-collection.com](https://dashboard.astron-collection.com)
* **API**: [api.astron-collection.com](https://api.astron-collection.com)

Upon inviting Astron or any companion app, users are guided to link their Discord account via OAuth2 for secure and personalized management.

---

## 📘 Documentation

Full developer documentation and API reference will be available soon at:

👉 [Official Documentations](https://docs.astron-collection.com) *(Coming Soon)*

---

## 🧠 Architecture

Astron uses:

* **Discord.js v14+**
* **Node.js with TypeScript support (optional)**
* **Modular command loader**
* **Role-based access control (RBAC)**
* **Webhook and API bridge support**

---

## 🛡 Security & Philosophy

The core of Astron is open-core: essential functionalities are public, but sensitive logic (tokens, DB structure, internal API endpoints) remains private. Each server gets its own isolated environment for data safety.

---

## 🧑‍💼 Maintained by

💼 [Sky Genesis Enterprise](https://skygenesisenterprise.com)

If you're using Astron in production, let us know or contribute!

---

## ❤️ Contribute

We welcome feature suggestions and bug reports!
If you'd like to contribute or develop add-ons for Astron, open a pull request or start a discussion.

---

# 📄 License

This project is licensed under the **GNU Ferero Public Licence (GPLv3 licence)**.
You may use and extend the public logic but not redistribute closed components or proprietary APIs.