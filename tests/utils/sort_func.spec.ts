import { expect } from "chai";
import { compareStrings, compareStringsIgnoreCase, compareStringsFirstIgnoringCase } from "../../src/utils/sort_func.js"

describe("Sorting functions", () => {
  it("compareString with hello and Joshep", () => {
    expect(compareStrings("AntoNio", "MichaEL")).to.be.eql(-1)
    expect(compareStrings("MichaEL", "AntoNio")).to.be.eql(1)
  });

  it("compareStringIgnoreCase with AntoNio and MichaEL", () => {
    expect(compareStringsIgnoreCase("AntoNio", "MichaEL")).to.be.eql(-1)
    expect(compareStringsIgnoreCase("MichaEL", "AntoNio")).to.be.eql(1)
  });

  it("compareStringsFirstIgnoringCase with", () => {
    expect(compareStringsFirstIgnoringCase("AntoNio", "MichaEL")).to.be.eql(-1)
    expect(compareStringsFirstIgnoringCase("MichaEL", "AntoNio")).to.be.eql(1)
    expect(compareStringsFirstIgnoringCase("michael", "michael")).to.be.eql(0)
  });
});
