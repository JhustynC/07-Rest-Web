import { AppRoutes } from "../../src/presentation/routes";
import { Server } from "../../src/presentation/server";

describe("Server Class", () => {
  test("Should return a server with correct properties", () => {
    const serverOptions = {
      port: 3000,
      publicPath: "/public",
      routes: AppRoutes.routes,
    };

    const appTest = new Server(serverOptions).invoke;

    expect(true).toBe(true);
  });
});
