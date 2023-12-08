const records_1 = {
  47: 207,
  84: 1394,
  74: 1209,
  67: 1014,
};

const records_2 = {
  47847467: 207139412091014,
};

raceRecords(records_1);
raceRecords(records_2);

function raceRecords(records) {
  let marginOfError = 1;

  for (const [time, record] of Object.entries(records)) {
    let ways = 0;

    for (let i = 0; i <= time; i++) {
      let distance = Math.max(time - i, 0) * i;

      if (distance > record) ways++;
    }

    marginOfError = marginOfError * ways;
  }

  console.log(marginOfError);
}
