const express = require('express');
const {
  getConsumers,
  getConsumerById,
  createConsumer,
  updateConsumer,
  deleteConsumer
} = require('../controllers/consumerController');

const { consumerValidationRules, validate } = require('../validators/consumerValidator');
const ensureAuthenticated = require('../middleware/authMiddleware'); // ✅ OAuth middleware

const router = express.Router();

/**
 * @swagger
 * /api/consumers:
 *   get:
 *     summary: Get all consumers (Protected)
 *     security:
 *       - oauth: []
 *     responses:
 *       200:
 *         description: List of consumers
 *       401:
 *         description: Unauthorized
 */
router.get('/', ensureAuthenticated, getConsumers); // GET all consumers

/**
 * @swagger
 * /api/consumers/{id}:
 *   get:
 *     summary: Get a consumer by ID (Protected)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Consumer ID
 *     security:
 *       - oauth: []
 *     responses:
 *       200:
 *         description: A single consumer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Consumer not found
 */
router.get('/:id', ensureAuthenticated, getConsumerById); // GET consumer by ID

/**
 * @swagger
 * /api/consumers:
 *   post:
 *     summary: Create a new consumer (Protected)
 *     security:
 *       - oauth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               preferredFlavor:
 *                 type: string
 *               allergies:
 *                 type: string
 *               orderHistory:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Consumer created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', ensureAuthenticated, consumerValidationRules(), validate, createConsumer); // POST new consumer

/**
 * @swagger
 * /api/consumers/{id}:
 *   put:
 *     summary: Update a consumer (Protected)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Consumer ID
 *     security:
 *       - oauth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               preferredFlavor:
 *                 type: string
 *               allergies:
 *                 type: string
 *               orderHistory:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Consumer updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Consumer not found
 */
router.put('/:id', ensureAuthenticated, consumerValidationRules(), validate, updateConsumer); // PUT update consumer

/**
 * @swagger
 * /api/consumers/{id}:
 *   delete:
 *     summary: Delete a consumer (Protected)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Consumer ID
 *     security:
 *       - oauth: []
 *     responses:
 *       200:
 *         description: Consumer deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Consumer not found
 */
router.delete('/:id', ensureAuthenticated, deleteConsumer); // DELETE consumer

module.exports = router;
