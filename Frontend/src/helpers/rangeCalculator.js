export function lipidRange(marker, value) {
    const ranges = {
      'Total Cholesterol': [
        { range: 'Normal', min: 0, max: 199 },
        { range: 'Borderline', min: 200, max: 239 },
        { range: 'Abnormal', min: 240, max: Infinity }
      ],
      'LDL Cholesterol': [
        { range: 'Normal', min: 0, max: 99 },
        { range: 'Borderline', min: 100, max: 129 },
        { range: 'Abnormal', min: 130, max: Infinity }
      ],
      'HDL Cholesterol': [
        { range: 'Normal', min: 40, max: Infinity },
        { range: 'Borderline', min: 0, max: 39 }
      ],
      'Triglycerides': [
        { range: 'Normal', min: 0, max: 149 },
        { range: 'Borderline', min: 150, max: 199 },
        { range: 'Abnormal', min: 200, max: Infinity }
      ],
      'VLDL Cholesterol': [
        { range: 'Normal', min: 5, max: 40 },
        { range: 'Borderline', min: 41, max: Infinity }
      ],
      'Total Cholesterol/HDL Ratio': [
        { range: 'Normal', min: 0, max: 4.9 },
        { range: 'Borderline', min: 5, max: 5.9 },
        { range: 'Abnormal', min: 6, max: Infinity }
      ],
      'LDL Cholesterol/HDL Ratio': [
        { range: 'Normal', min: 0, max: 3.4 },
        { range: 'Borderline', min: 3.5, max: 4.4 },
        { range: 'Abnormal', min: 4.5, max: Infinity }
      ],
      'Triglyceride to HDL Ratio': [
        { range: 'Normal', min: 0, max: 1.9 },
        { range: 'Borderline', min: 2, max: 3.9 },
        { range: 'Abnormal', min: 4, max: Infinity }
      ]
    };
  
    const rangesForMarker = ranges[marker];
    const abnormalRange = rangesForMarker?.find(range => range.range === 'Abnormal');
    const normalRange = rangesForMarker?.find(range => range.range === 'Normal');
  
    if (abnormalRange) {
      const percentage = value / (abnormalRange.min) * 100;
      return { range: abnormalRange?.range, percentage };
    } else if (normalRange) {
      const percentage = (value / normalRange.max) * 100;
      return { range: normalRange?.range, percentage };
    } else {
      return 'Invalid Marker';
    }
  }
  

  export function cancerMarkerRange(marker, value) {
    const ranges = {
      PSAT: { normal: [0, 4], borderline: [4, 10], abnormal: [10, Infinity] },
      CA125: { normal: [0, 35], borderline: [35, 65], abnormal: [65, Infinity] },
      CEA: { normal: [0, 3], borderline: [3, 5], abnormal: [5, Infinity] },
      AFP: { normal: [0, 10], borderline: [10, 20], abnormal: [20, Infinity] },
      CA19_9: { normal: [0, 37], borderline: [37, 100], abnormal: [100, Infinity] },
      CA15_3: { normal: [0, 30], borderline: [30, 40], abnormal: [40, Infinity] },
      CA27_29: { normal: [0, 38], borderline: [38, 50], abnormal: [50, Infinity] },
    };
  
    const rangeKeys = Object?.keys(ranges);
  
    if (!rangeKeys.includes(marker)) {
      throw new Error('Invalid cancer marker');
    }
  
    const range = ranges[marker];
  
    if (value >= range.normal[0] && value < range.normal[1]) {
      return { range: 'Normal', percentage: (value/range.abnormal[0])*100 };
    } else if (value >= range.borderline[0] && value < range.borderline[1]) {
      return { range: 'Borderline', percentage: (value/range.abnormal[0])*100 };
    } else if (value >= range.abnormal[0] && value < range.abnormal[1]) {
      return { range: 'Abnormal', percentage: (value/range.abnormal[0])*100 };
    } else {
      throw new Error('Invalid marker value');
    }
  }
  

 export function colour (status){
    let backgroundColor;
  if (status === 'Normal') {
    backgroundColor = 'lightgreen';
  } else if (status === 'Abnormal') {
    backgroundColor = 'lightcoral';
  } else if (status === 'Borderline') {
    backgroundColor = 'lightyellow';
  }
  return backgroundColor;
  }
  