const { Product } = require("../models");

function callSupabaseDbToBreakAutoPause() {
  try {
    Product.findAll();
  } catch (error) {}
}

module.exports = { callSupabaseDbToBreakAutoPause };
