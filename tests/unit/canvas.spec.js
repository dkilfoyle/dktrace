import { Color } from "@/Color";
import { Canvas } from "@/Canvas";

describe("Canvas", () => {
  test("Creation", () => {
    const c = new Canvas(10, 20);
    const c1 = new Color(0, 0, 0);
    expect(c.width).toEqual(10);
    expect(c.height).toEqual(20);
    expect(c.pixels).toHaveLength(200);
    c.pixels.forEach(p => {
      expect(p).toEqual(c1);
    });
  });
  test("Write a pixel", () => {
    const c = new Canvas(10, 20);
    const red = new Color(1, 0, 0);
    c.writePixel(2, 3, red);
    expect(c.readPixel(2, 3)).toEqual(red);
  });
  describe("PPM", () => {
    test("canvas_to_ppm header", () => {
      const c = new Canvas(5, 3);
      const ppm = c.toPPM().split("\n");
      expect(ppm[0]).toEqual("P3");
      expect(ppm[1]).toEqual("5 3");
      expect(ppm[2]).toEqual("255");
    });
    test("PPM data", () => {
      const c = new Canvas(5, 3);
      c.writePixel(0, 0, new Color(1.5, 0, 0));
      c.writePixel(2, 1, new Color(0, 0.5, 0));
      c.writePixel(4, 2, new Color(-0.5, 0, 1));
      const ppm = c.toPPM().split("\n");
      expect(ppm[3]).toEqual("255 0 0 0 0 0 0 0 0 0 0 0 0 0 0");
      expect(ppm[4]).toEqual("0 0 0 0 0 0 0 128 0 0 0 0 0 0 0");
      expect(ppm[5]).toEqual("0 0 0 0 0 0 0 0 0 0 0 0 0 0 255");
    });
    test("PPM splits lines > 70", () => {
      const c = new Canvas(10, 2);
      for (let i = 0; i < 10; i++) {
        c.writePixel(i, 0, new Color(0, 0.5, 1));
        c.writePixel(i, 1, new Color(0, 0.5, 1));
      }
      const ppm = c.toPPM().split("\n");
      expect(ppm[3]).toEqual(
        "0 128 255 0 128 255 0 128 255 0 128 255 0 128 255 0 128 255 0 128 255"
      );
      expect(ppm[4]).toEqual("0 128 255 0 128 255 0 128 255");
    });
  });
});
