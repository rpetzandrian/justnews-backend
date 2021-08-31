const knex = require('./connection');

const queryPosts = {
  search: (request) => {
    if (request.search) {
      if (!request.user_id) {
        const query = knex('posts as a').select('a.id', 'a.slug', 'a.title', 'a.text', 'a.category_id', 'a.user_id', 'a.cover', 'a.created_at', 'a.updated_at', 'a.publish_at', 'b.count as like')
          .leftJoin(knex('posts as a').select('a.id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id').as('b'), function () {
            this.on('b.id', '=', 'a.id')
          })
          .whereRaw(`LOWER(title) like '%${request.search.toLowerCase()}%'`)
        return query
      } else {
        if (request.saved === 'true') {
          const query = knex('posts as a').distinct('a.id', 'a.slug', 'a.title', 'a.text', 'a.category_id', 'a.user_id', 'a.cover', 'a.created_at', 'a.updated_at', 'a.publish_at', 'b.count as like', 'c.count as is_liked', 'd.count as is_saved')
            .leftJoin(knex('posts as a').select('a.id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id').as('b'), function () {
              this.on('b.id', '=', 'a.id')
            })
            .leftJoin(knex('posts as a').select('a.id', 'b.user_id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id', 'b.user_id').where('b.user_id', request.user_id).as('c'), function () {
              this.on('c.id', '=', 'a.id')
            })
            .leftJoin(knex('posts as a').select('a.id', 'b.user_id').count('*').innerJoin('saves as b', 'b.post_id', 'a.id').groupBy('a.id', 'b.user_id').where('b.user_id', request.user_id).as('d'), function () {
              this.on('d.id', '=', 'a.id')
            })
            .whereNotNull('d.count')
            .whereRaw(`LOWER(title) like '%${request.search.toLowerCase()}%'`)
          return query
        }
        const query = knex('posts as a').distinct('a.id', 'a.slug', 'a.title', 'a.text', 'a.category_id', 'a.user_id', 'a.cover', 'a.created_at', 'a.updated_at', 'a.publish_at', 'b.count as like', 'c.count as is_liked', 'd.count as is_saved')
          .leftJoin(knex('posts as a').select('a.id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id').as('b'), function () {
            this.on('b.id', '=', 'a.id')
          })
          .leftJoin(knex('posts as a').select('a.id', 'b.user_id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id', 'b.user_id').where('b.user_id', request.user_id).as('c'), function () {
            this.on('c.id', '=', 'a.id')
          })
          .leftJoin(knex('posts as a').select('a.id', 'b.user_id').count('*').innerJoin('saves as b', 'b.post_id', 'a.id').groupBy('a.id', 'b.user_id').where('b.user_id', request.user_id).as('d'), function () {
            this.on('d.id', '=', 'a.id')
          })
          .whereRaw(`LOWER(title) like '%${request.search.toLowerCase()}%'`)
        return query
      }
    } else {
      if (!request.user_id) {
        const query = knex('posts as a').select('a.id', 'a.slug', 'a.title', 'a.text', 'a.category_id', 'a.user_id', 'a.cover', 'a.created_at', 'a.updated_at', 'a.publish_at', 'b.count as like')
          .leftJoin(knex('posts as a').select('a.id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id').as('b'), function () {
            this.on('b.id', '=', 'a.id')
          })
        return query
      } else {
        if (request.saved === 'true') {
          const query = knex('posts as a').distinct('a.id', 'a.slug', 'a.title', 'a.text', 'a.category_id', 'a.user_id', 'a.cover', 'a.created_at', 'a.updated_at', 'a.publish_at', 'b.count as like', 'c.count as is_liked', 'd.count as is_saved')
            .leftJoin(knex('posts as a').select('a.id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id').as('b'), function () {
              this.on('b.id', '=', 'a.id')
            })
            .leftJoin(knex('posts as a').select('a.id', 'b.user_id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id', 'b.user_id').where('b.user_id', request.user_id).as('c'), function () {
              this.on('c.id', '=', 'a.id')
            })
            .leftJoin(knex('posts as a').select('a.id', 'b.user_id').count('*').innerJoin('saves as b', 'b.post_id', 'a.id').groupBy('a.id', 'b.user_id').where('b.user_id', request.user_id).as('d'), function () {
              this.on('d.id', '=', 'a.id')
            })
            .whereNotNull('d.count')
          return query
        }
        const query = knex('posts as a').distinct('a.id', 'a.slug', 'a.title', 'a.text', 'a.category_id', 'a.user_id', 'a.cover', 'a.created_at', 'a.updated_at', 'a.publish_at', 'b.count as like', 'c.count as is_liked', 'd.count as is_saved')
          .leftJoin(knex('posts as a').select('a.id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id').as('b'), function () {
            this.on('b.id', '=', 'a.id')
          })
          .leftJoin(knex('posts as a').select('a.id', 'b.user_id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id', 'b.user_id').where('b.user_id', request.user_id).as('c'), function () {
            this.on('c.id', '=', 'a.id')
          })
          .leftJoin(knex('posts as a').select('a.id', 'b.user_id').count('*').innerJoin('saves as b', 'b.post_id', 'a.id').groupBy('a.id', 'b.user_id').where('b.user_id', request.user_id).as('d'), function () {
            this.on('d.id', '=', 'a.id')
          })
        return query
      }
    }
  },

  sort: function (request) {
    if (request.category) {
      return this.search(request).where('category_id', request.category).limit(request.limit || 10).offset((request.page - 1) * request.limit || 0)
    } else if (request.name) {
      return this.search(request).orderBy('title', request.name).limit(request.limit || 10).offset((request.page - 1) * request.limit || 0)
    } else if (request.time) {
      return this.search(request).orderBy('publish_at', request.time).limit(request.limit || 10).offset((request.page - 1) * request.limit || 0)
    } else if (request.recomended) {
      return this.search(request).orderBy('like', 'desc').limit(request.limit || 10).offset((request.page - 1) * request.limit || 0)
    } else {
      return this.search(request).limit(request.limit || 10).offset((request.page - 1) * request.limit || 0)
    }
  },

  bySlug: (request) => {
    if (!request.user_id) {
      knex('posts as a').select('a.id', 'a.slug', 'a.title', 'a.text', 'a.category_id', 'a.user_id', 'a.cover', 'a.created_at', 'a.updated_at', 'a.publish_at', 'b.count as like', 'd.username as author')
        .leftJoin(knex('posts as a').select('a.id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id').as('b'), function () {
          this.on('b.id', '=', 'a.id')
        })
        .leftJoin(knex('posts as a').select('a.id', 'b.user_id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id', 'b.user_id').where('b.user_id', request.user_id).as('c'), function () {
          this.on('c.id', '=', 'a.id')
        })
        .groupBy('a.id', 'like', 'author')
        .where('a.slug', request.slug)

      return query
    } else {
      const query = knex('posts as a').select('a.id', 'a.slug', 'a.title', 'a.text', 'a.category_id', 'a.user_id', 'a.cover', 'a.created_at', 'a.updated_at', 'a.publish_at', 'b.count as like', 'c.count as is_liked', 'd.username as author', 'e.count as is_saved')
        .leftJoin(knex('posts as a').select('a.id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id').as('b'), function () {
          this.on('b.id', '=', 'a.id')
        })
        .leftJoin(knex('posts as a').select('a.id', 'b.user_id').count('*').innerJoin('likes as b', 'b.post_id', 'a.id').groupBy('a.id', 'b.user_id').where('b.user_id', request.user_id).as('c'), function () {
          this.on('c.id', '=', 'a.id')
        })
        .innerJoin(knex('users').select('users.username', 'users.id').innerJoin('posts', 'posts.user_id', 'users.id').as('d'), function () {
          this.on('d.id', '=', 'a.user_id')
        })
        .leftJoin(knex('posts as a').select('a.id', 'b.user_id').count('*').innerJoin('saves as b', 'b.post_id', 'a.id').groupBy('a.id', 'b.user_id').where('b.user_id', request.user_id).as('e'), function () {
          this.on('e.id', '=', 'a.id')
        })
        .groupBy('a.id', 'like', 'is_liked', 'author', 'is_saved')
        .where('a.slug', request.slug)

      return query
    }
  }
}

module.exports = queryPosts;