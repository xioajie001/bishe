'use strict';

module.exports = app =>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const complainSchema = new Schema({
        // complainId : {type : String, required : false},   //投诉id
        customerId : {type : String, required : true}, //客户id
        servicerId : {type : String, required : true},  //被投诉的专才的ID
        complainContent : {type : String, required : true},  //投诉内容
        complainDate : {type : Date, required : true} //投诉时间
    });
    return mongoose.model("Complain",complainSchema);
}