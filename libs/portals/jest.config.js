module.exports = {
  name: 'portals',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/portals',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
