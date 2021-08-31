module.exports = NotifQuery = {
  get: ({ user_id = null }) => {
    return `select a.*, b.username as from_username, b.phone as from_phone, b.photo as from_photo, b.role as from_role, c.slug as post_slug from notification as a left join users as b on b.id = a.from left join posts as c on c.id = a.post_id where a.user_id = ${user_id} order by a.created_at desc`
  },

  unreadNotif: ({ user_id = null }) => {
    return `select id from notification where user_id = ${user_id} and is_read = false`
  },

  add: (request) => {
    const { user_id, post_id, type, message, from } = request
    return `insert into notification(user_id, "from", "type", message, post_id, created_at, is_read) values(${user_id}, ${from}, '${type}', '${message}', ${post_id}, 'now()', false)`
  },

  update: ({ user_id = null }) => {
    return `update into notification set is_read = true where user_id = ${user_id}`
  },

  delete: ({ id = [] }) => {
    return `delete from notification where id in ${id}`
  }
}