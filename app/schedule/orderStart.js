const Subscription = require("egg").Subscription;


class OrderStart extends Subscription{
    static get schedule(){
        return{
            interval : '2s',
            //cron: '*/15 * * * * *',
            type : "all",
        }     
    }

    async subscribe(){
        await this.ctx.service.order.orderStart();
    }
}

module.exports = OrderStart;