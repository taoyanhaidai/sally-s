/*
 * @Author: heinan 
 * @Date: 2020-07-14 09:58:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: yyyy-09-Mo 10:57:04
 */
'use strict';

const Service = require('egg').Service;
const { idCreator } = require('../utils');

class CommentService extends Service {
  async add({ uid, pid, uphoto, uname, comment, score }) {
    const cid = idCreator(pid);
    const $sql = 'insert into comment (cid,pid,uid, uphoto, uname, comment, score) values (?,?,?,?,?,?,?)';
    const $params = [cid, pid, uid, uphoto, uname, comment, score];
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async list({ pid }) {

    if(pid){
      const $sql = 'select uphoto,uname,comment,score,cid from comment where pid=?';
      return await this.ctx.app.mysql.query($sql, [pid])
    }else{
      const $sql = 'select * from comment';
      return await this.ctx.app.mysql.query($sql)
    }
    
  }
  async delete({ cid }) {
    const $sql = 'delete from comment where cid=?';
    return await this.ctx.app.mysql.query($sql, [cid])
  }
}

module.exports = CommentService;
