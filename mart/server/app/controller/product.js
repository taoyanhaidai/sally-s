'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  async type() {
    const result = await this.ctx.service.product.type();
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result,
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
      }
    }
  }

  async sort() {
    const result = await this.ctx.service.product.sort(this.ctx.query);
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result,
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
      }
    }
  }

  async list() {
    
    const result = await this.ctx.service.product.list(this.ctx.query);
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result,
      }
    } else {
      // this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
      }
    }
  }
  async find(){ //全部商品的模糊搜索
  
    const result = await this.service.product.find(this.ctx.request.body)
   
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result,
      }
    } else {
      // this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        result,
      }
    }
  }
  async getList(){ //拿商品列表
    const result = await this.service.product.getList()
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result,
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
      }
    }
  }
  async update(){ //商品上下架
    const result = await this.service.product.update(this.ctx.request.body)
    if (result.affectedRows > 0) {
      this.ctx.body = {
        code: 1,
        msg: '操作成功！',
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        msg: '操作失败！',
      }
    }
  }
  async add() {
    const result = await this.service.product.add(this.ctx.request.body)
    if (result.affectedRows > 0) {
      this.ctx.body = {
        code: 1,
        msg: '添加成功！',
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        msg: '添加失败！',
      }
    }
  }

  async edit() {
    const result = await this.service.product.edit(this.ctx.request.body)
    if (result.affectedRows > 0) {
      this.ctx.body = {
        code: 1,
        msg: '更新成功！',
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        msg: '更新失败！',
      }
    }
  }
  async del() {
    const result = await this.service.product.delete(this.ctx.query)
    if (result.affectedRows > 0) {
      this.ctx.body = {
        code: 1,
        msg: '删除成功！',
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        msg: '删除失败！',
      }
    }
  }
  async searchByType() {
    const result = await this.ctx.service.product.searchByType(this.ctx.query);
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        msg: '搜索成功！',
        result,
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        msg: '暂无数据！',
      }
    }
  }
  async findByValue() {
    const result = await this.ctx.service.product.findByValue(this.ctx.query);
    console.log(result)
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        msg: '搜索成功！',
        result,
      }
    } else {
      // this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        msg: '暂无数据！',
      }
    }
  }
  async getDetail(){
    const result = await this.ctx.service.product.getDetail(this.ctx.query);
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result,
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
      }
    }
  }
  async getTwoList(){ //拿所有二级分类
    const result = await this.ctx.service.product.getTwoList();
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result,
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
      }
    }
  }


  /**
   * 添加一级列表分类
   *  @ t_text,string  类型字段
   *  @ t_type number 分类类型
   */
  async typeAdd() {

    const result = await this.service.product.typeAdd(this.ctx.request.body)
    console.log(result)
    if (result.affectedRows > 0) {
      this.ctx.body = {
        code: 1,
        msg: '添加成功！',
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        msg: '添加失败！',
      }
    }
  }
  /**
   * 添加二级列表
   *  @ s_text,string  二级列表字段
   *  @ t_type,number  一级列表类型
   *  @ s_type number  二级列表类型
   */
  async sortAdd() {
    const result = await this.service.product.sortAdd(this.ctx.request.body)
    if (result.affectedRows > 0) {
      this.ctx.body = {
        code: 1,
        msg: '添加成功！',
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        msg: '添加失败！',
      }
    }
  }
  /**
   * 删除一级列表
   * @ tid string 一级列表id
   * 会导致这一级列表下的所有二级列表都被删除
   */
  async typeDel() {
    const result = await this.service.product.typeDel(this.ctx.query)
   
    if (result.affectedRows > 0) {
      this.ctx.body = {
        code: 1,
        msg: '删除成功！',
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        msg: '删除失败！',
      }
    }
  }
  /**
   * 删除二级列表
   * @ s_type number 二级列表类型
   */
  async sortDel() {
    const result = await this.service.product.sortDel(this.ctx.query)
    if (result.affectedRows > 0) {
      this.ctx.body = {
        code: 1,
        msg: '删除成功！',
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        msg: '删除失败！',
      }
    }
  }
  /**
   * 修改一级列表
   *  @ t_text,  string 一级列表字段
   *  @ t_type, number 一级列表类型
   *  @ tid  string  一级列表id
   */
  async typeEdit() {
    const result = await this.service.product.typeEdit(this.ctx.request.body)
    if (result.affectedRows > 0) {
      this.ctx.body = {
        code: 1,
        msg: '修改成功！',
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        msg: '修改失败！',
      }
    }
  }
  /**
   * 修改二级列表
   *  @ s_text,  string 二级列表字段
   *  @ t_type, number 一级列表类型
   *  @ s_type  number 二级列表类型
   */
  async sortEdit() {
    const result = await this.service.product.sortEdit(this.ctx.request.body)
    if (result.affectedRows > 0) {
      this.ctx.body = {
        code: 1,
        msg: '修改成功！',
      }
    } else {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        msg: '修改失败！',
      }
    }
  }
}

module.exports = ProductController;
