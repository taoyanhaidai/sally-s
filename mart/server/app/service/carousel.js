/*
 * @Author: heinan 
 * @Date: 2020-07-14 09:58:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: yyyy-09-We 06:45:31
 */
'use strict';

const Service = require('egg').Service;
const { idCreator } = require('../utils');

class CarouselService extends Service {
  async add({ tit, start_time, end_time, img }) {
    const cid = idCreator(tit);
    const type = 0;
    const $params = [cid, tit, start_time, end_time, img, type];
    const $sql = 'insert into carousel (cid,tit,start_time,end_time,img,type) values (?,?,?,?,?,?)';
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async del({ cid }) {
    const $sql = 'delete from carousel where cid=?';
    const $params = [cid];
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async edit({ cid, tit, start_time, end_time, img, type }) {
   
    const $sql = 'update carousel set tit=?, start_time=?, end_time=?,img=?,type=? where cid=?';
    const $params = [tit, start_time, end_time, img, type, cid];
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async getCList(){
    const $sql = 'select * from carousel where type=0';
    return await this.ctx.app.mysql.query($sql)
  }
  async list({ page,pageSize }) {
   
    const $sql = 'select * from carousel limit ?,?';
  
    const $params = [(page-1)*pageSize,Number(pageSize)]
    return await this.ctx.app.mysql.query($sql,$params)
  }
  async getDefaultData({cid}){ //拿携带的参数
    const $sql = 'select * from carousel where cid=?';
    const $params = [cid];
    return await this.ctx.app.mysql.query($sql, $params)
  }
}

module.exports = CarouselService;
