const { schemaKeys } = require("./create");
const { updatedSchemaKeys } = require("./update");
const {
  activate,
  isDefault,
  webVisible,
  sequence,
} = require("./partialUpdate");
const { listSchemaKeys } = require("./list");
const { masterDelete } = require("./delete");

module.exports = {
  schemaKeys,
  updatedSchemaKeys,
  activate,
  isDefault,
  webVisible,
  sequence,
  listSchemaKeys,
  masterDelete,
};
