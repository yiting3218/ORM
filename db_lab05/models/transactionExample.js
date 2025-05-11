const { sequelize, Student, Course, Enrollment } = require('./index');

async function transferStudent(studentId, oldDeptId, newDeptId) {
  const t = await sequelize.transaction();
  const currentSemester = '112-2'; 

  try {

    await Student.update(
      { Department_ID: newDeptId },
      { where: { Student_ID: studentId }, transaction: t }
    );

    const oldCourses = await Course.findAll({
      where: {
        Department_ID: oldDeptId,
        Is_Required: true
      },
      transaction: t
    });
    const oldCourseIds = oldCourses.map(course => course.Course_ID);

    await Enrollment.update(
      { Status: '轉系退選' },
      {
        where: {
          Student_ID: studentId,
          Course_ID: oldCourseIds
        },
        transaction: t
      }
    );

    const newCourses = await Course.findAll({
      where: {
        Department_ID: newDeptId,
        Is_Required: true
      },
      transaction: t
    });

    for (const course of newCourses) {
      await Enrollment.create(
        {
          Student_ID: studentId,
          Course_ID: course.Course_ID,
          Semester_ID: currentSemester,
          Enrollment_Date: new Date(),
          Status: '轉系加選'
        },
        { transaction: t }
      );
    }

    await t.commit();
    console.log('轉系處理完成');
  } catch (err) {
    await t.rollback();
    console.error('轉系處理失敗：', err);
  }
}

// 範例
transferStudent('S10721001', 'EE001', 'CS001');
