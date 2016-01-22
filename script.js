var gpio = require("pi-gpio");

var Motion = function(options) {

    // What is the current status of our devices?
    this.currentStatus = false;

    // active duration of relay in milliseconds
    this.activeDuration = 5000;

    // Setup the motion detection on our pin
    this.checkForMotion(options.motionSensorPin, options.relayPin);
};

Motion.prototype.writePin = function(pin, status) {

    console.log('write to pin', pin, status);

};

Motion.prototype.checkForMotion = function(motionSensorPin, relayPin) {

    // read the gpio pin and get its value
    gpio.read(motionSensorPin, function(err, value) {

        // Do we have an error?
        if(err) throw err;

        // Is the value that we read mean motion has been detected? Are we already on?
        if(value == 1 && !this.currentStatus) {

            // Turn the status to on
            this.currentStatus = true;

            console.log('turning on!');

            // Turn on our pin
            this.writePin(relayPin, 1);


            // We will call this after our activeDuration is over
            setTimeout(function() {

                console.log('turning off!');

                // Turn the pin off
                this.writePin(relayPin, 0);


                // Turn the status to off
                this.currentStatus = false;

            }.bind(this), this.activeDuration);
        }

        // Recursively run this method every seccond
        setTimeout(this.checkForMotion(motionSensorPin, relayPin), 1000);

    }.bind(this));

};

new Motion({
    motionSensorPin: 11,
    relayPin: 13
});
