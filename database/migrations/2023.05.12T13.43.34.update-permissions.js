module.exports = {
  async up(knex) {
    await knex("up_permissions").insert([
      {
        action: "api::author.author.find",
        created_at: "2023-05-12 10:42:28.312000",
        updated_at: "2023-05-12 10:42:28.312000",
      },
      {
        action: "api::author.author.findOne",
        created_at: "2023-05-12 10:42:28.312000",
        updated_at: "2023-05-12 10:42:28.312000",
      },
      {
        action: "api::page-seo.page-seo.findOne",
        created_at: "2023-05-12 10:42:28.312000",
        updated_at: "2023-05-12 10:42:28.312000",
      },
      {
        action: "api::page-seo.page-seo.find",
        created_at: "2023-05-12 10:42:28.312000",
        updated_at: "2023-05-12 10:42:28.312000",
      },
    ]);

    const upPermissions = await knex
      .select("id")
      .from("up_permissions")
      .where({ created_at: "2023-05-12 10:42:28.312000" });

    await knex("up_permissions_role_links").insert(
      upPermissions.map(({ id }) => ({ role_id: 2, permission_id: id }))
    );
  },
};
