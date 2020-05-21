'use strict';


const sillyTime = require("silly-datetime");
const Service = require('egg').Service;

class ContractService extends Service {

    // 合约表
    async getContract() {

        const { ctx,} = this;
        const id = await ctx.state.user.data.id;
        const data = ctx.request.body;
        
        const result = await ctx.model.Contract.find({servicerID : id})
        return { status : 0, msg : result }
            
    }
}
module.exports = ContractService;