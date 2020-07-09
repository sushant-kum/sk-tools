module.exports = {
  name: 'tools',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/tools',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
