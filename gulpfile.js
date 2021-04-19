const { src, dest, task, parallel, series } = require("gulp");
const babel = require("gulp-babel");
const clean = require("gulp-clean");

const { exec } = require("child_process");
const { promisify } = require("util");

const genJS = () =>
  src("src/**/*.tsx")
    .pipe(
      babel({
        presets: [
          ["@babel/preset-react"],
          ["@babel/preset-typescript"],
          ["@babel/preset-env"],
        ],
      })
    )
    .pipe(dest("dist"));

const genDeclaration = async function () {
  await promisify(exec)("yarn tsc");
  return src("src/**/*.d.ts").pipe(dest("dist"));
};

const delDeclaration = function () {
  return src("src/**/*.d.ts").pipe(clean());
};

const copyCSS = () => src("src/**/*.css").pipe(dest("dist"));

task(
  "default",
  series(parallel(genDeclaration, genJS), copyCSS, delDeclaration)
);
