const DateStore = require('nedb');

const { resolve } = require('path');
const pwd = resolve('./');
const db = new DateStore({
  filename: `${__dirname}/../.goreDataBase`,
  autoload: true,
});

module.exports = {
  insert: value =>
    new Promise((resolve, reject) => {
      try {
        if (!value) {
          throw 'empty';
        }
        db.insert(value, resolve);
      } catch (err) {
        reject(err);
      }
    }),
  find: value =>
    new Promise((resolve, reject) => {
      try {
        if (!value) {
          throw 'empty';
        }
        db.find(value, (_, res) => {
          resolve(res);
        });
      } catch (err) {
        reject(err);
      }
    }),
  count: value =>
    new Promise((resolve, reject) => {
      try {
        if (!value) {
          throw 'empty';
        }
        db.count(value, (_, res) => {
          resolve(res);
        });
      } catch (err) {
        reject(err);
      }
    }),
  update: (oldValue, newValue) =>
    new Promise((resolve, reject) => {
      try {
        if (!oldValue) {
          throw 'empty';
        }
        db.update(oldValue, { $set: newValue }, (_, res) => {
          resolve(res);
        });
      } catch (err) {
        reject(err);
      }
    }),
  remove: value =>
    new Promise((resolve, reject) => {
      try {
        if (!value) {
          throw 'empty';
        }
        db.remove(value, (_, res) => {
          resolve(res);
        });
      } catch (err) {
        reject(err);
      }
    }),
};
