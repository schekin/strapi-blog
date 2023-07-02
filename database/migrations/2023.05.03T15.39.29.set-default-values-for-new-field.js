module.exports = {
  async up(knex) {
    await knex.from("articles").update({ tutor_article: false }).where({tutor_article: null});
  }
};
