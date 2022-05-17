type TwoIntegersRange = [number, number]

export class RangeList {
  private ranges: Array<TwoIntegersRange> = []

  /**
   * @param range -  Array of two integers
   */
  private typeAssert(range: TwoIntegersRange) {
    if(range.length !== 2) {
      throw Error('Range must be an array of two integers')
    }

    if (range[0] > range[1]) {
      throw Error('Range must be in ascending order')
    }
  }

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range: TwoIntegersRange) {
    this.typeAssert(range)

    let left = range[0];
    let right = range[1];
    let placed = false;
    const newRanges: Array<TwoIntegersRange> = [];

    for (let i = 0; i < this.ranges.length; i++){
      const rangeI = this.ranges[i]

      if (rangeI[1] < left) {
        // rangeI is completely before the insert range
        newRanges.push(rangeI);
      } else if (rangeI[0] > right) {
        // rangeI is to the right of the insert range, so add [left, right] and rangeI to the new ranges
        if (!placed) {
          newRanges.push([left, right]);
          placed = true;                    
        }
        newRanges.push(rangeI);
      } else {
        // rangeI is overlapping with the insert range, so add the overlapping part to the new ranges
        left = Math.min(left, rangeI[0]);
        right = Math.max(right, rangeI[1]);
      }
    }
    if(!placed){
      newRanges.push([left, right]);
    }

    this.ranges = newRanges;
  }
 
   /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range: TwoIntegersRange) {
    this.typeAssert(range)

    let left = range[0];
    let right = range[1];

    if(left === right) {
      return
    }

    const newRanges: Array<TwoIntegersRange> = [];

    for (let i = 0; i < this.ranges.length; i++){
      const rangeI = this.ranges[i]

      if (rangeI[1] < left || rangeI[0] > right) {
        // rangeI is completely before or after the remove range
        newRanges.push(rangeI);
      } else if(left > rangeI[0] && right < rangeI[1]) {
        // rangeI is completely contained in the remove range
        newRanges.push([rangeI[0], left]);
        newRanges.push([right, rangeI[1]]);
      } else if(left <= rangeI[0]){
        if(rangeI[1] > right) {
          newRanges.push([right, rangeI[1]]);
        } else {
          left = rangeI[1]
        }
      } else if(right >= rangeI[1]) {
        if(left > rangeI[0]) {
          newRanges.push([rangeI[0], left]);
        } else {
          right = rangeI[0]
        }       
      }
    }

    this.ranges = newRanges;
  }

  /**
   * Stringify the range list
   */
  toString() {
    let output = '';

    this.ranges.forEach((range, i) => {
      output += `[${range[0]}, ${range[1]})`

      if(i !== this.ranges.length - 1) {
        output += ` `
      }
    })

    return output
  }
  
  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    console.log(this.toString())
} }
