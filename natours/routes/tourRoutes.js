const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMothlyPlan,
} = require('../controllers/tourController');

const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', checkId);

// router.param('id', (req, res, next, val) => {
//   console.log(`Tour ID is ${val}`);
//   next();
// });
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/monthly-plan/:year').get(getMothlyPlan);
router.route('/tour-stats').get(getTourStats);

router.route('/').get(authController.protect, getAllTours).post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour,
  );

module.exports = router;
