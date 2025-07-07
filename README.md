<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1969px-Laravel.svg.png" width="80" alt="Laravel Logo"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" width="80" alt="React Logo"/>
</p>

<h1 align="center">Wifi Jenangan</h1>

<p align="center">
  Layanan internet RT/RW Net dengan Laravel + React untuk manajemen billing dan monitoring pelanggan, serta menjadi media belajar kami dalam mengelola sistem RT/RW Net secara profesional.
</p>

<p align="center">
  <a href="https://github.com/Galihuyyy">
    <img src="https://img.shields.io/badge/@Galihuyyy-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  <a href="https://github.com/AIDILYOWIE">
    <img src="https://img.shields.io/badge/@AIDILYOWIE-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

---

## 🚀 About Wifi Jenangan

Wifi Jenangan adalah layanan internet RT/RW Net yang dikelola mandiri untuk membantu warga Jenangan mendapatkan akses internet stabil dan terjangkau. Project ini juga menjadi media belajar kami dalam mengelola sistem billing, monitoring pelanggan, dan pengelolaan jaringan secara profesional.

---

## 🛠️ Tech Stack

- **Laravel** (Backend API)
- **React** (Frontend SPA)
- **MySQL** (Database)
- **Apache** (Web Server)
- **Node.js** (Frontend tooling)

---

## ⚙️ System Requirements

- **MySQL:** 8.0.30
- [**Apache:** 2.4.63 (Win64)](https://httpd.apache.org/download.cgi#apache24)
- [**PHP:** 8.4.7](https://windows.php.net/download/)
- [**Node.js:** v22.15.0](https://nodejs.org/en/download)
- [**phpMyAdmin:** 6.0.0-dev](https://files.phpmyadmin.net/snapshots/phpMyAdmin-6.0+snapshot-all-languages.zip)
- **Laragon:** Laragon Full 6.0 220916

---

## 📝 Installation & Usage

1. Clone this project \
```git clone https://github.com/AIDILYOWIE/wifi-jenangan.git```

2. Install Composer \
```composer install```

3. Add .env \
```cp .env.example .env```

4. Build docker container
```docker compose up --build```

5. Migrate the seed
```php artisan migrate --seed```

3. go to the backend directory and turn on the server, **at this stage make sure laragon is active and the recruitment system is correct and don't forget to setting .env file** \
`cd backend` \
`php artisan ser`

4. then, create new cmd or terminal, and go to frontend directory and turn on the server to access this web page \
`cd frontend`\
`npm run dev` 

5. Congrats!! you success use this project. Enjoy 