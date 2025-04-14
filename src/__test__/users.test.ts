import supertest from "supertest";
import { app } from "../app";
import { User } from "../models/user-model";

describe("POST /api/v1/users", () => {
  it("throws error if user data is not provided", async () => {
    const response = await supertest(app).post("/api/v1/users").send({});

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "firstName, lastName and email are required"
    );
  });

  it("returns 201 if user data is provided", async () => {
    const response = await supertest(app).post("/api/v1/users").send({
      firstName: "John",
      lastName: "Doe",
      email: "etosin70@gmail.com",
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data).toHaveProperty("firstName");
  });
});

describe("GET /api/v1/users", () => {
  it("return 200 for GET /api/v1/users", async () => {
    const response = await supertest(app).get("/api/v1/users").send();
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.data).toBeDefined();
  });
});

describe("GET /api/v1/users/:id", () => {
  it("returns 404 status and error object if user does not exist", async () => {
    const response = await supertest(app)
      .get("/api/v1/users/123456789012345678901234")
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toBeDefined();
    expect(response.body.error).toBe("User not found");
  });

  it("returns 200 status code and user data if user exists", async () => {
    const user = await User.create({
      firstName: "Jonh",
      lastName: "Doe",
      email: "etosin70@gmail.com",
    });

    const response = await supertest(app).get(`/api/v1/users/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.data._id).toBe(user._id.toString());
    expect(response.body.data.firstName).toBe(user.firstName);
  });
});

describe("PUT /api/v1/users/:id", () => {
  it("returns 400 status and error object if invalid ObjectId is provided", async () => {
    const response = await supertest(app).put("/api/v1/users/wwklslgksg").send({
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@gmail.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.error).toBe("Invalid user id");
  });

  it("returns 404 status and error object if user does not exist", async () => {
    const response = await supertest(app)
      .put("/api/v1/users/123456789012345678901234")
      .send({
        firstName: "Jane",
        lastName: "Doe",
        email: "etosin70@gmail.com",
      });

    expect(response.status).toBe(404);
    expect(response.body).toBeDefined();
    expect(response.body.error).toBe("user with id does not exist");
  });

  it("reurns 400 status and error object if update data is not provided", async () => {
    const newUser = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
    });

    const response = await supertest(app)
      .put(`/api/v1/users/${newUser._id.toString()}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.error).toBe(
      "firstName, lastName and email are required"
    );
  });

  it("returns 200 status and user data if user is updated successfully", async () => {
    const newUser = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
    });

    const response = await supertest(app)
      .put(`/api/v1/users/${newUser._id.toString()}`)
      .send({
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@gmail.com",
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.data.firstName).toBe("Jane");
    expect(response.body.data.lastName).toBe("Doe");
    expect(response.body.data._id.toString()).toBe(newUser._id.toString());
  });
});

describe("DELETE /api/v1/users/:id", () => {
  it("returns 400 status and error object if invalid ObjectId is provided", async () => {
    const response = await supertest(app)
      .delete("/api/v1/users/wwklslgksg")
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.error).toBe("Invalid user id");
  });

  it("returns 404 status and error object if user does not exist", async () => {
    const user1 = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
    });

    const response = await supertest(app)
      .delete(`/api/v1/users/${user1._id.toString()}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBe("User deleted successfully");
  });
});
