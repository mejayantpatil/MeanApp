import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },
  // POST /api/work
  createWork: {
    body: {
      workId: Joi.string().required(),
      scheduledTime: Joi.string().required()
    }
  },
  // POST /api/workorder
  createWorkorder: {
    body: {
      workorderName: Joi.string().required(),
      clientName: Joi.string().required(),
      priority: Joi.string().required()
    }
  },

  // POST /api/plant
  createPlant: {
    body: {
      name: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      pincode: Joi.number().required()
    }
  },
  // POST /api/department
  createDepartment: {
    body: {
      name: Joi.string().required(),
      shop: Joi.string().required(),
      plant: Joi.string().required()
    }
  },
  // POST /api/machine
  createMachine: {
    body: {
      instanceId: Joi.string().required(),
      name: Joi.string().required(),
      plant: Joi.string().required(),
      department: Joi.string().required(),
      hourlycost: Joi.number().required(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      srnumber: Joi.string().required(),
      jobsizeLength: Joi.number().required(),
      jobsizeWidth: Joi.number().required(),
      jobsizeHeight: Joi.number().required()
    }
  },
  // POST /api/tool
  createTool: {
    body: {
      instanceId: Joi.string().required(),
      name: Joi.string().required(),
      plant: Joi.string().required(),
      department: Joi.string().required(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      srnumber: Joi.string().required(),
      toolsizeLength: Joi.number().required(),
      toolsizeWidth: Joi.number().required(),
      toolsizeHeight: Joi.number().required()
    }
  },

  // POST /api/customer
  createCustomer: {
    body: {
      name: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      desc: Joi.string().required(),
      pincode: Joi.number().required()
    }
  },

  // POST /api/posts
  createPost: {
    body: {
      title: Joi.string().required(),
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // UPDATE /api/plants/:plantId
  updatePlant: {
    body: {
      name: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      pincode: Joi.number().required()
    },
    params: {
      plantId: Joi.string().hex().required()
    }
  },

// UPDATE /api/machine/:machineId
updateMachine: {
  body: {
    instanceId: Joi.string().required(),
    name: Joi.string().required(),
    plant: Joi.string().required(),
    department: Joi.string().required(),
    hourlycost: Joi.number().required(),
    make: Joi.string().required(),
    model: Joi.string().required(),
    srnumber: Joi.string().required(),
    jobsizeLength: Joi.number().required(),
    jobsizeWidth: Joi.number().required(),
    jobsizeHeight: Joi.number().required()
  },
  params: {
    machineId: Joi.string().hex().required()
  }
},

// UPDATE /api/tool/:toolId
updateTool: {
  body: {
    instanceId: Joi.string().required(),
    name: Joi.string().required(),
    plant: Joi.string().required(),
    department: Joi.string().required(),
    make: Joi.string().required(),
    model: Joi.string().required(),
    srnumber: Joi.string().required(),
    toolsizeLength: Joi.number().required(),
    toolsizeWidth: Joi.number().required(),
    toolsizeHeight: Joi.number().required()
  },
  params: {
    toolId: Joi.string().hex().required()
  }
},

// UPDATE /api/customer/:customerId
updateCustomer: {
  body: {
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    desc: Joi.string().required(),
    pincode: Joi.number().required()
  },
  params: {
    customerId: Joi.string().hex().required()
  }
},

// UPDATE /api/plants/:plantId
  updateDepartment: {
    body: {
      name: Joi.string().required(),
      shop: Joi.string().required(),
      plant: Joi.string().required()
    },
    params: {
      departmentId: Joi.string().hex().required()
    }
  },

 // POST /api/workorder/:workorderId
 updateWorkorder: {
  body: {
    workorderName: Joi.string().required(),
    clientName: Joi.string().required(),
    priority: Joi.string().required()
  },
  params: {
    workorderId: Joi.string().hex().required()
  }
},

  // UPDATE /api/posts/:postId
  updatePost: {
    body: {
      title: Joi.string().required(),
    },
    params: {
      postId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
