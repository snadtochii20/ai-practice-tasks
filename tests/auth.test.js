const request = require("supertest");
const app = require("../src/app");

describe("Authentication and authorization", () => {
  test("POST /login повертає JWT для admin", async () => {
    const response = await request(app).post("/login").send({
      email: "admin@test.com",
      password: "admin123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.role).toBe("admin");
  });

  test("GET /admin повертає 401 без токена", async () => {
    const response = await request(app).get("/admin");

    expect(response.statusCode).toBe(401);
  });

  test("GET /admin дозволяє доступ admin користувачу", async () => {
    const loginResponse = await request(app).post("/login").send({
      email: "admin@test.com",
      password: "admin123",
    });

    const token = loginResponse.body.accessToken;

    const response = await request(app)
      .get("/admin")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  test("GET /admin повертає 403 для user ролі", async () => {
    const loginResponse = await request(app).post("/login").send({
      email: "user@test.com",
      password: "user123",
    });

    const token = loginResponse.body.accessToken;

    const response = await request(app)
      .get("/admin")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(403);
  });
});