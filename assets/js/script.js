document.addEventListener('DOMContentLoaded', () => {

    // check if browser supports battery usage

    navigator.getBattery().then((battery) => {
        let batteryLevel = battery.level * 100; // get battery level in percentage

        // function to get battery level
        function batteryLevelInfo (level) {
            if (level <= 0 && level < 30) {
                // show red here
                console.log(level, 'Level is between 0 and 30');
            }
            if (level > 30 && level <= 50) {
                // show orange here
                console.log(batteryLevel, 'Level is between 30 and 50');
            }
            if (level > 50 && level <= 80) {
                // show yellow here
                console.log(batteryLevel, 'Level is between 50 and 80');
            }
            if (level > 80 && level <= 99) {
                // show blue here
                console.log(level, 'Level is between 80 and 99');
            }
            if (level == 100) {
                // show green here
                console.log(level, 'Level is 100');
            }
        }

        // function to get battery charging status
        function batteryChargingStatus () {
            if (battery.charging) {
                // show charging icon
                console.log('Battery is charging');
            } else {
                // hide charging icon
                console.log('Battery is not charging');
            }

            if (!battery.charging && batteryLevel < 30) {
                // blink here when battery is low and not charging
                console.log('Battery is low and not charging! Send Help');
            }

            if (battery.charging && batteryLevel < 30) {
                // dont blink here when battery is above 30 and charging
            }
        }

        // listen for when battery is charging and discharging
        battery.addEventListener('chargingchange', (e) => {
            batteryLevelInfo(e.currentTarget.level);
            batteryChargingStatus();
        });

        battery.addEventListener('levelchange', function(e) {
            console.log('Level changed to ', e.currentTarget.level * 100);
            batteryLevelInfo(e.currentTarget.level);
        });

        // batteryLevelInfo();
        batteryChargingStatus();
    })
});