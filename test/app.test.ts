import { AnyTypeAnnotation } from "./../node_modules/@babel/types/lib/index-legacy.d";
import { Router } from "express";
import { envs } from "../src/config/plugins/evns.plugin,";
import { Server } from "../src/presentation/server";

jest.mock("../src/presentation/server");

describe("Should call server with arguments ans start", () => {
  test("", async () => {
    await import("../src/app");
    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      publicPath: envs.PUBLIC_PATH,
      routes: expect.any(Function),
    });

    expect(Server.prototype.start).toHaveBeenCalledWith();
  });
});
