class Graph {
  constructor(points = [], segments = []) {
    this.points = points
    this.segments = segments
  }

  static load(info) {
    const points = info.points.map((i) => new Point(i.x, i.y))
    const segments = info.segments.map(
      (i) =>
        new Segment(
          points.find((p) => p.equals(i.p1)),
          points.find((p) => p.equals(i.p2))
        )
    )

    return new Graph(points, segments)
  }

  hash() {
    return JSON.stringify(this)
  }

  addPoint(point) {
    this.points.push(point)
  }

  addSegment(seg) {
    this.segments.push(seg)
  }

  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1)
  }

  getSegmentsWithPoint(point) {
    return this.segments.filter((seg) => seg.includes(point))
  }

  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point)
    for (const seg of segs) {
      this.removeSegment(seg)
    }
    this.points.splice(this.points.indexOf(point), 1)
  }
  tryAddPoint(point) {
    if (!this.hasPoint(point)) {
      this.addPoint(point)
      return true
    }
    return false
  }

  tryAddSegment(segment) {
    if (!this.hasSegment(segment) && !segment.p1.equals(segment.p2)) {
      this.addSegment(segment)
      return true
    }
    return false
  }

  hasPoint(point) {
    return this.points.find((p) => p.equals(point))
  }

  hasSegment(segment) {
    return this.segments.find((s) => s.equals(segment))
  }

  dispose() {
    this.points.length = 0
    this.segments.length = 0
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx)
    }

    for (const point of this.points) {
      point.draw(ctx)
    }
  }
}
