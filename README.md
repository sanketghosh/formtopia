<div align="center">
<h1>formtopia</h1>
<p>Formtopia: Effortless Form Building & Sharing.</p>
</div>

<div align="center">
  <br />
    <a href="https://github.com/sanketghosh/formtopia" target="_blank">
      <img src="https://github.com/sanketghosh/fastNotes/blob/main/client/public/formtopiaLogo.png" alt="Project Banner">
    </a>
  <br />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-39393c?logo=react&logoColor=white&style=for-the-badge" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Tailwind CSS-39393c?logo=tailwindcss&logoColor=white&style=for-the-badge" height="40" alt="tailwindcss logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/TypeScript-39393c?logo=typescript&logoColor=white&style=for-the-badge" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Express-39393c?logo=express&logoColor=white&style=for-the-badge" height="40" alt="express logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Bun-39393c?logo=bun&logoColor=white&style=for-the-badge" height="40" alt="express logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Sqlite-39393c?logo=sqlite&logoColor=white&style=for-the-badge" height="40" alt="express logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Prisma-39393c?logo=prisma&logoColor=white&style=for-the-badge" height="40" alt="prisma logo"  />
</div>

</div>

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Quick Start](#quick-start)

## <a name="introduction">Introduction</a>

Formtopia is a fast, intuitive form builder and sharing tool designed to make creating and distributing forms as simple as possible. Whether you’re collecting survey responses, gathering feedback, or managing registrations, Formtopia lets you build customized forms in just a few clicks.

With its sleek, user-friendly interface, you can create forms quickly without the need for coding. Formtopia supports a wide range of question types—such as text fields, multiple-choice, checkboxes it ideal for all kinds of form-based tasks. Once your form is ready, share it easily with anyone via a unique link.

Formtopia prioritizes speed and flexibility, so you can focus on what matters most: gathering the data you need without any hassle. Whether you're collecting information from a few people or hundreds, Formtopia helps you manage it all with ease.

## <a name="tech-stack">Tech Stack</a>

- React (No meta framework)
- Tailwind
- ShadcnUI
- TypeScript
- Bun
- Express
- Sqlite
- PrismaORM

## <a name="features">Features</a>

- **Easy Form Creation**: Build forms effortlessly with a drag-and-drop interface, no coding required.
- **Customizable Question Types**: Choose from a variety of question types such as multiple-choice, text fields, checkboxes, and file uploads.
- **Instant Form Sharing**: Share your forms instantly with a unique link or embed them directly into your website.
- **Response Analytics**: View and analyze form responses in real-time, with automatic data organization and export options.
- **Mobile & Desktop Access**: Create, manage, and share forms seamlessly across devices, from desktop to mobile.
- **Privacy & Security**: Ensure your data is secure with strong encryption and privacy controls for all users.
- **Fully Open-Source**: Modify, extend, and contribute to the platform, fostering a community-driven approach to development.

## <a name="quick-start">Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/)

**Cloning the Repository**

```bash
git clone https://github.com/sanketghosh/formtopia.git
cd formtopia
```

Now we will install `client` dependencies and `api` dependencies separately one by one. Let's install the **client** dependencies first and then **api**:

**Client Installation**

Install the front-end / client dependencies using `bun`:

```bash
cd client
bun install
```

**Set Up Environment Variables**

Create a new file named `.env` inside the `client` directory and add the following content:

```env
VITE_API_BASE_URL=<set_your_api_base_url>
```

Replace the placeholder values with your actual API base URL. And in development if you are keeping your API PORT same as in this repository use `http://localhost:8000`

**Running the Client**

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

Well client setup is done now it's time for our back-end or `api`

**API installation**
Install the back-end / api dependencies using `bun`:

```bash
cd api (maybe `cd ../api` if you are already inside client)
bun install
```

**Set Up Environment Variables**

Create a new file named `.env` inside the `api` directory and add the following content:

```env
DATABASE_URL=
FRONTEND_URL=
JWT_SECRET_KEY=
PORT=
NODE_ENV=
```

Replace the placeholder values with your actual database URL and make sure to fill the others too. If you are in unix based system type `openssl rand -hex 64` to generate a random complex string for `JWT_SECRET_KEY`. For example check `.env.example` file.

**Prisma setup and schema migration**
If your prefer a data-source provider other than `Sqlite` and generate a prisma schema from scratch run `bunx prisma init --datasource-provider <your_datasource_provider>` change placeholder value with a data-source provider like `mysql` `postgres` etc and run the commands below.
If you are using Sqlite skip the previous step and paste the following command:

- Generate prisma client: `bunx prisma generate --datasource-provider sqlite`
- Migrate `bunx prisma migrate dev --name <any_migration_name>`

You have to run this migration command with every schema changes and if there is already a `migration` folder inside prisma directory delete that before running these commands.
To run prisma studio and visualize and edit you data in an interface just run : `bunx prisma studio`
Check prisma docs for more.

**Running the API**

```bash
bun run dev
```

You api is now running on `http://localhost:8000`.
