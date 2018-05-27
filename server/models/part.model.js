import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Part Schema
 */
var Schema = mongoose.Schema;
const PartSchema = new mongoose.Schema({
    customerPartId :{type: Number, required: true},
    name :{type: String, required: true} ,
    revision :{type: Number, required: true} ,
    partType : {type: String, required: true, enum: ['Assembly', 'Manufacture'], default: 'Manufacture'},
    processId :{type :Schema.ObjectId, ref :'Process'},
    subworkorder :{type : Schema.ObjectId, ref :"Subworkorder"}
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
PartSchema.method({
});

/**
 * Statics
 */
PartSchema.statics = {
  /**
   * Get Part
   * @param {ObjectId} id - The objectId of Part.
   * @returns {Promise<Part, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((Part) => {
        if (Part) {
          return Part;
        }
        const err = new APIError('No such Part exists!', httpStatus.NOT_FOUND);
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
 * @typedef Part
 */
export default mongoose.model('Part', PartSchema);
