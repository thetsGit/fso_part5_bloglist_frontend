describe("blog app testing", function () {
  beforeEach(function () {
    cy.request("GET", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:3000/");
  });
  it("login form is shown first", function () {
    cy.get(".loginForm").contains("Login");
  });
  describe("login", function () {
    beforeEach(function () {
      cy.createUser({ username: "root", name: "groot", password: "hello123" });
      cy.createUser({
        username: "big root",
        name: "big groot",
        password: "hello123",
      });
    });
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("hello123");
      cy.contains("Login").click();
      cy.get("#alertBox")
        .should("contain", "root has successfully logged in")
        .and("have.css", "color", "rgb(33, 230, 193)");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrongUser");
      cy.get("#password").type("hello123");
      cy.contains("Login").click();
      cy.get("#alertBox")
        .should("contain", "invalid username and/or password")
        .and("have.css", "color", "rgb(255, 71, 119)");
    });
    describe("when logged in", function () {
      beforeEach(function () {
        cy.login("root", "hello123");
      });
      it("a blog can be created", function () {
        cy.contains("create form").click();
        cy.get("#title").type("title");
        cy.get("#author").type("author");
        cy.get("#url").type("http://www.domain.tld");
        cy.get("#createBtn").click();
        cy.contains("title");
      });
      describe("after creating blog", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "title",
            author: "author",
            url: "http://www.domain.tld",
          });
        });
        it.only("user can like a blog", function () {
          cy.contains("view").click();
          cy.contains("like").click();
          cy.contains("Likes:1");
        });
        describe("delete authorization check", function () {
          it("user can delete his own blog", function () {
            cy.contains("view").click();
            cy.contains("remove").click();
            cy.contains("title").should("not.exist");
            cy.get("#alertBox").should(
              "have.css",
              "color",
              "rgb(255, 71, 119)"
            );
            cy.contains("A blog is deleted");
          });
          it("user cannot delete others blogs", function () {
            cy.reloginUi({ username: "big root", password: "hello123" });
            cy.contains("title").parent().contains("view").click();
            cy.contains("remove").should("not.exist");
          });
          it("blogs are sorted according to likes", function () {
            cy.createBlog({
              title: "title2",
              author: "author1",
              url: "http://www.domain2.tld",
              likes: 4,
            });
            cy.createBlog({
              title: "title3",
              author: "author2",
              url: "http://www.domain3.tld",
              likes: 3,
            });
            cy.get(".viewBtn").each((el) => {
              el.click();
            });
            const getLike = (text) => {
              return Number(text.slice(6).slice(0, -4));
            };
            cy.get(".blogLike:first")
              .invoke("text")
              .then((text1) => {
                cy.get(".blogLike:nth(1)")
                  .invoke("text")
                  .then((text2) => {
                    cy.get(".blogLike:nth(2)")
                      .invoke("text")
                      .then((text3) => {
                        expect(getLike(text1)).to.be.greaterThan(
                          getLike(text2)
                        );
                        expect(getLike(text2)).to.be.greaterThan(
                          getLike(text3)
                        );
                      });
                  });
              });
          });
        });
      });
    });
  });
});
