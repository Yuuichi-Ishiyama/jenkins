module.exports = env => {
  return {
    databases: {
      management: require("../databases/config/management_config.json")[env]
    }
  }
};
