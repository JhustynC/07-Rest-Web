import { Server } from "../src/presentation/server";
import { envs } from "../src/config/plugins/evns.plugin,";
import { AppRoutes } from "../src/presentation/routes";

export const testServer = new Server({
  port: envs.PORT,
  routes: AppRoutes.routes,
  publicPath: envs.PUBLIC_PATH,
});
