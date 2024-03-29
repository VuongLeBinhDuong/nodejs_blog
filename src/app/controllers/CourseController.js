const Course = require('../model/Course')

class CourseController {
    // GET /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
          .lean()
          .then((course) => {
            res.render("courses/show", { course });
          })
          .catch(next);
    }

    // GET /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // POST /courses/store
    store(req, res, next) {
        const formData = req.body
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/0.jpg`
        const course = new Course(formData)
        course.save()
          .then(() => res.redirect('/me/stored/courses'))
          .catch(next);
    }

    // Get/courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
          .lean()
          .then((course) => {
            res.render('courses/edit', {course})
          })
          .catch(next);
    }

    // PUT /courses/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
          .lean()
          .then(() => res.redirect('/me/stored/courses'))
          .catch(next)
    }

    // DELETE /courses/:id
    delete(req, res, next) {
        Course.delete({_id: req.params.id}, req.body)
          .lean()
          .then(() => res.redirect('back'))
          .catch(next)
    }

    // DELETE PERMANENTLY /courses/:id/destroy
    destroy(req, res, next) {
        Course.deleteOne({_id: req.params.id}, req.body)
          .lean()
          .then(() => res.redirect('back'))
          .catch(next)
    }

    // PATCH /courses/:id
    restore(req, res, next) {
        Course.restore({_id: req.params.id}, req.body)
          .lean()
          .then(() => res.redirect('back'))
          .catch(next)
    }

}

module.exports = new CourseController