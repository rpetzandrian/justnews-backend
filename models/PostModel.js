// const knex = require('../helpers/connection');
const response = require("../helpers/ResponseFormat");
const fs = require("fs");
// const queryPosts = require('../helpers/sorting_post');
const db = require("../helpers/db_connection");
const {
  get,
  byId,
  bySlug,
  add,
  update,
  getLikes,
  getSaves,
  saves,
  likes,
  unlikes,
  unsaves,
  ...rest
} = require("../query/PostQuery");
const unlinkImage = require("../helpers/unlinkImage");
const {
  notFound,
  success,
  systemError,
  created,
  templateResponse,
} = require("../helpers/templateResponse");

const PostModel = {
  getAllPosts: (request) => {
    return new Promise((resolve, reject) => {
      db.query(`select id from posts`, (err, c) => {
        if (!err) {
          if (c.rowCount < 1) {
            return resolve(notFound());
          } else {
            let pages = Math.ceil(c.rowCount / (request.limit || 10));
            db.query(get(request), (err, temp) => {
              if (!err) {
                if (temp.rowCount < 1) {
                  return resolve(notFound());
                } else {
                  return resolve(success({ post: temp.rows, pages }));
                }
              } else {
                return resolve(systemError(err.message));
              }
            });
          }
        } else {
          return resolve(systemError(err.message));
        }
      });
    });
  },

  getPostBySlug: (request) => {
    return new Promise((resolve, reject) => {
      db.query(bySlug(request), (err, result) => {
        if (!err) {
          if (result.rowCount < 1) {
            return resolve(notFound());
          } else {
            return resolve(success(result.rows[0]));
          }
        } else {
          return resolve(systemError(err.message));
        }
      });
    });
  },

  getAllPostsByCategory: (request) => {
    return new Promise((resolve, reject) => {
      db.query(
        "select * from categories order by created_at desc",
        (err, category) => {
          if (!err) {
            if (category.rows < 1) {
              return resolve(notFound());
            }
            let data = [];
            for (let i = 0; i < category.rows.length; i++) {
              db.query(
                get({
                  category_id: category.rows[i].id,
                  user_id: request.user_id,
                }),
                (err, result) => {
                  if (!err) {
                    data.push({
                      category_id: category.rows[i].id,
                      category_name: category.rows[i].category,
                      category_photo: category.rows[i].image,
                      category_description: category.rows[i].description,
                      data_posts: result.rows,
                    });
                    if (i === category.rows.length - 1) {
                      return resolve(success(data));
                    }
                  } else {
                    return resolve(systemError(err.message));
                  }
                }
              );
            }
          } else {
            return resolve(systemError(err.message));
          }
        }
      );
    });
  },

  addNewPosts: (request) => {
    return new Promise((resolve, reject) => {
      db.query(add(request), (err) => {
        if (!err) {
          return resolve(created());
        } else {
          unlinkImage(request.cover);
          return resolve(systemError());
        }
      });
    });
  },

  updatePosts: (request) => {
    return new Promise((resolve, reject) => {
      db.query(update(request), (err) => {
        if (!err) {
          if (request.cover) {
            db.query(
              `select cover from posts where id = ${request.id}`,
              (err, temp) => {
                if (!err) {
                  unlinkImage(temp.rows[0].cover);
                }
                return resolve(success());
              }
            );
          }
          return resolve(success());
        } else {
          unlinkImage(request.cover);
          return resolve(systemError());
        }
      });
    });
  },

  deletePosts: (request) => {
    return new Promise((resolve, reject) => {
      db.query(byId(request), (err, temp) => {
        if (!err) {
          if (temp.rowCount < 1) {
            return resolve(notFound());
          }
          db.query(rest.delete(request), (err) => {
            if (!err) {
              if (temp.rows[0].cover && temp.rows[0].cover != "null") {
                fs.unlinkSync(`public${temp.rows[0].cover}`);
              }
              return resolve(success());
            } else {
              return resolve(systemError());
            }
          });
        } else {
          return resolve(systemError());
        }
      });
    });
  },

  likes: (request) => {
    return new Promise((resolve, reject) => {
      db.query(getLikes(request), (err, temp) => {
        if (!err) {
          if (temp.rowCount > 0) {
            let template = templateResponse(400, "You have liked this post");
            return resolve(template);
          }
          db.query(likes(request), (err) => {
            if (!err) {
              return resolve(success());
            } else {
              return resolve(systemError(err.message));
            }
          });
        } else {
          return resolve(systemError(err.message));
        }
      });
    });
  },

  unlikes: (request) => {
    return new Promise((resolve, reject) => {
      db.query(getLikes(request), (err, temp) => {
        if (!err) {
          if (temp.rowCount < 1) {
            let template = templateResponse(
              400,
              "You haven`t liked this post yet"
            );
            return resolve(template);
          }
          db.query(unlikes(request), (err) => {
            if (!err) {
              return resolve(success());
            } else {
              return resolve(systemError(err.message));
            }
          });
        } else {
          return resolve(systemError(err.message));
        }
      });
    });
  },

  save: (request) => {
    return new Promise((resolve, reject) => {
      db.query(getSaves(request), (err, temp) => {
        if (!err) {
          if (temp.rowCount > 0) {
            let template = templateResponse(400, "You have save this post");
            return resolve(template);
          }
          db.query(saves(request), (err) => {
            if (!err) {
              return resolve(success());
            } else {
              return resolve(systemError(err.message));
            }
          });
        } else {
          return resolve(systemError(err.message));
        }
      });
    });
  },

  unsave: (request) => {
    return new Promise((resolve, reject) => {
      db.query(getSaves(request), (err, temp) => {
        if (!err) {
          if (temp.rowCount < 1) {
            let template = templateResponse(
              400,
              "You haven`t save this post yet"
            );
            return resolve(template);
          }
          db.query(unsaves(request), (err) => {
            if (!err) {
              return resolve(success());
            } else {
              return resolve(systemError(err.message));
            }
          });
        } else {
          return resolve(systemError(err.message));
        }
      });
    });
  },

  // watchs: (request) => {
  //   return new Promise((resolve, reject) => {
  //     knex('posts').select('watchs').where('id', request.id)
  //       .then(res => {
  //         if (res.length < 1) {
  //           reject(response('Post not found!', 400))
  //         }
  //         knex('posts').update({ watchs: Number(res[0].watchs) + 1 }).where('id', request.id)
  //           .then(() => {
  //             resolve(response('Success!', 200))
  //           })
  //           .catch((err) => {
  //             reject(response('Failed!', 500))
  //           })
  //       })
  //   })
  // }
};

module.exports = PostModel;
