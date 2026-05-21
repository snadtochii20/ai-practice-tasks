# Практична робота з Node.js

## Тема
Docker, контейнеризація, JWT, RBAC, тестування Jest, AI code review та рефакторинг.

## Опис
У роботі реалізовано простий Node.js/Express застосунок.  
Застосунок містить авторизацію через JWT, перевірку ролей користувача, захищений маршрут для адміністратора, unit-тести та Docker-інфраструктуру.

## Реалізовані завдання

### Завдання 1. Docker
Створено:
- Dockerfile з multi-stage build;
- docker-compose.yml для запуску застосунку разом із PostgreSQL;
- .dockerignore.

### Завдання 2. JWT + RBAC
Реалізовано:
- POST /login;
- middleware authenticate;
- middleware authorize(role);
- захищений маршрут GET /admin.

Тестові користувачі:

Admin:
```text
email: admin@test.com
password: admin123