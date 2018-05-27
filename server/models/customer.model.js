import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Customer Schema
 */
var Schema = mongoose.Schema;
const CustomerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    pincode: {type: Number, required: true},
    desc: {type: String, required: true}
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
CustomerSchema.method({
});

/**
 * Statics
 */
CustomerSchema.statics = {
  /**
   * Get Customer
   * @param {ObjectId} id - The objectId of Customer.
   * @returns {Promise<Customer, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((Customer) => {
        if (Customer) {
          return Customer;
        }
        const err = new APIError('No such Customer exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Machines in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Machines to be skipped.
   * @param {number} limit - Limit number of Machines to be returned.
   * @returns {Promise<Customer[]>}
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
 * @typedef Customer
 */
export default mongoose.model('Customer', CustomerSchema);
