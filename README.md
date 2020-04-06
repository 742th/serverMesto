**Mesto backend**<br>
## Учебный проект [Yandex.Praktikum](https://praktikum.yandex.ru/)
## Сделал: Степанов Александр web-dev

Чеклист: 

:white_check_mark: в проекте есть package.json;<br>
:white_check_mark: в проекте есть .editorconfig;<br>
:white_check_mark: в проекте есть .eslintrc, расширяющий конфигурацию airbnb-base, а также необходимые для работы линтера dev-зависимости;<br>
:white_check_mark: в проекте есть .gitignore;<br>
:white_check_mark: команда npm run start запускает сервер на localhost:3000;<br>
:white_check_mark: команда npm run dev запускает сервер на localhost:3000 с хот релоудом;<br>
:white_check_mark: адрес localhost:3000 загружает фронтенд проекта Mesto;<br>
:white_check_mark: в ответ на запрос GET localhost:3000/users сервер вернёт JSON-объект из файла users.json;<br>
:white_check_mark: в ответ на запрос GET localhost:3000/cards сервер вернёт JSON-объект из файла cards.json;<br>
:white_check_mark: в ответ на запрос GET localhost:3000/users/8340d0ec33270a25f2413b69, сервер вернёт JSON-объект пользователя с переданным после /users идентификатором;<br>
если пользователя с запрошенным идентификатором нет, API должен возвращать 404 статус ответа и JSON: <{ "message": "Нет пользователя с таким id" }>;<br>
:white_check_mark: при запросе на несуществующий адрес, API должен возвращать 404 статус ответа и JSON: <{ "message": "Запрашиваемый ресурс не найден" }>.<br>
