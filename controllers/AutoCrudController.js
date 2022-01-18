const Form = require("../lib/form/Form");
const { getObjectsAndModel } = require("../utils/dynamicResources");

const index = async (req, res) => {
  let { path_name } = req.params;

  let result = await getObjectsAndModel(path_name, req);
  if (!result) {
    res.redirect("/admin");
  }

  let { collection } = result;

  let objForm = new Form("#", collection.form.fields);

  res.render("autoCrud/index", {
    title: collection.title,
    collection,
    objForm,
  });
};

module.exports = { index };
