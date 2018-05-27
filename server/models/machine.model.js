import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Machine Schema
 */
var Schema = mongoose.Schema;
const MachineSchema = new mongoose.Schema({
  instanceId: {type: String, required: true, default: "00"},
  name: {type: String, required: true},
	machineType: {type: String, required: true, enum: ['SPM', 'Maintenance', 'CNC', 'PLC'], default: 'Maintenance'},
	axis: {type: Number, required: true, enum: [2, 2.5, 3, 5], default: 2},
	plant: {type: Schema.ObjectId, ref: 'Plant', required: false},
	department :{type: Schema.ObjectId, ref: 'Department', required: true},
	hourlycost: {type: Number, required: false},
	make: {type: String, required: false},
	model: {type: String, required: false},
	srnumber: {type: String, required: true},
	jobsizeLength: {type: Number, required: true},
	jobsizeWidth: {type: Number, required: true},
	jobsizeHeight: {type: Number, required: true}  
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
MachineSchema.method({
});

/**
 * Statics
 */
MachineSchema.statics = {
  /**
   * Get Machine
   * @param {ObjectId} id - The objectId of Machine.
   * @returns {Promise<Machine, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((machine) => {
        if (machine) {
          return machine;
        }
        const err = new APIError('No such Machine exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Machines in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Machines to be skipped.
   * @param {number} limit - Limit number of Machines to be returned.
   * @returns {Promise<Machine[]>}
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
 * @typedef Machine
 */
export default mongoose.model('Machine', MachineSchema);
