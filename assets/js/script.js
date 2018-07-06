document.addEventListener('DOMContentLoaded', () => {

    let batteryLevelDiv = document.querySelector('#battery-level');
    let chargingIcon = document.querySelector('#charging-icon');
    console.log('element', batteryLevelDiv);

    function setBatteryStatus (level, color) {
        batteryLevelDiv.style.backgroundColor = color;
        batteryLevelDiv.style.height = level + '%';
    }

    // check if browser supports battery usage
    navigator.getBattery().then((battery) => {
        let batteryLevel = Math.round(battery.level * 100); // get battery level in percentage

        // function to get battery charging status
        function batteryChargingStatus (level) {
            if (battery.charging) {
                chargingIcon.style.display = 'block'; // show charging icon if battery is charging
            } else {
                chargingIcon.style.display = 'none'; // hide charging icon if battery is not charging
            }

            if (!battery.charging && level < 30) {
                // blink here when battery is low and not charging
                console.log('Battery is low and not charging! Send Help');
            }

            /* if (battery.charging && level < 30) {
                // dont blink here when battery is above 30 and charging
            } */
        }

        // function to get battery level
        function batteryLevelInfo (level) {
            if (level >= 0 && level < 30) {
                setBatteryStatus(level, 'red'); // show red here
                console.log(level, 'Level is between 0 and 30');
            }
            if (level > 30 && level <= 50) {
                setBatteryStatus(level, 'orange'); // show orange here
                console.log(batteryLevel, 'Level is between 30 and 50');
            }
            if (level > 50 && level <= 80) {
                setBatteryStatus(level, 'yellow'); // show yellow here
                console.log(batteryLevel, 'Level is between 50 and 80');
            }
            if (level > 80 && level <= 99) {
                setBatteryStatus(level, 'green'); // show green here
                console.log(level, 'Level is between 80 and 99');
            }
            if (level == 100) {
                setBatteryStatus(level, 'blue'); // show blue here
                console.log(level, 'Level is 100');
            }
        }

        // listen for when battery is charging and discharging
        battery.addEventListener('chargingchange', (e) => {
            batteryLevelInfo(e.currentTarget.level);
            batteryChargingStatus(e.currentTarget.level);
        });

        battery.addEventListener('levelchange', function(e) {
            console.log('Level changed to ', e.currentTarget.level * 100);
            batteryLevelInfo(e.currentTarget.level);
            batteryChargingStatus(e.currentTarget.level);
        });

        batteryLevelInfo(batteryLevel);
        batteryChargingStatus(batteryLevel);
    });
});