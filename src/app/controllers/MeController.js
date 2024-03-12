const Course = require('../model/Course')

class MeController {
    // GET /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([Course.find({}).lean(), Course.countDocumentsWithDeleted({ deleted: true })])
            .then(([courses, deletedCount]) => {
                res.render('me/stored_courses', {
                    courses: courses,
                    deletedCount,
                });
            })
            .catch(next);
        }

    trashCourses(req, res, next) {
        Course.findWithDeleted({deleted: true})
        .lean()
        .then((course) => {
            res.render('me/trash_courses', {
                courses: course 
            });
        })
        .catch(next);
    }
}

module.exports = new MeController