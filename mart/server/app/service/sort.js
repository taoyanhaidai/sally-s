'use strict';

const Service = require('egg').Service;
class SortService extends Service {
    async oneDel({ t_type }) { //删除一级
        const $sql = 'DELETE FROM `type`.`sort`.`product` WHERE  `t_type`=?';
        const $params = [t_type];
        return await this.ctx.app.mysql.query($sql, $params)
      }
      async oneAdd({ t_text,t_type }) { //添加一级
        const $sql = `INSERT INTO 'type' ('t_text', 't_type') VALUES (?, ?);`;
        const $params = [t_text,t_type];
        return await this.ctx.app.mysql.query($sql, $params)
      }
}
module.exports = SortService;