# Beadwork Pattern Generator – Web Application

This is a Laravel-based web application integrated with React, Inertia.js, Vite, and Backpack. It allows users to create, share, and explore beadwork patterns. The project follows a modern full-stack architecture.

## 📋 Requirements

Before setting up the project, make sure your system meets the following requirements:

### Backend
- PHP >= 8.1
- Composer >= 2.0
- MySQL or compatible database
- Node.js >= 18.x
- NPM >= 9.x or Yarn
- Git

### Frontend
- Modern browser support (Chrome, Firefox, Safari, Edge)
- Vite + React + TailwindCSS stack

---

## 🚀 Installation & Setup

Follow these steps to set up the development environment:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/beadwork-pattern-app.git
cd beadwork-pattern-app
```
2. Install PHP dependencies using Composer
```bash
  composer install
```

3. Install Node.js dependencies
```bash 
   npm install
```
   
4. Copy the example environment file and configure it
```bash
   cp .env.example .env
```

   Update your .env file with the correct database credentials and application URL.
5. Generate application key
```bash
   php artisan key:generate
```
6. Create symbolic link for storage 
```bash
   php artisan storage:link
```

7. Run database migrations and seeders 
```bash
   php artisan migrate --seed
```
8. Build frontend assets
```bash
   npm run build
```
   or for development:
```bash
   npm run dev
```
9. Start Laravel development server 

```bash
   php artisan serve
```   
   Visit http://localhost:8000 to access the application.

## 🔒 Security Considerations
The app uses Laravel Sanctum for authentication.

- OAuth integration via Laravel Socialite.

- Permissions and roles are managed by spatie/laravel-permission.

- Always configure HTTPS in production.

- Ensure database backups and security patches are regularly applied.

## 📦 Built With
- [Laravel 10](https://laravel.com/docs/10.x)

- [React 19](https://react.dev/blog/2024/12/05/react-19)

- [Vite](https://vite.dev/)

- [Inertia.js](https://inertiajs.com/)

- [TailwindCSS](https://tailwindcss.com/)

- [Backpack for Laravel](https://backpackforlaravel.com/)

## 🧰 Useful Commands


| Command                            | Description                           |
| ---------------------------------- | ------------------------------------- |
| `php artisan serve`                | Run Laravel development server        |
| `npm run dev`                      | Start Vite in development mode        |
| `npm run build`                    | Build frontend for production         |
| `php artisan migrate:fresh --seed` | Rebuild and reseed database           |
| `php artisan storage:link`         | Create symbolic link for file uploads |
| `php artisan config:cache`         | Cache the configuration               |

## 👤 Author

Prepared by Anna Borysenko

Kharkiv National University of Radioelectronics (KhNURE)

Date: 20.02.2025

