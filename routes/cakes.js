const express = require('express');
const {
  getCakes,
  getCakeById,
  createCake,
  updateCake,
  deleteCake
} = require('../controllers/cakeController');

const { cakeValidationRules, validate } = require('../validators/cakeValidator');
const ensureAuthenticated = require('../middleware/authMiddleware'); // ✅ new middleware

const router = express.Router();

/**
 * @swagger
 * /api/cakes:
 *   get:
 *     summary: Get all cakes (Protected)
 *     security:
 *       - oauth: []
 *     responses:
 *       200:
 *         description: List of cakes
 *       401:
 *         description: Unauthorized
 */
router.get('/', ensureAuthenticated, getCakes); // ✅ protected

/**
 * @swagger
 * /api/cakes/{id}:
 *   get:
 *     summary: Get a cake by ID (Protected)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cake ID
 *     security:
 *       - oauth: []
 *     responses:
 *       200:
 *         description: A single cake
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cake not found
 */
router.get('/:id', ensureAuthenticated, getCakeById); // ✅ protected

/**
 * @swagger
 * /api/cakes:
 *   post:
 *     summary: Create a new cake (Protected)
 *     security:
 *       - oauth: []
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
 *       401:
 *         description: Unauthorized
 */
router.post('/', ensureAuthenticated, cakeValidationRules(), validate, createCake); // ✅ protected

/**
 * @swagger
 * /api/cakes/{id}:
 *   put:
 *     summary: Update an existing cake (Protected)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cake ID
 *     security:
 *       - oauth: []
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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cake not found
 */
router.put('/:id', ensureAuthenticated, cakeValidationRules(), validate, updateCake); // ✅ protected

/**
 * @swagger
 * /api/cakes/{id}:
 *   delete:
 *     summary: Delete a cake by ID (Protected)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cake ID
 *     security:
 *       - oauth: []
 *     responses:
 *       200:
 *         description: Cake deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cake not found
 */
router.delete('/:id', ensureAuthenticated, deleteCake); // ✅ protected

module.exports = router;
