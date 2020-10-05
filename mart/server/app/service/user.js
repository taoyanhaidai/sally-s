/*
 * @Author: heinan 
 * @Date: 2020-07-14 09:58:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: yyyy-09-Su 07:21:16
 */
'use strict';

const fs = require('fs');
const path = require('path');
const Service = require('egg').Service;
const { idCreator, passwordCreator } = require('../utils');

class UserService extends Service {
  async login({ username, password }) {
    const pwd = passwordCreator(password).substring(0, 20);
    const $params = [username, pwd];
    const $sql = 'select * from login where username=? and password=?';
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async codelogin({ mobile }) {
    const $params = [Number(mobile)];
    const $sql = 'select * from user where mobile=?';
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async registry({ username, password }) {
    const uid = idCreator(username);
    const pwd = passwordCreator(password).substring(0, 20)
    const $params = [uid, username, pwd];
    const $sql = 'insert into login (uid,username,password) values (?,?,?)';
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async bindmobile({ username, uid,mobile }) {
    
    const $params = [uid,username, mobile];
    const $sql = 'insert into user (uid,nickname,mobile) values (?,?,?)';
    return await this.ctx.app.mysql.query($sql, $params)
  }
  
  async find({ username }) {
    const $sql = 'select username from login where username=?';
    const $params = [username];
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async getUserInfo({ uid }) { //拿用户信息
    const $sql = 'SELECT * FROM user WHERE uid=?';
    const $params = [uid]
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async upload(filePath,fileName) {
  
    const uploadData = fs.readFileSync(filePath);
    const uploadDir = path.join(process.cwd(), '/app/public/upload', fileName);
    const uploadError = fs.writeFileSync(uploadDir, uploadData);
    return uploadError;
  }
  async updateAvatar({uid,imgUrl}){
    const $sql = `UPDATE user SET avatar=? WHERE  uid=?`;
    const $params = [imgUrl,uid]
    return await this.ctx.app.mysql.query($sql,$params)
  }
  async addIdentiry({ identity_text, identity_type }) {
    const identity_id = idCreator(identity_text);
    const $params = [identity_id, identity_text, identity_type];
    const $sql = 'insert into identity (identity_id,identity_text,identity_type) values (?,?,?)';
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async identiryList() {
    const $sql = 'select * from `identity`';
    return await this.ctx.app.mysql.query($sql)
  }
  async getIdentity({identity_id}){
    const $sql = `select * from identity where identity_id=?`
    const $params = [identity_id]
    return await this.ctx.app.mysql.query($sql,$params)
  }
}

module.exports = UserService;
