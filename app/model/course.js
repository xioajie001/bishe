'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const courseSchema = new Schema({
    courseId: {type: String, required: true}, // 课程的id
    courseName: {type: String, required: true}, // 课程名称
    teacher: {type: String, required: true}, // 主讲老师
    courseInfo: {type: String, required: true} // 课程简介
    // name:String
    
})
  return mongoose.model('Course', courseSchema);
};