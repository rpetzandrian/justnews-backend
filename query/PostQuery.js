let tempWithoutUserId = () => {
  return `select a.id, a.slug, a.title, a.text, a.category_id, a.user_id, a.cover, a.created_at, a.updated_at, a.publish_at, b.count as like from posts as a 
left join (select a.id, count(a.id) from posts as a inner join likes as b on b.post_id = a.id group by a.id) as b on b.id = a.id`;
};

let tempWithUserId = (request) => {
  return `
  select a.id, a.slug, a.title, a.text, a.category_id, a.user_id, a.cover, a.created_at, a.updated_at, a.publish_at, b.count as like, c.count as is_liked, d.count as is_saved from posts as a 
  left join (select a.id, count(a.id) from posts as a inner join likes as b on b.post_id = a.id group by a.id) as b on b.id = a.id
  left join (select a.id, b.user_id, count(a.id) from posts as a inner join likes as b on b.post_id = a.id where b.user_id = ${request.user_id} group by a.id, b.user_id) as c on c.id = a.id
  left join (select a.id, b.user_id, count(a.id) from posts as a inner join saves as b on b.post_id = a.id where b.user_id = ${request.user_id} group by a.id, b.user_id) as d on d.id = a.id`;
};

let getQuery = ({ search = null, user_id = null, saved = null }) => {
  if (search) {
    if (user_id) {
      if (saved == "true") {
        let query = tempWithUserId({ user_id });
        query += ` where is_saved is not null and LOWER(title) like '%${search.toLowerCase()}%'`;
        return query;
      } else {
        let query = tempWithUserId({ user_id });
        query += ` where LOWER(title) like '%${search.toLowerCase()}%'`;
        return query;
      }
    } else {
      let query = tempWithoutUserId();
      query += ` where is_saved is not null and LOWER(title) like '%${search.toLowerCase()}%'`;
      return query;
    }
  } else {
    if (user_id) {
      if (saved == "true") {
        let query = tempWithUserId({ user_id });
        query += ` where is_saved is not null`;
        return query;
      } else {
        return tempWithUserId({ user_id });
      }
    } else {
      return tempWithoutUserId();
    }
  }
};

module.exports = PostQuery = {
  get: ({ limit = 100, page = 1, ...rest }) => {
    if (rest.category_id) {
      return `select * from (${getQuery(rest)}) as a where a.category_id = ${
        rest.category_id
      } limit ${limit} offset ${(page - 1) * limit}`;
    } else if (rest.name) {
      return `select * from (${getQuery(rest)}) as a order by a.title ${
        rest.name
      } limit ${limit} offset ${(page - 1) * limit}`;
    } else if (rest.time) {
      return `select * from (${getQuery(rest)}) as a order by a.publish_at ${
        rest.time
      } limit ${limit} offset ${(page - 1) * limit}`;
    } else if (rest.recomended) {
      return `select * from (${getQuery(
        rest
      )}) as a order by a.like desc limit ${limit} offset ${
        (page - 1) * limit
      }`;
    } else {
      return `select * from (${getQuery(rest)}) as a limit ${limit} offset ${
        (page - 1) * limit
      }`;
    }
  },

  bySlug: ({ user_id, slug, ...rest }) => {
    if (user_id) {
      return `select a.*, b.username as author from (${tempWithUserId({
        user_id,
      })}) as a 
      left join (select a.username, a.id from users as a inner join posts as b on b.user_id = a.id) as b on b.id = a.user_id
      where a.slug = '${slug}'`;
    } else {
      return `select a.*, b.username as author from (${tempWithoutUserId()}) as a
      left join (select a.username, a.id from users as a inner join posts as b on b.user_id = a.id) as b on b.id = a.user_id
      where a.slug = '${slug}'`;
    }
  },

  byId: ({ id = null }) => {
    return `select * from posts where id = ${id}`;
  },

  add: (request) => {
    const { title, user_id, text, cover, slug, category_id } = request;
    return `insert into posts(title, user_id, category_id, text, cover, slug, created_at, publish_at) values('${title}', ${user_id}, ${category_id}, '${text}', '${cover}', '${slug}', 'now()', 'now()')`;
  },

  update: ({ id, ...request }) => {
    // const { id, title = initial.title, slug = initial.slug, category_id = initial.category_id, text = initial.text, cover = initial.cover } = request
    // return `update posts set title = '${title}', category_id = ${category_id}, text = '${text}', cover = '${cover}', slug = '${slug}', updated_at = 'now()' where id = ${id}`
    let query = `update posts set`;
    const field = ["category_id", "title", "text", "slug", "cover"];
    field.map((item) => {
      if (request[item]) {
        query += ` ${[item]} = '${request[item]}',`;
      }
    });
    query += ` updated_at = 'now()' where id = ${id}`;
    return query;
  },

  delete: ({ id }) => {
    return `delete from posts where id = ${id}`;
  },

  getLikes: ({ post_id, user_id }) => {
    return `select from likes where post_id = ${post_id} and user_id = ${user_id}`;
  },

  likes: ({ post_id, user_id }) => {
    return `insert into likes(user_id, post_id) values(${user_id}, ${post_id})`;
  },

  unlikes: ({ post_id, user_id }) => {
    return `delete from likes where post_id = ${post_id} and user_id = ${user_id}`;
  },

  getSaves: ({ post_id, user_id }) => {
    return `select from saves where post_id = ${post_id} and user_id = ${user_id}`;
  },

  saves: ({ post_id, user_id }) => {
    return `insert into saves(user_id, post_id) values(${user_id}, ${post_id})`;
  },

  unsaves: ({ post_id, user_id }) => {
    return `delete from saves where post_id = ${post_id} and user_id = ${user_id}`;
  },
};
