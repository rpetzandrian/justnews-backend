module.exports = CategoryQuery = {
  add: ({ category = null, image = null, description = null }) => {
    return `insert into categories(category, image, description, created_at) values('${category}', '${image}', '${description}', 'now()') returning id`
  },

  get: () => {
    return `select * from categories order by created_at desc`
  },

  byId: ({ id = null }) => {
    return `select * from categories where id = ${id}`
  },

  update: (request, initial) => {
    const { category = initial.category, description = initial.description } = request
    return `update categories set category = '${category}', description = '${description}', updated_at = 'now()' where id = ${request.id}`
  },

  delete: ({ id = null }) => {
    return `delete from categories where id = ${id}`
  }
}