
# 🚀 Onboardly

*Onboardly is a modern employee onboarding and workforce management platform that helps organisations invite, register, and manage employees — with built-in support for attendance tracking and payroll-ready architecture.

It provides a secure invite-based onboarding system, organisation management, and role-based access, designed to scale into a full HR and payroll platform*

---

## 🧠 Overview

The **Employee Invite System** is a role-based onboarding platform where:

* **Super Users** create organisations
* **Admins** invite employees
* **Employees** register using a unique invite link

It demonstrates:

* Secure authentication
* Role-based access control
* Token-based onboarding
* Ownership tracking
* Modern frontend and mobile UX

---

## 🧩 Architecture

```
Next.js (Web UI)
React Native (Mobile App)
        ↓
NestJS API (JWT)
        ↓
MongoDB (Mongoose)
```

---

## 👥 Roles

| Role          | Capabilities                           |
| ------------- | -------------------------------------- |
| **SuperUser** | Create organisations, invite employees |
| **Admin**     | Invite employees                       |
| **Employee**  | Register using invite link             |

---

## 🔐 Authentication

* Pure JWT authentication (no Passport)
* Tokens stored in:

  * HTTP cookies (web)
  * SecureStore (mobile)

---

## 📦 Features

### Admin

* Login / Logout
* Create organisation (SuperUser only)
* Generate invite links
* View invites
* View registered employees

### Employee

* Open invite link
* Register with name & password
* Automatically assigned to organisation

### System

* Tracks:

  * Who invited whom
  * Which organisation they belong to
  * Invite status (pending / accepted)

---

## 🔗 Core API Endpoints

| Method | Route                    | Description              |
| ------ | ------------------------ | ------------------------ |
| POST   | `/auth/register`         | Create SuperUser / Admin |
| POST   | `/auth/login`            | Login                    |
| POST   | `/organisation`          | Create organisation      |
| GET    | `/organisation/me`       | Get current org          |
| POST   | `/invites`               | Generate invite          |
| GET    | `/invites`               | List invites             |
| POST   | `/invites/:token/accept` | Employee signup          |
| GET    | `/users/employees`       | List employees           |

---

## 🖥️ Web Frontend

Built with:

* Next.js (App Router)
* Tailwind CSS
* Shadcn UI
* Formik + Yup

Features:

* Admin dashboard
* Organisation creation
* Invite management
* Employee list
* Secure middleware route guards

---

## 📱 Mobile App

Built with:

* React Native (Expo)
* TypeScript
* SecureStore
* Axios
* React Navigation

Supports:

* Login
* Invite creation
* Organisation creation
* Employee registration

---

## 🧪 Postman

A Postman collection is included for testing all endpoints:

```
employee-invite-system.postman_collection.json
```

---

## 🗃️ Database Models

### User

* name
* email
* password (bcrypt)
* isSuperUser
* isAdminUser
* organisationId
* invitedBy
* timestamps

### Organisation

* name
* createdBy

### Invite

* email
* token
* organisationId
* invitedBy
* used

---

## 🛠️ Setup Instructions

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Set `.env`

```
MONGO_URI=mongodb://localhost/invite-system
JWT_SECRET=supersecret
```

---

### Frontend (Web)

```bash
cd frontend
npm install
npm run dev
```

Set `.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

### Mobile App

```bash
cd mobile
npm install
npx expo start
```

Update:

```ts
baseURL: "http://YOUR_IP:3000/api"
```

---

## 🏆 Why This Project Stands Out

This system demonstrates:

* Clean backend architecture
* Real-world onboarding flow
* Secure JWT authentication
* Token-based registration
* Role-based UI & API
* Web + Mobile support

This is **startup-grade software** — not a demo.

---

## 📌 Author

**Emmanuel Adeyemi**
Full-Stack Engineer
Next.js • NestJS • MongoDB • React Native

---


