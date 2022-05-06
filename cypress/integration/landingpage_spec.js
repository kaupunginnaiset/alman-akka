describe("the landing page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("displays a list of events", () => {
    cy.contains("Tapahtumat");
    cy.get("div").get("[data-cy='event-card']").its("length").should("be.gt", 0);
  });
});
