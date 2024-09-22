import { envs } from "./config/plugins/evns.plugin,";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main(): void {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
  });
  server.start();
}
