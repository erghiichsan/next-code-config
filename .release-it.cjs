const fs = require('fs');

const headerPartial = fs.readFileSync('changelog-template/header.hbs').toString();
const mainTemplate = fs.readFileSync('changelog-template/template.hbs').toString();

/** @type {import('release-it').Config} */
const releaseItConfig = {
  git: {
    commitMessage: 'chore: release v${version}',
    push: false,
    commit: false,
    tag: false
  },
  npm: {
    publish: false
  },
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      header: '# Changelog\n\nNotable changes to this project when development will be documented in this file.',
      writerOpts: {
        headerPartial,
        mainTemplate
      },
      preset: {
        name: 'conventionalcommits',
        types: [
          {
            type: 'feat',
            section: 'Added'
          },
          {
            type: 'fix',
            section: 'Fixed'
          }
        ]
      }
    }
  }
};

module.exports = releaseItConfig;
