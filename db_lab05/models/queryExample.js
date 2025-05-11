// models/queryExample.js
const { Student, Course, Enrollment } = require('./index');

async function findUngraded() {
  try {
    const results = await Enrollment.findAll({
      where: {
        Grade: null
      },
      include: [
        {
          model: Student,
          attributes: ['Student_ID', 'Name']
        },
        {
          model: Course,
          attributes: ['Course_ID', 'Title']
        }
      ]
    });

    if (results.length === 0) {
      console.log('目前沒有未登記成績的資料');
      return;
    }

    console.log('未評分的選課記錄：');
    results.forEach(record => {
      console.log(`學生：${record.Student.Name} (${record.Student.Student_ID}), 課程：${record.Course.Title} (${record.Course.Course_ID})`);
    });
  } catch (err) {
    console.error('查詢失敗：', err);
  }
}

findUngraded();
