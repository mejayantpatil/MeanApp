import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Subworkorder Schema
 */
var Schema = mongoose.Schema;
const SubworkorderSchema = new mongoose.Schema({
    subworkorderName : {type : String, require: true},
    subworkorderDesc : {type : String, require: false},
    scheduledStart : {type : Date, require: true},
    scheduledEnd :{type : Date, require: true},
    actualStart :{type : Date, require: false},
    actualEnd :{type : Date, require: false},
    estimatedEfforts :{type : Number, require: true},
    actualEfforts:{type : Number, require: false},
    reasonsForDelay :[{type : String, require: false}],
    scrapCost: {type : Number, require: true},
    part : {type: Schema.ObjectId, ref: 'Part'}
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
SubworkorderSchema.method({
});

/**
 * Statics
 */
SubworkorderSchema.statics = {
  /**
   * Get Part
   * @param {ObjectId} id - The objectId of Part.
   * @returns {Promise<Part, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((Subworkorder) => {
        if (Subworkorder) {
          return Subworkorder;
        }
        const err = new APIError('No such Subworkorder exists!', httpStatus.NOT_FOUND);
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
 * @typedef Subworkorder
 */
export default mongoose.model('Subworkorder', SubworkorderSchema);
