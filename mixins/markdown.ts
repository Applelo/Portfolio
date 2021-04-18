import marked from 'marked';

export const prettify = {
  methods: {
    prettify(str: string): string {
      return marked.parseInline(str);
    },
  },
};
