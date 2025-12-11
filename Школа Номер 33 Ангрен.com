<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Школа №33 — Ангрен</title>

    <style>
        /* ===== ОСНОВНОЙ ФОН И АНИМАЦИЯ ===== */
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(120deg, #ff7eb3, #65d6ff, #8fff85);
            background-size: 300% 300%;
            animation: bgMove 12s infinite alternate;
            color: #222;
        }

        @keyframes bgMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        header {
            padding: 60px 25px;
            background: rgba(255,255,255,0.25);
            backdrop-filter: blur(10px);
            text-align: center;
            color: #fff;
            animation: fadeDown 1.3s ease;
        }

        @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-30px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        h1 { font-size: 50px; margin: 0; }
        header p { margin-top: 10px; font-size: 22px; }

        nav {
            text-align: center;
            padding: 15px;
            background: rgba(255,255,255,0.35);
            backdrop-filter: blur(8px);
            position: sticky;
            top: 0;
        }

        nav a {
            margin: 0 15px;
            font-weight: bold;
            text-decoration: none;
            color: #fff;
            font-size: 18px;
            transition: 0.3s;
        }

        nav a:hover {
            color: yellow;
            transform: scale(1.1);
        }

        section {
            padding: 50px 20px;
            max-width: 900px;
            margin: auto;
            animation: fadeIn 1.5s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        h2 {
            font-size: 36px;
            margin-bottom: 20px;
            color: #fff;
            text-shadow: 0 0 10px rgba(0,0,0,0.4);
        }

        /* ===== КАРТОЧКИ ===== */
        .card {
            background: rgba(255,255,255,0.75);
            padding: 20px;
            margin: 15px 0;
            border-radius: 15px;
            animation: cardPop 0.8s ease;
            transition: 0.4s;
        }

        @keyframes cardPop {
            from { opacity: 0; transform: scale(0.8); }
            to   { opacity: 1; transform: scale(1); }
        }

        .card:hover {
            transform: scale(1.03);
            background: rgba(255,255,255,0.9);
            box-shadow: 0 0 20px rgba(0,0,0,0.2);
        }

        .btn {
            display: inline-block;
            margin-top: 15px;
            padding: 12px 25px;
            border-radius: 12px;
            background: linear-gradient(45deg, #ff6a6a, #ffd56a, #6aff7f);
            background-size: 250% 250%;
            animation: btnMove 4s infinite alternate;
            color: #222;
            font-weight: bold;
            text-decoration: none;
            transition: 0.3s;
        }

        @keyframes btnMove {
            0%   { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }

        .btn:hover { transform: scale(1.1); }

        footer {
            text-align: center;
            padding: 25px;
            color: white;
            background: rgba(0,0,0,0.4);
            margin-top: 40px;
            font-size: 16px;
        }
    </style>
</head>
<body>

<header>
    <h1>Школа №33 — Ангрен</h1>
    <p>Красочный анимированный сайт</p>
</header>

<nav>
    <a href="#about">О школе</a>
    <a href="#news">Новости</a>
    <a href="#teachers">Учителя</a>
    <a href="#map">Карта</a>
    <a href="#contact">Контакты</a>
</nav>

<!-- О ШКОЛЕ -->
<section id="about">
    <h2>О школе</h2>

    <!-- Фото школы -->
    <img src="https://i.ytimg.com/vi/_0LRm4nUtoE/hq720.jpg" 
         alt="Школа №33 Ангрен"
         style="width:100%; border-radius:15px; margin-bottom:25px; box-shadow:0 0 20px rgba(0,0,0,0.3);">

    <div class="card">
        <p>
            Школа №33 города Ангрен — современное образовательное заведение,
            обеспечивающее качественное обучение и развитие каждого ученика.
        </p>
        <p>
            В школе работают профессиональные учителя, проводятся мероприятия,
            олимпиады, кружки и секции.
        </p>
    </div>
</section>

<!-- НОВОСТИ -->
<section id="news">
    <h2>Новости</h2>

    <div class="card">
        <h3>📢 Новое расписание</h3>
        <p>Добавлено новое расписание уроков.</p>
    </div>

    <div class="card">
        <h3>🏆 Олимпиады</h3>
        <p>Ученики заняли призовые места на городских соревнованиях.</p>
    </div>

    <div class="card">
        <h3>🎉 Мероприятия</h3>
        <p>Проведён праздничный концерт "Осенний Бал".</p>
    </div>
</section>

<!-- УЧИТЕЛЯ -->
<section id="teachers">
    <h2>Учителя</h2>
    <div class="card">
        <p><b>Математика:</b> опытные преподаватели.</p>
        <p><b>Русский язык:</b> сильная предметная база.</p>
        <p><b>Английский язык:</b> современные методики обучения.</p>
        <p><b>Информатика:</b> программирование, робототехника.</p>
    </div>
</section>

<!-- КАРТА -->
<section id="map">
    <h2>Карта</h2>

    <div class="card" style="padding:0; overflow:hidden;">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.8919705078034!2d70.139!3d41.003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b208d7c8d6c7b7%3A0x70f6cc5e6e0d6d6f!2s33-maktab%20Angren!5e0!3m2!1sru!2suz!4v1700000000000"
            width="100%" 
            height="350" 
            style="border:0;"
            allowfullscreen=""
            loading="lazy">
        </iframe>
    </div>
</section>
<section id="success-video">
    <h2>Видео о успехах школы</h2>
    <div class="card" style="padding:0; overflow:hidden;">
        <iframe 
            width="100%" 
            height="350" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Видео о успехах школы №33" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    </div>
</section>

<!-- КОНТАКТЫ -->
<section id="contact">
    <h2>Контакты</h2>
    <div class="card">
        <p><b>Адрес:</b> Ангрен, Школа №33</p>
        <p><b>Телефон:</b> +998 (XX) XXX-XX-XX</p>
        <p><b>Email:</b> school33@uz</p>
        <a class="btn" href="#">Написать администрации</a>
    </div>
</section>

<footer>
    © 2025 Школа №33, Ангрен. Все права защищены.
</footer>
 
    
  </iframe>  <footer>
 <p>Администратор сайта: <b>Фирдавс Исамитдинов Фазлиддинович</b></p>
    <p>Контакты: <a href="https://www.tiktok.com/@imper_autor" target="_blank">
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/TikTok_logo.svg" class="tiktok-icon" alt="TikTok">imper_autor (TikTok)</a></p>
  </footer>
</div>
</body>
</html>
    <p>Контакты: <a href="https://www.tiktok.com/@imper_autor" target="_blank">
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/TikTok_logo.svg" class="tiktok-icon" alt="TikTok">imper_autor (TikTok)</a></p>
  </footer>
</div>
</body>
