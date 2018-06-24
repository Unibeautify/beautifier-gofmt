import {
  Beautifier,
  BeautifierBeautifyData,
  DependencyType,
  ExecutableDependency,
  RunOptions,
} from "unibeautify";
import * as readPkgUp from "read-pkg-up";
import * as path from "path";

const { pkg } = readPkgUp.sync({ cwd: __dirname });

export const beautifier: Beautifier = {
  name: "Gofmt",
  package: pkg,
  badges: [
    {
      description: "Build Status",
      url:
        "https://travis-ci.com/Unibeautify/beautifier-gofmt.svg?branch=master",
      href: "https://travis-ci.com/Unibeautify/beautifier-gofmt",
    },
  ],
  options: {
    Go: true,
  },
  dependencies: [
    {
      type: DependencyType.Executable,
      name: "Gofmt",
      program: "gofmt",
      homepageUrl: "https://golang.org/cmd/gofmt/",
      installationUrl: "https://golang.org/doc/install",
      bugsUrl: "https://github.com/golang/go/issues",
    },
  ],
  beautify({ text, dependencies }: BeautifierBeautifyData) {
    const gofmt = dependencies.get<ExecutableDependency>("Gofmt");
    return gofmt
      .run({ args: [], stdin: text })
      .then(({ exitCode, stderr, stdout }) => {
        if (exitCode) {
          return Promise.reject(stderr);
        }
        return Promise.resolve(stdout);
      });
  },
};

export default beautifier;
