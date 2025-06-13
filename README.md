# CRUD with UI

## Опис

Це вебзастосунок, що дозволяє створювати, переглядати, редагувати та видаляти записи (CRUD). Інтерфейс користувача реалізовано за допомогою React, серверна частина — на FastAPI, база даних — MongoDB. Увесь проєкт запускається за допомогою Docker.

## Вимоги

- Встановлений [Docker](https://www.docker.com/)
- Бажано також встановити [Docker Compose](https://docs.docker.com/compose/) (зазвичай постачається разом із Docker Desktop)

## Інструкція з запуску

1. Відкрийте термінал і перейдіть у кореневу директорію проєкту:

```bash
cd crud_with_ui
```

2. Запустіть додаток за допомогою Docker:

```bash
docker-compose up --build
```

3. Дочекайтесь, поки всі сервіси будуть запущені.

4. Відкрийте браузер і перейдіть за адресою:

[http://localhost:8080/](http://localhost:8080/)

## Структура проєкту

```
crud_with_ui/
├── client/          # Фронтенд на React
├── server/          # Бекенд на FastAPI та MongoDB
├── docker-compose.yml
└── README.md
```

