import { server } from './vite.config';
import { createServer, ViteDevServer as ViteServer } from 'vite';
import { generateHydrationScript, renderToString } from 'solid-js/web';

import * as fs from 'fs';
import * as path from 'path';
import * as compile from 'string-template/compile';

export class ViteAdapter {
  private constructor(private readonly vite: ViteServer) {}

  private static _singleton: ViteAdapter;

  static async initiate(): Promise<ViteAdapter> {
    if (!ViteAdapter._singleton)
      ViteAdapter._singleton = new this(await createServer(server));
    return ViteAdapter._singleton;
  }

  private template: (...args) => string = compile(
    fs.readFileSync(
      path.resolve('./src/starter/server-side-rendering/index.html'),
      'utf-8',
    ),
    true,
  );

  async compile(file: string, data: any): Promise<string> {
    try {
      const template = await this.vite.ssrLoadModule(path.resolve(file));
      const component = template[Object.keys(template).shift()];
      return await this.vite.transformIndexHtml(
        '/',
        this.template({
          title: 'App',
          head: generateHydrationScript(),
          body: renderToString(() => component({ ...data })),
        }),
      );
    } catch (e) {
      await this.vite.ssrFixStacktrace(e);
      console.log(e);
    }
  }

  getMiddlewares() {
    return this.vite.middlewares;
  }
}
