module.exports = UserQuery = {
  get: ({ limit = 10, page = 1, ...rest }) => {
    return `select id, name, username, email, phone, photo, role, bio, job, created_at, updated_at from users order by created_at desc LIMIT ${limit} OFFSET ${
      limit * (page - 1)
    }`;
  },

  byId: ({ id = null }) => {
    return `select id, name, username, email, phone, photo, role, bio, job, created_at, updated_at from users where id = ${id}`;
  },

  add: (request) => {
    const {
      name = null,
      username = null,
      email = null,
      password = null,
      phone = null,
      photo = null,
      role = "user",
      job = null,
      bio = null,
    } = request;
    const get = `select id from users where email = '${request.email}' or phone = '${request.phone}'`;
    const add = `insert into users(name, username, email, password, phone, photo, role, created_at, job, bio) values('${name}', '${username}', '${email}', '${password}', '${phone}', '${photo}', '${role}', 'now()', '${job}', '${bio}') returning id`;

    return { get, add };
  },

  update: (request, temp) => {
    const {
      name = temp.name,
      username = temp.username,
      email = temp.email,
      password = temp.password,
      phone = temp.phone,
      photo = temp.photo,
      role = temp.role,
      job = temp.job,
      bio = temp.bio,
    } = request;
    return `update users set name = '${name}', username = '${username}', email = '${email}', password = '${password}', phone = '${phone}', photo = '${photo}', role = '${role}', job = '${job}', bio = '${bio}', updated_at = 'now()' where id = ${request.id}`;
  },

  delete: ({ id = null }) => {
    return `delete from users where id = ${id}`;
  },
};
