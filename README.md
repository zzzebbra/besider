# **Тестовое задание на позицию React Developer в компанию Core Line**

### **Введение**

Необходимо реализовать мобильную версию веб-приложения новостного сайта. Макет разрабатываемой страницы нарисован в Figma. Backend часть реализована на стороне REST API New York Times.

### **Материалы**

[https://www.figma.com/file/sc2xxWzzgeeFgW7MgMjpYT/Besider---React-тестовое?type=design&node-id=0-1&mode=design&t=U2Y6w3zdzS5bahWf-0](https://www.figma.com/file/sc2xxWzzgeeFgW7MgMjpYT/Besider---React-тестовое?type=design&node-id=0-1&mode=design&t=U2Y6w3zdzS5bahWf-0)

[developer.nytimes.com](https://developer.nytimes.com/docs/archive-product/1/routes/{year}/{month}.json/get)

[https://developer.nytimes.com/docs/archive-product/1/routes/{year}/{month}.json/get](https://developer.nytimes.com/docs/archive-product/1/routes/{year}/{month}.json/get)

### **Условия выполнения**

Используйте React + Redux

Используйте Typescript

Верстка страницы должна быть рассчитана на мобильные устройства

Пользователь должен иметь возможность листать список новостей до любой доступной даты

Нет ограничений на использование сторонних библиотек

### **Функциональные требования**

В шапке страницы левая кнопка должна открывать меню

Новости расположены по убыванию даты начиная с текущей

Блоки с новостями за различные дни должны быть разделены датами

Синие круги внизу макета - иконка загрузка

Раз в 30 секунд должна происходить подгрузка только что вышедших новостей (которые еще не показаны в списке)

При клике на новость, пользователя должно переводить на сайт New York Times

### **Backend**

Api-ключ: randomkey (Или можете создать свой в личном кабинете)

Необходимый метод: https://api.nytimes.com/svc/archive/v1/{year}/{month}.json

Заголовок статьи: abstract

Ссылка на статью: web_url

Фото: multimedia

Дата публикации: pub_date

Источник: source
