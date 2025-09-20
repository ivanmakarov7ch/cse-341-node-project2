const express = require('express');
const {
  getCakes,
  getCakeById,
  createCake,
  updateCake,
  deleteCake
} = require('../controllers/cakeController');

const { cakeValidationRules, validate } = require('../validators/cakeValidator');

const router = express.Router();

/**
 * @swagger
 * /api/cakes:
 *   get:
 *     summary: Get all cakes
 *     responses:
 *       200:
 *         description: List of cakes
 */
router.get('/', getCakes); // GET all cakes

/**
 * @swagger
 * /api/cakes/{id}:
 *   get:
 *     summary: Get a cake by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cake ID
 *     responses:
 *       200:
 *         description: A single cake
 *       404:
 *         description: Cake not found
 */
router.get('/:id', getCakeById); // GET cake by ID


/**
 * @swagger
 * /api/cakes:
 *   post:
 *     summary: Create a new cake
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               size:
 *                 type: string
 *                 enum: [small, medium, large]
 *               price:
 *                 type: number
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Cake created
 *       400:
 *         description: Validation error
 */
router.post('/', cakeValidationRules(), validate, createCake); // POST new cake

/**
 * @swagger
 * /api/cakes/{id}:
 *   put:
 *     summary: Update an existing cake
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cake ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               size:
 *                 type: string
 *                 enum: [small, medium, large]
 *               price:
 *                 type: number
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Cake updated
 *       404:
 *         description: Cake not found
 */
router.put('/:id', cakeValidationRules(), validate, updateCake); // PUT update cake

/**
 * @swagger
 * /api/cakes/{id}:
 *   delete:
 *     summary: Delete a cake by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cake ID
 *     responses:
 *       200:
 *         description: Cake deleted
 *       404:
 *         description: Cake not found
 */
router.delete('/:id', deleteCake); // DELETE cake

module.exports = router;