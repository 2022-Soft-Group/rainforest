import Markdown from 'vue3-markdown-it';
import type { App } from 'vue';

export function setUpMarkdown(app: App) {
  app.use(Markdown);
}
