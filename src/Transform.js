import { RtError } from "@/rt-error";
import { Matrix } from "./Matrix";

export class Transform {
  static identity() {
    return new Matrix(4, 4, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  static translation(x, y, z) {
    return new Matrix(4, 4, [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1]);
  }
  static scale(x, y, z) {
    return new Matrix(4, 4, [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
  }
  static rotation_x(r) {
    return new Matrix(4, 4, [
      1,
      0,
      0,
      0,
      0,
      Math.cos(r),
      -Math.sin(r),
      0,
      0,
      Math.sin(r),
      Math.cos(r),
      0,
      0,
      0,
      0,
      1
    ]);
  }
  static rotation_y(r) {
    return new Matrix(4, 4, [
      Math.cos(r),
      0,
      Math.sin(r),
      0,
      0,
      1,
      0,
      0,
      -Math.sin(r),
      0,
      Math.cos(r),
      0,
      0,
      0,
      0,
      1
    ]);
  }
  static rotation_z(r) {
    return new Matrix(4, 4, [
      Math.cos(r),
      -Math.sin(r),
      0,
      0,
      Math.sin(r),
      Math.cos(r),
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ]);
  }
}
