'use strict';

class Dot {
  constructor(sceneWidth, sceneHeight, perspective, projectionCenters) {
    this.sceneWidth = sceneWidth;
    this.sceneHeight = sceneHeight;
    this.perspective = perspective;

    this.projectionCenterX = projectionCenters.x;
    this.projectionCenterY = projectionCenters.y;

    this.x = ((Math.random() - 0.5) * this.sceneWidth) / 2;
    this.y = ((Math.random() - 0.5) * this.sceneHeight) / 2;
    this.z = Math.random() * this.sceneWidth;
    this.radius = 10;

    this.xProjected = 0;
    this.yProjected = 0;
    this.scaleProjected = 0;
  }

  project() {
    this.scaleProjected = this.perspective / (this.perspective + this.z);
    this.xProjected = this.x * this.scaleProjected + this.projectionCenterX;
    this.yProjected = this.y * this.scaleProjected + this.projectionCenterY;
  }

  draw(ctx) {
    this.project();
    ctx.globalAlpha = Math.abs(1 - this.z / this.sceneWidth);
    ctx.fillStyle = '#fff';
    ctx.fillRect(
      this.xProjected - this.radius,
      this.yProjected - this.radius,
      this.radius * 2 * this.scaleProjected,
      this.radius * 2 * this.scaleProjected
    );
  }
}

export default Dot;
