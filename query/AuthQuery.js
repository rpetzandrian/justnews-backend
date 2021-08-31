module.exports = AuthQuery = {
  byEmail: ({ email = null }) => {
    return `select id, password, role, google_id, fb_id from users where email = '${email}'`
  },

  register: ({ email = null, password = null, phone = null, role = 'user' }) => {
    return `insert into users(email, password, phone, role, created_at) values('${email}', '${password}', '${phone}', '${role}', 'now()')`
  },

  registerGoogle: ({ email = null, google_id = null, name = null, username = null, photo = null }) => {
    return `insert into users(email, google_id, name, username, photo, created_at) values('${email}', '${google_id}', '${name}', '${username}', '${photo}', 'now()')`
  },

  registerFb: ({ email = null, fb_id = null, name = null, username = null, photo = null }) => {
    return `insert into users(email, fb_id, name, username, photo, created_at) values('${email}', '${fb_id}', '${name}', '${username}', '${photo}', 'now()')`
  }
}