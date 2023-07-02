module.exports = {
  async up(knex) {
    const author = (
      await knex.select("id").from("authors").where({ alias: "sofia-blonska" })
    )[0];

    const articles = await knex.raw(
      "SELECT id FROM articles WHERE (SELECT count(*) FROM articles_author_links WHERE article_id=articles.id OR author_id IS NULL) = 0"
    );

    await Promise.all(
      articles.rows.map(({ id }) =>
        knex("articles_author_links").insert({
          article_id: id,
          author_id: author.id,
        })
      )
    );
  },
};
