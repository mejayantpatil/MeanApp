import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Plant Schema
 */
var Schema = mongoose.Schema;
const PlantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
    country: {type: String, required: true},
    pincode: {type: Number, required: true}
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
PlantSchema.method({
});

/**
 * Statics
 */
PlantSchema.statics = {
  /**
   * Get Part
   * @param {ObjectId} id - The objectId of Part.
   * @returns {Promise<Part, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((Plant) => {
        if (Plant) {
          return Plant;
        }
        const err = new APIError('No such Plant exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Parts in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Parts to be skipped.
   * @param {number} limit - Limit number of Parts to be returned.
   * @returns {Promise<Part[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Plant
 */
export default mongoose.model('Plant', PlantSchema);
