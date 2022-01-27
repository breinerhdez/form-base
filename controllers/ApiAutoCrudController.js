const lang = require("../utils/lang");
const colors = require("colors");
const { getObjectsAndModel } = require("../utils/dynamicResources");

const index = async (req, res) => {
  try {
    // get path_name
    let { path_name } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      throw new Error("Not found information by path_name");
    }
    // destructure result query into variables
    let { dynamicModel } = result;

    let collectionObjects = await dynamicModel.find({});

    // response
    res.status(200).json({
      data: {
        items: collectionObjects,
      },
    });
  } catch (error) {
    console.log(colors.inverse.red(error.message));
    res.status(500).send(lang.ERROR_500);
  }
};

const store = async (req, res) => {
  try {
    // get path_name
    let { path_name, id } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      throw new Error("Not found information by path_name");
    }
    // destructure result query into variables
    let { dynamicModel } = result;

    // create new object
    let newObj = new dynamicModel(req.body);
    // save data
    await newObj.save();

    // response
    res.status(201).json({
      item: newObj,
    });
  } catch (error) {
    console.log(colors.inverse.red(error.message));
    res.status(500).send(lang.ERROR_500);
  }
};

const update = async (req, res) => {
  try {
    // get path_name
    let { path_name, id } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      throw new Error("500");
    }
    // destructure result query into variables
    let { dynamicModel } = result;

    // check if object exists
    let objDb = await dynamicModel.findById(id);
    if (!objDb) {
      throw new Error("404");
    }

    // update object
    let resObj = Object.assign(objDb, req.body);
    // save object
    await resObj.save();

    // response
    res.status(200).json({
      item: resObj,
    });
  } catch (error) {
    console.log(colors.inverse.red(error.message));
    if (error.message == "404") {
      return res.status(404).send(lang.ERROR_404);
    }
    res.status(500).send(lang.ERROR_500);
  }
};

const destroy = async (req, res) => {
  try {
    // get path_name
    let { path_name, id } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      throw new Error("500");
    }

    // destructure result query into variables
    let { dynamicModel } = result;

    // check if object exists
    let objDb = await dynamicModel.findById(id);
    if (!objDb) {
      throw new Error("404");
    }
    // delete object
    await dynamicModel.findByIdAndDelete(id);

    // response
    res.status(200).json({
      item: objDb,
    });
  } catch (error) {
    console.log(colors.inverse.red(error.message));
    if (error.message == "404") {
      return res.status(404).send(lang.ERROR_404);
    }
    res.status(500).send(lang.ERROR_500);
  }
};

const show = async (req, res) => {
  try {
    // get path_name
    let { path_name, id } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      throw new Error("500");
    }

    // destructure result query into variables
    let { dynamicModel } = result;

    // check if object exists
    let objDb = await dynamicModel.findById(id);
    if (!objDb) {
      throw new Error("404");
    }

    // response
    res.status(200).json({
      item: objDb,
    });
  } catch (error) {
    console.log(colors.inverse.red(error.message));
    if (error.message == "404") {
      return res.status(404).send(lang.ERROR_404);
    }
    res.status(500).send(lang.ERROR_500);
  }
};
module.exports = { index, store, update, destroy, show };
