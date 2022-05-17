import { expect } from 'chai'
import 'mocha';
import { RangeList } from './rangeList'

describe('RangeList test', () => {
  const rl = new RangeList();

  it('add first range', () => {
    rl.add([1, 5]);
    expect(rl.toString()).to.equal('[1, 5)');
  })

  it('add range that has no intersection', () => {
    rl.add([10, 20]);
    expect(rl.toString()).to.equal('[1, 5) [10, 20)');
  })

  it('add range with same left and right', () => {
    rl.add([20, 20]);
    expect(rl.toString()).to.equal('[1, 5) [10, 20)');
  })

  it('add range intersected with the right of the origin ranges', () => {
    rl.add([20, 21]);
    expect(rl.toString()).to.equal('[1, 5) [10, 21)');
  })

  it('add range in the origin ranges', () => {
    rl.add([2, 4]);
    expect(rl.toString()).to.equal('[1, 5) [10, 21)');
  })

  it('add range that can expand origin range', () => {
    rl.add([3, 8]);
    expect(rl.toString()).to.equal('[1, 8) [10, 21)');
  })


  it('remove range with same left and right', () => {
    rl.remove([10, 10]);
    expect(rl.toString()).to.equal('[1, 8) [10, 21)');
  })

  it('remove range between a range', () => {
    rl.remove([10, 11]);
    expect(rl.toString()).to.equal('[1, 8) [11, 21)');
  })

  it('remove range in the middle of a range', () => {
    rl.remove([15, 17]);
    expect(rl.toString()).to.equal('[1, 8) [11, 15) [17, 21)');
  })

  it('remove range that cross multiple ranges', () => {
    rl.remove([3, 19]);
    expect(rl.toString()).to.equal('[1, 3) [19, 21)');
  })

})
