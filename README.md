Bender server
===================

## [main address](http://77.244.216.138:3000/)

# API:
> **GET /get-rooms/** - возвращает данные о загруженности по этажам</br>
> **?** floor : 1 | 2 | 3</br>

> **GET /get-route/** - возвращает маршрут от from до to</br>
> **?** from: string & to: string</br>
> Номера комнат и специальных точек отмечены на карте ниже</br>

> **GET /get-buildings/** - возвращает данные о занятости по зданиям</br>

![Floor1](./static/img/floor1.png)
![Floor2](./static/img/floor2.png)
![Floor3](./static/img/floor3.png)