/*
 * @Author: heinan 
 * @Date: 2020-07-14 14:44:39 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: yyyy-09-Fr 04:49:49
 */
'use strict';

const Controller = require('egg').Controller;
const { nameCreator,tokenCreator, getUserByToken, uploadImage,verifyToken } = require('../utils');
const { JWT_KEYGEN } = require('../config');


class UserController extends Controller {
  /**
   * 用户登录接口
   * @ username  String 用户名
   * @ password  String 用户密码
   */
  async login() { 
    const result = await this.ctx.service.user.login(this.ctx.request.body);
    console.log(result)
    
    if (result.length) {
      const token = tokenCreator(result[0].uid, JWT_KEYGEN)
      this.ctx.body = {
        code: 1,
        token,
        result,
        msg: '登录成功!',
      }
    } else {
      this.ctx.body = {
        code: 0,
        msg: '登录失败!',
      }
    }
  }

  async codelogin(){
    const result = await this.ctx.service.user.codelogin(this.ctx.request.body);
    console.log(result)
    
    if (result.length) {
      const token = tokenCreator(result[0].uid, JWT_KEYGEN)
      this.ctx.body = {
        code: 1,
        token,
        result,
        msg: '登录成功!',
      }
    } else {
      this.ctx.body = {
        code: 0,
        msg: '登录失败!',
      }
    }
  }
  /**
   * 用户注册接口
   * @ username  String 用户名
   * @ password  String 用户密码
   */
  async registry() {
    try {
      this.ctx.validate({ username: 'string', password: 'string' });
    } catch (err) {
      this.ctx.status = 406;
      this.ctx.body = {
        code: 0,
        error: err.errors,
      };
      return;
    }
    const hasUser = await this.ctx.service.user.find(this.ctx.request.body);
    if (hasUser.length) {
      this.ctx.status = 403;
      this.ctx.body = {
        code: 0,
        msg: `用户名：'${this.ctx.request.body.username}'已经存在!`,
      }
    } else {
      const result = await this.ctx.service.user.registry(this.ctx.request.body);
      if (result.affectedRows > 0) {
        this.ctx.body = {
          code: 1,
          msg: '注册成功！',
        }
      } else {
        this.ctx.status = 500;
        this.ctx.body = {
          code: 0,
          msg: '注册失败！',
        }
      }
    }

  }


  async bindmobile(){
    const result = await this.ctx.service.user.bindmobile(this.ctx.request.body);

    
    if (result.affectedRows > 0) {
      this.ctx.body = {
        code: 1,

        msg: '绑定成功!',
      }
    } else {
      this.ctx.body = {
        code: 0,
        msg: '绑定失败!',
      }
    }
  }
  /**
   * 通过token换取用户id 
   * @  token string 登录得token
   */
  async getUserByToken() {
    const { token } = this.ctx.query;

    const uid = await verifyToken(token,JWT_KEYGEN) //解密token
    
    if(uid){
      this.ctx.body = {
        code: 1,
        uid:uid,
      }
    }
    
  }

  /**
   * 通过用户id获得用户信息
   */
  async getUserInfo() {
    const result = await this.ctx.service.user.getUserInfo(this.ctx.query);
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        data: result[0],
      }
    } else {
      this.ctx.status = 403;
      this.ctx.body = {
        code: 0,
        msg: '没有数据！',
      }
    }
  }

  /**
   * 头像上传
   */
  //TODO
  async upload() {
    const { ctx } = this;

    const file = ctx.request.files[0];
    const filePath = require('path').normalize(file.filepath);
    const fileName = nameCreator(file.filename);
    const result = await ctx.service.user.upload(filePath,fileName)

    if (result) {
      ctx.status = 403;
      ctx.body = {
        code: 0,
        msg: '上传失败！',
        result,
      };
    } else {
      const imgUrl = `http://localhost:7001/public/upload/${fileName}`;
      const updateAvatar = await ctx.service.user.updateAvatar({uid:ctx.request.url.split('=')[1],imgUrl})

      if(updateAvatar.affectedRows>0){
        ctx.status = 200;
        ctx.body = {
          code: 1,
          msg: '上传成功！',
          imgUrl,
        }
      }else{
        ctx.status = 500;
        ctx.body = {
          code:0,
          msg:'上传失败！'
        }
      }
     
    }
  }

  async addIdentiry() {
    const result = await this.service.user.addIdentiry(this.ctx.request.body)
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

  async identiryList() {
    const result = await this.service.user.identiryList();
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        data: result[0],
      }
    } else {
      this.ctx.status = 403;
      this.ctx.body = {
        code: 0,
        msg: '没有数据！',
      }
    }
  }
  async getIdentity(){
    const result = await this.service.user.getIdentity(this.ctx.request.body)
    // console.log(result)
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result
      }
    } else {
      this.ctx.status = 403;
      this.ctx.body = {
        code: 0,
        msg: '没有数据！',
      }
    }
  }
}

module.exports = UserController;
