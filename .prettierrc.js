module.exports = {
  overrides: [
    {
      files: "*.sol",
      rules: {
        "unit-case": null,
      },
      options: {
        bracketSpacing: false,
        printWidth: 300,
        tabWidth: 4,
        useTabs: false,
        singleQuote: false,
        explicitTypes: "always",
      },
    },
    {
      files: "*.ts",
      options: {
        printWidth: 145,
        semi: false,
        tabWidth: 4,
        trailingComma: "es5",
      },
    },
  ],
};
