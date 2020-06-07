document.addEventListener('DOMContentLoaded', () => {
    const batteryLevelDiv = document.querySelector('#battery-level');
    const batteryPercentage = document.querySelector('#percentage');
    const chargingIcon = document.querySelector('#charging-icon');
    const batteryWrapperDiv = document.querySelector('#battery-wrapper');
    const unsupportedBrowserDiv = document.querySelector('#unsupported-browser');

    function setBatteryStatus (level, color) {
        batteryLevelDiv.style.backgroundColor = color;
        batteryLevelDiv.style.height = level + '%';
        batteryPercentage.innerHTML = `${level}%`;
    }

    // function to get battery level
    function batteryLevelInfo (level) {
        if (level >= 0 && level < 30) {
            setBatteryStatus(level, '#d32f2f'); // show red here
            console.log(level, 'Level is between 0 and 30');
        }
        if (level > 30 && level <= 50) {
            setBatteryStatus(level, '#fb8c00'); // show orange here
            console.log(level, 'Level is between 30 and 50');
        }
        if (level > 50 && level <= 80) {
            setBatteryStatus(level, '#fdd835'); // show yellow here
            console.log(level, 'Level is between 50 and 80');
        }
        if (level > 80 && level <= 99) {
            setBatteryStatus(level, '#43a047'); // show green here
            console.log(level, 'Level is between 80 and 99');
        }
        if (level == 100) {
            setBatteryStatus(level, '#1e88e5'); // show blue here
            console.log(level, 'Level is 100');
        }
    }

    function registerServiceWorker () {
        // check if service worker is supported by the browser
        if ('serviceWorker' in navigator) {
            // register service worker
            navigator.serviceWorker
            .register('/sw.js')
            .then(() => {
                console.log('Service worker registered');
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    // check if browser supports battery usage
    if("getBattery" in navigator && navigator.getBattery() !== undefined) {
        batteryWrapperDiv.style.display = 'block';
        batteryWrapperDiv.classList.add("show");
        unsupportedBrowserDiv.style.display = 'none';
        unsupportedBrowserDiv.classList.add("hidden");

        registerServiceWorker(); // register service worker if browser supports battery api

        navigator.getBattery().then((battery) => {
            // let battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
            let batteryLevel = Math.floor(battery.level * 100); // get battery level in percentage

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

            // listen for when battery is charging and discharging
            battery.addEventListener('chargingchange', (e) => {
                let currentLevel = Math.floor(e.currentTarget.level * 100)
                batteryLevelInfo(currentLevel);
                batteryChargingStatus(currentLevel);
            });

            battery.addEventListener('levelchange', function(e) {
                console.log('Level changed to ', Math.floor(e.currentTarget.level * 100));
                let currentLevel = Math.floor(e.currentTarget.level * 100)
                batteryLevelInfo(currentLevel);
                batteryChargingStatus(currentLevel);
            });

            batteryLevelInfo(batteryLevel);
            batteryChargingStatus(batteryLevel);
        });
    } else {
        batteryWrapperDiv.style.display = 'none';
        unsupportedBrowserDiv.style.display = 'block';
        batteryWrapperDiv.classList.add("hidden");
        unsupportedBrowserDiv.classList.add("show");
    }

});
