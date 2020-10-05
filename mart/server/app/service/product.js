/*
 * @Author: heinan 
 * @Date: 2020-07-15 10:23:53 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: yyyy-09-Th 08:19:53
 */
'use strict';

const Service = require('egg').Service;
const { idCreator } = require('../utils');
const { PRODUCT_DEFAULT_SORTNAME, PRODUCT_DEFAULT_SORTTYPE } = require('../config');

class ProductService extends Service {
  async type() {
    const $sql = 'SELECT * FROM type`type`';
    return await this.ctx.app.mysql.query($sql)
  }
  async sort({ t_type }) {
    const $sql = 'SELECT sort.s_type,sort.t_type,sort.s_text FROM type,`sort` WHERE sort.t_type=type.t_type AND type.t_type=?';
    return await this.ctx.app.mysql.query($sql, [t_type])
  }
  async getList(){
    const $sql = 'SELECT * FROM product';
    return await this.ctx.app.mysql.query($sql)
  }
  async list(query) {
   
    query = {
      sortname: PRODUCT_DEFAULT_SORTNAME,
      sorttype: PRODUCT_DEFAULT_SORTTYPE,
      ...query,
    }
    const $sql = query.s_type !== undefined ?
      `SELECT * FROM product,sort WHERE  sort.s_type=product.s_type AND product.s_type=${query.s_type} ` :
      `SELECT * FROM product WHERE  product.t_type=${query.t_type} order by ${query.sortname} ${query.sorttype}`;
    return await this.ctx.app.mysql.query($sql)
  }
  async find({keyword,isUp}){ //模糊搜索
    console.log(keyword)
    const $sql = `SELECT * FROM product WHERE pname LIKE '%${keyword}%' and isUp='${isUp}'`;
    return await this.ctx.app.mysql.query($sql)
  }
  async findByValue({value}){

    const $sql = 'SELECT * FROM product WHERE pname LIKE ? OR `desc` LIKE ?';
    const $params = ['%'+value+'%','%'+value+'%']
    return await this.ctx.app.mysql.query($sql,$params)
  }
  async update({isUp,pid}){ //商品上下架
    const $sql = `UPDATE product SET isUp=? WHERE  pid=?;`
    const $params = [isUp==0?1:0,pid]
    return await this.ctx.app.mysql.query($sql,$params)
  }
  async add({ pname,imgUrl, sales, original_price, sale_price, mode, s_type, t_type, carousel, desc }) {
    const pid = idCreator(pname);
    const $params = [pid, pname, imgUrl, sales, original_price, sale_price, mode, s_type, t_type, carousel, desc];
    const $sql = 'insert into product (pid,pname, imgUrl, sales, original_price, sale_price, `mode`, s_type, t_type, carousel, `desc` ) values (?,?,?,?,?,?,?,?,?,?,?)';
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async edit({ pid, pname, imgUrl, sales, original_price, sale_price, mode, s_type, t_type, carousel, desc }) {
    // const $sql = 'update product set pname=?, imgUrl=?,pname=?, sales=?,original_price=?, sale_price=?,mode=?, s_type=?,t_type=?, carousel=?,`desc`=? cid=? where pid=?';
    const $sql = 'UPDATE `mart`.`product` SET `pname`=?, `imgUrl`=?, `sales`=?, `original_price`=?, `sale_price`=?, `mode`=?, `s_type`=?, `t_type`=?,  `carousel`=?, `desc`=? WHERE  `pid`=?'
    const $params = [pname, imgUrl, sales, original_price, sale_price, mode, s_type, t_type, carousel, desc, pid];
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async delete({ pid }) {
    const $sql = 'DELETE FROM `mart`.`product` WHERE  `pid`=?';
    return await this.ctx.app.mysql.query($sql, [pid])
  }
  async searchByType({ keyword, s_type }) {
    const $sql = `SELECT * FROM product WHERE pname LIKE '%${keyword}%' AND s_type=${s_type}`;
    return await this.ctx.app.mysql.query($sql)
  }
  async searchByType({ value }) {
    const $sql = `SELECT * FROM product WHERE pname LIKE '%${keyword}%' AND s_type=${s_type}`;
    return await this.ctx.app.mysql.query($sql)
  }
  async getDetail({pid}){
    const $sql = 'select * from product where pid=?';
    const $params = [pid]
 
    return await this.ctx.app.mysql.query($sql,$params)
  }
  async getTwoList(){
    const $sql = 'select * from `sort`';
    return await this.ctx.app.mysql.query($sql)
  }


  async typeAdd({ t_text, t_type }) {
    const $sql = `insert into type (t_text,t_type) values ('${t_text}','${t_type}')`
    return await this.ctx.app.mysql.query($sql)
  }
  async sortAdd({ s_text, t_type, s_type }) {
    const $sql = `insert into sort (s_text,t_type,s_type) values ('${s_text}',${t_type},${s_type})`
    return await this.ctx.app.mysql.query($sql)
  }
  async typeEdit({ t_text, t_type, tid }) {
    const $sql = `update type set t_type=?, t_text=? where tid=?`
    const $params = [t_type, t_text, tid]
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async sortEdit({ s_text, t_type, s_type }) {
    const $sql = `update sort set t_type=?, s_text=? where s_type=?`
    const $params = [t_type, s_text, s_type]
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async typeDel({ tid }) {
   
    const $sql1 = `select * from type where tid=?`
    const $params = [tid]
    let res = await this.ctx.app.mysql.query($sql1,$params)
    const $sql2 = `delete from sort where t_type=?`
    this.ctx.app.mysql.query($sql2, [res[0].t_type])
    const $sql = `delete from type where tid=?`
    
    return await this.ctx.app.mysql.query($sql, $params)
  }
  async sortDel({ s_type }) {
    const $sql = `delete from sort where s_type=?`
    const $params = [s_type]
    return await this.ctx.app.mysql.query($sql, $params)
  }
}

module.exports = ProductService;
