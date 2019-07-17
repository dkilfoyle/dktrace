import { RtError } from "./rt-error";

export class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  add(other) {
    if (!(other instanceof Color)) {
      throw new RtError(
        RtError.Code.INVALID_TYPE,
        "Color add can only accept a Color"
      );
    }
    return new Color(this.r + other.r, this.g + other.g, this.b + other.b);
  }

  subtract(other) {
    if (!(other instanceof Color)) {
      throw new RtError(
        RtError.Code.INVALID_TYPE,
        "Color subtract can only accept a Color"
      );
    }
    return new Color(this.r - other.r, this.g - other.g, this.b - other.b);
  }

  multiply(other) {
    if (other instanceof Color) {
      return new Color(this.r * other.r, this.g * other.g, this.b * other.b);
    }

    if (typeof other === "number") {
      return new Color(this.r * other, this.g * other, this.b * other);
    }

    throw new RtError(
      RtError.Code.INVALID_TYPE,
      "Colour can only be multiplied by Colour or scalar"
    );
  }

  toPPMString() {
    const r = Math.round(Math.min(Math.max(this.r, 0), 1.0) * 255.0);
    const g = Math.round(Math.min(Math.max(this.g, 0), 1.0) * 255.0);
    const b = Math.round(Math.min(Math.max(this.b, 0), 1.0) * 255.0);

    return r + " " + g + " " + b;
  }
}
