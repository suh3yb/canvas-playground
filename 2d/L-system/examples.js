'use strict';

export default [
  {
    axiom: 'X',
    length: 50,
    lineCap: 'round',
    lineJoin: 'round',
    lineWidth: 50,
    angle: (Math.PI / 180) * 22.5,
    startFrom: 'bottom',
    reduceLengthBy: 2,
    reduceWidthBy: 1.01,
    rules: [
      {
        test: 'X',
        replace: 'F+[[X]-X]-F[-FX]+X',
      },
      {
        test: 'F',
        replace: 'FF',
      },
    ],
  },
  {
    axiom: 'F',
    length: 10,
    lineCap: 'round',
    lineJoin: 'round',
    lineWidth: 1,
    angle: (Math.PI / 180) * 90,
    startFrom: 'center',
    rules: [
      {
        test: 'F',
        replace: 'F+F-F-FF+F+F-F',
      },
    ],
  },
];
