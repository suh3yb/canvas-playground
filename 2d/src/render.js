'use strict';

const render = (canvasObj, Asset, assets = []) => {
  const {
    ctx,
    sceneWidth,
    sceneHeight,
    perspective,
    projectionCenters,
  } = canvasObj;
  ctx.clearRect(0, 0, sceneWidth, sceneHeight);

  assets.forEach(asset => {
    asset.draw(ctx);
  });
  assets.push(
    new Asset(sceneWidth, sceneHeight, perspective, projectionCenters)
  );

  if (assets.length > 800) assets.shift();

  window.requestAnimationFrame(
    render.bind(undefined, canvasObj, Asset, assets)
  );
};

export default render;
