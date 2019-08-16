module.exports = {
    "presets": [
      ["@babel/preset-env", {
        "targets": {
          "node": "current"
        }
      }],
      "minify"
    ],
    "sourceMaps": true,
    "plugins": ["@babel/plugin-proposal-class-properties"]
};