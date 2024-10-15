import { AppRoutes } from "../../src/presentation/routes";

describe("presentation/routes.ts", () => {
  it("should contain the '/api/v1/todos' route", () => {
    const router = AppRoutes.routes;

    /* 
      Para poder comporbar si el endpoint esta asignado correctamente
      tendremos que utilizar regex ya que las rutas se estan manejando
      mediante un sub-router y casa ruta se asigna en un regexp
      ? Esto suele suceder cuando usas router.use() para incluir otro enrutador
      ? ¡Para poder ver esto usar un clg(router.stack)!
    */

    // Obtener las expresiones regulares de las rutas en el stack
    const routesRegexps = router.stack.map((layer: any) => layer.regexp);

    console.log(router.stack);

    // Verifica si la expresión regular para "/api/v1/todos" está en el stack
    const todosRouteRegexp = /^\/api\/v1\/todos\/?(?=\/|$)/i;
    const routeExists = routesRegexps.some(
      (regexp: RegExp) => regexp.source === todosRouteRegexp.source
    );


    expect(routeExists).toBe(true);
  });
});
