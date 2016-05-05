var maxVolumePercentage = {};

function setMaxVolume(player, values) {
  var maxVolume = parseInt(values[0]);
  if (!isNaN(maxVolume)) {
    console.log("Limiting max volume for " + player.roomName + " to " + maxVolume + "%");
    maxVolumePercentage[player.uuid] = maxVolume;
    decreaseVolumeIfNecessary(player);

    var discovery = player.discovery;
    discovery.removeListener("volume", handleVolumeChange);
    discovery.on("volume", handleVolumeChange);
  }
}

function getMaxVolume(player, values, callback) {
  var returnValue = maxVolumePercentage[player.uuid] ? maxVolumePercentage[player.uuid] : 100;
  callback(returnValue);
}

function clearMaxVolume(player) {
  console.log("clearing max volume for room: " + player.roomName);
  delete maxVolumePercentage[player.uuid];
  if (Object.keys(maxVolumePercentage).length === 0) {
    var discovery = player.discovery;
    discovery.removeListener("volume", handleVolumeChange);
  }
}

function decreaseVolumeIfNecessary(player) {
  if (maxVolumePercentage[player.uuid] &&
      player.state.volume > maxVolumePercentage[player.uuid]) {
    player.setVolume(-1);
  }
}

function handleVolumeChange(info) {
  var player = this.getPlayerByUUID(info.uuid);
  decreaseVolumeIfNecessary(player);
}

module.exports = function (api) {
  api.registerAction('setmaxvolume', setMaxVolume);
  api.registerAction('getmaxvolume', getMaxVolume);
  api.registerAction('clearmaxvolume', clearMaxVolume);
};