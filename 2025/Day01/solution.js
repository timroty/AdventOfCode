const utils = require("../utils");

(async () => {
    const file_data = await utils.readFile();

    const dialRotations = file_data.split("\n");

    processDialRotations_1(dialRotations);
    processDialRotations_2(dialRotations);
})();

function processDialRotations_1(dialRotations) {
    let dialPosition = 50;
    let zeroCount = 0;

    dialRotations.forEach(dialRotation => {
        const direction = dialRotation[0];
        const rotationAmount = Number(dialRotation.slice(1));

        dialPosition = direction === 'L'
            ? dialPosition - rotationAmount
            : dialPosition + rotationAmount;

        dialPosition %= 100;

        if (dialPosition === 0) {
            zeroCount++;
        }
    });

    console.log(zeroCount);
}

function processDialRotations_2(dialRotations) {
    let dialPosition = 50;
    let zeroCount = 0;

    dialRotations.forEach(dialRotation => {
        const direction = dialRotation[0];
        const rotationAmount = Number(dialRotation.slice(1));
        const fullRotations = Math.trunc(rotationAmount / 100);

        let oldDialPosition = dialPosition;

        if (direction === 'L') {
            dialPosition = dialPosition - (rotationAmount % 100);

            if (dialPosition < 0) {
                dialPosition += 100;
                zeroCount += oldDialPosition ? 1 : 0;
            }
        } else {
            dialPosition = dialPosition + (rotationAmount % 100);

            if (dialPosition > 100) {
                zeroCount += oldDialPosition ? 1 : 0;
            }
            dialPosition %= 100;
        }

        zeroCount += fullRotations;

        if (dialPosition == 0) {
            zeroCount++;
        }
    });

    console.log(zeroCount);
}