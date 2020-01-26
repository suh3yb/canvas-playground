'use strict';

class Particle {
  constructor(sceneWidth, sceneHeight, perspective, projectionCenters) {
    this.scene = Math.min(sceneWidth, sceneHeight);
    this.perspective = perspective;

    this.projectionCenterX = projectionCenters.x;
    this.projectionCenterY = projectionCenters.y;

    this.x = ((Math.random() - 0.5) * this.scene) / 1;
    this.y = ((Math.random() - 0.5) * this.scene) / 1;
    this.z = 10000;
    this.radius = 10;

    this.xProjected = 0;
    this.yProjected = 0;
    this.scaleProjected = 0;

    this.color = 0;
  }

  project() {
    this.scaleProjected = 1000 / (this.z + this.perspective);
    this.xProjected = this.x * this.scaleProjected + this.projectionCenterX;
    this.yProjected = this.y * this.scaleProjected + this.projectionCenterY;
  }

  draw(ctx) {
    this.project();
    ctx.fillStyle = `rgb(${this.color}, ${this.color}, ${this.color})`;
    if (this.z > this.perspective * -1) {
      ctx.beginPath();
      ctx.arc(
        this.xProjected,
        this.yProjected,
        this.radius * this.scaleProjected * 2,
        0,
        Math.PI * 2
      );
      // ctx.rect(
      //   this.xProjected - this.radius,
      //   this.yProjected - this.radius,
      //   this.radius * 2 * this.scaleProjected,
      //   this.radius * 2 * this.scaleProjected
      // );
      ctx.fill();
      this.z -= 50;
      this.color += 1.2;
    }
  }
}

export default Particle;
