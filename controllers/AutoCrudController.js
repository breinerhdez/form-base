const lang = require("../utils/lang");
const Form = require("../lib/form/Form");
const { getObjectsAndModel } = require("../utils/dynamicResources");

const index = async (req, res) => {
  try {
    // get path_name
    let { path_name } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection } = result;
    // generate form object
    let objForm = new Form("#", collection.form.fields); // TODO: set action and remove, this is for create or edit
    // set view
    res.render("autoCrud/index", {
      title: collection.title,
      collection,
      objForm, // TODO: delete
    });
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

module.exports = { index };
