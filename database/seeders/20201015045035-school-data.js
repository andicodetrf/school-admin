'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //----TEACHERS
    await queryInterface.bulkInsert('teachers', [
      {
        name: 'Mr. PeterSd',
        email: 'petersd@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mr. SmithSd',
        email: 'smithsd@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    const teachers = await queryInterface.sequelize.query(
      `SELECT id from teachers;`
    );

    const teacher1ID = teachers[0][0].id
    const teacher2ID = teachers[0][1].id

    //----STUDENTS
    await queryInterface.bulkInsert('students', [
      {
        name: 'Student1 SD',
        email: 'student1sd@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Student2 SD',
        email: 'student2sd@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});


    const students = await queryInterface.sequelize.query(
      `SELECT id from students;`
    );

    const student1ID = students[0][0].id
    const student2ID = students[0][1].id


    //----TEACHERS STUDENTS JOIN TABLE
    await queryInterface.bulkInsert('teachers_students', [
      {teacherId: teacher1ID, studentId: student1ID, createdAt: new Date(), updatedAt: new Date()},
      {teacherId: teacher1ID, studentId: student2ID, createdAt: new Date(), updatedAt: new Date()},
      {teacherId: teacher2ID, studentId: student1ID, createdAt: new Date(), updatedAt: new Date()},
      {teacherId: teacher2ID, studentId: student2ID, createdAt: new Date(), updatedAt: new Date()},
    ], {});

    //----SUBJECTS
    await queryInterface.bulkInsert('subjects', [
      {
        name: 'EnglishSD',
        subjectCode: 'ENGSD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MathematicsSD',
        subjectCode: 'MATHSD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    const subjects = await queryInterface.sequelize.query(
      `SELECT id from subjects;`
    );

    const subjectENG = subjects[0][0].id
    const subjectMATH = subjects[0][1].id


    //----CLASSES
    await queryInterface.bulkInsert('tclasses', [
      {
        name: 'P1 IntegritySD',
        classCode: 'P1-ISD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'P2 IntegritySD',
        classCode: 'P2-ISD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});


    const classes = await queryInterface.sequelize.query(
      `SELECT id from tclasses;`
    );

    const classP1Int = classes[0][0].id
    const classP2Int = classes[0][1].id

    //----TEACHERS SUBJECTS CLASSES JOIN TABLE
    await queryInterface.bulkInsert('teachers_subs_classes', [
      {teacherId: teacher1ID, subjectId: subjectENG, tclassId: classP1Int, createdAt: new Date(), updatedAt: new Date()},
      {teacherId: teacher1ID, subjectId: subjectENG, tclassId: classP2Int, createdAt: new Date(), updatedAt: new Date()},
      {teacherId: teacher2ID, subjectId: subjectENG, tclassId: classP1Int, createdAt: new Date(), updatedAt: new Date()},
      {teacherId: teacher2ID, subjectId: subjectMATH, tclassId: classP1Int, createdAt: new Date(), updatedAt: new Date()},

    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('teachers', null, {});
    await queryInterface.bulkDelete('students', null, {});
    await queryInterface.bulkDelete('teachers_students', null, {});
    await queryInterface.bulkDelete('subjects', null, {});
    await queryInterface.bulkDelete('tclasses', null, {});
    await queryInterface.bulkDelete('teachers_subs_classes', null, {});
  }
};
