const arrayList = [
  {
    product: "Молоко",
    done: false,
  },
  {
    product: "Хлеб",
    done: true,
  },
  {
    product: "Пельмени",
    done: false,
  },
];

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

// функция валидация
function inputValidation(input) {
  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains("error")) {
      parent.querySelector(".error-label").remove();
      parent.classList.remove("error");
    }
  }

  function createError(input, text) {
    const parent = input.parentNode;
    parent.classList.add("error");

    const errorLabel = el("label", {
      classList: "error-label",
      textContent: text,
    });

    parent.append(errorLabel);
  }

  let result = true;
  removeError(input);

  if (input.value.trim() == "") {
    input.classList.add("form-red");
    createError(input, "Пусто");
    result = false;
  } else {
    input.classList.remove("form-red");
  }

  return result;
}

// фун-ия для фильтрации
const filterList = (arr, value, prop) => {
  return arr.filter((item) => {
    if (prop == "product") {
      return item[prop].toLowerCase().startsWith(value.toLowerCase());
    }
  });
};

// Фун-я для добавления в массив объекта
const addProductItem = (nameInput) => {
  arrayList.push({
    product: nameInput,
    done: false,
  });

  renderList(arrayList, list);
};
// рендер
function renderList(array, elem) {
  elem.innerHTML = "";

  let copyArray = [...array];
  console.log(copyArray);
  if (inputFilter.value !== "") {
    copyArray = filterList(copyArray, inputFilter.value, "product");
  }
  console.log(copyArray);
  copyArray.forEach((item) => {
    elem.append(product(item));
  });
}

const container = document.querySelector(".container");

const list = el("ul", {
  classList: "list",
});

const inputFilter = el("input", {
  type: "text",
  name: "name",
  classList: ["filter__input_name", "input", "filter__input"],
  placeholder: "По названию",
  "data-filter-product": "product",
});
// Создание элементов
function createElements() {
  const filter = el("div", {
    classList: "filter",
  });

  const filterForm = el("form", {
    classList: "filter__form",
  });

  const block = el("div", {
    classList: "block",
  });

  const blockHead = el("div", {
    classList: "block__head",
  });

  const blockHeadSpan = el("span", {
    classList: "block__head_span",
    textContent: "Список задач",
  });

  renderList(arrayList, list);
  // Инпут фильтраций
  document.body.addEventListener("input", (e) => {
    if (e.target.dataset.filterProduct) {
      renderList(arrayList, list);
    }
  });

  const addList = el("div", {
    classList: "add-list",
  });

  const formAdd = el("form", {
    classList: "add-list__form",
  });

  const inputAdd = el("input", {
    type: "text",
    name: "name",
    classList: ["add-list__input_name", "input", "add-list__input"],
    placeholder: "Задача",
  });

  const btnAdd = el("button", {
    classList: "btn-plus",
    innerHTML: "&#10010",
  });
  // Добаления объекта
  btnAdd.addEventListener("click", (e) => {
    e.preventDefault();

    let validFlag = true;
    if (!inputValidation(inputAdd) == true) {
      validFlag = false;
    }

    if (validFlag === false) {
      return;
    }

    addProductItem(inputAdd.value.trim());

    inputAdd.value = "";
  });

  filterForm.append(inputFilter);
  filter.append(filterForm);

  blockHead.append(blockHeadSpan);
  block.append(blockHead, list);

  formAdd.append(inputAdd, btnAdd);
  addList.append(formAdd);

  container.append(filter, block, addList);
}
// Создания продукта в списке
function product({ product, done }) {
  const item = el("li", {
    classList: "item",
  });

  const span = el("span", {
    classList: "list__name",
    textContent: `${product}`,
    "data-product": `${product}`,
  });

  done
    ? span.classList.add("list__name_active")
    : span.classList.remove("list__name_active");

  const btnGroup = el("div", {
    classList: "block__btn-group",
  });

  const btnDone = el("button", {
    classList: ["btn", "btn-reset", "btn-done"],
    textContent: "Выполнено",
  });

  const btnDel = el("button", {
    classList: ["btn", "btn-reset", "btn-del"],
    textContent: "Удалить",
  });

  btnDone.addEventListener("click", () => {
    arrayList.forEach((item) => {
      if (item.product === span.dataset.product) {
        item.done = !item.done;
      }
      return;
    });
    renderList(arrayList, list);
  });

  btnDel.addEventListener("click", () => {
    const index = arrayList.findIndex(
      (item) => item.product === span.dataset.product
    );
    if (index !== -1) {
      arrayList.splice(index, 1);
    }
    renderList(arrayList, list);
  });

  btnGroup.append(btnDone, btnDel);
  item.append(span, btnGroup);
  return item;
}

createElements();
