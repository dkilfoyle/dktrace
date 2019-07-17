import { Color } from "@/Color";
import { RtError } from "@/rt-error";

export class Canvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.pixels = [];
    for (let i = 0; i < width * height; i++) {
      this.pixels.push(new Color(0, 0, 0));
    }
  }
  writePixel(x, y, col) {
    if (x >= this.width || y >= this.height) {
      throw new RtError(
        RtError.Code.INVALID_TYPE,
        "Canvas write_pixel coordinate out of range"
      );
    }
    this.pixels[y * this.height + x] = col;
  }
  readPixel(x, y) {
    if (x >= this.width || y >= this.height) {
      throw new RtError(
        RtError.Code.INVALID_TYPE,
        "Canvas write_pixel coordinate out of range"
      );
    }
    return this.pixels[y * this.height + x];
  }
  static ppmScale(value) {
    if (value < 0) value = 0;
    if (value > 1) value = 1;
    return Math.round(value * 255);
  }
  writeValue(value) {
    const newValStr = " " + value.toString();
    if (this.lineLength + newValStr.length > 70) {
      this.ppm + "\n" + newValStr;
      this.lineLength = 0;
    } else {
      this.ppm += newValStr;
    }
    this.lineLength += newValStr.length;
  }
  toPPM() {
    let header = "P3\n" + this.width + " " + this.height + "\n255";
    let data = "";
    for (let y = 0; y < this.height; y++) {
      let line = "";
      for (let x = 0; x < this.width; x++) {
        const curPixel = this.readPixel(x, y).toPPMString();
        if (line.length + curPixel.length > 69) {
          data += line + "\n";
          line = curPixel;
        } else {
          if (line.length === 0) {
            line += curPixel;
          } else {
            line += " " + curPixel;
          }
        }
      }
      data = data + line + "\n";
    }
    return header + "\n" + data + "\n";
  }
}
