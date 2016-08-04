# [lifehacker](http://www.akado.ru/) 

85 requests  
2.7 MB transferred  
DomContentLoaded: 2.53  
Load: 3.72  

1. Включить gzip (сразу станет лучше) сжимается здесь тока html страница – ожидание загрузки

2. Картинки
  Размер: 1.3  
  Запросов: 47  

 * Использовать векторную графику вместо png для каждой иконки, либо объединить в один битмап и управлять переключением в css – количество запросов

3. JS

  Размер: 997 KB  
  Запросов: 20

  * Объединить – количество запросов
  * Минифицировать - ожидание загрузки
  * Я бы вынес инлайн скрипты в файл - количество запросов
  * Перенести вниз - рендеринг
  * Использовать async - рендеринг

4. CSS

  Размер: 265  
  Запросов: 8
  * Объединить - количество запросов
  * Минифицировать - ожидание загрузки
  * Удалить лишние правила (1125 rules (72%) of CSS not used by the current page) – декодирование, ожидание загрузки

5.	HTML 

  * Минифицировать - ожидание загрузки

6.	Битые ссылки

  * Удалить - количество запросов
  
  - http://www.akado.ru/js/adfox/adfox.asyn.code.ver3.js 
  - http://www.akado.ru/js/adfox/adfox.asyn.code.scroll.js 
  - http://www.akado.ru/js/adfox/adfox.asyn.code.ver3.js 
  - http://www.akado.ru/js/adfox/adfox.asyn.code.scroll.js 
  - http://www.googletagmanager.com/gtm.js?id=GTM-W8D9KM
  
7. Оптимизировать выполнения скриптов и рендеринг
    ![Скриншот 1](./img/img5.png)  
