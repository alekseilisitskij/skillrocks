function fetchRandomUsers() {
  // Отправляю запрос
  async function getApiUsers() {
    const res = await fetch(`https://randomuser.me/api/?results=10`);
    return await res.json();
  }

  // Фун-я для сокращения элементов
  const el = (tag, props) => {
    const element = document.createElement(tag);

    for (const key in props) {
      if (key === "classList") {
        Array.isArray(props[key])
          ? element.classList.add(...props[key])
          : element.classList.add(props[key]);
        continue;
      }

      if (key.startsWith("data-")) {
        element.setAttribute(key, props[key]);
        continue;
      }

      element[key] = props[key];
    }

    return element;
  };

  function renderList(array, elem) {
    elem.innerHTML = "";
    console.log(array.results);
    array.results.forEach((item) => {
      elem.append(createUser(item));
    });
  }

  const container = document.querySelector(".container");
  // Создаю элементы
  async function createElements() {
    const title = el("h1", {
      classList: "title",
      textContent: "Список пользователей",
    });

    const list = el("ul", {
      classList: "list",
    });

    const error = el("h1", {
      classList: "error",
      textContent: "Не удалось загрузить пользователей",
    });

    const spinner = el("h1", {
      classList: "loader",
    });

    container.append(error, spinner);
    // Обрабочик событий
    try {
      spinner.style.display = "block";
      renderList(await getApiUsers(), list);

      container.append(title, list);
    } catch {
      spinner.style.display = "block";
      error.style.display = "block";
    } finally {
      spinner.style.display = "none";
    }
  }
  // Создание элемента списка
  function createUser({ name, email, picture }) {
    const item = el("li", {
      classList: "item",
    });

    const img = el("img", {
      src: `${picture.thumbnail}`,
      alt: "men",
    });

    const subtitle = el("h2", {
      classList: "subtitle",
      textContent: `${name.first}`,
    });

    const emails = el("div", {
      classList: "email",
      textContent: `${email}`,
    });

    item.append(img, subtitle, emails);

    return item;
  }

  createElements();
}

fetchRandomUsers();
