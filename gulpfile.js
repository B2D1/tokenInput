const { src, dest, task, parallel, series } = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const clean = require("gulp-clean");

const { exec } = require("child_process");
const { promisify } = require("util");
sass.compiler = require("node-sass");

const genCSS = () =>
  src("src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("lib"));

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
    .pipe(dest("lib"));

const genDeclaration = async function () {
  await promisify(exec)("yarn tsc");
  return src("src/**/*.d.ts").pipe(dest("lib"));
};

const delDeclaration = function () {
  return src("src/**/*.d.ts").pipe(clean());
};

task(
  "default",
  series(parallel(genCSS, genDeclaration, genJS), delDeclaration)
);
