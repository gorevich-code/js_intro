const responseTable = document.getElementById("response");

const clearResponseTable = () => {
  while (responseTable.firstChild) {
    responseTable.removeChild(responseTable.firstChild);
  }
};

document.getElementById("create-user-form").addEventListener("submit", (event) => {
  clearResponseTable();
  event.preventDefault();

  let formData = new FormData(event.target);
  parsedFormData = {};

  formData.forEach((value, key) => {
    parsedFormData[key] = value;
  });

  let { name, email, age } = parsedFormData;

  fetch("/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      age: age,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} `);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let newElement = document.createElement("p");
      newElement.innerHTML = `<p>${data}</p>`;
      responseTable.appendChild(newElement);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      let newElement = document.createElement("p");
      newElement.innerHTML = `<p>${error}</p>`;
      newElement.style.color = "red";
      responseTable.appendChild(newElement);
    });
});

document.getElementById("get-all-usrs-form").addEventListener("submit", (event) => {
  clearResponseTable();
  event.preventDefault();

  fetch("/users/", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} `);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.length === 0) {
        let newElement = document.createElement("p");
        newElement.innerHTML = `<p>No users found.</p>`;
        responseTable.appendChild(newElement);
        return;
      }
      data.forEach((user) => {
        let newElement = document.createElement("p");
        newElement.innerHTML = `<p>${JSON.stringify(user)}</p>`;
        responseTable.appendChild(newElement);
      });
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      let newElement = document.createElement("p");
      newElement.innerHTML = `<p>${error}</p>`;
      newElement.style.color = "red";
      responseTable.appendChild(newElement);
    });
});

document.getElementById("get-usr-by-id-form").addEventListener("submit", (event) => {
  clearResponseTable();
  event.preventDefault();

  let id = new FormData(event.target).get("id");

  fetch(`/users/${id}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} `);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let newElement = document.createElement("p");

      if (!id) {
        newElement.innerHTML = `<p>No ID provided.</p>`;
        newElement.style.color = "red";
      } else {
        newElement.innerHTML = `<p>${JSON.stringify(data)}</p>`;
      }

      responseTable.appendChild(newElement);
      return;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      let newElement = document.createElement("p");
      newElement.innerHTML = `<p>No users found by ID ${id}</p>`;
      newElement.style.color = "red";
      responseTable.appendChild(newElement);
    });
});

document.getElementById("update-usr-by-id-form").addEventListener("submit", (event) => {
  clearResponseTable();
  event.preventDefault();

  let formData = new FormData(event.target);
  parsedFormData = {};

  formData.forEach((value, key) => {
    parsedFormData[key] = value || "";
  });

  let { id, name, email, age } = parsedFormData;
  console.log(parsedFormData);

  fetch(`/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      age: age,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} `);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let newElement = document.createElement("p");
      newElement.innerHTML = `<p>${data}</p>`;
      responseTable.appendChild(newElement);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      let newElement = document.createElement("p");
      newElement.innerHTML = `<p>${error}</p>`;
      newElement.style.color = "red";
      responseTable.appendChild(newElement);
    });
});

document.getElementById("dlt-usr-by-id-form").addEventListener("submit", (event) => {
  clearResponseTable();
  event.preventDefault();

  let id = new FormData(event.target).get("id");

  fetch(`/users/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} `);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let newElement = document.createElement("p");

      if (!id) {
        newElement.innerHTML = `<p>No ID provided.</p>`;
        newElement.style.color = "red";
      } else {
        newElement.innerHTML = `<p>DELETED ${JSON.stringify(data)}</p>`;
      }

      responseTable.appendChild(newElement);
      return;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      let newElement = document.createElement("p");
      newElement.innerHTML = `<p>No users found by ID ${id}</p>`;
      newElement.style.color = "red";
      responseTable.appendChild(newElement);
    });
});
