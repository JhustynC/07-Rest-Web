import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly router: Router;

  constructor(options: Options) {
    const { port, publicPath, routes: router } = options;
    this.port = port;
    this.publicPath = publicPath || "public";
    this.router = router;
  }

  async start() {
    //* Middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //* CORS

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //*Routes
    this.app.use(this.router);

    //* Serve Index.html for all routes
    //*Help the SPA routers
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
      return;
    });

    this.app.listen(this.port, () => {
      console.log(`Server is running on port http://localhost:${this.port}`);
    });
  }
}
