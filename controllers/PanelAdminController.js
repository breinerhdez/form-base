const index = (req, res) => {
  res.render("panelAdmin/index", { title: "Admin" });
};

module.exports = { index };
