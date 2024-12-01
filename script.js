function main() {
    // Check if device orientation is supported
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", onOrientationChange);
    } else {
        alert("Device orientation is not supported on this device.");
    }

    // Access video stream
    navigator.mediaDevices.getUserMedia({ video: {
        facingMode:'environment'
    } })
        .then(function(signal) {
            const video = document.getElementById("myVideo");
            video.srcObject = signal;
            video.play();  // Start video playback
        })
        .catch(function(err) {
            alert(err);
        });
}

function onOrientationChange(event) {
    console.log(event.beta);
    let angle = event.beta - 90;
    if (angle < 0) {
        angle = -angle;
    }

    const distToTree = document.getElementById("mySlider").value;
    document.getElementById("myLabel").innerHTML = "Distance to object: " + distToTree + " meters";
    
    const height = Math.tan(angle * Math.PI / 180) * distToTree;
    document.getElementById("heightInfo").innerHTML = height.toFixed(1) + " m (" + angle.toFixed(1) + "&deg;)";
}
