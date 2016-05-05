var maxVolumeSettings = {};
var maxVolumeInterval;

function maxVolumeFn(player, values) {
  console.log("Setting max volume for " + player.roomName + " at " + values[0] + "%");
  maxVolumeSettings[player.uuid] = {
    player: player,
    maxVolume: values[0]
  };

  if (!maxVolumeInterval) {
    maxVolumeInterval = setInterval(restrictVolume.bind(this), 2000);
  }
}



function clearMaxVolumeFn(player) {
  console.log("clearing max volume for room: " + player.roomName);
  delete maxVolumeSettings[player.uuid];
  if (Object.keys(maxVolumeSettings).length === 0) {
    clearInterval(maxVolumeInterval);
    maxVolumeInterval = false;
  }
}

function setVolumeCallback(data, result) {
  console.log("this is the result", result);
}

function restrictVolume() {
  for (var uuid in maxVolumeSettings) {
    var player = maxVolumeSettings[uuid].player;
    var maxVolume = maxVolumeSettings[uuid].maxVolume;
    if (player.state.volume > maxVolume) {
      // Only do this if volume is higher
      console.log("Reverting volume to: " + maxVolume + "%");
      player.setVolume(maxVolume, setVolumeCallback);
    }
  }
}

module.exports = function (api) {
  api.registerAction('maxvolume', maxVolumeFn);
  api.registerAction('clearmaxvolume', clearMaxVolumeFn);
};