Cypress.Commands.add("createUser", ({ username, name, password }) => {
  cy.request("POST", "http://localhost:3001/api/users", {
    username,
    name,
    password,
  });
});
Cypress.Commands.add("login", (username, password) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("currentUser", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});
Cypress.Commands.add("createBlog", (params) => {
  cy.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: { ...params },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("currentUser")).token
      }`,
    },
  });

  cy.visit("http://localhost:3000");
});
Cypress.Commands.add("reloginUi", function ({ username, password }) {
  cy.contains("logout").click();
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.contains("Login").click();
});
