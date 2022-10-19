import { join } from 'path';
import { ViteAdapter } from './vite.adapter';
import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginOptions } from 'fastify';

interface PluginOptions extends FastifyPluginOptions {
  templates: string;
}

export default fastifyPlugin(
  async (instance, { templates }: PluginOptions, done) => {
    const vite = await ViteAdapter.initiate();
    instance.use(vite.getMiddlewares());
    instance.decorateReply(
      'view',
      async function (template: string, data: any) {
        this.header('Content-Type', 'text/html').send(
          await vite.compile(join(templates, `${template}.tsx`), data),
        );
      },
    );
    done();
  },
);
