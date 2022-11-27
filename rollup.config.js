const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");
const external = require("rollup-plugin-peer-deps-external");
const dts = require("rollup-plugin-dts").default;
const replace = require("@rollup/plugin-replace");
const terser = require("@rollup/plugin-terser");
const generatePackageJson = require("rollup-plugin-generate-package-json");
const packageJson = require("./package.json");
const fs = require("fs");

const getFolders = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const plugins = [
  external(),
  resolve(),
  replace({
    preventAssignment: true,
  }),
  commonjs(),
  typescript({
    tsconfig: "./tsconfig.json",
    useTsconfigDeclarationDir: true,
  }),
  terser(),
];

const subfolderPlugins = (subfolder) => [
  ...plugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${subfolder}`,
      private: true,
      main: "../cjs/index.js", // --> points to cjs format entry point of whole library
      module: "./index.js", // --> points to esm format entry point of subfolder
      types: "./index.d.ts", // --> points to types of subfolder
    },
  }),
];

const folderBuilds = getFolders("./src").map((folder) => {
  return {
    input: `src/${folder}/index.ts`,
    output: [
      {
        file: `dist/${folder}/index.js`,
        format: "esm",
        sourcemap: true,
        exports: "named",
      },
    ],
    external: ["react", "react-dom", "zod", "recoil"],
    plugins: subfolderPlugins(folder),
  };
});

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        exports: "named",
      },
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: "react-ts-lib",
        exports: "named",
      },
    ],
    external: ["react", "react-dom", "zod", "recoil"],
    plugins: [
      ...plugins,
      generatePackageJson({
        baseContents: {
          name: packageJson.name,
          description: packageJson.description,
          version: packageJson.version,
          repository: packageJson.repository,
          keywords: packageJson.keywords,
          author: packageJson.author,
          license: packageJson.license,
          homepage: packageJson.homepage,
          main: "./cjs/index.js",
          module: "./index.js",
          types: "./index.d.ts",
          peerDependencies: packageJson.peerDependencies,
          dependencies: packageJson.dependencies,
        },
      }),
    ],
  },
  ...folderBuilds,
];
