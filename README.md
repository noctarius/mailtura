# Mailtura

Reliable, developer-friendly, fully multi-tenant e-mail automation, and routing toolkit.

## What is Mailtura?

Mailtura is an open-source universal e-mail API service that simplifies email handling in applications: sending,
routing, templating, tracking, and orchestration. At the same time, Mailtura is fully multi-tenant and supports
individual e-mail providers per tenant, all managed through a single API.

Whether you're building transactional email flows, mass campaigns, a hosted service that has to support customer email
services, or just want more control over your email stack, Mailtura gives you the foundation.

## 🚀 Key Features

- [x] Unified API to send emails via multiple transports (SMTP, SendGrid, Mailjet, Mailchimp, Amazon SES, others, custom).
- [x] [MJML-based](https://mjml.io/) templating engine, initially built by Mailjet.
- [x] Contact, subscriber lists, unsubscribe, and bounce management.
- [x] Retry logic, back-off, and exponential backoff.
- [x] Webhooks and event tracking (sent, delivered, bounced, opened, clicked).
- [x] Dashboard for monitoring and logs.
- [x] Multi-tenant architecture.
- [x] Fully open-source.
- [x] Pluggable architecture so you can adapt to your needs as you scale.
- [x] And more!

## 📦 Installation

Clone the repository and run it in Docker Compose.

```bash
git clone https://github.com/mailtura/mailtura.git
cd mailtura
 docker compose -f docker/docker-compose.yaml up --build -d
```

## 🧪 Usage Scenarios

### Transactional Emails

Use Mailtura to power onboarding emails, password resets, notifications, etc. Mailtura supports template versioning,
localization, and predictable deliverability.

### Campaign & Bulk Sends

Route large scale sends through optimized transports, segment recipients, track opens/clicks, and manage bounce logic.

### Internal Tooling & Routing

Build internal mail routing workflows (e.g., support email handlers, forwarding rules, tagging) with a consistent API
across your stack.

### Multi-Tenant E-mail Services

Build service platforms with support for customer-provided e-mail services to confirm to customer requirements and
security policies.

## 📸 Screenshots

<p>
<img src="img/screenshot-1.png" />
<img src="img/screenshot-2.png" />
<img src="img/screenshot-3.png" />
<img src="img/screenshot-4.png" />
<img src="img/screenshot-5.png" />
</p>

## 🛠️ Configuration & Architecture

- Transports: SMTP, SendGrid, AWS SES, etc, each implemented via a transport plugin.
- Template engine: MJML-based with support for variables expanding.
- Bounce management: Automatic management of bounced emails.
- Webhooks: Sent, delivered, bounced, opened, clicked.
- Dashboard: Contacts, subscriber lists, monitoring, and logs.
- Workflow engine: Reliable operation via [Temporal](https://temporal.io).

## Software Architecture

- General
    - [TypeScript](https://typescriptlang.org) for typesafe implementations of frontend, backend, and workers.
    - [Typebox](https://github.com/sinclairzx81/typebox) for type OpenAPI type definitions and validation.
    - [Papaparse](https://www.papaparse.com/) for reliable CSV parsing.
    - [MJML](https://mjml.io/) for easy and reliable email templating.
    - [Mustache.js](https://github.com/janl/mustache.js) for variable expanding and template logic.
    - [Bun](https://bun.com/) for package management, backend runtime, and more.
- Backend:
    - [Fastify](https://fastify.dev/) for a fast and extensible API service. 
    - [BetterAuth](https://www.better-auth.com/) for extensible and comprehensive authentication and authorization.
    - [Prisma](https://www.prisma.io/) for database access and migrations.
    - [PostgreSQL](https://www.postgresql.org/). Because. 🔥
- Frontend:
    - [SolidJS](https://www.solidjs.com/) for simple and fast web frontend development.
    - [Tailwind CSS](https://tailwindcss.com/) for a comprehensive css class framework. 
    - [Flowbite](https://flowbite.com/) for a beautiful and accessible UI library.
    - [Modular Forms](https://modularforms.dev/) for modular and type-safe forms.
    - [TanStack Query](https://tanstack.com/query) for asynchronous state management and data fetching.
    - [Monaco Editor](https://microsoft.github.io/monaco-editor/) for a robust code editor.
    - [Apache ECharts](https://echarts.apache.org/) for beautiful and interactive charts.
- Workflow:
    - [Temporal](https://temporal.io/) for reliable and scalable workflows.
    - [NodeJS](https://nodejs.org/) for the workflow worker runtime.

## 🤝 Contributing

We love contributions. Whether it’s bug fixes, new transports, performance improvements, or documentation

1. Fork the repository
2. Create a feature branch: git checkout -b feature/awesome-transport
3. Write tests & update docs (eventually 😅)
4. Submit a Pull Request
5. Confirm that checks pass

Alternatively, you can also help by:

- [Open an Issue](https://github.com/noctarius/mailtura/issues): Report bugs or suggest improvements
- [Start a Discussion](https://github.com/noctarius/mailtura/discussions): Share feedback and feature ideas, ask questions, share ideas, and connect with other users

## 🔐 License

This project is licensed under the MIT License. See
the [LICENSE](https://github.com/noctarius/mailtura/blob/main/LICENSE) file for details.

## 🙏 Acknowledgements

Big thanks to all the people and libraries that inspired this, especially those in the Node.js email ecosystem, and
open-source maintainers who keep the community strong.
