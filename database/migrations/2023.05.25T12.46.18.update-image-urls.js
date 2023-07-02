const REPLACE_REGEX =
  /https:\/\/((prod-blog-content|test-blog-content)\.s3(\.eu-central-1)?\.amazonaws\.com)(\/(blog|test))?/g;

const ARTICLE_LIMIT = 10;

module.exports = {
  async up(knex) {
    const files = await knex.select("id", "formats", "url").from("files");
    await Promise.all(
      files.map((file) => {
        const updateOptions = {
          url: file.url.replace(REPLACE_REGEX, process.env.AWS_IMG_URL),
        };
        if (file.formats) {
          updateOptions.formats = file.formats;
          Object.keys(file.formats)?.forEach((key) => {
            if (updateOptions.formats[key]?.url) {
              updateOptions.formats[key].url = updateOptions.formats[
                key
              ].url.replace(REPLACE_REGEX, process.env.AWS_IMG_URL);
            }
          });
        }

        return knex.from("files").update(updateOptions).where({ id: file.id });
      })
    );

    let offset = 0;
    let articles;
    do {
      articles = await knex
        .select("id", "content")
        .from("articles")
        .limit(ARTICLE_LIMIT)
        .offset(offset);
      await Promise.all(
        articles.map(async (article) => {
          if (article.content) {
            const content = article.content.replace(
              REPLACE_REGEX,
              process.env.AWS_IMG_URL
            );
            return knex
              .from("articles")
              .update({ content })
              .where({ id: article.id });
          }
        })
      );
      offset += ARTICLE_LIMIT;
    } while (articles.length === ARTICLE_LIMIT);
  },
};
