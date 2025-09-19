const express = require('express');
const {
  getConsumers,
  getConsumerById,
  createConsumer,
  updateConsumer,
  deleteConsumer
} = require('../controllers/consumerController');

const { consumerValidationRules, validate } = require('../validators/consumerValidator');

const router = express.Router();

/**
 * @swagger
 * /consumers:
 *   get:
 *     summary: Get all consumers
 *     responses:
 *       200:
 *         description: List of consumers
 */
router.get('/', getConsumers); // GET all consumers

/**
 * @swagger
 * /consumers/{id}:
 *   get:
 *     summary: Get a consumer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Consumer ID
 *     responses:
 *       200:
 *         description: A single consumer
 *       404:
 *         description: Consumer not found
 */
router.get('/:id', getConsumerById); // GET consumer by ID

/**
 * @swagger
 * /consumers:
 *   post:
 *     summary: Create a new consumer
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
 */
router.post('/', consumerValidationRules(), validate, createConsumer); // POST new consumer

/**
 * @swagger
 * /consumers/{id}:
 *   put:
 *     summary: Update an existing consumer
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Consumer ID
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
 *       404:
 *         description: Consumer not found
 */
router.put('/:id', consumerValidationRules(), validate, updateConsumer); // PUT update consumer

/**
 * @swagger
 * /consumers/{id}:
 *   delete:
 *     summary: Delete a consumer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Consumer ID
 *     responses:
 *       200:
 *         description: Consumer deleted
 *       404:
 *         description: Consumer not found
 */
router.delete('/:id', deleteConsumer); // DELETE consumer

module.exports = router;
