For use with PIR motion sensor
Connect GND to a GND pin, VCC to a 3.3v pin and OUT to GPIO0 (pinout 11).

https://www.npmjs.com/package/pi-gpio#installation

When running the script it will map the pins to a folder like:
`/sys/class/gpio/gpio23/value`

To fix this run `sudo echo 23 > /sys/class/gpio/export`

if that does now work we can run `sudo sh -c "echo 23 >/sys/class/gpio/export"` to run the command in its own shell as sudo access

For errors like:

```
Error when trying to open pin 16
gpio-admin: failed to change group ownership of /sys/devices/virtual/gpio/gpio23/direction: No such file or directory
```

This might work
`gpio-admin export 16`

https://github.com/rakeshpai/pi-gpio/issues/47

closePins.js is also available to close pins that were left open during runtime

