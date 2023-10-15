class World {
  constructor(graph, roadWidth = 80, roadRoundness = 10) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roadRoundness

    this.envelopes = []
    this.roadBorders = []

    this.generate()
  }

  generate() {
    this.envelopes.length = 0
    for (const seg of this.graph.segments) {
      this.envelopes.push(new Envelope(seg, this.roadWidth, this.roadRoundness))
    }

    this.roadBorders = Polygon.union(this.envelopes.map((env) => env.poly))
  }

  draw(ctx) {
    for (const env of this.envelopes) {
      env.draw(ctx, { fill: "#b5b5b5", stroke: "#b5b5b5", lineWidth: 15 })
    }
    for (const seg of this.graph.segments) {
      seg.draw(ctx, { color: "white", width: 4, dash: [10, 10] })
    }
    for (const seg of this.roadBorders) {
      seg.draw(ctx, { color: "white", width: 4 })
    }
  }
}
