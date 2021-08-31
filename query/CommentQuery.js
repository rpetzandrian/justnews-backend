module.exports = CommentQuery = {
  add: ({ user_id = null, post_id = null, text = null }) => {
    return `insert into comments(user_id, post_id, text, created_at) values(${user_id}, ${post_id}, '${text}', 'now()')`;
  },

  get: ({ id = null, post_id }) => {
    return `select a.id, a.created_at, a.text, a.updated_at, a.post_id, a.user_id, b.username, b.phone, b.photo from comments as a inner join users as b on b.id = a.user_id where a.post_id = ${post_id} order by a.created_at desc`;
    // return `select * from comments where id = ${id}`;
  },

  update: ({ text, id }) => {
    return `update comments set text = '${text}', updated_at = 'now()' where id = ${id}`;
  },

  delete: ({ id = null }) => {
    return `delete from comments where id = ${id}`;
  },
};
