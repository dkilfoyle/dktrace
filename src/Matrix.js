import { RtError } from "@/rt-error";
import { Tuple } from "@/Tuple";

export class Matrix {
  constructor(rows, cols, data) {
    if (data && rows * cols !== data.length) {
      throw new RtError("Matrix constructor row cols data size mismatch");
    }
    this.rows = rows || 4;
    this.cols = cols || 4;
    this.data = data || new Array(rows * cols);
  }
  at(row, col) {
    return this.data[row * this.cols + col];
  }
  set(row, col, val) {
    this.data[row * this.cols + col] = val;
  }
  equals(other) {
    if (!(other instanceof Matrix)) {
      throw new RtError(
        RtError.Code.INVALID_TYPE,
        "Matrix equals can only accept a Matrix"
      );
    }
    if (this.rows !== other.rows) return false;
    if (this.cols !== other.cols) return false;
    return this.data.every((x, i) => other.data[i] === x);
  }
  multiply(other) {
    if (other instanceof Tuple) {
      const res = [0, 0, 0, 0];
      const otherv = [other.x, other.y, other.z, other.w];
      for (let r = 0; r < 4; r++) {
        let v = 0;
        for (let i = 0; i < 4; i++) {
          v += this.at(r, i) * otherv[i];
        }
        res[r] = v;
      }
      return new Tuple(res[0], res[1], res[2], res[3]);
    }
    if (other instanceof Matrix) {
      const m = new Matrix(other.rows, other.cols);
      for (let r = 0; r < other.rows; r++) {
        for (let c = 0; c < other.cols; c++) {
          let v = 0;
          for (let i = 0; i < other.rows; i++) {
            v += this.at(r, i) * other.at(i, c);
          }
          m.set(r, c, v);
        }
      }
      return m;
    }
    throw new RtError(
      RtError.Code.INVALID_TYPE,
      "Matrix multiply can only accept a Matrix"
    );
  }
  transpose() {
    const m = new Matrix(this.rows, this.cols);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        m.set(c, r, this.at(r, c));
      }
    }
    return m;
  }
  determinant() {
    if (this.rows === 2 && this.cols === 2) {
      return this.data[0] * this.data[3] - this.data[1] * this.data[2];
    }
    let det = 0;
    for (let c = 0; c < this.cols; c++) {
      det += this.at(0, c) * this.cofactor(0, c);
    }
    return det;
  }
  submatrix(r, c) {
    const newdata = [];
    for (let ri = 0; ri < this.rows; ri++) {
      for (let ci = 0; ci < this.cols; ci++) {
        if (r !== ri && c !== ci) {
          newdata.push(this.at(ri, ci));
        }
      }
    }
    return new Matrix(this.rows - 1, this.cols - 1, newdata);
  }
  minor(r, c) {
    return this.submatrix(r, c).determinant();
  }
  cofactor(r, c) {
    return this.minor(r, c) * ((r + c) % 2 ? -1 : 1);
  }
}
