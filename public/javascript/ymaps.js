ymaps.ready(init);

function init() {
  let myPlacemark,
    myMap = new ymaps.Map("map", {
      center: centerCoords,
      zoom: initialZoom,
    });
  if (ableToCreatePlacemark) {
    // Слушаем клик на карте.
    myMap.events.add("click", function (e) {
      let coords = e.get("coords");
      document.getElementById("map-latitude").value = coords[0];
      document.getElementById("map-longitude").value = coords[1];
      // Если метка уже создана – просто передвигаем ее.
      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
      }
      // Если нет – создаем.
      else {
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark.events.add("dragend", function () {
          getAddress(myPlacemark.geometry.getCoordinates());
        });
      }
      getAddress(coords);
    });
  } else {
    myMap.geoObjects.add(new ymaps.Placemark(centerCoords));
  }

  // Создание метки.
  function createPlacemark(coords) {
    return new ymaps.Placemark(
      coords,
      {
        iconCaption: "поиск...",
      },
      {
        preset: "islands#violetDotIconWithCaption",
        draggable: true,
      }
    );
  }

  // Определяем адрес по координатам (обратное геокодирование).
  function getAddress(coords) {
    myPlacemark.properties.set("iconCaption", "поиск...");
    ymaps.geocode(coords).then(function (res) {
      let firstGeoObject = res.geoObjects.get(0);

      myPlacemark.properties.set({
        // Формируем строку с данными об объекте.
        iconCaption: [
          // Название населенного пункта или вышестоящее административно-территориальное образование.
          firstGeoObject.getLocalities().length
            ? firstGeoObject.getLocalities()
            : firstGeoObject.getAdministrativeAreas(),
          // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
          firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
        ]
          .filter(Boolean)
          .join(", "),
        // В качестве контента балуна задаем строку с адресом объекта.
        balloonContent: firstGeoObject.getAddressLine(),
      });
      document.getElementById("add_adv_address").value =
        myPlacemark.properties._data.balloonContent;
    });
  }
}
