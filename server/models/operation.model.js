import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Operation Schema
 */
var Schema = mongoose.Schema;
const OperationSchema = new mongoose.Schema({
    name : {type: String, required: true},
    revision : {type: String, required: true},
    type : {type: String, required: true},
    releaseStatus :{type: String, required: true},
    estimatedTime : {type: Number, required: true},
    previousOperationId : {type: Schema.ObjectId, ref: 'Operation'},
    nextOperationId : {type: Schema.ObjectId, ref: 'Operation'},
    quantityProduced :{type: Number, required: true},
    machine : {type: Schema.ObjectId, ref: 'Machine'},
    tool : {type: Schema.ObjectId, ref: 'Tool'},
    comment : {type: String, required: true}
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
OperationSchema.method({
});

/**
 * Statics
 */
OperationSchema.statics = {
  /**
   * Get Part
   * @param {ObjectId} id - The objectId of Part.
   * @returns {Promise<Part, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((Operation) => {
        if (Operation) {
          return Operation;
        }
        const err = new APIError('No such Operation exists!', httpStatus.NOT_FOUND);
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
 * @typedef Operation
 */
export default mongoose.model('Operation', OperationSchema);
